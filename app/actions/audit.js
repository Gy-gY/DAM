import uuid from 'uuid';
import { notification } from 'antd';
import {API, baseAPI, customFetch} from '../apis';
const FolderItemsApi = API.resourceAPI.FolderItemsApiFp;
import { push } from 'react-router-redux';
const UserApiFp = API.nodeAPI.UserApiFp;
const AssestApi = API.resourceAPI.AssestApiFp;
import helper from '../common/helper';

export const FETCH_FOLDER_REQUEST_AUDIT = 'FETCH_FOLDER_REQUEST_AUDIT';
export const FETCH_FOLDER_SUCCESS_AUDIT = 'FETCH_FOLDER_SUCCESS_AUDIT';
export const FETCH_FOLDER_FAILURE_AUDIT = 'FETCH_FOLDER_FAILURE_AUDIT';
export const CHANGE_FILTER_AUDIT = 'CHANGE_FILTER_AUDIT';
export const SELECT_UPLOAD_FILES_AUDIT = 'SELECT_UPLOAD_FILES_AUDIT';
export const SWITCH_TABLE_AUDIT = 'SWITCH_TABLE_AUDIT';
export const TOGGLE_FILE_SELECTION_AUDIT = 'TOGGLE_FILE_SELECTION_AUDIT';
export const HIDE_DETAIL_MODAL_AUDIT = 'HIDE_DETAIL_MODAL_AUDIT';
export const TOGGLE_DETAIL_MODAL_AUDIT = 'TOGGLE_DETAIL_MODAL_AUDIT';
export const SELECT_ALL_FILES_AUDIT = 'SELECT_ALL_FILES_AUDIT';
export const REVERS_FILE_SELECTION_AUDIT = 'REVERS_FILE_SELECTION_AUDIT';
export const REVIEW_REQUEST_AUDIT = 'REVIEW_REQUEST_AUDIT';
export const REVIEW_SUCCESS_AUDIT = 'REVIEW_SUCCESS_AUDIT';
export const REVIEW_FAILURE_AUDIT = 'REVIEW_FAILURE_AUDIT';
export const SHOW_TREE_AUDIT = 'SHOW_TREE_AUDIT';
export const MOVE_ASSETS_SUCCESS_AUDIT = 'MOVE_ASSETS_SUCCESS_AUDIT';
export const ARROW_A_FILE_OK = 'ARROW_A_FILE_OK';
export const SHOW_File_MODAL_AUDIT = 'SHOW_File_MODAL_AUDIT';
export const HIDE_FILE_MODAL_AUDIT = 'HIDE_FILE_MODAL_AUDIT';
export const MODIFY_ALBUM_TITLE_AUDIT = 'MODIFY_ALBUM_TITLE_AUDIT';
export const MODIFY_ALBUM_CAPTION_AUDIT = 'MODIFY_ALBUM_CAPTION_AUDIT';
export const MODIFY_ALBUM_KEYWORDS_AUDIT = 'MODIFY_ALBUM_KEYWORDS_AUDIT';
export const CLEAR_ALBUM_INFO_AUDIT = 'CLEAR_ALBUM_INFO_AUDIT';
export const CREATE_NEW_ALBUM_OK_AUDIT = 'CREATE_NEW_ALBUM_OK_AUDIT';
export const RECORD_CUR_ALBUM_AUDIT = 'RECORD_CUR_ALBUM_AUDIT';
export const GOT_ALBUM_INFO_AUDIT = 'GOT_ALBUM_INFO_AUDIT';
export const UPDATE_ALBUM_OK_AUDIT = 'UPDATE_ALBUM_OK_AUDIT';
export const CHANGE_FILTER_ALBUM = 'CHANGE_FILTER_ALBUM';
export const OPEN_ALBUM_OK_AUDIT = 'OPEN_ALBUM_OK_AUDIT';
export const OPEN_FOLDER_OK_AUDIT = 'OPEN_FOLDER_OK_AUDIT';
export const GET_ALBUMS_OK = 'GET_ALBUMS_OK';
export const CLEAR_ALBUMLIST_OK = 'CLEAR_ALBUMLIST_OK';
export const GET_ALBUMS_REQUEST = 'GET_ALBUMS_REQUEST';
export const GET_ALBUMS_FAILUE = 'GET_ALBUMS_FAILUE';
export const MOVE_COPY_REQUEST = 'MOVE_COPY_REQUEST';
export const MOVE_COPY_OK = 'MOVE_COPY_OK';
export const MOVE_COPY_FAILED = 'MOVE_COPY_FAILED';

