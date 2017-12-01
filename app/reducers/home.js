import { combineReducers } from 'redux';
function stockMaterial(state = {
  list: [],
  isFetching: false,
  lastUpdated: new Date(),
}, action) {
  switch (action.type) {
  case 'QUERY_INSTOCK_SUCCESS':
    return action.data;
  default:
    return state;
  }
}

function monthMaterial(state = {
}, action) {
  switch (action.type) {
  case 'QUERY_MONTH_SUCCESS':
    return action.data;
  default:
    return state;
  }
}

function pendingMaterial(state = {
  list: [],
  isFetching: false,
  lastUpdated: new Date(),
}, action) {
  switch (action.type) {
  case 'QUERY_PENDING_SUCCESS':
    return action.data;
  default:
    return state;
  }
}

const home = combineReducers({
  stockMaterial,
  monthMaterial,
  pendingMaterial,
});

export default home;
