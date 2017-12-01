import { API, baseAPI, customFetch } from '../apis';
import { push } from 'react-router-redux';
import { notification } from 'antd';
const UserApiFp = API.nodeAPI.UserApiFp;
const messageAPI = API.passportAPI.MessagecontrollerApiFp;
const userAPI = API.passportAPI.UsercontrollerApiFp;
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
export const SIGNIN_TIMEOUT = 'SIGNIN_TIMEOUT';
export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const UPDATE_CAPTCHA_SUCCESS = 'UPDATE_CAPTCHA_SUCCESS';
export const ME_ALIVE_SUCCESS = 'ME_ALIVE_SUCCESS';
export const ME_ALIVE_REQUEST = 'ME_ALIVE_REQUEST';
export let STORE_DISPATH = null;

export const SEND_CODE = 'SEND_CODE';
export const SEND_CODE_OK = 'SEND_CODE_OK';
export const CHANGE_PWD_INFO = 'CHANGE_PWD_INFO';
export const SHOW_TRUE = 'SHOW_TRUE';
export const GOT_LOGO_OK = 'GOT_LOGO_OK';

function signInRequest() {
  return {
    type: SIGNIN_REQUEST,
  };
}
function signInFailure(err) {
  return {
    type: SIGNIN_FAILURE,
    err,
  };
}
function signInTimeout(err) {
  return {
    type: SIGNIN_TIMEOUT,
    err,
  };
}
export function modifyPassword(data) {
  return (dispatch) =>{
    userAPI.userFindPwdPost({user: data})(customFetch, baseAPI)
    .then(()=>{
      dispatch(push('login'));
    }).catch(err => {
      err.json().then((body) => {
        notification.error({message: '重置密码失败', description: body.message});
      });
    });
  };
}
export function sendCode(data) {
  return (dispatch) => {
    dispatch({type:SEND_CODE, data:{message:'60秒后重新发送', canClick:false}});
    let from = 60;
    let interval = setInterval(() => {
      from-=1;
      let msg = from+'秒后重新发送';
      if(from==0) {
        dispatch({
          type: SEND_CODE,
          data:{message:'获取验证码', canClick:true},
        });
        clearInterval(interval);
      }else {
        dispatch({
          type: SEND_CODE,
          data:{message:msg, canClick:false},
        });
      }
    }, 1000);
    messageAPI.messageSendsmsGet({mobile: data})(customFetch, baseAPI );
  };
}

export function login(data) {
  return (dispatch) =>{
    dispatch(signInRequest());
    UserApiFp.loginPost({user: data})(customFetch, baseAPI)
    .then((res)=>{
      dispatch({
        type: SIGNIN_SUCCESS,
        user: res,
      });
      dispatch(push('/'));
    }).catch(err => {
      getCaptcha(dispatch); // If we login failed, we should get a new getCaptcha;
      //alert(JSON.stringify(err.json()));
      //err.json().then((body) => {
      notification.error({message: '登陆失败', description: '您无权限登录！'});
      //});

      if (err.message == 'timeout')
        dispatch(signInTimeout(err));
      else
        dispatch(signInFailure(err));
    });
    // let timeoutFetch = new Promise((resolve, reject) => {

    //   setTimeout(() => {
    //     reject(new Error('timeout'));
    //   }, 30000);

    //   fetch('/ajax/login/submit', init)
    //     .then(resolve, reject);
    // });

    // timeoutFetch
    //   .then(response => response.json())
    //   .then(json => {
    //     if (json.status == 1) {
    //       return json.data;
    //     } else if (json.status == 2) {
    //       throw Object.assign({}, json.data, {status: 2});
    //     } else {
    //       throw json.data;
    //     }
    //   })
    //   .then(user => {

    //     dispatch(signInSuccess(user));

    //     let redirectUrl = '/';
    //     /**let options = {
    //       path: '/',
    //       expires: new Date(Date.now() + 40000000)
    //     };

    //     cookie.save('uid', user.uid , options);
    //     cookie.save('name', user.name, options);
    //     cookie.save('api_token', user.token, options);
    //     cookie.save('username', user.username || data.username, options);
    //     **/
    //     window.location = redirectUrl;
    //   })
    //   .catch(err => {
    //     if (err.message == 'timeout')
    //       dispatch(signInTimeout(err));
    //     else
    //       dispatch(signInFailure(err));
    //   });
  };
}

export function getCaptcha(dispatch) {
  UserApiFp.captchaGet()(customFetch, baseAPI)
  .then((res) => {
    dispatch({
      type: UPDATE_CAPTCHA_SUCCESS,
      captcha: res.data.captcha,
    });
  }).catch((res)=>{
    console.log(res);
  });
}

//访问服务器，查询当前session用户的信息
export function getMeAlive() {

  return (dispatch, getState) => {
    if (getState().login.currentUser.done) return; //Skip
    STORE_DISPATH = dispatch; //Make dispatch to gloabl
    const apiUrl = baseAPI + '/me';
    dispatch({
      type: ME_ALIVE_REQUEST,
    });
    return customFetch(apiUrl, {})
    .then((res)=>{
      return res.json();
    }).then((json) => {
      dispatch({
        type: ME_ALIVE_SUCCESS,
        user: json,
      });
    }).catch(()=>{
      dispatch(push('login'));
    });
  };
}

export function logout() {
  return (dispatch) => {
    UserApiFp.logoutPost()(customFetch, baseAPI)
    .then(() => {
      dispatch(push('/login'));
      dispatch({type: 'RESET'});
    }).catch(() => {
      // Clear Data whether or not logout success.
      dispatch(push('/login'));
      dispatch({type: 'RESET'});
    });
  };
}




export function changePassword(oldPwd, newPwd) {
  return (dispatch, getState) => {
    let loginUserId = getState().login.currentUser.userId;
    return fetch(`/api/user/modifyPwd?userId=${loginUserId}&oldPwd=${oldPwd}&pwd=${newPwd}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include',
    })
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('修改密码失败！');
      }
    })
    .then(data => {
      console.log('data==================pwd=====', data);
      if(data.status) {
        notification.success({
          message: '修改密码成功',
        });
      } else {
        notification.error({
          message: data.message,
        });
      }
      dispatch({
        type: CHANGE_PWD_INFO,
        pwdInfo: data,
      });
    });
  };
}
export function controlShow(flag) {
  return dispatch => {
    let data = {
      status: flag,
      //message: '',
    };
    dispatch({
      type: SHOW_TRUE,
      showInfo: data,
    });
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
            console.log('mm   hetong data ==== ', data);
            //dispatch({type:CONTRACT_SUCCESS, data:data});
          });
        }else {
          logout(dispatch);
        }
      }).catch(err => {
        logout(dispatch);
        throw new Error(err);
      });
  };
}




export function getLogo() {
  return dispatch => {
    return fetch('/api/customer/view', {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
      if(response.status == 200) {
        response.json().then(data => {
          console.log('1031-租户相关信息： ', data);
          dispatch({
            type: GOT_LOGO_OK,
            logourl: data,
          });
        });
      }
    })
    .catch(err => {
      throw new Error(err);
    });
  };
}
