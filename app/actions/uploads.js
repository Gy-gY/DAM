import uuid from 'uuid';
import { API, baseAPI, customFetch } from '../apis';
const { AssestApiFp, InApiFp } = API.resourceAPI;
import { notification } from 'antd';
import helper from '../common/helper';
import { push } from 'react-router-redux';

export const FETCH_FOLDER_REQUEST = 'FETCH_FOLDER_REQUEST';
export const FETCH_FOLDER_SUCCESS = 'FETCH_FOLDER_SUCCESS';
export const FETCH_FOLDER_FAILURE = 'FETCH_FOLDER_FAILURE';
export const RESET_FOLDER = 'RESET_FOLDER';
export const SELECT_UPLOAD_FILES = 'SELECT_UPLOAD_FILES';
export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST';
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE';
export const TOGGLE_FILE_SELECTION = 'TOGGLE_FILE_SELECTION';
export const CHANGE_ASSET_TYPE = 'CHANGE_ASSET_TYPE';
export const DELETE_FILE_REQUEST = 'DELETE_FILE_REQUEST';
export const DELETE_FILE_SUCCESS = 'DELETE_FILE_SUCCESS';
export const DELETE_FILE_FAILURE = 'DELETE_FILE_FAILURE';
export const TOGGLE_DETAIL_MODAL = 'TOGGLE_DETAIL_MODAL';
export const SELECT_ALL_FILES = 'SELECT_ALL_FILES';
export const REVERS_FILE_SELECTION = 'REVERS_FILE_SELECTION';
export const UPDATE_FILE_REQUEST = 'UPDATE_FILE_REQUEST';
export const UPDATE_FILE_SUCCESS = 'UPDATE_FILE_SUCCESS';
export const UPDATE_FILE_FAILURE = 'UPDATE_FILE_FAILURE';
export const INSTOCK_REQUEST = 'INSTOCK_REQUEST';
export const INSTOCK_SUCCESS = 'INSTOCK_SUCCESS';
export const INSTOCK_FAILURE = 'INSTOCK_FAILURE';
export const TOGGLE_IMG_RESET = 'TOGGLE_IMG_RESET';
export const SHOW_TREE_UPLOAD = 'SHOW_TREE_UPLOAD';
export const MOVE_ASSETS_SUCCESS_UPLOAD = 'MOVE_ASSETS_SUCCESS_UPLOAD';
export const GET_DOWN_LIST_OK = 'GET_DOWN_LIST_OK';
export const GET_SEARCHED_SRC_OK = 'GET_SEARCHED_SRC_OK';
export const GET_ALIYUN_PARAMS_OK = 'GET_ALIYUN_PARAMS_OK';
export const CHANGE_KEY_WORDS = 'CHANGE_KEY_WORDS';
export const CLEAR_KEYWORLDS_OK = 'CLEAR_KEYWORLDS_OK';
export const GET_DOWN_LIST_REQUEST = 'GET_DOWN_LIST_REQUEST';
export const SHOW_File_MODAL = 'SHOW_File_MODAL';
export const HIDE_FILE_MODAL = 'HIDE_FILE_MODAL';
export const MODIFY_ALBUM_TITLE = 'MODIFY_ALBUM_TITLE';
export const MODIFY_ALBUM_CAPTION = 'MODIFY_ALBUM_CAPTION';
export const MODIFY_ALBUM_KEYWORDS = 'MODIFY_ALBUM_KEYWORDS';

