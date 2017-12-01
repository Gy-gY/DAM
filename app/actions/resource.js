import {API, baseAPI, customFetch} from '../apis';
import { genAsyncActions } from './action-generator';
import {notification } from 'antd';
import update from 'immutability-helper';

const FoldersApiFp = API.resourceAPI.FoldersApiFp;
export const Actions = genAsyncActions(['RESOURCE_TREE_DATA',
  'RESOURCE_UPDATE_NODE', 'RESOURCE_UPDATE_NODE',
  'CREATE_RESOURCE_FOLDER', 'DELETE_RESOURCE_FOLDER', 'MOVE_FOLDER',
  'COPY_FOLDER', 'RENAME_FOLDER', 'MERGEFOLDERS_SUCCESS',
]);

export const CHECK_FOLDERS = 'CHECK_FOLDERS';
export const FETCH_FOLDERS_OK_FOLDER = 'FETCH_FOLDERS_OK_FOLDER';
export const MERGE_FOLDERS_RESTREE = 'MERGE_FOLDERS_RESTREE';
export const COPY_FOLDER_RIGHT_VIEW = 'COPY_FOLDER_RIGHT_VIEW';

export const MOVE_FOLDER_LEFT_VIEW = 'MOVE_FOLDER_LEFT_VIEW';
export const MOVE_FOLDER_RIGHT_VIEW = 'MOVE_FOLDER_RIGHT_VIEW';

/*--------新版目录权限-------*/
export const CHANGE_FOLDER_NAME = 'CHANGE_FOLDER_NAME';
export const CHANGE_FOLDER_CAPTION = 'CHANGE_FOLDER_CAPTION';
export const CHANGE_FOLDER_KEYWORDS = 'CHANGE_FOLDER_KEYWORDS';
export const GET_ALL_USERS_OK = 'GET_ALL_USERS_OK';
export const GET_FOLDER_BASEINFO_OK = 'GET_FOLDER_BASEINFO_OK';
export const CLEAR_FOLDER_BASEINFO_OK = 'CLEAR_FOLDER_BASEINFO_OK';


export function onSelectFolder_folder(id) {
  console.log('onSelectFolder_folder');
  return(dispatch, getState) => {
    let oldTree = getState().resources.resTree.treeData;
    let selectedfolder = oldTree.find(x=>x.id==id);
    //点击选择一个节点，传来这个节点id，寻找这个节点的儿子节点（find），如果没找到，返回undefined，走else网络接口加载，如果找到说明之前已经加载过
    if(oldTree.find(x=>x.parentId==id)) {
      let array = oldTree.filter(x=>x.parentId==id);
      dispatch({
        type: 'FETCH_FOLDERS_OK_FOLDER',
        folders: array,
        selectedfolder,
      });
    } else {
      FoldersApiFp.foldersIdSubFoldersPost({id:id})(customFetch, baseAPI).then(res=>{
        let newData = oldTree.concat(res);
        //const trees = TreeHelper.parseNodesToTrees(res);
        dispatch({
          type: Actions.RESOURCE_TREE_DATA_SUCCESS,
          treeData: newData,
        });
        dispatch({
          type: 'FETCH_FOLDERS_OK_FOLDER',
          folders: res,
          selectedfolder,
        });
      });
    }
  };
}
//下面的函数为Reduce的 action-Creator
export function getResourceTreeData(id) {
  return(dispatch, getState) => {
    let data = getState().resources.resTree.treeData;
    FoldersApiFp.foldersIdSubFoldersPost({id:id})(customFetch, baseAPI)
    .then(res => {
      console.log('已经有的老数据（data）：', data);
      console.log('根据ID从服务器新请求的(res)：', res);

      let newData = data.concat(res);
      console.log('现在的所有数据（newData）：', newData);
      dispatch({
        type: Actions.RESOURCE_TREE_DATA_SUCCESS,
        treeData: newData,
      });
    }).catch(err => {
      notification.error({message: '获取文件夹失败', description: err.message});
    });
  };
}

export function addNewFolder(dispatch, params) {
  return new Promise(resolve => {
    dispatch({
      type: Actions.CREATE_RESOURCE_FOLDER_REQUEST,
    });
    FoldersApiFp.foldersIdPost({id: params.id, resFolderWeb: params.newFolder})(customFetch, baseAPI)
    .then(newFolder => {
      let newTr = params.tree;
      let folders = params.folders;
      folders.push(newFolder);
      newTr.push(newFolder);
      dispatch({
        type: Actions.CREATE_RESOURCE_FOLDER_SUCCESS,
        treeData: newTr,
        folders: folders,
      });
      resolve(newFolder);
    }).catch(err => {
      dispatch({
        type: Actions.CREATE_RESOURCE_FOLDER_FAILURE,
      });
      notification.error({message: '创建文件夹失败', description: err});
    });
  });
}

export function deleteFolder(dispatch, params) {
  FoldersApiFp.foldersIdDelete({id: params.id})(customFetch, baseAPI)
  .then(() => {
    let newTree = params.tree.filter(x => {
      if(x.id != params.id) {
        return true;
      } else {
        return false;
      }
    });
    let newFolders = params.folders.filter(x => {
      if(x.id != params.id) {
        return true;
      }
      else {
        return false;
      }
    });
    dispatch({
      type: Actions.DELETE_RESOURCE_FOLDER_SUCCESS,
      treeData: newTree,
      folders: newFolders,
    });
  }).catch(err => {
    notification.error({message: '文件夹下有素材，不能删除'});
    console.log(err);
  });
}