const logout = function(dispatch) {
  UserApiFp.logoutPost()(customFetch, baseAPI)
  .then(() => {
    dispatch(push('/login'));
  });
};

function fetchFolderRequest(id) {
  return {
    type: FETCH_FOLDER_REQUEST_AUDIT,
    id,
  };
}

function fetchFolderSuccess(folder) {
  return {
    type: FETCH_FOLDER_SUCCESS_AUDIT,
    folder,
  };
}


export function moveAssets_audit(currentId, targetId, sourceGroupId, targetGroupId) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let ids = getState().audit.selectedFiles.map(x => x.id);
      let query = `sourceFolderId=${currentId}&targetFolderId=${targetId}&sourceGroupId=${sourceGroupId}&targetGroupId=${targetGroupId}`;
      if(!sourceGroupId && targetGroupId) {
        query = `sourceFolderId=${currentId}&targetFolderId=${targetId}&targetGroupId=${targetGroupId}`;
      } else if(sourceGroupId && !targetGroupId) {
        query = `sourceFolderId=${currentId}&targetFolderId=${targetId}&sourceGroupId=${sourceGroupId}`;
      } else if (!sourceGroupId && !targetGroupId) {
        query = `sourceFolderId=${currentId}&targetFolderId=${targetId}`;
      }
      dispatch({
        type: MOVE_COPY_REQUEST,
      });
      customFetch(`${baseAPI}/folderitems/move?${query}`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(ids),
        headers: {'Content-Type': 'application/json'},
      })
      .then(response => {
        if(response.status == 200) {
          response.json().then((data) => {
            resolve(data);
            notification.success({message: '资源移动成功！'});
            let list = getState().audit.selectedFolder.list.filter(file => {
              if(ids.includes(file.id)) {
                return false;
              } else {
                return true;
              }});
            dispatch({type: MOVE_ASSETS_SUCCESS_AUDIT, list});
            dispatch({type: MOVE_COPY_OK});
          });
        } else if(response.status == 401) {
          dispatch({type: MOVE_COPY_FAILED});
          logout(dispatch);
        } else {
          dispatch({type: MOVE_COPY_FAILED});
          notification.error({message: '资源移动失败！'});
        }
        dispatch({type: SHOW_TREE_AUDIT, data: {show: false, type: null}});
      }).catch(err => {
        dispatch({type: SHOW_TREE_AUDIT, data: {show: false, type: null}});
        dispatch({type: MOVE_COPY_FAILED});
        notification.error({message: '资源移动失败！'});
        console.log('err = ', err);
      });
    });
  };
}

export function copyAssets_audit(currentId, targetId, targetGroupId) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let ids = getState().audit.selectedFiles.map(x => x.id);
      let query = `${baseAPI}/folderitems/copy?sourceFolderId=${currentId}&targetFolderId=${targetId}`;
      if(targetGroupId) {
        query = `${baseAPI}/folderitems/copy?sourceFolderId=${currentId}&targetFolderId=${targetId}&targetGroupId=${targetGroupId}`;
      }
      dispatch({type: MOVE_COPY_REQUEST});
      customFetch(query, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(ids),
        headers: {'Content-Type': 'application/json'},
      })
      .then(response => {
        dispatch({type:SHOW_TREE_AUDIT, data:{show: false, type: null}});
        if(response.status == 200) {
          response.json().then((data) => {
            resolve(data);
            dispatch({type: MOVE_COPY_OK});
            notification.success({message: '资源复制成功！'});
          });
        } else if(response.status == 401) {
          dispatch({type: MOVE_COPY_FAILED});
          logout(dispatch);
        } else {
          dispatch({type: MOVE_COPY_FAILED});
          notification.error({message: '资源复制失败！'});
        }
      }).catch(err => {
        dispatch({type: MOVE_COPY_FAILED});
        dispatch({type: SHOW_TREE_AUDIT, data: {show: false, type: null}});
        notification.error({message: '资源复制失败！'});
        console.log(err);
      });
    });
  };
}