export const CLEAR_ALBUM_INFO = 'CLEAR_ALBUM_INFO';
export const CREATE_NEW_ALBUM_OK = 'CREATE_NEW_ALBUM_OK';
export const UPDATE_ALBUM_OK = 'UPDATE_ALBUM_OK';
export const OPEN_ALBUM_OK = 'OPEN_ALBUM_OK';
export const OPEN_FOLDER_OK = 'OPEN_FOLDER_OK';
export const RECORD_CUR_ALBUM = 'RECORD_CUR_ALBUM';
export const GOT_ALBUM_INFO = 'GOT_ALBUM_INFO';
export const CHANGE_ALBUM_FILTER_OK = 'CHANGE_ALBUM_FILTER_OK';
export const GET_ALBUMS_OK_UPLOAD = 'GET_ALBUMS_OK_UPLOAD';
export const SHOW_INSTOCK_CONFIRM = 'SHOW_INSTOCK_CONFIRM';
export const HIDE_INSTOCK_CONFIRM = 'HIDE_INSTOCK_CONFIRM';
export const ENTER_ALBUM_OK = 'ENTER_ALBUM_OK';


const UserApiFp = API.nodeAPI.UserApiFp;
const logout = function(dispatch) {
  UserApiFp.logoutPost()(customFetch, baseAPI)
  .then(() => {
    dispatch(push('/login'));
  });
};

function fetchFolderRequest(id) {
  return {
    type: FETCH_FOLDER_REQUEST,
    id,
  };
}

function fetchFolderSuccess(folder, id) {
  return {
    type: FETCH_FOLDER_SUCCESS,
    folder,
    id,
  };
}

function fetchFolderFailure(error) {
  return {
    type: FETCH_FOLDER_FAILURE,
    error,
  };
}

export function moveAssets_upload(currentId, targetId) {
  return (dispatch, getState) => {
    let ids = getState().uploads.selectedFiles.map(x => x.id);
    customFetch(`${baseAPI}/folderitems/move?sourceFolderId=${currentId}&targetFolderId=${targetId}`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(ids),
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
      if(response.status == 200) {
        response.json().then(() => {
          notification.success({message: '资源移动成功！'});
          let list = getState().uploads.selectedFolder.list.filter(file => {
            if(ids.includes(file.id)) {
              return false;
            } else {
              return true;
            }});
          dispatch({type:MOVE_ASSETS_SUCCESS_UPLOAD, list});
        });
      } else if(response.status == 401) {
        logout(dispatch);
      } else {
        notification.error({message: '资源移动失败！'});
      }
      dispatch({type:SHOW_TREE_UPLOAD, data:{show:false, type:null}});
    }).catch(err => {
      dispatch({type:SHOW_TREE_UPLOAD, data:{show:false, type:null}});
      notification.error({message: '资源移动失败！'});
      console.log('err = ', err);
    });
  };
}

export function moveAssets_upload_file(currentId, targetId, selectedFiles) {
  return (dispatch, getState) => {
    selectedFiles = selectedFiles || getState().uploads.selectedFiles;
    let ids = selectedFiles.map(x=>x.id);
    customFetch(`${baseAPI}/folderitems/move?sourceFolderId=${currentId}&targetFolderId=${targetId}`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(ids),
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
      if(response.status==200) {
        response.json().then(()=>{
          notification.success({message: '资源移动成功！'});
          let list = getState().uploads.selectedFolder.list.filter(file=>{
            if(ids.includes(file.id)) {
              return false;
            }else {
              return true;
            }});
          dispatch({type:MOVE_ASSETS_SUCCESS_UPLOAD, list});
        });
      }else if(response.status==401) {
        logout(dispatch);
      }else {
        notification.error({message: '资源移动失败！'});
      }
      dispatch({type:SHOW_TREE_UPLOAD, data:{show:false, type:null}});
    }).catch(err => {
      dispatch({type:SHOW_TREE_UPLOAD, data:{show:false, type:null}});
      notification.error({message: '资源移动失败！'});
      console.log('err: ', err);
    });
  };
}

export function copyAssets_upload(currentId, targetId) {
  return (dispatch, getState) => {
    let ids = getState().uploads.selectedFiles.map(x => x.id);
    customFetch(`${baseAPI}/folderitems/copy?sourceFolderId=${currentId}&targetFolderId=${targetId}`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(ids),
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
      dispatch({type:SHOW_TREE_UPLOAD, data:{show:false, type:null}});
      if(response.status == 200) {
        response.json().then(() => {
          notification.success({message: '资源复制成功！'});
        });
      }else if(response.status == 401) {
        logout(dispatch);
      }else {
        notification.error({message: '资源复制失败！'});
      }
    }).catch(err => {
      dispatch({type:SHOW_TREE_UPLOAD, data:{show:false, type:null}});
      notification.error({message: '资源复制失败！'});
      console.log('err = ', err);
    });
  };
}

