import { combineReducers } from 'redux';

import {
  FETCH_USER_GROUPS_SUCCESS,
  FETCH_FOLDERS_SUCCESS,
  FETCH_FOLDERS_FAILURE,
  FETCH_PRIVILEGE_SUCCESS,
  UPDATE_PRIVILEGE_SUCCESS,
  SET_ROLE,
  SET_FOLDERS,
} from 'actions';

function userGroups(state = [], action) {
  switch(action.type) {
  case FETCH_USER_GROUPS_SUCCESS:
    return action.userGroups;
  default:
    return state;
  }
}

function folders(state = [], action) {
  switch(action.type) {
  case FETCH_FOLDERS_SUCCESS:
    return action.folders;
  case FETCH_FOLDERS_FAILURE:
    return [];
  default:
    return state;
  }
}

function selectedGroup(state={
  workgroupId: null,
  roleId: null,
  folderIds: [],
}, action) {
  switch (action.type) {
  case FETCH_PRIVILEGE_SUCCESS:
  case UPDATE_PRIVILEGE_SUCCESS:
    return action.privilege;
  case SET_ROLE:
    return Object.assign({}, state, {
      roleId: action.roleId,
      folderIds: action.roleId ? state.folderIds : [],
    });
  case SET_FOLDERS:
    return Object.assign({}, state, {
      folderIds: action.folderIds,
    });
  default:
    return state;
  }
}

const privileges = combineReducers({
  userGroups,
  folders,
  selectedGroup,
});

export default privileges;
