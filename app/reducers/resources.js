import { combineReducers } from 'redux';
import update from 'immutability-helper';
import { Actions } from '../actions/resource';
import helper from '../common/helper';

import {
  GET_SEARCHED_SRC_OK,
  GET_DOWN_LIST_REQUEST,
} from '../actions';

function resTree(state = {
  treeData: [{name: '全部', id: 1, seq: '1', ifoldlevel: 1, iextend: 0, parentId: null, iextendid: null, caption: null, keywords: null, children:[{}]}],
  checkedFolders: [], //右侧页面被勾选的文件对象
  error: null,
  isLoading: false,
}, action) {
  switch (action.type) {
  case Actions.RESOURCE_TREE_DATA_SUCCESS:
    return update(state, { treeData: { $set: action.treeData } });
  case Actions.CREATE_RESOURCE_FOLDER_REQUEST:
    return update(state, { isLoading : {$set: true}});
  case Actions.CREATE_RESOURCE_FOLDER_SUCCESS:
    return update(state, { treeData: { $set: action.treeData }, isLoading: {$set: false} });
  case Actions.CREATE_RESOURCE_FOLDER_FAILURE:
    return update(state, { isLoading: { $set: false } });
  case Actions.DELETE_RESOURCE_FOLDER_SUCCESS:
    return update(state, {
      treeData: { $set: action.treeData },
      checkedFolders: { $set: [] },
    });
  case Actions.COPY_FOLDER_SUCCESS:
    return update(state, {
      treeData: { $push: [action.treeData] },
      checkedFolders: { $set: [] },
    });
  case Actions.MOVE_FOLDER_SUCCESS:
    return update(state, {
      treeData: { $set: action.treeData },
      checkedFolders: { $set: [] },
    });
  case 'CHECK_FOLDERS':
    return update(state, { checkedFolders: { $set: action.folders.slice() } });
  case Actions.RENAME_FOLDER_SUCCESS:
    return update(state, { treeData: { $set: action.treeData } });
  case Actions.DELETE_RESOURCE_FOLDER_FAILED:
    return update(state, { error: { $set: action.error } });
  case Actions.MERGEFOLDERS_SUCCESS_REQUEST:
    return update(state, { isLoading : {$set: true} });
  case 'MERGE_FOLDERS_RESTREE':
    return update(state, { treeData: {$set: action.treeData}, isLoading: {$set: false} });
  case Actions.MERGEFOLDERS_SUCCESS_FAILURE:
    return update(state, { isLoading: { $set: false } });
  default:
    return state;
  }
}

function onlinePagedImages(state = {
  imgs: { list: [] },
  isFetching: false,
  from: '',
}, action) {
  switch (action.type) {
  case 'FETCH_ONLINE_RESOURCES_SUCCESS': {
    let list = action.pagedImages.list;
    const newList = list.map(file => {
      return helper.formatFile(file);
    });
    action.pagedImages.list = newList;
    return Object.assign({}, state, {
      imgs: action.pagedImages,
      isFetching: false,
      from: 'folder',
    });
  }

  case GET_DOWN_LIST_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
    });

  case GET_SEARCHED_SRC_OK: {
    let list = action.data.list;
    if(!list) {
      list = [];
    }
    let newList = list.map(file => {
      return helper.formatFile(file);
    });
    action.data.list = newList;
    return Object.assign({}, state, {
      imgs: action.data,
      isFetching: false,
      from: 'search',
    });
  }
  case 'FETCH_ONLINE_RESOURCES_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'FETCH_ONLINE_RESOURCES_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
    });
  default:
    return state;
  }
}

function folders(state = [], action) {
  switch (action.type) {
  case Actions.CREATE_RESOURCE_FOLDER_SUCCESS:
    return action.folders;
  case 'FETCH_FOLDERS_OK_FOLDER':
    return action.folders;
  case Actions.DELETE_RESOURCE_FOLDER_SUCCESS:
    return action.folders;
  case Actions.MERGEFOLDERS_SUCCESS_SUCCESS:
    return action.folders;
  case 'MOVE_FOLDER_RIGHT_VIEW':
    return action.folders;
  case Actions.RENAME_FOLDER_SUCCESS:
    return action.folders;
  default:
    return state;
  }
}

function selectedNode(state = {}, action) {
  switch (action.type) {
  case 'FETCH_FOLDERS_OK_FOLDER':
    return action.selectedfolder;
  default:
    return state;
  }
}

/*--------新版目录权限----baseinfo---*/
function folderValues(state = {
  folderName: '',
  folderCaption: '',
  keyWords: '',
  ifoldlevel: 0, //仅用于编辑时
  iextend: 0,
}, action) {
  switch(action.type) {
  case 'CHANGE_FOLDER_NAME':
    return update(state, { folderName: { $set: action.data.value } });
  case 'CHANGE_FOLDER_CAPTION':
    return update(state, { folderCaption: { $set: action.data.value } });
  case 'CHANGE_FOLDER_KEYWORDS': {
    let str = action.data.value.join(',');
    return update(state, { keyWords: { $set: str } });
  }
  case 'GET_FOLDER_BASEINFO_OK':
    return update(state, {
      folderName: { $set: action.folderBI.name },
      folderCaption: { $set: action.folderBI.caption },
      keyWords: { $set: action.folderBI.keywords },
      ifoldlevel: { $set: action.folderBI.ifoldlevel },
      iextend: { $set: action.folderBI.iextend },
    });
  case 'CLEAR_FOLDER_BASEINFO_OK':
    return update(state, {
      folderName: { $set: '' },
      folderCaption: {$set: '' },
      keyWords: { $set: '' },
      ifoldlevel: { $set: 0 },
      iextend: { $set: 0 },
    });
  default:
    return state;
  }
}

function allUsers(state = [], action) {
  switch(action.type) {
  case 'GET_ALL_USERS_OK':
    return update(state, { $set: action.users });
  default:
    return state;
  }
}


function rememberOldFolderName(state = '', action) {
  switch(action.type) {
  case 'GET_FOLDER_BASEINFO_OK':
    return update(state, { $set: action.folderBI.name });
  default:
    return state;
  }
}


const resources = combineReducers({
  resTree,
  selectedNode,
  folders,
  onlinePagedImages,
  folderValues,
  allUsers,
  rememberOldFolderName,
});

export default resources;
