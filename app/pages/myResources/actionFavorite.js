import update from 'immutability-helper';
import {API, baseAPI, customFetch} from '../../apis';
import {notification} from 'antd';
import { push } from 'react-router-redux';
const UserApiFp = API.nodeAPI.UserApiFp;
const {AssestApiFp, FavoritecontrollerApiFp} = API.resourceAPI;

export const DELETE_USER_FAVARITE_REQUEST = 'DELETE_USER_FAVARITE_REQUEST';
export const DELETE_USER_FAVARITE_SUCCESS = 'DELETE_USER_FAVARITE_SUCCESS';
export const DELETE_USER_FAVARITE_FAILED = 'DELETE_USER_FAVARITE_FAILED';
export const RESET_USER_FAVORITE = 'RESET_USER_FAVORITE';
export const FAVARITE_USER_REQUEST = 'FAVARITE_USER_REQUEST';
export const FAVARITE_USER_SUCCESS = 'FAVARITE_USER_SUCCESS';
export const FAVARITE_USER_FAILURE = 'FAVARITE_USER_FAILURE';
export const FILTER_USER_FAVARITE = 'FILTER_USER_FAVARITE';
export const SELECT_USER_FAVARITE = 'SELECT_USER_FAVARITE';
export const DOWNLOAD_USER_REQUEST = 'DOWNLOAD_USER_REQUEST';
export const DOWNLOAD_USER_SUCCESS = 'DOWNLOAD_USER_SUCCESS';
export const DOWNLOAD_USER_FAILURE = 'DOWNLOAD_USER_FAILURE';

const logout = function(dispatch) {
  UserApiFp.logoutPost()(customFetch, baseAPI)
  .then(() => {
    dispatch(push('/login'));
  });
};
export function resetUserFavorite() {
  return {
    type: RESET_USER_FAVORITE,
  };
}

export function selectFavarite(imgObj, event) {
  return {
    type: SELECT_USER_FAVARITE,
    imgObj,
    ctrlKey: event.ctrlKey||event.metaKey,
  };
}
export function deleteFavarite(ids) {
  return (dispatch, getState) => {
    let uid = getState().login.currentUser.userId;
    dispatch({type:DELETE_USER_FAVARITE_REQUEST});
    customFetch(`${baseAPI}/favorite/deleteVcg?user_id=${uid}&vcg_ids=${ids}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if(response.status==200) {
          dispatch({type:DELETE_USER_FAVARITE_SUCCESS, data:ids});
          notification.success({message: '取消收藏成功！'});
        }else {
          dispatch({type:DELETE_USER_FAVARITE_FAILED});
          notification.error({message: '取消收藏失败！'});
        }
      }).catch(err => {
        dispatch({type:DELETE_USER_FAVARITE_FAILED});
        notification.error({message: '取消收藏失败！', description:err});
        throw new Error(err);
      });
  };
}


export function unfavoriteImgsDam(imgIds) {
  return (dispatch, getState) => {
    dispatch({type:DELETE_USER_FAVARITE_REQUEST});
    let uid = getState().login.currentUser.userId;
    FavoritecontrollerApiFp.favoriteDeleteDelete({userId: uid, assetIds: imgIds})(customFetch, baseAPI)
    .then((data) => {
      dispatch({type:DELETE_USER_FAVARITE_SUCCESS, data:imgIds});
      notification.success({message: '取消收藏成功！'});
    }).catch((err)=> {
      dispatch({type:DELETE_USER_FAVARITE_FAILED});
      notification.error({message: '取消收藏失败！', description:err});
      throw new Error(err);
    });
  };
}

export function fetchFavarite(data) {
  return (dispatch, getState) => {
    dispatch({type:FAVARITE_USER_REQUEST});
    let filter = getState().myFavorite.filterFavarite;
    if(data) {
      dispatch({type:FILTER_USER_FAVARITE, data});
      filter = Object.assign(filter, data);
    }
    let userId = getState().login.currentUser.userId;
    let querys = `?user_id=${userId}&asset_type=1&pageNum=${filter.pageNum}&pageSize=${filter.pageSize}`;
    console.log('querys ==============actionFavorite.js======== ', querys);
    customFetch(`${baseAPI}/favorite/pageList${querys}`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if(response.status==200) {
          response.json().then(data=>{
            console.log('data ==============actionFavorite.js======== ', data);
            dispatch({type:FAVARITE_USER_SUCCESS, data:data});
          });
        }
        //alert(data.json().keyWord);
      }).catch(err => {
        dispatch({type:FAVARITE_USER_FAILURE});
        logout(dispatch);
        throw new Error(err);
      });
  };
}
export function downloadVcgImgs(ids) {
    //const imgIds = params.imgIds;
  return (dispatch, getState) => {
    dispatch({
      type: DOWNLOAD_USER_REQUEST,
    });
    let currentUser = getState().login.currentUser;
    if(currentUser.permissions.includes('vcg_download')) {
      let querys = `?vcgids=${ids}&userId=${currentUser.userId}`;//downloadVCG
      customFetch(`${baseAPI}/downloadVCG${querys}`, {
        credentials: 'include',
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
        .then(response => {
          if(response.status==200) {
            response.json().then((res1)=>{
              const {url} = res1;
              return url;
              //return fetch(url, {}).then(res => res.blob());
            }).then((url) => {
              var a = document.createElement('a');
              a.href = url;
              a.download = '';
              a.click();
              dispatch({
                type: DOWNLOAD_USER_SUCCESS,
              });
            }).catch(() =>{
              dispatch({
                type: DOWNLOAD_USER_FAILURE,
              });
            });
          }else {
            response.json().then((res1)=>{
              notification.error({message: res1.message});
              dispatch({
                type: DOWNLOAD_USER_FAILURE,
              });
            });
          }
        });
    }else {
      notification.error({message: '呵呵，您并没有VCG下载权限！'});
      dispatch({
        type: DOWNLOAD_USER_FAILURE,
      });
    }
  };
}

export function downloadDamImgs(ids) {
  //const imgIds = params.imgIds;
  return (dispatch, getState) => {

    let userId = getState().login.currentUser.userId;
    dispatch({
      type: DOWNLOAD_USER_REQUEST,
    });
    let queryCheck = `?uid=${userId}&assetsId=${ids}`;
    customFetch(`${baseAPI}/favorite/download-check${queryCheck}`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        response.json().then(check=>{
          if(check) {
            downloadUrl(ids, userId)
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
                type: DOWNLOAD_USER_SUCCESS,
              });
            }).catch(() =>{
              dispatch({
                type: DOWNLOAD_USER_FAILURE,
              });
              logout(dispatch);
            });
          }else {
            notification.error({message: '图片所在的文件夹没有下载权限！'});
            dispatch({
              type: DOWNLOAD_USER_FAILURE,
            });
          }
        });
      });
  };
}

function downloadUrl(ids, userId) {
  if (ids.length == 0) return new Error('Select no resource to download');
  return AssestApiFp.assetsDownloadPost({ids: [ids], userId: userId})(customFetch, baseAPI);
}