export function showTree_upload(type) {
  return (dispatch) => {
    dispatch({type:SHOW_TREE_UPLOAD, data:{show:true, type:type}});
  };
}

export function hideTree_upload() {
  return (dispatch) => {
    dispatch({type:SHOW_TREE_UPLOAD, data:{show:false, type:null}});
  };
}

export function recordCurSelectedAlbum(album) {
  return dispatch => {
    dispatch({
      type: RECORD_CUR_ALBUM,
      album,
    });
  };
}

export function fetchFolder(id, pageNum, assetType, filterChanged = false, groupId) {
  if (typeof pageNum != 'number' || !id) {
    pageNum = 1;
  }
  return (dispatch, getState) => {
    let {
      folders,
    } = getState().uploads;
    if (!id) {
      const folder = folders.find(folder => id.includes(folder.id.toString()));
      if (!folder.permissions.includes('view_assets') && !folder.permissions.includes('upload_assets'))
        return dispatch({type: RESET_FOLDER});
    }
    if(groupId && assetType == 'GROUP') {
      assetType = '';
      dispatch({
        type: CHANGE_ALBUM_FILTER_OK,
        assetType,
      });
    }
    dispatch(fetchFolderRequest(id));
    if(filterChanged) {
      pageNum = 1;
      dispatch({type: CHANGE_ASSET_TYPE, assetType: assetType});
      AssestApiFp.assetsLoadAssetsFolderIdGet({
        folderId: id,
        groupId: groupId,
        pageSize: 60,
        assetType: assetType,
        userId: 'fakeId',
        pageNum: pageNum,
      })(customFetch, baseAPI)
      .then(folderData => {
        console.log('folderData =========server=========>>> ', folderData);
        if(folderData.status == 401) {
          logout(dispatch);
        } else {
          folderData = folderData.data;
          dispatch(fetchFolderSuccess(folderData, id));
          //如果是打开album，那么需要发射一个OPEN_ALBUM_OK，去记录当前处于album模式下，否则处于folder模式下
          if(groupId) {
            dispatch({
              type: OPEN_ALBUM_OK,
              albumJSON: folderData, //服务器返回的包括list，pageNum，total在内的数据
            });
          } else {
            dispatch({
              type: OPEN_FOLDER_OK,
            });
          }
        }
      }).catch(err => {
        if(err.status == 401) {
          logout(dispatch);
        } else if(err.status == 403) {
          notification.error({message: '您没有权限浏览此目录！'});
        }
        dispatch(fetchFolderFailure(err));
      });
    } else {
      pageNum = !pageNum ? 1 : pageNum;
      AssestApiFp.assetsLoadAssetsFolderIdGet({
        folderId: id,
        groupId: groupId,
        pageSize: 60,
        assetType: assetType,
        userId: 'fakeId',
        pageNum: pageNum,
      })(customFetch, baseAPI)
        .then(res => {
          if(res.status == 401) {
            logout(dispatch);
          } else {
            let folderData = res.data;
            dispatch(fetchFolderSuccess(folderData, id));
            if(groupId) {
              dispatch({
                type: OPEN_ALBUM_OK,
                albumJSON: folderData, //服务器返回的包括list，pageNum，total在内的数据
              });
            } else {
              dispatch({
                type: OPEN_FOLDER_OK,
              });
            }
          }
        }).catch(err => {
          if(err.status == 401) {
            logout(dispatch);
          }else if(err.status == 403) {
            notification.error({message: '您没有权限浏览此目录！'});
          }
          dispatch(fetchFolderFailure(err));
        });
    }
  };
}

