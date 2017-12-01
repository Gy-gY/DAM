import { combineReducers } from 'redux';
import update from 'immutability-helper';

import {DELETE_USER_FAVARITE_REQUEST, DELETE_USER_FAVARITE_SUCCESS, DELETE_USER_FAVARITE_FAILED, RESET_USER_FAVORITE,
  FAVARITE_USER_REQUEST, FAVARITE_USER_SUCCESS, FAVARITE_USER_FAILURE, FILTER_USER_FAVARITE, SELECT_USER_FAVARITE,
  DOWNLOAD_USER_REQUEST, DOWNLOAD_USER_SUCCESS, DOWNLOAD_USER_FAILURE } from './actionFavorite';

function favariteStatus(state = false, action) {
  switch (action.type) {
  case DELETE_USER_FAVARITE_REQUEST:
    return true;
  case DELETE_USER_FAVARITE_SUCCESS:
    return false;
  case DELETE_USER_FAVARITE_FAILED:
    return false;  
  case RESET_USER_FAVORITE:
    return false;
  default:
    return state;
  }
}

function favariteImgs(state = {}, action) {
  switch (action.type) {
  case FAVARITE_USER_REQUEST:
    return {};
  case FAVARITE_USER_SUCCESS:
    return action.data;
  case DELETE_USER_FAVARITE_SUCCESS: {
    let idsArr = action.data.split(',');
    let dd = state.list.filter(x=>{
      if(idsArr.find(y=>(x.detail.vcgId==y||x.detail.assetId==y))) {
        return false;
      }else {
        return true;
      }
    });
    return update(state, {
      list: {$set: dd},
    });
  }   
  case FAVARITE_USER_FAILURE:
    return {};
  default:
    return state;
  }
}
  
function filterFavarite(state = {pageNum:1, pageSize:50}, action) {
  switch (action.type) {
  case FILTER_USER_FAVARITE:
    return Object.assign(state, action.data);
  default:
    return state;
  }
}
function selectedFavarite(state = [], action) {
  switch (action.type) {
  case SELECT_USER_FAVARITE:
    if (action.ctrlKey)
      return state.find((fil)=>fil.id == action.imgObj.id) ? state.filter(fil => fil.id != action.imgObj.id) : [...state, action.imgObj];
    else
      return [action.imgObj];
  case RESET_USER_FAVORITE:
    return [];
  default:
    return state;
  }
}
function downStatus(state = false, action) {
  switch (action.type) {
  case DOWNLOAD_USER_REQUEST:
    return true;
  case DOWNLOAD_USER_SUCCESS:
    return false;
  case DOWNLOAD_USER_FAILURE:
    return false;
  case RESET_USER_FAVORITE:
    return false;
  default:
    return state;
  }
}
const myFavorite = combineReducers({
  selectedFavarite,
  filterFavarite,
  favariteImgs,
  favariteStatus,
  downStatus,
});

export default myFavorite;