export function showTree_audit(type) {
  return dispatch => {
    dispatch({
      type: SHOW_TREE_AUDIT,
      data: {
        show: true,
        type: type,
      },
    });
  };
}

export function hideTree_audit() {
  return dispatch => {
    dispatch({
      type: SHOW_TREE_AUDIT,
      data: {
        show: false,
        type: null,
      },
    });
    dispatch({
      type: MOVE_COPY_FAILED,
    });
  };
}

//调用此函数，如果是album下的资源获取和筛选，data里要有显示带上groupId的属性
export function fetchFolder_audit(data, filterChenged) {
  console.log('data ========= ', data);
  return (dispatch, getState) => {
    let {filter, filter_album} = getState().audit;
    let newfilter = filter;
    if(data) {
      let z_filter = data.groupId ? filter_album : filter;
      let type = data.groupId ? CHANGE_FILTER_ALBUM : CHANGE_FILTER_AUDIT;
      if(filterChenged) {
        data.pageNum = 1;
      }
      newfilter = Object.assign({}, z_filter, data);
      dispatch({
        type,
        data: newfilter,
      });
    } else {
      //一定是Folder下，不是album下
      newfilter = filter;
    }
    dispatch(fetchFolderRequest(...newfilter.folderId));
    FolderItemsApi.folderitemsV2FolderIdGet(newfilter)(customFetch, baseAPI)
      .then(folder => {
        console.log('folder ========================== ', folder);
        if(folder.status == 401) {
          logout(dispatch);
        } else {
          let newF = folder.list.map(item => helper.formatFile(item));
          folder.list = newF;
          dispatch(fetchFolderSuccess(folder));
          if(data.groupId) {
            dispatch({
              type: OPEN_ALBUM_OK_AUDIT,
              albumJSON: folder,
            });
          } else {
            dispatch({
              type: OPEN_FOLDER_OK_AUDIT,
            });
          }
        }
      }).catch(err => {
        dispatch({
          type: FETCH_FOLDER_FAILURE_AUDIT,
        });
        if(err.status == 401) {
          logout(dispatch);
        }
      });
  };
}

export function switchTable_audit(data) {
  return {
    type : SWITCH_TABLE_AUDIT,
    data,
  };
}

export function selectUploadFiles_audit(files) {
  return {
    type: SELECT_UPLOAD_FILES_AUDIT,
    files: files.map(file => ({
      id: uuid.v4(),
      isUploading: false,
      isUploadFalied: false,
      data: file,
    })),
  };
}

export function toggleFileSelection_audit(file, event) {
  return {
    type: TOGGLE_FILE_SELECTION_AUDIT,
    file,
    ctrlKey: event.ctrlKey || event.metaKey,
  };
}

//双击或者编辑（缩略图模式）
export function toggleDetailModal_audit() {
  return (dispatch, getState) => {
    let { selectedFiles, showTable, currentFile, detailModal_audit } = getState().audit;
    dispatch({
      type: TOGGLE_DETAIL_MODAL_AUDIT,
      files: selectedFiles,
    });
    console.log('--双击--selectedFiles == ', selectedFiles);
    //选择当前双击的图片或者点击编辑时的第一个图片作为当前图片
    let file = {};
    if(showTable) {
      file = Object.keys(currentFile).length == 0 ? detailModal_audit.files[0] : currentFile;
    } else {
      file = selectedFiles[0];
    }
    dispatch({
      type: ARROW_A_FILE_OK,
      file: file,
    });
  };
}