function uploadFileRequest(file) {
  return {
    type: UPLOAD_FILE_REQUEST,
    file,
  };
}

function uploadFileSuccess(file, localId, folderId) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    file,
    localId,
    folderId,
  };
}

function uploadFileFailure(file) {
  return {
    type: UPLOAD_FILE_FAILURE,
    file,
  };
}

export function selectUploadFiles(files) {
  return {
    type: SELECT_UPLOAD_FILES,
    files: files.map(file => ({
      id: uuid.v4(),
      isUploading: false,
      isUploadFalied: false,
      data: file,
    })),
  };
}

export function uploadFile(file, groupId) {
  return (dispatch, getState) => {
    let { selectedFolder } = getState().uploads;
    let { currentUser } = getState().login;
    var data = new FormData();
    data.append('file', file.data);
    dispatch(uploadFileRequest(file));
    const resType = helper.getAssetTypeByMime(file.data.type);
    dispatch(uploadFileRequest(file));
    let query = `${baseAPI}/uploadHandler/batchUpload?resType=${resType}&userId=${currentUser.userId}&folderId=${selectedFolder.id}`;
    if(groupId) {
      query = `${baseAPI}/uploadHandler/batchUpload?resType=${resType}&userId=${currentUser.userId}&folderId=${selectedFolder.id}&groupId=${groupId}`;
    }
    return fetch(query, {
      method: 'POST',
      credentials: 'include',
      body: data,
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('文件上传失败');
      })
    .then(result => {
      dispatch(uploadFileSuccess(result.data[0], file.id, parseInt(selectedFolder.id[0])));
    })
    .catch(() => dispatch(uploadFileFailure(file)));
  };
}

export function aLiYunAfterUploadFile(data, groupId) {
  console.log('--action------阿里云上传函数----- data : ', data);
  return (dispatch, getState) => {
    let { selectedFolder } = getState().uploads;
    let { currentUser } = getState().login;
    let resType = helper.getAssetTypeByMime(data.type);
    resType = 1;
    let query = `${baseAPI}/uploadOss/saveUpload?resType=${resType}&userId=${currentUser.userId}&folderId=${selectedFolder.id}`;
    if(groupId) {
      query = `${baseAPI}/uploadOss/saveUpload?resType=${resType}&userId=${currentUser.userId}&folderId=${selectedFolder.id}&groupId=${groupId}`;
    }
    return fetch(query, {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('文件上传失败');
      })
    .then(result => {
      return dispatch(uploadFileSuccess(result.data[0], data.id, parseInt(selectedFolder.id[0])));
    })
    .catch(() => dispatch(uploadFileFailure(data)));
  };
}

function deleteFileSuccess(id) {
  return {
    type: DELETE_FILE_SUCCESS,
    id,
  };
}

function deleteFileFailure(id) {
  return {
    type: DELETE_FILE_FAILURE,
    id,
  };
}

export function deleteFile() {
  return (dispatch, getState) => {
    let {
      selectedFiles,
      selectedFolder,
      assetType,
      displayMode,
      curSelectedAlbum,
    } = getState().uploads;
    let idsArray = selectedFiles.map(x => x.id);
    let params = {
      folderId: selectedFolder.id,
      ids: idsArray,
    };
    if(displayMode == 'album') {
      params = {
        folderId: selectedFolder.id,
        ids: idsArray,
        groupId: curSelectedAlbum.id,
      };
    }
    AssestApiFp.assetsBatchDelFolderIdDelete(params)(customFetch, baseAPI)
    .then(() => {
      if(displayMode == 'album') {
        dispatch(fetchFolder(selectedFolder.id, selectedFolder.pageNum, assetType, false, curSelectedAlbum.id));
      } else if(displayMode == 'folder') {
        dispatch(fetchFolder(selectedFolder.id, selectedFolder.pageNum, assetType, false));
      }
      dispatch(deleteFileSuccess());
    })
    .catch(err => dispatch(deleteFileFailure(err)));
  };
}


