import { combineReducers } from 'redux';
import update from 'immutability-helper';
import moment from 'moment';

import {
  SHOW_PURCHASE,
  HIDE_PURCHASE,
  RESET_USER_DOWNLOAD,
  DOWNLOAD_LOG_REQUEST,
  DOWNLOAD_LOG_SUCCESS,
  DOWNLOAD_LOG_FAILURE,
  FILTER_USER_DOWNLOAD,
  DOWNLOAD_MY_REQUEST,
  DOWNLOAD_MY_SUCCESS,
  DOWNLOAD_MY_FAILURE,
  PURCHASE_REQUEST,
  PURCHASE_SUCCESS,
  PURCHASE_FAILURE,
  DOWNLOAD_DAMLOG_REQUEST,
  DOWNLOAD_DAMLOG_SUCCESS,
  DOWNLOAD_DAMLOG_FAILURE,
  FILTER_USER_DOWNLOAD_DAM,
  CONTRACT_SUCCESS,
} from './actionDownLoad';

function isshowModal(state = false, action) {
  switch (action.type) {
  case SHOW_PURCHASE:
    return true;
  case HIDE_PURCHASE:
    return false;
  case DOWNLOAD_LOG_SUCCESS:
    return false;
  case PURCHASE_SUCCESS:
    return false;
  case RESET_USER_DOWNLOAD:
    return false;
  default:
    return state;
  }
}
function downloadLogDam(state = {}, action) {
  switch (action.type) {
  case DOWNLOAD_DAMLOG_REQUEST:
    return {};
  case DOWNLOAD_DAMLOG_SUCCESS:
    return Object.assign({}, action.data);
  case DOWNLOAD_DAMLOG_FAILURE:
    return {};
  default:
    return state;
  }
}

function filterDownLoadDam(state = {pageNum:1, pageSize:50}, action) {
  switch (action.type) {
  case FILTER_USER_DOWNLOAD_DAM:
    return Object.assign(state, action.data);
  default:
    return state;
  }
}

function downloadLog(state = {}, action) {
  switch (action.type) {
  case DOWNLOAD_LOG_REQUEST:
    return {};
  case DOWNLOAD_LOG_SUCCESS:
    return Object.assign({}, action.data);
  case DOWNLOAD_LOG_FAILURE:
    return {};
  case PURCHASE_SUCCESS: {
    let newList = state.list.map(x=>{
      if(action.data.photoid==x.photoid) {
        return Object.assign(x, action.data);
      }else {
        return x;
      }
    });
    return update(state, {list: {$set: newList}});
  }
  default:
    return state;
  }
}

function filterDownLoad(state = {
  pageNum: 1,
  pageSize: 50,
  start_date: moment().startOf('month').format('YYYY-MM-DD'),
  end_date: moment().endOf('month').format('YYYY-MM-DD'),
  licenseType: 0,
  confirmStatus: 0,
  moment: moment(),
}, action) {
  switch (action.type) {
  case FILTER_USER_DOWNLOAD:
    return Object.assign(state, action.data);
  default:
    return state;
  }
}

function downStatus(state = false, action) {
  switch (action.type) {
  case DOWNLOAD_MY_REQUEST:
    return true;
  case DOWNLOAD_MY_SUCCESS:
    return false;
  case DOWNLOAD_MY_FAILURE:
    return false;
  case RESET_USER_DOWNLOAD:
    return false;
  default:
    return state;
  }
}
function purChaseStatus(state = false, action) {
  switch (action.type) {
  case PURCHASE_REQUEST:
    return true;
  case PURCHASE_SUCCESS:
    return false;
  case PURCHASE_FAILURE:
    return false;
  case RESET_USER_DOWNLOAD:
    return false;
  default:
    return state;
  }
}

function contractInfo(state = {}, action) {
  switch (action.type) {
  case CONTRACT_SUCCESS:
    return Object.assign({}, action.data);
  default:
    return state;
  }
}

const myDownload = combineReducers({
  filterDownLoad,
  isshowModal,
  downloadLog,
  purChaseStatus,
  downStatus,
  downloadLogDam,
  filterDownLoadDam,
  contractInfo,
});

export default myDownload;
