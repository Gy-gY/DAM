import { combineReducers } from 'redux';
import update from 'immutability-helper';
import helper from '../common/helper';
import {
  TOGGLE_FILE_SELECTION,
  SELECT_ALL_FILES,
  REVERS_FILE_SELECTION,
  TOGGLE_IMG_RESET,
  DOWNLOAD_FILE_REQUEST,
  DOWNLOAD_FILE_SUCCESS,
  DOWNLOAD_FILE_FAILURE,
  FETCH_ONLINE_RESOURCES_SUCCESS,
  CLOSE_MODAL_AFTER_SEARCH,
  } from '../actions/usercenter';
function downloadAssets(state = {
  assets: {list: []},
  isFetching: false }, action) {
  switch (action.type) {
  case 'QUERY_DOWNLOAD_IMGS_SUCCESS': {
    const files = action.pagedImages.list.map(file => helper.formatFile(file));
    action.pagedImages.list = files;
    return Object.assign({}, state, {
      assets: Object.assign({}, action.pagedImages),
      isFetching: false,
    });
  }
  default:
    return state;
  }
}

//当前用户已经收藏的资源, 带有分页信息
function favoriteAssets(state = {
  assets: {list: []},
  isFetching: false,
}, action) {
  switch (action.type) {
  case 'QUERY_FAVORITE_IMGS_SUCCESS': {
    const files = action.pagedImages.list.map(file => helper.formatFile(file));
    action.pagedImages.list = files;
    return Object.assign({}, state, {
      assets: Object.assign({}, action.pagedImages),
      isFetching: false,
    });
  }
  // case 'FAVORITE_SUCCESS': {
  //   const ids = action.payload;
  //   return update(state, { assets: {list:
  //   { [state.assets.list.findIndex(asset => ids.includes(asset.id))]:
  //       {$merge: {favorite: true}}}}});
  // }
  default:
    return state;
  }
}

function detailModal(state = {
  isOpen: false,
  files: [],
}, action) {
  switch (action.type) {
  case 'USER_CENTER_TOGGLE_DETAIL_MODAL':
    return Object.assign({}, state, {
      isOpen: !state.isOpen,
      files: state.isOpen ? [] : action.files,
    });
  default:
    return state;
  }
}

//用户轮播图显示所有文件
function detailListModal(state = {
  isOpen: false,
  files: [],
  file: null,
}, action) {
  switch (action.type) {
  case 'ONLINE_IMGS_TOGGLE_DETAIL_MODAL':
    return Object.assign({}, state, {
      isOpen: !state.isOpen,
      files: state.isOpen ? [] : action.files,
      file: state.isOpen ? null : action.file,
    });
  case CLOSE_MODAL_AFTER_SEARCH:
    return update(state, { isOpen: { $set: action.bool } });
  default:
    return state;
  }
}

function filterOrder(state={
  filterType: 'download',
  pageSize: 60,
  pageNum: 1,
}, action) {
  switch(action.type) {
  case 'USERCENTER_FILTER_TYPE_CHANGED':
    return Object.assign({}, state, {
      filterType: action.filterType || state.filterType,
      pageNum: action.pageNum || state.pageNum,
    });
  default:
    return state;
  }
}

function selectedFiles(state = [], action) {
  switch (action.type) {
  case FETCH_ONLINE_RESOURCES_SUCCESS:
    return [];
  case TOGGLE_FILE_SELECTION:
    if (action.ctrlKey)
      return state.includes(action.fileId) ? state.filter(fileId => fileId != action.fileId) : [...state, action.fileId];
    else
      return [action.fileId];
  case SELECT_ALL_FILES:
    return action.ids;
  case REVERS_FILE_SELECTION:
    return action.ids;
  case TOGGLE_IMG_RESET:
    return [];
  case 'TOGGLE_IMG_RESET':
    return [];
  default:
    return state;
  }
}
function myResources (state={
  collectionList:[],
  downloadList:[],
  pagination:{},
}, action) {
  switch (action.type) {
  case 'QUERY_COLLECTIONSLIST_SUCCESS':
    return {
      collectionsList:action.collectionsList,
      pagination:action.pagination,
    };
  case 'QUERY_DOWNLOADLIST_SUCCESS':
    return {
      downloadList:action.downloadList,
      pagination:action.pagination,
    };
  default:
    return state;
  }
}

function downloadStatus (state = {
  loading: false,
}, action) {
  switch (action.type) {
  case DOWNLOAD_FILE_REQUEST:
    return Object.assign({}, {loading: true});
  case DOWNLOAD_FILE_FAILURE:
    return Object.assign({}, {loading: false});
  case DOWNLOAD_FILE_SUCCESS:
    return Object.assign({}, {loading: false});
  default:
    return state;
  }
}

const usercenter = combineReducers({
  selectedFiles,
  downloadAssets,
  favoriteAssets,
  downloadStatus,
  filterOrder,
  detailModal,
  detailListModal,
  myResources,
});

export default usercenter;
