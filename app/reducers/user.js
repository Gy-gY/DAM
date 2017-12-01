import { combineReducers } from 'redux';
// import update from 'immutability-helper';
import {
  FILTER_TOGGLE,
  DIALOG_TOGGLE,
  USERS_REQUEST,
  // USERS_FAILURE,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAILURE,
} from '../actions';

function filter(state = {
  open: false,
}, action) {
  switch (action.type) {
  case FILTER_TOGGLE:
    return Object.assign({}, state, {
      open: !state.open,
    });
  default:
    return state;
  }
}

function dialog(state = {
  open: false,
}, action) {
  switch (action.type) {
  case DIALOG_TOGGLE:
    return Object.assign({}, state, {
      open: !state.open,
    });
  case USER_CREATE_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
    });
  case USER_CREATE_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      open: false,
    });
  case USER_CREATE_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      open: false,
    });
  default:
    return state;
  }
}

function userList(state = {
  users: {list:[]},
  paginationParams:{
    pageNum:1,
    pageSize:10,
    total:0,
  },
  isFetching: false,
  lastUpdated: new Date(),
}, action) {
  switch (action.type) {
  case USERS_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'QUERY_USER_SUCCESS':
    return Object.assign({}, state, {
      users: action.users,
      paginationParams:action.paginationParams,
      isFetching: false,
      lastUpdated: new Date(),
    });
  default:
    return state;
  }
}

function userDetail(state = {
  user: {},
  isFetching: false,
  lastUpdated: new Date(),
}, action) {
  switch (action.type) {
  case USER_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
    });
  case USER_SUCCESS:
    return Object.assign({}, state, {
      user: action.user,
      isFetching: false,
      lastUpdated: new Date(),
    });
  case USER_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
    });
  default:
    return state;
  }
}

function user(state = {
  users: {},
  isFetching: false,
  lastUpdated: new Date(),
}, action) {
  switch(action.type) {
  case 'CREATE_USER_SUCCESS':
    return {user: action.user, status:'success'};
  case 'CREATE_USER_FAILURE':
    return {user: {}, userStatus:'error'};
  case 'MOVE_USER_SUCCESS':
    return {user: action.user, status:'success'};
  case 'EDIT_USER_SUCCESS':
    return {user: action.user, status:'success'};
  case 'DEL_USER_SUCCESS':
    return {user: action.user, delStatus:'success'};
  default:
    return state;
  }
}

function groupTree( state = {
  treeData: [
    { name: '全部人员', id: '0', parseId:'0' },
  ],
}, action) {
  switch(action.type) {
  case 'USERGROUP_LIST_SUCCESS':
    return {treeData: action.treeData};
  case 'ADD_USERGROUP_SUCCESS':
    return {treeData: action.treeData, userGroup: action.userGroup};
  case 'DEL_USERGROUP_SUCCESS':
    return {treeData: action.treeData};
  case 'EDIT_USERGROUP_SUCCESS':
    return {treeData: [], userGroup:action.userGroup};
  default:
    return state;
  }
}

function role(state={roleList:[]}, action) {
  switch(action.type) {
  case 'QUERY_ROLE_LIST_SUCCESS':
    return {roleList: action.roleList};
  default:
    return state;
  }
}

const userMaster = combineReducers({
  filter,
  dialog,
  user,
  userList,
  userDetail,
  groupTree,
  role,
});

export default userMaster;
