import { combineReducers } from 'redux';
import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_TIMEOUT,
  UPDATE_CAPTCHA_SUCCESS,
  ME_ALIVE_SUCCESS,
  ME_ALIVE_REQUEST,
  SEND_CODE,
  CHANGE_PWD_INFO,
  SHOW_TRUE,
  GOT_LOGO_OK,
} from '../actions';

import {
  PURCHASE_SUCCESS,
} from '../pages/myResources/actionDownLoad';




import update from 'immutability-helper';

function loading(state = false, action) {
  if (action.type == SIGNIN_REQUEST ||
    action.type == ME_ALIVE_REQUEST)
    return true;
  else
    return false;
}

function error(state = '', action) {
  if (action.type == SIGNIN_REQUEST)
    return '';
  else if (action.type == SIGNIN_FAILURE) {
    if (action.err.status == 2)
      return '图形验证码错误，请再试一次';
    else
      return '用户名或密码错误，请再试一次';
  }
  else if (action.type == SIGNIN_TIMEOUT)
    return '服务器连接超时，请稍后再试';
  else
    return state;
}

function captcha(state = 'loading', action) {
  switch(action.type) {
  case UPDATE_CAPTCHA_SUCCESS:
    return action.captcha;
  default:
    return state;
  }
}

function currentUser(state={
  loading: false,
  done: null,
}, action ) {
  switch(action.type) {
  case SIGNIN_SUCCESS: {
    const userPermissions = action.user.permissions;
    state.can = (permission) => { //Model Function
      // console.debug('User ask to perform', permission);
      return userPermissions.indexOf(permission) >= 0;
    };
    return Object.assign({}, state, action.user, {loading: false, done: true});
  }
  case ME_ALIVE_SUCCESS: {
    const userPermissions = action.user.permissions;
    state.can = (permission) => { //Model Function
      // console.debug('User ask to perform', permission);
      return userPermissions.indexOf(permission) >= 0;
    };
    return Object.assign({}, state, action.user, {loading: false, done: true});
  }
  case PURCHASE_SUCCESS: {
    return Object.assign({}, state, {downAmount:state.downAmount+action.data.price});
  }
  case ME_ALIVE_REQUEST:
    return Object.assign({}, state, {loading: true});
  default:
    return state;
  }
}
function phoneCode(state={
  message: '获取验证码',
  canClick: true,
}, action) {
  if(action.type==SEND_CODE) {
    return Object.assign({}, action.data);
  }
  return state;
}

function changedPwd(state = {pwdInfo:{status:false, message: ''}}, action) {
  if(action.type == CHANGE_PWD_INFO) {
    return update(state, {pwdInfo: {$set: action.pwdInfo}});
  } else if(action.type == SHOW_TRUE) {
    return update(state, {pwdInfo: {$set: action.showInfo}});
  }
  return state;
}

function GotLogoUrl(state = '', action) {
  switch(action.type) {
  case GOT_LOGO_OK:
    return update(state, { $set: action.logourl.data.logo });
  default:
    return state;
  }
}

function gotCustomerType(state = 1, action) {
  switch(action.type) {
  case GOT_LOGO_OK:
    return update(state, { $set: action.logourl.data.type });
  default:
    return state;
  }
}

const login = combineReducers({
  error,
  loading,
  captcha,
  currentUser,
  phoneCode,
  changedPwd,
  GotLogoUrl,
  gotCustomerType,
});

export default login;
