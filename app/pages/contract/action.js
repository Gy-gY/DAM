import {API, baseAPI, customFetch} from '../../apis';
import {notification } from 'antd';
import { push } from 'react-router-redux';
const UserApiFp = API.nodeAPI.UserApiFp;
export const FETCH_CANTRACT_INFO_OK_C = 'FETCH_CANTRACT_INFO_OK_C';

export const DOWNLOAD_LOG_REQUEST_C = 'DOWNLOAD_LOG_REQUEST_C';
export const FILTER_USER_DOWNLOAD_C = 'FILTER_USER_DOWNLOAD_C';
export const DOWNLOAD_LOG_SUCCESS_C = 'DOWNLOAD_LOG_SUCCESS_C';
export const DOWNLOAD_LOG_FAILURE_C = 'DOWNLOAD_LOG_FAILURE_C';

export const PURCHASE_REQUEST_C = 'PURCHASE_REQUEST_C';
export const PURCHASE_SUCCESS_C = 'PURCHASE_SUCCESS_C';

export const RESET_USER_DOWNLOAD_C = 'RESET_USER_DOWNLOAD_C';
export const SHOW_PURCHASE_C = 'SHOW_PURCHASE_C';
export const HIDE_PURCHASE_C = 'HIDE_PURCHASE_C';

export const PURCHASE_FAILURE_C = 'PURCHASE_FAILURE_C';
export const DOWNLOAD_USERS_REQUEST_C = 'DOWNLOAD_USERS_REQUEST_C';
export const DOWNLOAD_USERS_SUCCESS_C = 'DOWNLOAD_USERS_SUCCESS_C';
export const DOWNLOAD_USERS_FAILURE_C = 'DOWNLOAD_USERS_FAILURE_C';
export const DOWNLOAD_DAMLOG_REQUEST_C = 'DOWNLOAD_DAMLOG_REQUEST_C';
export const FILTER_USER_DOWNLOAD_C_DAM_C = 'FILTER_USER_DOWNLOAD_C_DAM_C';
export const DOWNLOAD_DAMLOG_SUCCESS_C = 'DOWNLOAD_DAMLOG_SUCCESS_C';
export const DOWNLOAD_DAMLOG_FAILURE_C = 'DOWNLOAD_DAMLOG_FAILURE_C';
export const CONTRACT_SUCCESS_C = 'CONTRACT_SUCCESS_C';
export const GET_ALL_USER_LIST_OK_C = 'GET_ALL_USER_LIST_OK_C';
export const GET_DOWNCOUNT_OK_C = 'GET_DOWNCOUNT_OK_C';

const logout = function(dispatch) {
  UserApiFp.logoutPost()(customFetch, baseAPI)
  .then(() => {
    dispatch(push('/login'));
  });
};

export function fetchContractInfo() {
  return (dispatch, getState) => {
    let cumsomId = getState().login.currentUser.customerId;
    return fetch(`/api/contract?customerId=${cumsomId}`, {
      method: 'GET',
    })
    .then(response => {
      if(response.ok) {
        return response.json();
      } else if(response.status==401) {
        logout(dispatch);
        throw new Error('获取合同信息失败');
      }
    })
    .then(data => {
      console.log('合同模块action获得合同信息：', data);
      dispatch({
        type: FETCH_CANTRACT_INFO_OK_C,
        contractInfo: data,
      });
    }).catch(()=>{
      //logout(dispatch);
    });
  };
}


export function resetMyDownLoad() {
  return {
    type: RESET_USER_DOWNLOAD_C,
  };
}
export function showModal() {
  return {
    type: SHOW_PURCHASE_C,
  };
}
export function hideModal() {
  return {
    type: HIDE_PURCHASE_C,
  };
}