//点击编辑按钮，列表模式，只能一个
export function toggleDetailModal_single_audit(file) {
  return dispatch => {
    dispatch({
      type: TOGGLE_DETAIL_MODAL_AUDIT,
      files: [file],
    });
    dispatch({
      type: ARROW_A_FILE_OK,
      file: file,
    });
  };
}

export function selectAllFiles_audit() {
  return (dispatch, getState) => {
    let { selectedFolder } = getState().audit;
    dispatch({
      type: SELECT_ALL_FILES_AUDIT,
      ids: selectedFolder.list,
    });
  };
}

export function reversFileSelection_audit() {
  return(dispatch, getState) => {
    let { selectedFiles, selectedFolder } = getState().audit;
    dispatch({
      type: REVERS_FILE_SELECTION_AUDIT,
      ids: selectedFolder.list.filter(file => {
        if(selectedFiles.find((fil) => (fil.id == file.id))) {
          return false;
        } else {
          return true;
        }
      }),
    });
  };
}


function reviewRequest() {
  return {
    type: REVIEW_REQUEST_AUDIT,
  };
}

function reviewSuccess(fileIds) {
  return {
    type: REVIEW_SUCCESS_AUDIT,
    fileIds,
  };
}

function reviewFailure(error) {
  return {
    type: REVIEW_FAILURE_AUDIT,
    error,
  };
}

export function edit_file_audit(file, datas) {
  return (dispatch, getState) => {
    let { curSelectedAlbum, displayMode } = getState().audit;
    let groupId = curSelectedAlbum.id;
    dispatch(reviewRequest());
    AssestApi.assetsBatchUpdatePost({ids: [file.id], asset: datas})(customFetch, baseAPI)
      .then(() => {
        displayMode == 'folder' ? dispatch(fetchFolder_audit()) : dispatch(fetchFolder_audit({groupId}));
        //dispatch(fetchFolder_audit());
        dispatch(reviewSuccess());
        dispatch({type: HIDE_DETAIL_MODAL_AUDIT});
      })
    .catch(err => dispatch(reviewFailure(err)));
  };
}

export function reviewFiles_single__audit(isPass, file) {
  return (dispatch, getState) => {
    let { curSelectedAlbum, displayMode } = getState().audit;
    let groupId = curSelectedAlbum.id;
    dispatch(reviewRequest());
    let param = {
      reviewState: {
        ids: [file.id],
        rejectReason: '',
        reviewerId: '',
        state: isPass ? 'PASSED' : 'REJECTED',
      },
    };
    AssestApi.assetsReviewPut(param)(customFetch, baseAPI)
    .then(() => {
      displayMode == 'folder' ? dispatch(fetchFolder_audit()) : dispatch(fetchFolder_audit({groupId}));
      //dispatch(fetchFolder_audit());
      dispatch(reviewSuccess());
      dispatch({type:HIDE_DETAIL_MODAL_AUDIT});
    })
    .catch(err => dispatch(reviewFailure(err)));
  };
}

