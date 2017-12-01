import {baseAPI, customFetch} from '../apis';
import {FolderItemsApiFp, ImagesApiFp, FoldersApiFp } from '../apis/resourceApi';

const checkActionTypes = {
  'PENDING_LIST_SUCCESS':'PENDING_LIST_SUCCESS',
  'PENDING_LIST_FAILURE':'PENDING_LIST_FAILURE',

  'QUERY_IMG_LIST_SUCCESS':'QUERY_IMG_LIST_SUCCESS',
  'QUERY_IMG_LIST_FAILURE':'QUERY_IMG_LIST_FAILURE',

  'UPDATE_IMG_STATUS_SUCCESS':'UPDATE_IMG_STATUS_SUCCESS',

  'TOGGLE_IMG_SELECTION' : 'TOGGLE_IMG_SELECTION',
  'TOGGLE_IMG_SELECTALL' : 'TOGGLE_IMG_SELECTALL',
  'TOGGLE_IMG_SELECTINVERT' : 'TOGGLE_IMG_SELECTINVERT',
  'TOGGLE_IMG_ROWS' : 'TOGGLE_IMG_ROWS',
  'TOGGLE_IMG_SORT': 'TOGGLE_IMG_SORT',
  'TOGGLE_IMG_RESET': 'TOGGLE_IMG_RESET', //清楚所有选择的图片
  'SELECT_FOLDER': 'SELECT_FOLDER',
  'DOWNLOAD_SUCCESS': 'DOWNLOAD_SUCCESS',
  'DOWNLOAD_FAILURE': 'DOWNLOAD_FAILURE',
  'DOWNLOAD_REQUEST': 'DOWNLOAD_REQUEST',
  'FAVORITE_SUCCESS': 'FAVORITE_SUCCESS',
  'FAVORITE_FAILURE': 'FAVORITE_FAILURE',
  'FAVORITE_REQUEST': 'FAVORITE_REQUEST',
};

export const FETCH_ONLINE_RESOURCES_REQUEST = 'FETCH_ONLINE_RESOURCES_REQUEST';
//列表页中选择图片列
export function selectedImgRow(dispatch, imgsId) {
  return dispatch({
    type: checkActionTypes.TOGGLE_IMG_ROWS,
    imgsId:imgsId,
  });
}

//获取图片列表
export function getPendingList(dispatch, params) {

  return FolderItemsApiFp.folderitemsFolderIdGet(params)(customFetch, baseAPI)
  .then((res)=>{
    dispatch({
      type: checkActionTypes.PENDING_LIST_SUCCESS,
      folderPendingList: res.list,
    });
  }).catch(()=>{
    dispatch({
      type: checkActionTypes.PENDING_LIST_SUCCESS,
    });
  });
}

//获取已上线资源列表,也就是审核通过入库的资源在企业资源库中能看见，如果是album下的操作，params中要带groupId
export function getOnlineList(params, filterChanged) {
  console.log('params =====getOnlineList===================》======= ', params);
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_ONLINE_RESOURCES_REQUEST,
    });
    if(filterChanged) {
      let { folders } = getState().uploads;
      let folderIds = folders.map(x=>x.id);
      let pam = {
        folderIds,
        assetType: params.assetType,
        reviewState: 'PASSED',
        onlineState: 'ONLINE',
      };
      Promise.all([FoldersApiFp.foldersCountPost(pam)(customFetch, baseAPI), FolderItemsApiFp.folderitemsV2FolderIdGet(params)(customFetch, baseAPI)])
      .then(all => {
        let counts = all[0];
        let res = all[1];
        folders.map(item => {
          if(counts[item.id]) {
            item.assetsCount = counts[item.id]['count'];
            item.hasManyAssets = counts[item.id]['hasManyAssets'];
          }
          return item;
        });
        if(params.groupId) {
          dispatch({
            type: 'OPEN_ALBUM_QYZYK_OK',
            albumJSON: res,
          });
        } else {
          dispatch({
            type: 'OPEN_FOLDER_QYZYK_OK',
          });
        }
        console.log('res ====if========= ', res);
        dispatch({
          type: 'FETCH_ONLINE_RESOURCES_SUCCESS',
          pagedImages: res,
        });
        dispatch({type: 'TOGGLE_IMG_RESET'});
        dispatch({ type: 'FETCH_FOLDERS_SUCCESS', folders});
      });
    } else {
      FolderItemsApiFp.folderitemsV2FolderIdGet(params)(customFetch, baseAPI)
      .then(res => {
        if(params.groupId) {
          dispatch({
            type: 'OPEN_ALBUM_QYZYK_OK',
            albumJSON: res, //res是服务器返回的带有分页信息、list的数据
          });
        } else {
          dispatch({
            type: 'OPEN_FOLDER_QYZYK_OK',
          });
        }
        console.log('res ====else========= ', res);
        console.log('params ====else========= ', params);
        dispatch({
          type: 'FETCH_ONLINE_RESOURCES_SUCCESS',
          pagedImages: res,
        });
        dispatch({type: 'TOGGLE_IMG_RESET'});
      }).catch(() => {
        dispatch({
          type: 'FETCH_ONLINE_RESOURCES_FAILUE',
        });
      });
    }
  };
}

