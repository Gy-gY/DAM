import update from 'immutability-helper';
import { combineReducers } from 'redux';

import {
  FETCH_FOLDER_REQUEST,
  FETCH_FOLDER_SUCCESS,
  FETCH_FOLDER_FAILURE,
  FETCH_FOLDERS_SUCCESS,
  FETCH_FOLDERS_FAILURE,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
  DELETE_FILE_REQUEST,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_FAILURE,
  UPDATE_FILE_REQUEST,
  UPDATE_FILE_SUCCESS,
  INSTOCK_REQUEST,
  INSTOCK_SUCCESS,
  INSTOCK_FAILURE,
  SELECT_ALL_FILES,
  REVERS_FILE_SELECTION,
  SELECT_UPLOAD_FILES,
  TOGGLE_FILE_SELECTION,
  TOGGLE_DETAIL_MODAL,
  TOGGLE_IMG_RESET,
  RESET_FOLDER,
  CHANGE_ASSET_TYPE,
  MOVE_ASSETS_SUCCESS_UPLOAD,
  GET_DOWN_LIST_OK,
  SHOW_TREE_UPLOAD,
  GET_ALIYUN_PARAMS_OK,
  CHANGE_KEY_WORDS,
  CLEAR_KEYWORLDS_OK,
  SHOW_File_MODAL,
  HIDE_FILE_MODAL,
  MODIFY_ALBUM_TITLE,
  MODIFY_ALBUM_CAPTION,
  MODIFY_ALBUM_KEYWORDS,
  CLEAR_ALBUM_INFO,
  CREATE_NEW_ALBUM_OK,
  OPEN_ALBUM_OK,
  OPEN_FOLDER_OK,
  RECORD_CUR_ALBUM,
  GOT_ALBUM_INFO,
  UPDATE_ALBUM_OK,
  CHANGE_ALBUM_FILTER_OK,
  GET_ALBUMS_OK_UPLOAD,
  SHOW_INSTOCK_CONFIRM,
  HIDE_INSTOCK_CONFIRM,
  ENTER_ALBUM_OK,
} from 'actions';

function isShowTree_upload(state={show: false, type: null}, action) {
  if(action.type == SHOW_TREE_UPLOAD) {
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
  case UPLOAD_FILE_SUCCESS: {
    const index = state.findIndex(folder => folder.id === action.folderId);
    const count = state[index].count + 1;
    return update(state, {[index]: {$merge: {count}}});
  }
  default:
    return state;
  }
}

function assetType(state = '', action) {
  switch(action.type) {
  case CHANGE_ASSET_TYPE:
    return action.assetType;
  default:
    return state;
  }
}

function selectedFolder(state = {list:[]}, action) {
  switch (action.type) {
  case RESET_FOLDER:
    return state;
  case FETCH_FOLDER_REQUEST:
    return Object.assign({}, state, {
      id: action.id,
      isUpdating: true,
    });
  case MOVE_ASSETS_SUCCESS_UPLOAD: {
    return update(state, {
      list: {$set: action.list},
    });
  }
  case FETCH_FOLDER_SUCCESS:
    return Object.assign({}, state, action.folder, {
      isUpdating: false,
      id:action.id,
    });
  case FETCH_FOLDER_FAILURE:
    return Object.assign({}, state, {
      isUpdating: false,
    });
  case SELECT_UPLOAD_FILES:
    return update(state, {
      list: {$unshift: action.files},
    });
  case UPLOAD_FILE_REQUEST:
    return update(state, {
      list: {[state.list.findIndex(elem => elem.id == action.file.id)]: {$merge: {isUploading: true}}},
    });
  case UPLOAD_FILE_SUCCESS:
    return update(state, {
      list: {[state.list.findIndex(elem => elem.id == action.localId)]: {$set: action.file}},
    });
  case UPLOAD_FILE_FAILURE:
    return update(state, {
      list: {[state.list.findIndex(elem => elem.id == action.file.id)]: {$merge: {isUploading: false, isUploadFalied: true}}},
    });
  case DELETE_FILE_REQUEST:
    return Object.assign({}, state, {
      isUpdating: true,
    });
  case DELETE_FILE_SUCCESS:
    return update(state, {
      list: {$splice: [[state.list.findIndex(elem => elem.id == action.id), 1]]},
    });
  case DELETE_FILE_FAILURE:
    return Object.assign({}, state, {
      isUpdating: false,
    });
  case UPDATE_FILE_SUCCESS:
    return update(state, {
      list: {$apply: list => {
        return list.map(file => {
          let updatedFile = action.files.find(elem => elem.id == file.id);
          return updatedFile ? updatedFile : file;
        });
      }},
    });
  case INSTOCK_REQUEST:
    return Object.assign({}, state, {
      isUpdating: true,
    });
  case INSTOCK_SUCCESS:
  case INSTOCK_FAILURE:
    return Object.assign({}, state, {
      isUpdating: false,
    });
  default:
    return state;
  }
}

function currentAlbumJson(state = {}, action) {
  switch(action.type) {
  case OPEN_ALBUM_OK:
    return update(state, { $set: action.albumJSON });
  default:
    return state;
  }
}