export function copyFolder(dispatch, params) {
  FoldersApiFp.foldersCopyPost({sourceFolderId: params.fromId, targetFolderId: params.toId})(customFetch, baseAPI)
  .then(res => {
    if (res) {
      dispatch({
        type: Actions.COPY_FOLDER_SUCCESS,
        treeData: res,
      });
    }
  }).catch(err => {
    err.json().then(res => {
      notification.error({message: '复制文件夹失败', description: res.message});
    });
  });
}

export function moveFolder(dispatch, params) {
  let fromId = params.fromId;
  let folders = params.folders;
  let tree = params.tree;
  FoldersApiFp.foldersMovePost({sourceFolderId: params.fromId, targetFolderId: params.toId})(customFetch, baseAPI)
  .then(res => {
    if (res) {
      let newFolders = folders.filter(folder => folder.id != fromId);
      dispatch({
        type: MOVE_FOLDER_RIGHT_VIEW,
        folders: newFolders,
      });

      tree.forEach((node, index) => {
        if(node.id == fromId) {
          tree.splice(index, 1, res);
        }
      });

      dispatch({
        type: Actions.MOVE_FOLDER_SUCCESS,
        treeData: tree,
      });
    }
  }).catch(err => {
    err.json().then(res => {
      notification.error({message: '文件夹结构已经达到最多级，创建失败！', description: res.message});
    });
  });
}


export function mergeFolders(dispatch, params) {
  let {id, fromIds, newFolder:{name}} = params;
  let newTree = params.tree;
  let fromLen = fromIds.length;
  const newViews = (fromLen, target) => {
    for (let i = 0; i < fromLen; i++) {
      let lenTemp = target.length;
      for (let j = 0; j < lenTemp; j++) {
        if (fromIds[i] == target[j].id) {
          target.splice(j, 1);
          break;
        }
      }
    }
  };
  dispatch({
    type: Actions.MERGEFOLDERS_SUCCESS_REQUEST,
  });
  FoldersApiFp.foldersMergePost({parentId: id, sourceFolderIds: fromIds, targetFolderName: name})(customFetch, baseAPI)
  .then(response => {
    let newFolders = params.folders;
    newViews(fromLen, newFolders);
    newFolders.push(response);
    dispatch({
      type: Actions.MERGEFOLDERS_SUCCESS_SUCCESS,
      folders: newFolders,
    });

    newViews(fromLen, newTree);
    newTree.push(response);
    dispatch({
      type: MERGE_FOLDERS_RESTREE,
      treeData: newTree,
    });
  }).catch(err => {
    dispatch({
      type: Actions.MERGEFOLDERS_SUCCESS_FAILURE,
    });
    notification.error({message: '合并文件夹失败', description: err});
  });
}


//虽然这里叫renameFolder，其实只是沿用了之前老版dam的函数名，不仅仅是改名，修改描述，关键词都会调用这个函数
export function renameFolder(dispatch, params) {
  let {tree, folders, id, newName} = params;
  let newNode = [];
  return FoldersApiFp.foldersIdPut({resFolder: params.resFolder, id: params.id})(customFetch, baseAPI)
  .then(() => {
    let newFolder = folders.filter(folder => {
      return folder.id != id;
    });
    folders.forEach((folder) => {
      if(folder.id == id) {
        newNode = update(folder, {name: {$set: newName}});
      }
    });
    tree.forEach((node, index) => {
      if(node.id == id) {
        tree.splice(index, 1, newNode);
      }
    });
    newFolder.push(newNode);
    dispatch({
      type: Actions.RENAME_FOLDER_SUCCESS,
      folders: newFolder,
      treeData: tree,
    });
  }).catch((err)=>{
    err.json().then((res)=>{
      notification.error({message: '重命名文件夹失败', description: res.message});
    });
  });
}

export function checkFolders_folder(folders) {
  return (dispatch) => {
    dispatch ({
      type: CHECK_FOLDERS,
      folders: folders,
    });
  };
}


/*----------新版目录权限：-----修改基本信息--------*/
export function changeFolderValue(key, value) {
  console.log('key = ' + key + '\nvalue = ' + value);
  let type;
  switch (key) {
  case 'folderName':
    type = CHANGE_FOLDER_NAME;
    break;
  case 'folderCaption':
    type = CHANGE_FOLDER_CAPTION;
    break;
  case 'folderKeyWords':
    type = CHANGE_FOLDER_KEYWORDS;
    break;
  default:
    break;
  }
  return dispatch => {
    dispatch({
      type: type,
      data : {
        key: key,
        value: value,
      },
    });
  };
}


//获取目录的基本信息，比如名字、描述、关键词
export function fetchFolderBaseInfo(folderId) {
  return dispatch => {
    return fetch(`/api/folders/${folderId}`, {
      method: 'GET',
      headers: {'Accept': 'application/json'},
      credentials: 'include',
    })
    .then(response => {
      if(response.status == 200) {
        response.json().then(data => {
          dispatch({
            type: GET_FOLDER_BASEINFO_OK,
            folderBI: data,
          });
        });
      }
    })
    .catch(err => {
      throw new Error(err);
    });
  };
}


export function clearFolserBI() {
  return dispatch => {
    dispatch({
      type: CLEAR_FOLDER_BASEINFO_OK,
    });
  };
}


export function fetchAllUsers() {
  return dispatch => {
    return fetch('api/user/allUserList', {
      method: 'GET',
      headers: {'Accept': 'application/json'},
      credentials: 'include',
    })
    .then(response => {
      if(response.status == 200) {
        response.json().then(data => {
          dispatch({
            type: GET_ALL_USERS_OK,
            users: data,
          });
        });
      }
    }).catch(err => {
      throw new Error(err);
    });
  };
}