export function deleteUploadFile(id, deleteFiles) {
  return (dispatch, getState) => {
    let { selectedFiles, selectedFolder, assetType } = getState().uploads;
    selectedFiles = deleteFiles || selectedFiles;
    let idsArray = selectedFiles.map(x => x.id);
    return AssestApiFp.assetsBatchDelFolderIdDelete({folderId: selectedFolder.id, ids: idsArray})(customFetch, baseAPI)
    .then(() => {
      dispatch(fetchFolder(selectedFolder.id, selectedFolder.pageNum, assetType, true));
      dispatch(deleteFileSuccess(id));
    })
    .catch(err => dispatch(deleteFileFailure(err)));
  };
}

export function toggleFileSelection(fileId, event) {
  return {
    type: TOGGLE_FILE_SELECTION,
    fileId,
    ctrlKey: event.ctrlKey || event.metaKey,
  };
}

//双击或者编辑，如果是album，则打开album
export function openAlbum() {
  return dispatch => {
    dispatch({
      type: OPEN_ALBUM_OK,
    });
  };
}

//双击或者编辑，如果是图/视频，则弹框
export function toggleDetailModal() {
  return dispatch => {
    dispatch({
      type: TOGGLE_DETAIL_MODAL,
    });
  };
}

export function selectAllFiles() {
  return (dispatch, getState) => {
    let { selectedFolder } = getState().uploads;
    dispatch({
      type: SELECT_ALL_FILES,
      ids: selectedFolder.list,
    });
  };
}

export function reversFileSelection() {
  return (dispatch, getState) => {
    let { selectedFiles, selectedFolder } = getState().uploads;
    dispatch({
      type: REVERS_FILE_SELECTION,
      // ids: selectedFolder.list.filter(file => { //可读性好
      //   if(selectedFiles.find(fil => fil.id == file.id)) {
      //     return false;
      //   } else {
      //     return true;
      //   }
      // }),
      ids: selectedFolder.list.filter(file => !selectedFiles.find(fil => fil.id == file.id)), //更优雅的代码
    });
  };
}

function updateFileSuccess(files) {
  return {
    type: UPDATE_FILE_SUCCESS,
    files,
  };
}

function updateFileFailure(id) {
  return {
    type: UPDATE_FILE_FAILURE,
    id,
  };
}

export function updateFiles(values, single=false) {
  return (dispatch, getState) => {
    let selected = getState().uploads.selectedFiles;
    const toUpdateIds = single ? [selected[0].id] : selected.map(x => x.id);
    const updateAsset = values;
    let asset = updateAsset;
    AssestApiFp.assetsBatchUpdatePost({ids: toUpdateIds, asset})(customFetch, baseAPI)
    .then(files => dispatch(updateFileSuccess(files.data)))
    .catch(err => dispatch(updateFileFailure(err)));
  };
}

export function updateFiles_upload(values, selectedFiles) {
  return (dispatch, getState) => {
    selectedFiles = selectedFiles || getState().uploads.selectedFiles;
    const toUpdateIds = selectedFiles.map(x => x.id);
    const updateAsset = values;
    let asset = updateAsset;
    return AssestApiFp.assetsBatchUpdatePost({ids: toUpdateIds, asset})(customFetch, baseAPI)
    .then(files => dispatch(updateFileSuccess(files.data)))
    .catch(err => dispatch(updateFileFailure(err)));
  };
}

function inStockRequest() {
  return {
    type: INSTOCK_REQUEST,
  };
}

function inStockSuccess(fileIds) {
  return {
    type: INSTOCK_SUCCESS,
    fileIds,
  };
}

function inStockFailure(error) {
  return {
    type: INSTOCK_FAILURE,
    error,
  };
}

