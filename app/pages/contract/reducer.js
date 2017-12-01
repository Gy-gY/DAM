import { combineReducers } from 'redux';
import {
  FETCH_CANTRACT_INFO_OK_C,
  DOWNLOAD_LOG_REQUEST_C,
  FILTER_USER_DOWNLOAD_C,
  DOWNLOAD_LOG_SUCCESS_C,
  DOWNLOAD_LOG_FAILURE_C,
  PURCHASE_REQUEST_C,
  PURCHASE_SUCCESS_C,
  RESET_USER_DOWNLOAD_C,
  SHOW_PURCHASE_C,
  HIDE_PURCHASE_C,
  GET_ALL_USER_LIST_OK_C,
  DOWNLOAD_USERS_REQUEST_C,
  DOWNLOAD_USERS_SUCCESS_C,
  DOWNLOAD_USERS_FAILURE_C,
  DOWNLOAD_DAMLOG_REQUEST_C,
  DOWNLOAD_DAMLOG_SUCCESS_C,
  DOWNLOAD_DAMLOG_FAILURE_C,
  PURCHASE_FAILURE_C,
  CONTRACT_SUCCESS_C,
  GET_DOWNCOUNT_OK_C,
} from './action';
import moment from 'moment';
import update from 'immutability-helper';


function fetchedContractInfo(state = {}, action) {
  switch(action.type) {
  case FETCH_CANTRACT_INFO_OK_C:
    return update(state, { $set: action.contractInfo });
  default:
    return state;
  }
}

function downloadLog(state = {}, action) {
  switch (action.type) {
  case DOWNLOAD_LOG_REQUEST_C:
    return {};
  case DOWNLOAD_LOG_SUCCESS_C:
    return Object.assign({}, action.data);
  case DOWNLOAD_LOG_FAILURE_C:
    return {};
  case PURCHASE_SUCCESS_C: {
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
  user_id: 'all',
  licenseType: 0,
  confirmStatus: 0,
  moment: moment(),
}, action) {
  switch(action.type) {
  case FILTER_USER_DOWNLOAD_C:
    return Object.assign(state, action.data);
  default:
    return state;
  }
}

function isshowModal(state = false, action) {
  switch(action.type) {
  case SHOW_PURCHASE_C:
    return true;
  case HIDE_PURCHASE_C:
    return false;
  case DOWNLOAD_LOG_SUCCESS_C:
    return false;
  case PURCHASE_SUCCESS_C:
    return false;
  case RESET_USER_DOWNLOAD_C:
    return false;
  default:
    return state;
  }
}

function downStatus(state = false, action) {
  switch (action.type) {
  case DOWNLOAD_USERS_REQUEST_C:
    return true;
  case DOWNLOAD_USERS_SUCCESS_C:
    return false;
  case DOWNLOAD_USERS_FAILURE_C:
    return false;
  case RESET_USER_DOWNLOAD_C:
    return false;
  default:
    return state;
  }
}

function purChaseStatus(state = false, action) {
  switch (action.type) {
  case PURCHASE_REQUEST_C:
    return true;
  case PURCHASE_SUCCESS_C:
    return false;
  case PURCHASE_FAILURE_C:
    return false;
  case RESET_USER_DOWNLOAD_C:
    return false;
  default:
    return state;
  }
}

function downloadLogDam(state = {}, action) {
  switch (action.type) {
  case DOWNLOAD_DAMLOG_REQUEST_C:
    return {};
  case DOWNLOAD_DAMLOG_SUCCESS_C:
    return Object.assign({}, action.data);
  case DOWNLOAD_DAMLOG_FAILURE_C:
    return {};
  default:
    return state;
  }
}

function contractInfoMM(state = {}, action) {
  switch (action.type) {
  case CONTRACT_SUCCESS_C:
    return Object.assign({}, action.data);
  default:
    return state;
  }
}

function allUserList(state = [], action) {
  switch(action.type) {
  case GET_ALL_USER_LIST_OK_C:
    return update(state, { $set: action.allUser });
  default:
    return state;
  }
}

function downcount(state = {}, action) {
  switch(action.type) {
  case GET_DOWNCOUNT_OK_C:
    return update(state, { $set: action.data });
  default:
    return state;
  }
}

const contractInfo = combineReducers({
  fetchedContractInfo,
  downloadLog,
  filterDownLoad,
  isshowModal,
  downStatus,
  downloadLogDam,
  contractInfoMM,
  allUserList,
  purChaseStatus,
  downcount,
});

export default contractInfo;
