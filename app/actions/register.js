
import fetch from 'isomorphic-fetch';
export const REGIST_SUCCESS = 'REGIST_SUCCESS';
export const REGIST_FAILURE = 'REGIST_FAILURE';
export const REGIST_TIMEOUT = 'REGIST_TIMEOUT';
export const REGIST_REQUEST = 'REGIST_REQUEST';
export const SEND_CODE_SUCCESS= 'SEND_CODE_SUCCESS';
export const SEND_CODE_FAILED= 'SEND_CODE_FAILED';

export let STORE_DISPATH = null;

function signInRequest() {
  return {
    type: REGIST_REQUEST,
  };
}
function signInFailure(err) {
  return {
    type: REGIST_FAILURE,
    err,
  };
}
function signInTimeout(err) {
  return {
    type: REGIST_TIMEOUT,
    err,
  };
}

export function login(data) {
  return (dispatch, getState) => {

    let init = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(Object.assign({}, data, )),
    };

    //dispatch(signInRequest());
    //UserApiFp.loginPost({user: data})(customFetch, baseAPI)
    //.then((res)=>{
    //  dispatch({
    //    type: SIGNIN_SUCCESS,
    //    user: res,
    //  });
    //}).catch(err => {
    //  if (err.message == 'timeout')
    //    dispatch(signInTimeout(err));
    //  else
    //    dispatch(signInFailure(err));
    //});
    let timeoutFetch = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('timeout'));
      }, 30000);
      fetch('/ajax/login/submit', init)
         .then(resolve, reject);
    });

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

//export function getCaptcha(dispatch) {
//  UserApiFp.captchaGet()(customFetch, baseAPI)
//  .then((res) => {
//    dispatch({
//      type: UPDATE_CAPTCHA_SUCCESS,
//      captcha: res.data.captcha,
//    });
//  }).catch((res)=>{
//    console.log(res);
//  });
//}

//访问服务器，查询当前session用户的信息
//export function getMeAlive(dispatch, getState) {
//  if (getState().login.currentUser) return; //Skip
//  STORE_DISPATH = dispatch; //Make dispatch to gloabl
//  const apiUrl = baseAPI + '/me';
//  dispatch({
//    type: ME_ALIVE_REQUEST,
//  });
//  return customFetch(apiUrl, {})
//  .then((res)=>{
//    return res.json();
//  }).then((json) => {
//    dispatch({
//      type: ME_ALIVE_SUCCESS,
//      user: json,
//    });
//  });
//}