//提交，中图页是单张提交，这个时候可能会填写一些数据params,参数中的params，但这并不是必须的
export function inStockFiles(isSingle = false, params = false, groupId) {
  return (dispatch, getState) => {
    let { selectedFiles, selectedFolder, assetType, displayMode, curSelectedAlbum } = getState().uploads;
    let ids = isSingle ? [selectedFiles[0].id] : selectedFiles.map(x => x.id);
    console.log('ids ------------------------------------>>>>>>>>> ', ids);
    dispatch(inStockRequest());
    if(isSingle && params) {
      AssestApiFp.assetsBatchUpdatePost({ids: ids, asset: params})(customFetch, baseAPI)
      .then(files => {
        dispatch(updateFileSuccess(files.data));
        InApiFp.instocksPost({ids: ids, groupId: groupId, folderId: selectedFolder.id})(customFetch, baseAPI)
        .then(files => {
          if(displayMode == 'album') {
            dispatch(fetchFolder(selectedFolder.id, selectedFolder.pageNum, assetType, false, curSelectedAlbum.id));
          } else if(displayMode == 'folder') {
            dispatch(fetchFolder(selectedFolder.id, selectedFolder.pageNum, assetType, false));
          }
          dispatch(inStockSuccess(files.data));
        });
      })
    .catch(err => {
      dispatch(updateFileFailure(err));
      dispatch(inStockFailure(err));
    });
    }else {
      InApiFp.instocksPost({ids: ids, groupId: groupId, folderId: selectedFolder.id})(customFetch, baseAPI)
      .then(files => {
        if(displayMode == 'album') {
          dispatch(fetchFolder(selectedFolder.id, selectedFolder.pageNum, assetType, false, curSelectedAlbum.id));
        } else if(displayMode == 'folder') {
          dispatch(fetchFolder(selectedFolder.id, selectedFolder.pageNum, assetType, false));
        }
        dispatch(inStockSuccess(files.data));
      }).catch(err => {
        dispatch(inStockFailure(err));
      });
    }
  };
}

//VCG下载，获取下载列表  /download/pageList?pageNum=1&pageSize=10
export function getDownList() {
  return (dispatch, getState) => {
    let userId = getState().login.currentUser.userId;
    return fetch(`/api/download/pageList?pageNum=1&pageSize=200&userId=${userId}`, {
      method: 'GET',
      headers: {'Accept': 'application/json'},
      credentials: 'include',
    })
    .then(response => {
      if(response.status == 200) {
        response.json().then(data => {
          dispatch({
            type: GET_DOWN_LIST_OK,
            downlist: data,
          });
        });
      }
    })
    .catch(err => {
      throw new Error(err);
    });
  };
}

//本地资源库，某个目录下根据关键词搜索相应的资源图片视频
export function getResourceByKeywords(folderId, keywords, pageNum, pageSize=50, orderby) {
  return (dispatch, getState) => {
    dispatch({
      type: GET_DOWN_LIST_REQUEST,
    });
    let userId = getState().login.currentUser.userId;
    return fetch(`/api/damSearcher/searchSubfolders?keywords=${keywords}&folderId=${folderId}&userid=${userId}&pageNum=${pageNum}&pageSize=${pageSize}&orderby=${orderby}`, {
      method: 'GET',
      headers: {'Accept': 'application/json'},
      credentials: 'include',
    })
    .then(response => {
      if(response.status == 200) {
        response.json().then(data => {
          console.log('某个目录下根据关键词搜索相应的资源图片视频: ', data);
          dispatch({
            type: GET_SEARCHED_SRC_OK,
            data: data,
          });
          //搜索成功，也要讲企业资源库模式置于'folder'模式
          dispatch({
            type: 'OPEN_FOLDER_QYZYK_OK_SEARCH',
          });
        });
      }
    })
    .catch(err => {
      throw new Error(err);
    });
  };
}

export function changeKeyWords(keyWords) {
  return dispatch => {
    dispatch({
      type: CHANGE_KEY_WORDS,
      data: keyWords,
    });
  };
}

export function clearSearchKeyWords() {
  return dispatch => {
    dispatch({
      type: CLEAR_KEYWORLDS_OK,
      data: '',
    });
  };
}

