import update from 'immutability-helper';
import {API, baseAPI, customFetch} from '../../apis';
import {notification} from 'antd';
import { push } from 'react-router-redux';
const UserApiFp = API.nodeAPI.UserApiFp;
const { AssestApiFp } = API.resourceAPI;
export const SHOW_PURCHASE = 'SHOW_PURCHASE';
export const HIDE_PURCHASE = 'HIDE_PURCHASE';
export const RESET_USER_DOWNLOAD = 'RESET_USER_DOWNLOAD';
export const DOWNLOAD_LOG_REQUEST = 'DOWNLOAD_LOG_REQUEST';
export const DOWNLOAD_LOG_SUCCESS = 'DOWNLOAD_LOG_SUCCESS';
export const DOWNLOAD_LOG_FAILURE = 'DOWNLOAD_LOG_FAILURE';
export const FILTER_USER_DOWNLOAD = 'FILTER_USER_DOWNLOAD';
export const DOWNLOAD_MY_REQUEST = 'DOWNLOAD_MY_REQUEST';
export const DOWNLOAD_MY_SUCCESS = 'DOWNLOAD_MY_SUCCESS';
export const DOWNLOAD_MY_FAILURE = 'DOWNLOAD_MY_FAILURE';

export const PURCHASE_REQUEST = 'PURCHASE_REQUEST';
export const PURCHASE_SUCCESS = 'PURCHASE_SUCCESS';
export const PURCHASE_FAILURE = 'PURCHASE_FAILURE';

export const DOWNLOAD_DAMLOG_REQUEST = 'DOWNLOAD_DAMLOG_REQUEST';
export const DOWNLOAD_DAMLOG_SUCCESS = 'DOWNLOAD_DAMLOG_SUCCESS';
export const DOWNLOAD_DAMLOG_FAILURE = 'DOWNLOAD_DAMLOG_FAILURE';
export const FILTER_USER_DOWNLOAD_DAM = 'FILTER_USER_DOWNLOAD_DAM';

export const CONTRACT_SUCCESS = 'CONTRACT_SUCCESS';

const logout = function(dispatch) {
  UserApiFp.logoutPost()(customFetch, baseAPI)
  .then(() => {
    dispatch(push('/login'));
  });
};
export function resetMyDownLoad() {
  return {
    type: RESET_USER_DOWNLOAD,
  };
}
export function showModal() {
  return {
    type: SHOW_PURCHASE,
  };
}
export function hideModal() {
  return {
    type: HIDE_PURCHASE,
  };
}
export function downloadDamImgs(ids) {
  //const imgIds = params.imgIds;
  return (dispatch, getState) => {
    let userId = getState().login.currentUser.userId;
    dispatch({
      type: DOWNLOAD_MY_REQUEST,
    });
    downloadUrl(ids, userId)
    .then((res1)=>{
      const {url} = res1;
      return url;
    }).then((url) => {
      var a = document.createElement('a');
      a.href = url;
      a.download = '';
      a.click();
      dispatch({
        type: DOWNLOAD_MY_SUCCESS,
      });

    }).catch(() =>{
      dispatch({
        type: DOWNLOAD_MY_FAILURE,
      });
      //logout(dispatch);
    });
  };
}

function downloadUrl(ids, userId) {
  if (ids.length == 0) return new Error('Select no resource to download');
  return AssestApiFp.assetsDownloadPost({ids: [ids], userId: userId})(customFetch, baseAPI);
}