export function purChase(param) {
  return (dispatch, getState) => {
    dispatch({type:PURCHASE_REQUEST_C});
    let querys = `?type=${param.type}&purpose_code=${param.purpose_code}&photo_id=${param.photo_id}&sale_mode=${param.sale_mode}&license_type=${param.license_type}&product_size=${param.product_size}&price=${param.price}&down_id=${param.down_id}&id=${param.id}`;
    customFetch(`${baseAPI}/purChase${querys}`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
        .then(response => {
          if(response.status==200) {
            response.json().then(data=>{
              if(param.type!=1) {
                if(data.data&&data.data.url) {
                  var a = document.createElement('a');
                  a.href = data.data.url;
                  a.download = '';
                  a.click();
                }
              }
              if(data.status_code == 1) {
                dispatch({
                  type: PURCHASE_SUCCESS_C,
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
          } else if(response.status==401) {
            logout(dispatch);
          } else {
            dispatch({
              type: PURCHASE_FAILURE_C,
            });
            notification.error({message: '购买失败！'});
          }
        }).catch(err => {
          dispatch({
            type: PURCHASE_FAILURE_C,
          });
          throw new Error(err);
        });
  };
}

//合同信息里的下载记录，这里有用户的筛选，所以，user_id不能写死了,并不是一定是当前用户。
export function fetchDownLoadLog(data) {
  return(dispatch, getState) => {
    dispatch({
      type: DOWNLOAD_LOG_REQUEST_C,
    });
    let filter = getState().contractInfo.filterDownLoad;
    if(data) {
      dispatch({
        type: FILTER_USER_DOWNLOAD_C,
        data,
      });
      filter = Object.assign(filter, data);
    }
    console.log('filter ====== ', filter);
    let querys = `?user_id=${filter.user_id}&pageNum=${filter.pageNum}&pageSize=${filter.pageSize}&end_date=${filter.end_date}&start_date=${filter.start_date}&confirmStatus=${filter.confirmStatus}&licenseType=${filter.licenseType}&contract=1`;
    customFetch(`${baseAPI}/downloadLog${querys}`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        console.log('合同模块，downloadLog response == ', response);
        if(response.status==200) {
          response.json().then(data=>{
            console.log('合同模块中，downloadLog：', data);
            dispatch({
              type:DOWNLOAD_LOG_SUCCESS_C,
              data:data.data,
            });
          });
        }else if(response.status==401) {
          logout(dispatch);
        } else {
          dispatch({
            type: DOWNLOAD_LOG_FAILURE_C,
          });
          notification.error({message: '获取下载记录失败！'});
        }
      }).catch(err => {
        dispatch({
          type: DOWNLOAD_LOG_FAILURE_C,
        });
        throw new Error(err);
      });
  };
}




export function fetchDownLoadLogDam(data) {
  return (dispatch, getState) => {
    dispatch({
      type: DOWNLOAD_DAMLOG_REQUEST_C,
    });
    let filter = getState().myDownload.filterDownLoadDam;
    if(data) {
      dispatch({type:FILTER_USER_DOWNLOAD_C_DAM_C, data});
      filter = Object.assign(filter, data);
    }
    let userId = getState().login.currentUser.userId;
    let querys = `?userId=${userId}&pageNum=${filter.pageNum}&pageSize=${filter.pageSize}`;
    customFetch(`${baseAPI}/download/pageList${querys}`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if(response.status==200) {
          response.json().then(data=>{
            dispatch({type:DOWNLOAD_DAMLOG_SUCCESS_C, data:data});
          });
        }else if(response.status==401) {
          logout(dispatch);
        } else {
          dispatch({
            type: DOWNLOAD_DAMLOG_FAILURE_C,
          });
          notification.error({message: '获取Dam下载记录失败！'});
        }
      }).catch(err => {
        dispatch({type:DOWNLOAD_DAMLOG_FAILURE_C});
        throw new Error(err);
      });
  };
}





export function downloadVcgImgs(ids, rfVcgids, damIds) {
    //const imgIds = params.imgIds;
  return (dispatch, getState) => {
    dispatch({
      type: DOWNLOAD_USERS_REQUEST_C,
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
          if(response.status==200) {
            response.json().then((res1)=>{
              const {url} = res1;
              return url;
            }).then((url) => {
              var a = document.createElement('a');
              a.href = url;
              a.download = '';
              a.click();
              dispatch({
                type: DOWNLOAD_USERS_SUCCESS_C,
              });
            }).catch(() =>{
              dispatch({
                type: DOWNLOAD_USERS_FAILURE_C,
              });
            });
          }else {
            response.json().then((res1)=>{
              notification.error({message: res1.message});
              dispatch({
                type: DOWNLOAD_USERS_FAILURE_C,
              });
              logout(dispatch);
            });
          }
        }).catch(()=>{
          logout(dispatch);
        });
    }else {
      notification.error({message: '呵呵，您并没有VCG下载权限！'});
      dispatch({
        type: DOWNLOAD_USERS_FAILURE_C,
      });
    }
  };
}



export function fetchContractInfoMM() {
  return (dispatch, getState) => {
    let cumsomId = getState().login.currentUser.customerId;
    customFetch(`${baseAPI}/contract?customerId=${cumsomId}`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if(response.status==200) {
          response.json().then(data=>{
            console.log('合同信息：', data);
            dispatch({type:CONTRACT_SUCCESS_C, data:data});
          });
        }else if(response.status==401) {
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


//获取用户列表---所有
export function fetchAllUsrs() {
  return (dispatch) => {
    customFetch(`${baseAPI}/user/allUserList`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Accept': 'application/json'},
    })
      .then(response => {
        if(response.status==200) {
          response.json().then(data=>{
            dispatch({
              type: GET_ALL_USER_LIST_OK_C,
              allUser: data,
            });
          });
        }else if(response.status==401) {
          logout(dispatch);
        } else {
          notification.error({message: '获取用户列表失败！'});
        }
      }).catch(err => {
        notification.error({message: '获取用户列表失败！'});
        throw new Error(err);
      });
  };
}

//因为从vcg的接口中获取不到下载的数量，一直显示为0，所以，从微服务这里重新弄个接口
export function fetchDownCount() {
  return (dispatch, getState) => {
    let {customerId, userId} = getState().login.currentUser;
    fetch(`${baseAPI}/vcgDownload/down-count?uid=${userId}&cid=${customerId}`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Accept': 'application/json'},
    }).then(response => {
      if(response.status == 200) {
        response.json().then(data => {
          dispatch({
            type: GET_DOWNCOUNT_OK_C,
            data,
          });
        });
      }
    }).catch(err => {
      throw new Error(err);
    });
  };
}
