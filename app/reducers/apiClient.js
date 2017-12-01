import update from 'immutability-helper';
import { combineReducers } from 'redux';
import {
// CREATE_API_CLIENT_REQUEST,
CREATE_API_CLIENT_SUCCESS,
// CREATE_API_CLIENT_FAILURE,

// DELETE_API_CLIENT_REQUEST,
DELETE_API_CLIENT_SUCCESS,
// DELETE_API_CLIENT_FAILURE,

// EDIT_API_CLIENT_REQUEST,
// EDIT_API_CLIENT_SUCCESS,
// EDIT_API_CLIENT_FAILURE,

// LIST_API_CLIENT_REQUEST,
LIST_API_CLIENT_SUCCESS,
// LIST_API_CLIENT_FAILURE,

USERGROUP_LIST_SUCCESS,
} from '../actions/apiClient';
/*
import {
  userGroupActionTypes,
} from '../actions/user';
*/
function clients(state=[], action) {
  switch (action.type) {
  case LIST_API_CLIENT_SUCCESS:
    return update(state, {$set: action.payload.clients});
  case CREATE_API_CLIENT_SUCCESS:
    return update(state, {$push: [action.payload.newClient]});
  case DELETE_API_CLIENT_SUCCESS: {
    const index = state.findIndex(client => client.id == action.payload.client);
    return update(state, {$splice: [[index, 1]]});
  }
  default:
    return state;
  }
}

function groups(state=[], action) {
  switch (action.type) {
  /*case userGroupActionTypes.USERGROUP_LIST_SUCCESS:
    return update(state, {$set: action.treeData});*/
  case USERGROUP_LIST_SUCCESS:
    return update(state, {$set: action.treeData});
  default:
    return state;
  }
}

const apiClient = combineReducers({
  clients,
  groups,
});

export default apiClient;
