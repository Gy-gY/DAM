import { combineReducers } from 'redux';
import update from 'immutability-helper';
function folderPendingList(state = {
  list: [],
  isFetching: false,
  lastUpdated: new Date(),
}, action) {
  switch (action.type) {
  case 'PENDING_LIST_SUCCESS':
    return Object.assign({}, state, {
      list: action.folderPendingList,
      isFetching: false,
      lastUpdated: new Date(),
    });
  case 'PENDING_LIST_FAILURE':
    return Object.assign({}, state, {
      list: [],
      isFetching: false,
      lastUpdated: new Date(),
    });

  default:
    return state;
  }
}

function imgsList(state = {
  imgs: [],
  isFetching: false,
  lastUpdated: new Date(),
}, action) {
  switch (action.type) {
  case 'QUERY_IMG_LIST_SUCCESS': {
    const list = action.imgsList;
    let allImgIds = [];
    if(list.length>0) {
      list.map((imgItem)=>{
        const {basic} = imgItem;
        allImgIds.push(basic.id);
      });
    }
    return Object.assign({}, state, {
      imgs: list,
      allImgIds : allImgIds,
      isFetching: false,
      lastUpdated: new Date(),
    });
  }
  case 'QUERY_IMG_LIST_FAILURE':
    return Object.assign({}, state, {
      imgs: action.imgsList,
      isFetching: false,
      lastUpdated: new Date(),
    });
  default:
    return state;
  }
}

function selectedImgs(state = {ids:[]}, action) {
  switch (action.type) {
  case 'TOGGLE_IMG_SELECTION':
    return {
      'ids':state.includes(action.imgId) ? state.filter(imgId => imgId != action.imgId) : [...state, action.imgId],
      'imgDetailList':action.imgDetailList,
    };
  case 'TOGGLE_IMG_SELECTALL':
    return{
      'ids':action.allImgIds,
      'imgDetailList':action.imgItems,
    };
  case 'TOGGLE_IMG_RESET':
    return [];
  case 'TOGGLE_IMG_SELECTINVERT':
    console.log('selectedImgs=TOGGLE_IMG_SELECTINVERT===', action);
    return {
      'ids':action.allImgIds.filter((imgId)=>{
        return imgId != action.selectedImgs.ids.filter((selectedId)=>{
          return selectedId==imgId;
        });
      }),
      'imgDetailList':action.allImgIds,
    };
  default:
    return state;
  }
}

function selectedImgRow(state = [], action) {
  switch (action.type) {
  case 'TOGGLE_IMG_ROWS':
    return {imgsId:action.imgsId};
  default:
    return state;
  }
}

// 过滤和排序参数,仅用于folder模式
function filterOrder( state = {
  assetType : '',
  orderType: 'TIME_DESC',
  pageSize: 60,
  pageNum: 1,
}, action) {
  switch (action.type) {
  case 'USER_RESOURCES_TOGGLE_IMG_SORT':
    return Object.assign({}, state, action.filter);
  default:
    return state;
  }
}

//下面的filter，用于album模式
function filter_qyzyk(state = {
  assetType: '',
  orderBy: 'TIME_DESC',
  pageSize: 60,
  pageNum: 1,
}, action) {
  switch(action.type) {
  case 'CHANGE_ALBUM_FILTER_QYZYK':
    return Object.assign({}, state, action.filter);
  case 'RECORD_CUR_ALBUM_QYZYK':
    return update(state, {
      assetType: { $set: '' },
      orderBy: { $set: 'TIME_DESC' },
      pageSize: { $set: 60 },
      pageNum: { $set: 1 },
    });
  default:
    return state;
  }
}

// 选择树的节点
export function selectedFolder(state = {}, action) {
  switch (action.type) {
  case 'SELECT_FOLDER':
    return Object.assign({}, state, action.folder);
  default:
    return state;
  }
}

export function qyzyk_DisplayMode(state = 'folder', action) {
  switch(action.type) {
  case 'OPEN_FOLDER_QYZYK_OK':
    return update(state, { $set: 'folder' });
  case 'OPEN_ALBUM_QYZYK_OK':
    return update(state, { $set: 'album' });
  case 'OPEN_FOLDER_QYZYK_OK_SEARCH':
    return update(state, { $set: 'folder' });
  default:
    return state;
  }
}

function qyzyk_CurrentAlbumJson(state = {}, action) {
  switch(action.type) {
  case 'OPEN_ALBUM_QYZYK_OK':
    return update(state, { $set: action.albumJSON });
  default:
    return state;
  }
}

function qyzyk_CurSelectedAlbum(state = {}, action) {
  switch(action.type) {
  case 'RECORD_CUR_ALBUM_QYZYK':
    console.log('reducer:::::::::::::::::::::::action.album::::', action.album);
    return update(state, { $set: action.album });
  default:
    return state;
  }
}

const check = combineReducers({
  folderPendingList,
  imgsList,
  selectedImgs,
  selectedImgRow,
  filterOrder,
  filter_qyzyk,
  selectedFolder,
  qyzyk_DisplayMode,
  qyzyk_CurSelectedAlbum,
  qyzyk_CurrentAlbumJson,
});

export default check;