//入库,驳回，isPass传过来true就是入库，false就是驳回，如果datas不为空，则是中图页中传递过来的填写信息
export function reviewFiles_audit(isPass, datas = null) {
  return (dispatch, getState) => {
    let { selectedFiles, detailModal_audit, showTable, currentFile, curSelectedAlbum, displayMode } = getState().audit;
    let groupId = curSelectedAlbum.id;
    //如果是列表视图，用户不选中而是直接点击编辑，那么selectedFiles为空，而应该使用传过来的record传来的id
    let ids = [];
    if(showTable) {
      //列表
      currentFile && ids.push(currentFile.id);
    } else {
      //缩略图
      if(detailModal_audit.isOpen) {
        //中图页弹框，主要处理分支
        ids.push(currentFile.id);
      } else {
        ids = selectedFiles.map(file => file.id);
      }
    }
    let passState = isPass ? 'PASSED' : 'REJECTED';
    let param = {'reviewState':{'ids': ids, 'rejectReason': '', 'reviewerId': '', 'state':passState},
    };
    dispatch(reviewRequest());
    if(datas) {
      //中图页，datas不是空
      AssestApi.assetsBatchUpdatePost({ids: ids, asset: datas})(customFetch, baseAPI)
      .then(AssestApi.assetsReviewPut(param)(customFetch, baseAPI)
        .then((data) => {
          displayMode == 'folder' ? dispatch(fetchFolder_audit()) : dispatch(fetchFolder_audit({groupId}));
          //dispatch(fetchFolder_audit());
          dispatch(reviewSuccess());
          dispatch({type:HIDE_DETAIL_MODAL_AUDIT});
        }))
      .catch(err => {
        displayMode == 'folder' ? dispatch(fetchFolder_audit()) : dispatch(fetchFolder_audit({groupId}));
        //dispatch(fetchFolder_audit());
        dispatch(reviewFailure(err));
      });
    } else {
      //操作区的入库、驳回
      AssestApi.assetsReviewPut(param)(customFetch, baseAPI)
        .then(() => {
          displayMode == 'folder' ? dispatch(fetchFolder_audit()) : dispatch(fetchFolder_audit({groupId}));
          //dispatch(fetchFolder_audit());
          dispatch(reviewSuccess());
          dispatch({type:HIDE_DETAIL_MODAL_AUDIT});
        })
        .catch(err => {
          displayMode == 'folder' ? dispatch(fetchFolder_audit()) : dispatch(fetchFolder_audit({groupId}));
          //dispatch(fetchFolder_audit());
          dispatch(reviewFailure(err));
        });
    }
  };
}

//禁用
export function offLineFiles_audit(record = false) {
  return (dispatch, getState) => {
    let param = {
      id: record ? record.id : getState().audit.selectedFiles[0].id,
      onlineState: {
        offlineReason: '',
        state: 'OFFLINE',
      },
    };
    let { curSelectedAlbum, displayMode } = getState().audit;
    let groupId = curSelectedAlbum.id;
    AssestApi.assetsIdOnlinePut(param)(customFetch, baseAPI)
      .then(() => {
        displayMode == 'folder' ? dispatch(fetchFolder_audit()) : dispatch(fetchFolder_audit({groupId}));
        //dispatch(fetchFolder_audit());
        dispatch(reviewSuccess());
        dispatch({type: HIDE_DETAIL_MODAL_AUDIT});
      })
      .catch(err => dispatch(reviewFailure(err)));
  };
}

//因为用了走马灯，选中一个file图片，走马灯游几张后，selectedFile不变
//因为用了走马灯，选中一个但是当前的图片变了，当编辑保存、提交的时候，依然用的的selectedFile，是错的
//arrowFile以及ARROW_A_FILE_OK就是为了记录当前的图片，或者说是当前走马灯游到哪个图片了，方便保存提交的是当前的资源
export function arrowFile(file) {
  return dispatch => {
    dispatch({
      type: ARROW_A_FILE_OK,
      file,
    });
  };
}



export function showFileModal_audit(isNew) {
  return dispatch => {
    dispatch({
      type: SHOW_File_MODAL_AUDIT,
      isNew,
    });
  };
}

export function hideFileModal_audit() {
  return dispatch => {
    dispatch({
      type: HIDE_FILE_MODAL_AUDIT,
    });
  };
}

export function changeAlbumInfo_audit(key, value) {
  console.log('key = ' + key + '\nvalue = ' + value);
  let type;
  switch(key) {
  case 'title':
    type = MODIFY_ALBUM_TITLE_AUDIT;
    break;
  case 'caption':
    type = MODIFY_ALBUM_CAPTION_AUDIT;
    break;
  case 'keywords':
    type = MODIFY_ALBUM_KEYWORDS_AUDIT;
    break;
  }
  return dispatch => {
    dispatch({
      type,
      value,
    });
  };
}

