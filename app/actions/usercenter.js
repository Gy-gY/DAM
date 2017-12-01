import { API, baseAPI, customFetch } from '../apis';
const {
  DownloadcontrollerApiFp,
  FavoritecontrollerApiFp,
  AssestApiFp } = API.resourceAPI;

import { notification } from 'antd';
const PREFIX = 'USER_ASSETS/'; //当前action的命名空间
export const TOGGLE_IMG_SELECTION = PREFIX + 'TOGGLE_IMG_SELECTION';
export const SELECT_ALL_FILES = PREFIX + 'SELECT_ALL_FILES';
export const REVERS_FILE_SELECTION = PREFIX + 'REVERS_FILE_SELECTION';
export const TOGGLE_FILE_SELECTION = PREFIX + 'TOGGLE_FILE_SELECTION';
export const TOGGLE_IMG_RESET = PREFIX + 'TOGGLE_IMG_RESET';

export const DOWNLOAD_FILE_REQUEST = 'DOWNLOAD_FILE_REQUEST';
export const DOWNLOAD_FILE_SUCCESS = 'DOWNLOAD_FILE_SUCCESS';
export const DOWNLOAD_FILE_FAILURE = 'DOWNLOAD_FILE_FAILURE';
export const CLOSE_MODAL_AFTER_SEARCH = 'CLOSE_MODAL_AFTER_SEARCH';

// 查询用户已经下载的图片，返回图片对象
export function changeFilterType(dispatch, params) {
  dispatch({
    type: 'USERCENTER_FILTER_TYPE_CHANGED',
    filterType: params.filterType,
    pageNum: params.pageNum,
  });
}

export function toggleDetailModal(dispatch, params) {
  dispatch({
    type: 'USER_CENTER_TOGGLE_DETAIL_MODAL',
    files: params.files,
  });
}

export function toggleDetailListModal(params) {
  return (dispatch) => {
    dispatch({
      type: 'ONLINE_IMGS_TOGGLE_DETAIL_MODAL',
      files: params.files,
      file: params.file,
    });
  };
}

export function getFavoriteImgs(dispatch, params) {
  FavoritecontrollerApiFp.favoritePageListGet(params)(customFetch, baseAPI)
  .then((res) => {
    dispatch({
      type: 'QUERY_FAVORITE_IMGS_SUCCESS',
      pagedImages: res,
    });
  }).catch(()=>{
    dispatch({
      type: 'QUERY_FAVORITE_IMGS_FAILUE',
      pagedImages:[],
    });
  });
}


// 查询用户已经下载的图片，返回图片对象
export function getDownloadImgs(dispatch, params) {
  DownloadcontrollerApiFp.downloadPageListGet(params)(customFetch, baseAPI)
  .then((res)=>{
    dispatch({
      type: 'QUERY_DOWNLOAD_IMGS_SUCCESS',
      pagedImages: res,
      filterType: 'download',
    });
  }).catch(()=>{
    dispatch({
      type: 'QUERY_DOWNLOAD_IMGS_FAILUE',
      pagedImages:[],
      filterType: 'download',
    });
  });
}

// 收藏文件夹
export function favoriteImgs(dispatch, params) {
  const imgIds = params.imgIds;
  dispatch({
    type: 'FAVORITE_REQUEST',
  });
  FavoritecontrollerApiFp.favoriteCreatePost({userId: params.userId || 'fake', assetIds: imgIds})(customFetch, baseAPI)
  .then(() => {
    getFavoriteImgs(dispatch, {userId: params.userId || 'fake', pageSize: 2000}); //dirty way
    dispatch({
      type: TOGGLE_IMG_RESET,
      payload: {assetIds: imgIds},
    });
    dispatch({
      type: 'TOGGLE_IMG_RESET',
    });
    notification.info({message: '收藏成功'});
  }).catch((e)=> {
    dispatch({
      type: 'FAVORITE_FAILUE',
    });
    notification.error({message: '收藏失败' + e});
  });
}
export function unfavoriteImgs(dispatch, params) {
  const imgIds = params.imgIds;
  dispatch({
    type: 'UNFAVORITE_REQUEST',
  });
  FavoritecontrollerApiFp.favoriteDeleteDelete({userId: params.userId, assetIds: imgIds})(customFetch, baseAPI)
  .then(() => {
    getFavoriteImgs(dispatch, {userId: params.userId, pageSize: 2000}); //dirty way
    dispatch({
      type: 'UNFAVORITE_SUCCESS',
      payload: {assetIds: imgIds},
    });
    dispatch({
      type: TOGGLE_IMG_RESET,
    });
    notification.info({message: '取消收藏成功'});
  }).catch(()=> {
    dispatch({
      type: 'FAVORITE_FAILUE',
    });
    notification.error({message: '收藏失败'});
  });
}