//上传功能，获取阿里云需要的参数
export function getALiYunParams() {
  return dispatch => {
    return fetch('/api/uploadHandler/uploadPolicy', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    })
    .then(response => {
      if(response.status == 200) {
        response.json().then(data => {
          console.log('阿里云参数 : ', data);
          dispatch({
            type: GET_ALIYUN_PARAMS_OK,
            data: data,
          });
        });
      }
    })
    .catch(err => {
      throw new Error(err);
    });
  };
}

export function rememberBtnType(flag) {
  return dispatch => {
    dispatch({
      type: 'ORDER_OK',
      flag,
    });
  };
}

export function showFileModal(isNew) {
  return dispatch => {
    dispatch({
      type: SHOW_File_MODAL,
      isNew,
    });
  };
}

export function hideFileModal() {
  return dispatch => {
    dispatch({
      type: HIDE_FILE_MODAL,
    });
  };
}

export function changeAlbumInfo(key, value) {
  console.log('key = ' + key + '\nvalue = ' + value);
  let type;
  switch(key) {
  case 'title':
    type = MODIFY_ALBUM_TITLE;
    break;
  case 'caption':
    type = MODIFY_ALBUM_CAPTION;
    break;
  case 'keywords':
    type = MODIFY_ALBUM_KEYWORDS;
    break;
  }
  return dispatch => {
    dispatch({
      type,
      value,
    });
  };
}

export function clearAlbumInfo() {
  return dispatch => {
    dispatch({
      type: CLEAR_ALBUM_INFO,
    });
  };
}





export function submitNewAlbum(folderId, params) {
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
              type: CREATE_NEW_ALBUM_OK,
              album: newAlbum,
            });
            resolve(newAlbum);
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

export function updateAlbum(params) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      let { selectedFolder, assetType, curSelectedAlbum } = getState().uploads;
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
              type: UPDATE_ALBUM_OK,
              album: newAlbum,
            });
            resolve(newAlbum);
            dispatch(fetchFolder(selectedFolder.id, selectedFolder.pageNum, assetType, false));
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

//编辑文件夹的时候需要先调用这个函数，获取文件夹信息
export function getAlbumInfo() {
  return (dispatch, getState) => {
    //let groupId = getState().uploads.curSelectedAlbum.id;
    let groupId = getState().uploads.selectedFiles[0].id;
    fetch(`${baseAPI}/assets/${groupId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {'Accept': 'application/json'},
    }).then(response => {
      if(response.status == 200) {
        response.json().then(info => {
          dispatch({
            type: GOT_ALBUM_INFO,
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

export function changeAlbumFilterType(value) {
  console.log('action.......value == ', value);
  return dispatch => {
    dispatch({
      type: CHANGE_ALBUM_FILTER_OK,
      assetType: value,
    });
  };
}


export function getAlbumsInUpload(folderId) {
  return dispatch => {
    return new Promise(resolve => {
      fetch(`${baseAPI}/group/list?folderId=${folderId}&pageNum=1&pageSize=1000`, {
        method: 'GET',
        credentials: 'include',
        headers: {'Accept': 'application/json'},
      }).then(response => {
        if(response.status == 200) {
          response.json().then(albums => {
            console.log('微服务返回该目录下的alubms：', albums);
            dispatch({
              type: GET_ALBUMS_OK_UPLOAD,
              albums,
            });
            resolve(albums);
          });
        }
      }).catch(err => {
        console.log('upload err = ', err);
        throw new Error(err);
      });
    });
  };
}



export function toggleInstockConfirm(flag) {
  return dispatch => {
    let type = flag == 1 ? SHOW_INSTOCK_CONFIRM : HIDE_INSTOCK_CONFIRM;
    dispatch({
      type,
    });
  };
}


export function howToAlbum(strMethod) {
  return dispatch => {
    dispatch({
      type: ENTER_ALBUM_OK,
      strMethod,
    });
  };
}
