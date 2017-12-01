import update from 'immutability-helper';
import { combineReducers } from 'redux';

import {
  FETCH_FOLDER_REQUEST_AUDIT,
  FETCH_FOLDER_SUCCESS_AUDIT,
  FETCH_FOLDER_FAILURE_AUDIT,
  FETCH_FOLDERS_SUCCESS,
  FETCH_FOLDERS_FAILURE,
  CHANGE_FILTER_AUDIT,
  REVIEW_REQUEST_AUDIT,
  REVIEW_SUCCESS_AUDIT,
  REVIEW_FAILURE_AUDIT,
  HIDE_DETAIL_MODAL_AUDIT,
  SELECT_ALL_FILES_AUDIT,
  REVERS_FILE_SELECTION_AUDIT,
  SELECT_UPLOAD_FILES_AUDIT,
  TOGGLE_FILE_SELECTION_AUDIT,
  TOGGLE_DETAIL_MODAL_AUDIT,
  TOGGLE_IMG_RESET_AUDIT,
  SWITCH_TABLE_AUDIT,
  SHOW_TREE_AUDIT,
  MOVE_ASSETS_SUCCESS_AUDIT,
  ARROW_A_FILE_OK,
  SHOW_File_MODAL_AUDIT,
  HIDE_FILE_MODAL_AUDIT,
  MODIFY_ALBUM_TITLE_AUDIT,
  MODIFY_ALBUM_CAPTION_AUDIT,
  MODIFY_ALBUM_KEYWORDS_AUDIT,
  CLEAR_ALBUM_INFO_AUDIT,
  CREATE_NEW_ALBUM_OK_AUDIT,
  RECORD_CUR_ALBUM_AUDIT,
  GOT_ALBUM_INFO_AUDIT,
  UPDATE_ALBUM_OK_AUDIT,
  CHANGE_FILTER_ALBUM,
  OPEN_ALBUM_OK_AUDIT,
  OPEN_FOLDER_OK_AUDIT,
  GET_ALBUMS_OK,
  CLEAR_ALBUMLIST_OK,
  GET_ALBUMS_REQUEST,
  GET_ALBUMS_FAILUE,
  MOVE_COPY_REQUEST,
  MOVE_COPY_OK,
  MOVE_COPY_FAILED,
} from 'actions';

function isShowTree(state = {
  show: false,
  type: null,
}, action) {
  if(action.type == SHOW_TREE_AUDIT) {
    return action.data;
  }else {
    return state;
  }
}

function folders(state = [{name: '全部', id: 1, seq: '1', ifoldlevel: 1, iextend: 0, parentId: -1, iextendid: null, caption: null, permissions:['upload_assets', 'user_view', 'view_assets'], keywords: null, children:[{}]}], action) {
  let rootNode = {
    name: '全部',
    id: 1,
    seq: '1',
    ifoldlevel: 1,
    iextend: 0,
    parentId: -1,
    iextendid: null,
    caption: null,
    keywords: null,
    children:[{}],
    permissions:['upload_assets', 'user_view', 'view_assets'],
  };
  switch(action.type) {
  case FETCH_FOLDERS_SUCCESS: {
    let arr = action.folders.filter(item => {
      return item.id != 1;
    });
    arr.unshift(rootNode);
    return update(state, { $set: arr });
  }
  case FETCH_FOLDERS_FAILURE:
    return [];
  default:
    return state;
  }
}

function showTable(state=false, action) {
  if(action.type == SWITCH_TABLE_AUDIT ) {
    return action.data;
  }else {
    return state;
  }
}

function selectedFolder(state = {list:[]}, action) {
  switch (action.type) {
  case FETCH_FOLDER_REQUEST_AUDIT:
    return Object.assign({}, state, {
      id: action.id,
      isUpdating: true,
    });
  case MOVE_ASSETS_SUCCESS_AUDIT: {
    return update(state, {
      list: {$set: action.list},
    });
  }
  case FETCH_FOLDER_SUCCESS_AUDIT:
    return Object.assign({}, state, action.folder, {
      isUpdating: false,
    });
  case FETCH_FOLDER_FAILURE_AUDIT:
    return Object.assign({}, state, {
      isUpdating: false,
    });
  case SELECT_UPLOAD_FILES_AUDIT:
    return update(state, {
      list: {$unshift: action.files},
    });
  case REVIEW_REQUEST_AUDIT:
    return Object.assign({}, state, {
      isUpdating: true,
    });
  case REVIEW_SUCCESS_AUDIT:
  case REVIEW_FAILURE_AUDIT:
    return Object.assign({}, state, {
      isUpdating: false,
    });
  default:
    return state;
  }
}

function detailModal_audit(state = {
  isOpen: false,
  files: [],
}, action) {
  switch (action.type) {
  case TOGGLE_DETAIL_MODAL_AUDIT:
    return Object.assign({}, state, {
      isOpen: !state.isOpen,
      files: state.isOpen ? [] : action.files,
      type: action.auditType,
    });
  case HIDE_DETAIL_MODAL_AUDIT:
    return {
      isOpen: false,
      files: [],
      type: action.auditType,
    };
  default:
    return state;
  }
}