// 下载所选图片
// params:
export function downloadImgs(dispatch, params ) {
  //const imgIds = params.imgIds;
  dispatch({
    type: DOWNLOAD_FILE_REQUEST,
  });
  downloadUrl(params)
  .then((res1)=>{
    const {url} = res1;
    //return fetch(url, {}).then(res => res.blob());
    return url;
  }).then((url) => {
    var a = document.createElement('a');
    //a.href = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = '';
    a.click();
    dispatch({
      type: DOWNLOAD_FILE_SUCCESS,
    });
    dispatch({
      type: 'TOGGLE_IMG_RESET',
    });
  }).catch((err) =>{
    if(err.status==403) {
      notification.error({message: '下载失败！所选图片包含不具备下载权限的图片。'});
    }
    dispatch({
      type: DOWNLOAD_FILE_FAILURE,
    });
  });
}

function downloadUrl(params) {
  let {ids, userId, isCheck} = params;
  if (ids.length == 0) return new Error('Select no resource to download');
  return AssestApiFp.assetsDownloadPost({ids: ids, userId: userId, isCheck})(customFetch, baseAPI);
}

// export function toggleFileSelection(imgId) {
//   return {
//     type: TOGGLE_IMG_SELECTION,
//     imgId,
//   };
// }
export function queryMyDownloadList(userId, pagination) {
  return (dispatch) => {
    return fetch(`${baseAPI}/download/pageList?pageNum=${pagination.pageNum}&pageSize=${pagination.pageSize}&user_id=${userId}`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('获取权限失败！');
      }).then(data => dispatch(queryDownloadListSuccess(data, pagination)));
  };
}

function queryDownloadListSuccess(data, pagination) {
  pagination.total = data.total;
  return {
    type:'QUERY_DOWNLOADLIST_SUCCESS',
    downloadList:data.list,
    pagination:pagination,
  };
}

export function selectAllFiles(allIds) {
  return (dispatch) => {
    dispatch({
      type: SELECT_ALL_FILES,
      ids: allIds.ids,
    });
  };
}

export function reversFileSelection(allIds) {
  return (dispatch, getState) => {
    let { selectedFiles } = getState().usercenter;
    dispatch({
      type: REVERS_FILE_SELECTION,
      ids: allIds.filter(file => {
        if(selectedFiles.find((fil) => (fil.id==file.id))) {
          return false;
        }else {
          return true;
        }
      }),
    });
  };
}

export function toggleFileSelection(fileId, event) {
  return {
    type: TOGGLE_FILE_SELECTION,
    fileId,
    ctrlKey: event.ctrlKey||event.metaKey,
  };
}

export function queryMyCollectionsList(userId, pagination) {
  return (dispatch) => {
    fetch(`${baseAPI}/favorite/pageList?pageNum=${pagination.pageNum}&pageSize=${pagination.pageSize}&user_id=${userId}`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('获取数据失败！');
      }).then(data => dispatch(queryCollectionsListSuccess(data, pagination)));
  };
}

function queryCollectionsListSuccess(data, pagination) {
  pagination.total = data.total;
  return {
    type:'QUERY_COLLECTIONSLIST_SUCCESS',
    collectionsList:data.list,
    pagination:pagination,
  };
}

export function delCollection(params) {
  return (dispatch) => {
    return fetch(`${baseAPI}/favorite/delete?user_id=${params.userId}&asset_ids=${params.ids.join(',')}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('获取数据失败！');
      }).then(data => dispatch(delCollectionSuccess(data)));
  };

  function delCollectionSuccess() {
    return {
      type:'',
    };
  }
}


export function delDownload(params) {
  return (dispatch) => {
    return fetch(`${baseAPI}/download/batch`, {
      credentials: 'include',
      body:JSON.stringify(params.ids),
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('获取数据失败！');
      }).then(data => dispatch(delDownloadSuccess(data)));
  };

  function delDownloadSuccess() {
    return {
      type:'',
    };
  }
}



//点击关键词搜索本地资源库，然后关掉弹框
export function closeModalAfterSearch() {
  return dispatch => {
    dispatch({
      type: CLOSE_MODAL_AFTER_SEARCH,
      bool: false,
    });
  };
}
