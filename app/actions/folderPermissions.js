import {baseAPI} from '../apis';
const ActionTypes = {
  'QUERY_FOLDERPERMISSIONLIST_SUCCESS'      : 'QUERY_FOLDERPERMISSIONLIST_SUCCESS',
  'QUERY_GROUPPERMISSIONLIST_SUCCESS'       : 'QUERY_GROUPPERMISSIONLIST_SUCCESS',
  'SET_GROUPPERMISSIONLIST_SUCCESS'         : 'SET_GROUPPERMISSIONLIST_SUCCESS',
  'RENAME_FOLDER_SUCCESS'                   : 'RENAME_FOLDER_SUCCESS',
  'CHECK_FOLDERS'                           : 'CHECK_FOLDERS',
};

//新版目录权限
export const QUERY_FOLDER_USERS_OK = 'QUERY_FOLDER_USERS_OK';
export const CLEAR_PER_USERS = 'CLEAR_PER_USERS';
export const CHANGE_UPLOAD_USERS = 'CHANGE_UPLOAD_USERS';
export const ADD_A_VIEW_USER = 'ADD_A_VIEW_USER';
export const DEL_A_VIEW_USER = 'DEL_A_VIEW_USER';
export const ADD_A_DOWN_USER = 'ADD_A_DOWN_USER';
export const DEL_A_DOWN_USER = 'DEL_A_DOWN_USER';
export const ADD_OR_UPDATE_FOLDER_OK = 'ADD_OR_UPDATE_FOLDER_OK';


//添加群组
export function queryFolderPermission(folderId) {
  return (dispatch) => {
    return fetch(`${baseAPI}/workgroupFolderPermission/getByFolderId?folderId=${folderId}`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('提交失败！');
      }).then(data => dispatch(queryFolderPermissionSuccess(data)));
  };
}

function queryFolderPermissionSuccess(data) {
  return {
    type:ActionTypes.QUERY_FOLDERPERMISSIONLIST_SUCCESS,
    folderPermissionList:data,
  };
}

export function queryGroupPermissions(type) {
  return (dispatch) => {
    return fetch(`${baseAPI}/permission/list?type=${type}`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('提交失败！');
      }).then(data => dispatch(queryGroupPermissionSuccess(data)));
  };
}

function queryGroupPermissionSuccess(data) {
  return {
    type:ActionTypes.QUERY_GROUPPERMISSIONLIST_SUCCESS,
    groupPermissionList:data,
  };
}

//设置群组权限
export function setFolderPermissions(params, folderId) {
  return (dispatch) => {
    return fetch(`${baseAPI}/workgroupFolderPermission/setByFolderId?folderId=${folderId}`, {
      credentials: 'include',
      method: 'POST',
      body:JSON.stringify(params),
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('提交失败！');
      }).then(data => dispatch(setFolderPermissionsSuccess(data)));
  };
}

function setFolderPermissionsSuccess() {
  return {
    type:ActionTypes.SET_GROUPPERMISSIONLIST_SUCCESS,
    //groupPermissionList:data,
  };
}

//重命名目录
export function reNameFolder(params) {
  let {folderId, name} = params;
  return (dispatch) => {
    return fetch(`${baseAPI}/folders/${folderId}`, {
      credentials: 'include',
      method: 'PUT',
      body:JSON.stringify({name:name}),
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('提交失败！');
      }).then(data => dispatch(reNameFolderSuccess(data)));
  };
}

function reNameFolderSuccess(data) {
  return {
    type: ActionTypes.CHECK_FOLDERS,
    folders: [data.id],
  };
  // return {
  //   type:ActionTypes.RENAME_FOLDER_SUCCESS,
  //   //groupPermissionList:data,
  // };
}








//新版目录权限，根据目录Id查询该目录可以被哪些用户使用
//我们要这些用户的userId和realName
//以及分离出 浏览权限、下载权限、上传权限
export function queryFolderUsers(folderId) {
  return (dispatch) => {
    return fetch(`${baseAPI}/userFolderPermission/getByFolderId?folderId=${folderId}`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('查询该目录用户失败！');
      }).then(data => {
        console.log('folderId -----action------> ulist ==== ', data);
        dispatch({
          type: QUERY_FOLDER_USERS_OK,
          ulist: data,
        });
      });
  };
}


export function changeFolderUsers(key, value) {
  console.log('key = ' + key + '\nvalue = ' + value);
  let type = '';
  switch(key) {
  case 'add_a_view_user':
    type = ADD_A_VIEW_USER;
    break;
  case 'del_a_view_user':
    type = DEL_A_VIEW_USER;
    break;
  case 'add_a_down_user':
    type = ADD_A_DOWN_USER;
    break;
  case 'del_a_down_user':
    type = DEL_A_DOWN_USER;
    break;
  case 'uploadUsers':
    type = CHANGE_UPLOAD_USERS;
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


export function clearPerUsers() {
  return dispatch => {
    dispatch({
      type: CLEAR_PER_USERS,
    });
  };
}

//数组除重
function uniqueArray(arr) {
  let res = [];
  let json = {};
  for(let i = 0; i < arr.length; i++) {
    if(!json[arr[i]]) {
      res.push(arr[i]);
      json[arr[i]] = 1;
    }
  }
  return res;
}




//新建/更新 一个folder，并提交该目录的信息，其实只是权限信息
export function submitFolderInfo(folderId) {
  return (dispatch, getState) => {
    let baseInfo = getState().resources.folderValues;
    let perInfo = getState().folderPermissions.folderUsers;
    console.log('提交信息，基本信息：', baseInfo);
    console.log('提交信息，权限信息：', perInfo);
    let users = perInfo.view_assets.concat(perInfo.upload_assets);
    let ulist = uniqueArray(users);
    let json = {};
    ulist.forEach(u => {
      json[u] = [];
      if(perInfo.view_assets.indexOf(u) > -1) {
        json[u].push('view_assets');
      }
      if(perInfo.download_assets.indexOf(u) > -1) {
        json[u].push('download_assets');
      }
      if(perInfo.upload_assets.indexOf(u) > -1) {
        json[u].push('upload_assets');
      }
    });
    console.log('json ------------> ', json);
    return fetch(`/api/userFolderPermission/setByFolderId?folderId=${folderId}`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(json),
    })
    .then(response => {
      if(response.status == 200) {
        response.json().then(data => {
          dispatch({
            type: ADD_OR_UPDATE_FOLDER_OK,
            ret: data,
          });
        });
      }
    })
    .catch(err => {
      console.log('err ------------------> ', err);
      throw new Error(err);
    });
  };
}
