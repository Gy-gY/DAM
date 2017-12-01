import { combineReducers } from 'redux';
import update from 'immutability-helper';

import {FETCH_FOLDERS_REQUEST, FETCH_FOLDERS_SUCCESS, FETCH_FOLDERS_FAILURE} from './action';

function folders(state = [], action) {
  switch(action.type) {
  case FETCH_FOLDERS_REQUEST:
    return [];    
  case FETCH_FOLDERS_SUCCESS:
    return action.folders;
  case FETCH_FOLDERS_FAILURE:
    return state;
  default:
    return state;
  }
}
function selectedFolder(state = 1, action) {
    
  return state;
    
}

const resourceManage = combineReducers({
  folders,
  selectedFolder,
});

export default resourceManage;
