import { combineReducers } from 'redux';

import {
  QUERY_FOLDER_USERS_OK,
  CLEAR_PER_USERS,

  CHANGE_UPLOAD_USERS,
  ADD_A_VIEW_USER,
  DEL_A_VIEW_USER,
  ADD_A_DOWN_USER,
  DEL_A_DOWN_USER,
  ADD_OR_UPDATE_FOLDER_OK,
} from '../actions/folderPermissions';
import update from 'immutability-helper';


function folder(state={folderPermissionList:[], groupPermissionList:[]}, action) {
  switch(action.type) {
  case 'QUERY_FOLDERPERMISSIONLIST_SUCCESS':
    return {folderPermissionList: action.folderPermissionList};
  case 'QUERY_GROUPPERMISSIONLIST_SUCCESS':
    return {groupPermissionList: action.groupPermissionList};
  case 'SET_GROUPPERMISSIONLIST_SUCCESS':
    return state;
  default:
    return state;
  }
}

//这个结构是用于填充三个下拉框的，folder的用户
function folderUsers(state = {
  view_assets: [],
  download_assets: [],
  upload_assets: [],
}, action) {
  switch(action.type) {
  case QUERY_FOLDER_USERS_OK: {
    let view = [];
    let download = [];
    let upload = [];
    action.ulist.forEach(u => {
      u.permissions.forEach(per => {
        if(per.keyName == 'view_assets') {
          view.push(u.userId);
        } else if(per.keyName == 'download_assets') {
          download.push(u.userId);
        } else if(per.keyName == 'upload_assets') {
          upload.push(u.userId);
        }
      });
    });
    return update(state, {
      view_assets: { $set: view },
      download_assets: { $set: download },
      upload_assets: { $set: upload },
    });
  }
  case CLEAR_PER_USERS:
    return update(state, {
      view_assets: { $set: [] },
      download_assets: { $set: [] },
      upload_assets: { $set: [] },
    });

  case ADD_A_VIEW_USER:
    return update(state, { view_assets: { $push: [action.data.value] } });
  //删掉一个View，需要update两个：view_assets和download_assets
  case DEL_A_VIEW_USER: {
    let tmpView = state.view_assets.filter(item => {
      return item != action.data.value;
    });
    let tmpDown = state.download_assets.filter(item => {
      return item != action.data.value;
    });
    return update(state, {
      view_assets: { $set: tmpView },
      download_assets: { $set: tmpDown },
    });
  }

  case ADD_A_DOWN_USER:
    //如果View中没有down添加的这个user
    if(state.view_assets.indexOf(action.data.value) == -1) {
      return update(state, {
        view_assets: { $push: [action.data.value] },
        download_assets: { $push: [action.data.value] },
      });
    }
    return update(state, { download_assets: { $push: [action.data.value] } });
  case DEL_A_DOWN_USER: {
    let tmpDown = state.download_assets.filter(item => {
      return item != action.data.value;
    });
    return update(state, { download_assets: { $set: tmpDown } });
  }

  //下面的upload是独立无联动的
  case CHANGE_UPLOAD_USERS:
    return update(state, { upload_assets: { $set: action.data.value } });

  default:
    return state;
  }
}

const folderPermissions = combineReducers({
  folder,
  folderUsers,
});

export default folderPermissions;