export function purChase(param) {
  return dispatch => {
    dispatch({
      type: PURCHASE_REQUEST,
    });
    let querys = `?type=${param.type}&purpose_code=${param.purpose_code}&photo_id=${param.photo_id}&sale_mode=${param.sale_mode}&license_type=${param.license_type}&product_size=${param.product_size}&price=${param.price}&down_id=${param.down_id}&id=${param.id}`;
    customFetch(`${baseAPI}/purChase${querys}`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
        .then(response => {
          if(response.status == 200) {
            response.json().then(data=>{
              if(param.type!=1) {
                if(data.data&&data.data.url) {
                  var a = document.createElement('a');
                  a.href = data.data.url;
                  a.download = '';
                  a.click();
                }
              }
              console.log('我的下载模块 data....purChase... ', data);
              if(data.status_code == 1) {
                dispatch({
                  type: PURCHASE_SUCCESS,
                  data: {
                    photoid: param.photo_id,
                    purchaseTime: param.purchaseTime,
                    price: param.price,
                    purpose_name: param.purpose_name,
                    purchased: true,
                  },
                });
              } else if(data.status_code == 0) {
                notification.error({message: '购买失败！'});
              }
            });
          } else if(response.status == 401) {
            logout(dispatch);
          } else {
            dispatch({
              type: PURCHASE_FAILURE,
            });
            notification.error({message: '购买失败！'});
          }
        }).catch(err => {
          notification.error({message: '购买失败！'});
          dispatch({
            type: PURCHASE_FAILURE,
          });
          throw new Error(err);
        });
  };
}

export function fetchContractInfo(customerId) {
  return dispatch => {
    customFetch(`${baseAPI}/contract?customerId=${customerId}`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        console.log('我的下载模块，action response：----->', response);
        if(response.status == 200) {
          response.json().then(data=>{
            console.log('我的下载模块，action 得到的合同信息：', data);
            dispatch({
              type: CONTRACT_SUCCESS,
              data:data,
            });
          });
        } else if(response.status == 401) {
          logout(dispatch);
        } else {
          notification.error({message: '获取合同信息失败！'});
        }
      }).catch(err => {
        notification.error({message: '获取合同信息失败！'});
        throw new Error(err);
      });
  };
}
export function fetchDownLoadLogDam(data) {
  return (dispatch, getState) => {
    dispatch({type:DOWNLOAD_DAMLOG_REQUEST});
    let filter = getState().myDownload.filterDownLoadDam;
    if(data) {
      dispatch({type:FILTER_USER_DOWNLOAD_DAM, data});
      filter = Object.assign(filter, data);
    }
    let userId = getState().login.currentUser.userId;
    let querys = `?userId=${userId}&pageNum=${filter.pageNum}&pageSize=${filter.pageSize}`;
    console.log('企业资源库下载记录:querys === ', querys);
    customFetch(`${baseAPI}/download/pageList${querys}`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if(response.status == 200) {
          response.json().then(data=>{
            console.log('企业资源库dowloadLogDam:::', data);
            dispatch({
              type: DOWNLOAD_DAMLOG_SUCCESS,
              data: data,
            });
          });
        } else if(response.status == 401) {
          logout(dispatch);
        } else {
          dispatch({
            type: DOWNLOAD_DAMLOG_FAILURE,
          });
          notification.error({message: '获取Dam下载记录失败！'});
        }
      }).catch(err => {
        dispatch({type:DOWNLOAD_DAMLOG_FAILURE});
        notification.error({message: '获取Dam下载记录失败！'});
        throw new Error(err);
      });
  };
}

export function fetchDownLoadLog(data) {
  return (dispatch, getState) => {
    dispatch({type:DOWNLOAD_LOG_REQUEST});
    let filter = getState().myDownload.filterDownLoad;
    if(data) {
      if(!data.pageNum) {
        data.pageNum=1;
      }
      dispatch({type:FILTER_USER_DOWNLOAD, data});
      filter = Object.assign(filter, data);
    }
    let userId = getState().login.currentUser.userId;
    let querys = `?user_id=${userId}&pageNum=${filter.pageNum}&pageSize=${filter.pageSize}&end_date=${filter.end_date}&start_date=${filter.start_date}&confirmStatus=${filter.confirmStatus}&licenseType=${filter.licenseType}&contract=0`;
    customFetch(`${baseAPI}/downloadLog${querys}`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        console.log('我的下载模块，downloadLog response == ', response);
        if(response.status == 200) {
          response.json().then(data=>{
            console.log('我的下载模块fetchDownLoadLog***data: ', data);
            dispatch({
              type: DOWNLOAD_LOG_SUCCESS,
              data: data.data,
            });
          });
        } else if(response.status == 401) {
          logout(dispatch);
        } else {
          dispatch({
            type: DOWNLOAD_LOG_FAILURE,
          });
          notification.error({message: '获取下载记录失败！'});
        }
      }).catch(err => {
        dispatch({
          type: DOWNLOAD_LOG_FAILURE,
        });
        notification.error({message: '获取下载记录失败！'});
        throw new Error(err);
      });
  };
}

export function downloadVcgImgs(ids, rfVcgids, damIds) {
  return (dispatch, getState) => {
    dispatch({
      type: DOWNLOAD_MY_REQUEST,
    });
    let currentUser = getState().login.currentUser;
    let queyFr = rfVcgids?`&rfVcgids=${rfVcgids}`:'';
    let queryDamids = damIds&&damIds.length>0?`&damIds=${damIds}`:'';
    if(currentUser.permissions.includes('vcg_download')) {
      let querys = `?vcgids=${ids}&userId=${currentUser.userId}`;//downloadVCG
      customFetch(`${baseAPI}/downloadVCG${querys}${queyFr}${queryDamids}`, {
        credentials: 'include',
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
        .then(response => {
          if(response.status == 200) {
            response.json().then((res1)=>{
              const {url} = res1;
              return url;
            }).then((url) => {
              var a = document.createElement('a');
              a.href = url;
              a.download = '';
              a.click();
              dispatch({
                type: DOWNLOAD_MY_SUCCESS,
              });
            }).catch(() =>{
              dispatch({
                type: DOWNLOAD_MY_FAILURE,
              });
            });
          } else if(response.status == 401) {
            logout(dispatch);
          } else {
            response.json().then((res1)=>{
              notification.error({message: res1.message});
              dispatch({
                type: DOWNLOAD_MY_FAILURE,
              });
            });
          }
        }).catch(()=>{
          dispatch({
            type: DOWNLOAD_MY_FAILURE,
          });
          notification.error({message: '下载失败！'});
        });
    }else {
      notification.error({message: '呵呵，您并没有VCG下载权限！'});
      dispatch({
        type: DOWNLOAD_MY_FAILURE,
      });
    }
  };
}