function selectedFiles(state = [], action) {
  switch (action.type) {
  case TOGGLE_FILE_SELECTION_AUDIT:
    if (action.ctrlKey)
      return state.find((fil)=>fil.id == action.file.id) ? state.filter(fil => fil.id != action.file.id) : [...state, action.file];
    else
      return [action.file];
  case SELECT_ALL_FILES_AUDIT:
    return action.ids;
  case REVERS_FILE_SELECTION_AUDIT:
    return action.ids;
  case FETCH_FOLDER_REQUEST_AUDIT:
  case REVIEW_REQUEST_AUDIT:
    return [];
  case TOGGLE_IMG_RESET_AUDIT:
    return [];
  default:
    return state;
  }
}

function currentFile(state = {}, action) {
  switch(action.type) {
  case ARROW_A_FILE_OK:
    return update(state, { $set: action.file });
  default:
    return state;
  }
}

function filter(state = {
  pageNum : 1,
  onlineState : '',
  reviewState : 'PENDING',
  folderId : '',
  assetType : '',
  pageSize: 40,
  orderBy: 'TIME_DESC',
}, action) {
  if(action.type == CHANGE_FILTER_AUDIT) {
    return update(state, { $set: action.data });
  }
  return state;
}

function filter_album(state = {
  pageNum : 1,
  onlineState : '',
  reviewState : 'PENDING',
  folderId : '',
  groupId: 0,
  assetType : '',
  pageSize: 40,
  orderBy: 'TIME_DESC',
}, action) {
  if(action.type == CHANGE_FILTER_ALBUM) {
    return update(state, { $set: action.data });
  }
  return state;
}

function fileModalInfo(state = {
  isNew: false,
  isOpen: false,
}, action) {
  switch(action.type) {
  case SHOW_File_MODAL_AUDIT:
    return update(state, { isNew: { $set: action.isNew }, isOpen: { $set: true } });
  case HIDE_FILE_MODAL_AUDIT:
    return update(state, { isOpen: { $set: false } });
  default:
    return state;
  }
}

function albumInfo(state = {
  title: '',
  caption: '',
  keywords: [],
}, action) {
  switch(action.type) {
  case MODIFY_ALBUM_TITLE_AUDIT:
    return update(state, { title: { $set: action.value } });
  case MODIFY_ALBUM_CAPTION_AUDIT:
    return update(state, { caption: { $set: action.value } });
  case MODIFY_ALBUM_KEYWORDS_AUDIT:
    return update(state, { keywords: { $set: action.value } });
  case CLEAR_ALBUM_INFO_AUDIT:
    return update(state, {
      title: { $set: '' },
      caption: { $set: '' },
      keywords: { $set: [] },
    });
  //从服务端获取（编辑情况下），jsx将数据填入页面
  case GOT_ALBUM_INFO_AUDIT: {
    let {title, description, keywords} = action.data;
    keywords = keywords.split(',');
    return update(state, {
      title: { $set: title },
      caption: { $set: description },
      keywords: { $set: keywords },
    });
  }
  default:
    return state;
  }
}


//新建album或者更新album成功后返回的最新album信息,数据结构比较复杂的不仅仅是title、caption，keywords
function retAlbumInfo(state = {}, action) {
  switch(action.type) {
  case CREATE_NEW_ALBUM_OK_AUDIT:
    return update(state, { $set: action.album });
  case UPDATE_ALBUM_OK_AUDIT:
    return update(state, { $set: action.album });
  default:
    return state;
  }
}

function curSelectedAlbum(state = {}, action) {
  switch(action.type) {
  case RECORD_CUR_ALBUM_AUDIT:
    return update(state, { $set: action.album });
  default:
    return state;
  }
}


function displayMode(state = 'folder', action) {
  switch(action.type) {
  case OPEN_FOLDER_OK_AUDIT:
    return update(state, { $set: 'folder' });
  case OPEN_ALBUM_OK_AUDIT:
    return update(state, { $set: 'album' });
  default:
    return state;
  }
}

function currentAlbumJson(state = {}, action) {
  switch(action.type) {
  case OPEN_ALBUM_OK_AUDIT:
    return update(state, { $set: action.albumJSON });
  default:
    return state;
  }
}

function albums(state = {
  list: [],
  isLoading: false,
}, action) {
  switch(action.type) {
  case GET_ALBUMS_REQUEST:
    return update(state, { isLoading: { $set: true } });
  case GET_ALBUMS_OK:
    return update(state, {
      isLoading: { $set: false },
      list: { $set: action.albums },
    });
  case CLEAR_ALBUMLIST_OK:
    return update(state, {
      isLoading: { $set: false },
      list: { $set: [] },
    });
  case GET_ALBUMS_FAILUE:
    return update(state, { isLoading: { $set: false } });
  default:
    return state;
  }
}

//false表示正在加载，确定按钮要转圈
function MCBtnStatus(state = false, action) {
  switch(action.type) {
  case MOVE_COPY_REQUEST:
    return update(state, { $set: true });
  case MOVE_COPY_OK:
    return update(state, { $set: false });
  case MOVE_COPY_FAILED:
    return update(state, { $set: false });
  default:
    return state;
  }
}

const audit = combineReducers({
  folders,
  detailModal_audit,
  selectedFolder,
  showTable,
  displayMode,
  isShowTree,
  selectedFiles,
  filter,
  currentAlbumJson,
  currentFile,
  fileModalInfo,
  albumInfo,
  retAlbumInfo,
  filter_album,
  albums,
  curSelectedAlbum,
  MCBtnStatus,
});

export default audit;