function displayMode(state = 'folder', action) {
  switch(action.type) {
  case OPEN_FOLDER_OK:
    return update(state, { $set: 'folder' });
  case OPEN_ALBUM_OK:
    return update(state, { $set: 'album' });
  default:
    return state;
  }
}

function selectedFiles(state = [], action) {
  switch (action.type) {
  case TOGGLE_FILE_SELECTION:
    if (action.ctrlKey) {
      return state.includes(action.fileId) ? state.filter(fileId => fileId != action.fileId) : [...state, action.fileId];
    } else {
      return [action.fileId];
    }
  case SELECT_ALL_FILES:
    return action.ids;
  case REVERS_FILE_SELECTION:
    return action.ids;
  case FETCH_FOLDER_REQUEST:
    return [];
  case DELETE_FILE_SUCCESS:
    return [];
  case UPDATE_FILE_REQUEST:
  case INSTOCK_REQUEST:
    return [];
  case TOGGLE_IMG_RESET:
    return [];
  default:
    return state;
  }
}

function detailModal(state = {
  isOpen: false,
  //files: [],
}, action) {
  switch (action.type) {
  case TOGGLE_DETAIL_MODAL:
    return Object.assign({}, state, {
      isOpen: !state.isOpen,
      //files: state.isOpen ? [] : action.files,
      //type: action.auditType,
    });
  case UPDATE_FILE_SUCCESS:
    return Object.assign({}, state, {
      isOpen: false,
    });
  default:
    return state;
  }
}

//获取下载list
function downList(state = {}, action) {
  switch(action.type) {
  case GET_DOWN_LIST_OK:
    return update(state, { $set: action.downlist });
  default:
    return state;
  }
}

function aLiYunParams(state = {}, action) {
  switch(action.type) {
  case GET_ALIYUN_PARAMS_OK:
    return update(state, { $set: action.data });
  default:
    return state;
  }
}

function search_keywords(state = '', action) {
  switch(action.type) {
  case CHANGE_KEY_WORDS:
    return update(state, { $set: action.data });
  case CLEAR_KEYWORLDS_OK:
    return update(state, { $set: action.data });
  default:
    return state;
  }
}

function btnFlag(state = '', action) {
  switch(action.type) {
  case 'ORDER_OK':
    return update(state, { $set: action.flag });
  default:
    return state;
  }
}

//album是 编辑/新建，modal是 开/关 存在下面的结构
function fileModalInfo(state = {
  isNew: false,
  isOpen: false,
}, action) {
  switch(action.type) {
  case SHOW_File_MODAL:
    return update(state, { isNew: { $set: action.isNew }, isOpen: { $set: true } });
  case HIDE_FILE_MODAL:
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
  case MODIFY_ALBUM_TITLE:
    return update(state, { title: { $set: action.value } });
  case MODIFY_ALBUM_CAPTION:
    return update(state, { caption: { $set: action.value } });
  case MODIFY_ALBUM_KEYWORDS:
    return update(state, { keywords: { $set: action.value } });
  case CLEAR_ALBUM_INFO:
    return update(state, {
      title: { $set: '' },
      caption: { $set: '' },
      keywords: { $set: [] },
    });
  //从服务端获取（编辑情况下），jsx将数据填入页面
  case GOT_ALBUM_INFO: {
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

//新建album或者更新album成功后返回的最新album信息
function retAlbumInfo(state = {}, action) {
  switch(action.type) {
  case CREATE_NEW_ALBUM_OK:
    return update(state, { $set: action.album });
  case UPDATE_ALBUM_OK:
    return update(state, { $set: action.album });
  default:
    return state;
  }
}

function curSelectedAlbum(state = {}, action) {
  switch(action.type) {
  case RECORD_CUR_ALBUM:
    return update(state, { $set: action.album });
  default:
    return state;
  }
}

function albumAssetType(state = '', action) {
  switch(action.type) {
  case CHANGE_ALBUM_FILTER_OK:
    return action.assetType;
  default:
    return state;
  }
}

function albums(state = [], action) {
  switch(action.type) {
  case GET_ALBUMS_OK_UPLOAD:
    return update(state, { $set: action.albums });
  // case CLEAR_ALBUMLIST_OK:
  //   return update(state, { $set: [] });
  default:
    return state;
  }
}

function isShowInstockConfirm(state = false, action) {
  switch(action.type) {
  case SHOW_INSTOCK_CONFIRM:
    return update(state, { $set: true });
  case HIDE_INSTOCK_CONFIRM:
    return update(state, { $set: false });
  default:
    return state;
  }
}

function howtoalbum(state = 'notSearchTo', action) {
  switch(action.type) {
  case ENTER_ALBUM_OK:
    return update(state, { $set: action.strMethod });
  default:
    return state;
  }
}

const uploads = combineReducers({
  howtoalbum,
  isShowInstockConfirm,
  folders,
  assetType,
  selectedFolder,
  selectedFiles,
  detailModal,
  isShowTree_upload,
  downList,
  aLiYunParams,
  search_keywords,
  btnFlag,
  fileModalInfo,
  curSelectedAlbum,
  albumInfo,
  retAlbumInfo,
  displayMode,
  currentAlbumJson,
  albumAssetType,
  albums,
});

export default uploads;