export function clearAlbumInfo_audit() {
  return dispatch => {
    dispatch({
      type: CLEAR_ALBUM_INFO_AUDIT,
    });
  };
}

//创建新的文件夹，提交的时候调用
export function submitNewAlbum_audit(folderId, params) {
  console.log('audit params == ', params);
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let cid = getState().login.currentUser.customerId;
      let uid = getState().login.currentUser.userId;
      let query = `?folderId=${folderId}&uid=${uid}&cid=${cid}`;
      fetch(`${baseAPI}/group/create${query}`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params),
      }).then(response => {
        if(response.status == 200) {
          response.json().then(newAlbum => {
            dispatch({
              type: CREATE_NEW_ALBUM_OK_AUDIT,
              album: newAlbum,
            });
            resolve(newAlbum);
            //下面一行是新建完成之后刷新界面，以便显示新建的文件夹
            dispatch(fetchFolder_audit());
          });
        } else if(response.status == 400) {
          notification.error({message: '该名称已存在，请更换！'});
        }
      }).catch(err => {
        console.log('创建album失败，err: ', err);
        throw new Error(err);
      });
    });
  };
}

//双击或者编辑album的时候,记录当前所操作的album，以便有的地方会用上
export function recordCurSelectedAlbum_audit(album) {
  return dispatch => {
    dispatch({
      type: RECORD_CUR_ALBUM_AUDIT,
      album,
    });
  };
}

//编辑文件夹的时候需要先调用这个函数，获取文件夹信息
export function getAlbumInfo_audit() {
  return (dispatch, getState) => {
    //let groupId = getState().audit.curSelectedAlbum.id;
    let groupId = getState().audit.selectedFiles[0].id;
    fetch(`${baseAPI}/assets/${groupId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {'Accept': 'application/json'},
    }).then(response => {
      if(response.status == 200) {
        response.json().then(info => {
          dispatch({
            type: GOT_ALBUM_INFO_AUDIT,
            data: info,
          });
        });
      }
    }).catch(err => {
      console.log('获取album信息失败，err = ', err);
      throw new Error(err);
    });
  };
}

//更新album
export function updateAlbum_audit(params) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let { curSelectedAlbum, filter } = getState().audit;
      console.log('filter === ', filter);
      let groupId = curSelectedAlbum.id;
      fetch(`${baseAPI}/assets/update/${groupId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params),
      }).then(response => {
        if(response.status == 200) {
          response.json().then(newAlbum => {
            console.log('-----微服务返回更新的album::::', newAlbum);
            dispatch({
              type: UPDATE_ALBUM_OK_AUDIT,
              album: newAlbum,
            });
            resolve(newAlbum);
            //刷新
            dispatch(fetchFolder_audit(filter, false));
          });
        } else if(response.status == 400) {
          notification.error({message: '该名称已存在，请更换！'});
        }
      }).catch(err => {
        console.log('更新album失败，err = ', err);
        throw new Error(err);
      });
    });
  };
}

//获取某个目录下面album的list
export function getAlbumsByFolderId(folderId) {
  return dispatch => {
    dispatch({
      type: GET_ALBUMS_REQUEST,
    });
    fetch(`${baseAPI}/group/list?folderId=${folderId}&pageNum=1&pageSize=1000`, {
      method: 'GET',
      credentials: 'include',
      headers: {'Accept': 'application/json'},
    }).then(response => {
      if(response.status == 200) {
        response.json().then(albums => {
          console.log('微服务返回该目录下的alubms：', albums);
          dispatch({
            type: GET_ALBUMS_OK,
            albums,
          });
        });
      }
    }).catch(err => {
      console.log('err = ', err);
      dispatch({
        type: GET_ALBUMS_FAILUE,
      });
      throw new Error(err);
    });
  };
}

export function clearAlbumList() {
  return dispatch => {
    dispatch({
      type: CLEAR_ALBUMLIST_OK,
    });
  };
}