//双击album的时候,记录当前所操作的album，以便有的地方会用上
//双击的时候，同时将filter_qyzyk(album模式的筛选)重置
export function recordCurSelectedAlbum_qyzyk(album) {
  return dispatch => {
    dispatch({
      type: 'RECORD_CUR_ALBUM_QYZYK',
      album,
    });
  };
}



//获取图片信息列表 与getPendingList有关系
export function getBetchImg(dispatch, params) {
  console.log('params===', params);
  if (params.ids.length == 0) {
    dispatch({
      type: checkActionTypes.QUERY_IMG_LIST_SUCCESS,
      imgsList: [],
    });
    return;
  }
  return ImagesApiFp.imagesBatchPost(params)(customFetch, baseAPI)
  .then((res)=>{
    dispatch({
      type: checkActionTypes.QUERY_IMG_LIST_SUCCESS,
      imgsList: res,
    });
  }).catch(()=>{
    dispatch({
      type: checkActionTypes.QUERY_IMG_LIST_FAILURE,
      imgsList:[],
    });
  });
}

export function toggleImgSelection(imgId, imgItems) {
  return {
    type: checkActionTypes.TOGGLE_IMG_SELECTION,
    imgId,
    imgItems,
  };
}

export function selectInvert(selectedImgs, allImgIds) {
  return {
    type: checkActionTypes.TOGGLE_IMG_SELECTINVERT,
    allImgIds,
    selectedImgs,
  };
}

export function selectAll(allImgIds, imgItems) {
  return {
    type: checkActionTypes.TOGGLE_IMG_SELECTALL,
    allImgIds,
    imgItems,
  };
}

export function handlerImgStatus(dispatch, params) {
  return ImagesApiFp.imagesIdReviewPut(params)(customFetch, baseAPI)
  .then((res)=>{
    dispatch({
      type: checkActionTypes.UPDATE_IMG_STATUS_SUCCESS,
      imgs: res,
    });
  }).catch((res)=>{
    console.log('res=============', res);
  });
}

export function selectFolder(dispatch, ids) {
  if((typeof ids) == 'object') {
    dispatch({
      type: checkActionTypes.SELECT_FOLDER,
      folder: {id: ids[0]},
    });
  } else if ((typeof ids) == 'string') {
    dispatch({
      type: checkActionTypes.SELECT_FOLDER,
      folder: {id: ids},
    });
  }
  dispatch({
    type: checkActionTypes.TOGGLE_IMG_RESET,
  });
}

//排序参数
export function orderImgsBy(dispatch, filter) {
  return dispatch({
    type: 'USER_RESOURCES_TOGGLE_IMG_SORT',
    filter,
  });
}

export function changeAlbumFilter_qyzyk(filter) {
  return dispatch => {
    dispatch({
      type: 'CHANGE_ALBUM_FILTER_QYZYK',
      filter,
    });
  };
}
