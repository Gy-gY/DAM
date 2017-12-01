import fetch from 'isomorphic-fetch';
import resourceAPI from './resourceApi';
import passportAPI from './passportApi';
import nodeAPI from './nodeApi';

// import { STORE_DISPATH } from '../actions';
import { push } from 'react-router-redux';
import { Modal } from 'antd';

export const API = {
  resourceAPI,
  passportAPI,
  nodeAPI,
};

export const baseAPI = '/api';
// console.log('baseAPI:', baseAPI);

//处理常见的错误, 系统错误500 网络连接错误 528
const handleErrors = (errRes) => {
  console.error('API ERROR', errRes);

  if (errRes && errRes.status) { // asume it is a reponse object
    return errRes.json().then(res => {
      if (res.status == 401) {
        // STORE_DISPATH(push('/login'));
        return;
      }

      if (res.status == 500) {
        Modal.error({
          title: '系统异常',
          content: '对不起，系统异常，操作失败',
        });
        return;
      }


      if (res.status == 403) {
        Modal.error({
          title: '无权限操作',
          content: '对不起，您无权限进行该操作',
        });
        return;
      }

      if (res.status == 528) {
        Modal.error({
          title: '网络连接异常',
          content: '对不起，网络连接异常，请稍后重试',
        });
        return;
      }
      }).catch((jsonError) => {
        throw(jsonError);
      });
  }

  // Modal.info({
  //     title: '系统异常',
  //     content: '对不起，系统异常，操作失败',
  //   });
}

export const customFetch = (url, options) => {
  //credentials 允许fetapi携带cookie
  const carryCookie = { credentials: 'include'};
  // When carryCookie is set, server should only allow this doamin.
  return fetch(url, Object.assign(options, carryCookie))
    .then((res)=>{
      if (res.status == 401) {
        // STORE_DISPATH(push('/login')); //No idea why 401 is not catched as error.
        return;
      }
      return res;
    }).catch((err) => {
      return handleErrors(err);
    });
};
