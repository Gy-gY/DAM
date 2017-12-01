import update from 'immutability-helper';
import {API, baseAPI, customFetch} from '../../apis';
import {notification, Modal} from 'antd';
const confirm = Modal.confirm;
import { push } from 'react-router-redux';
const UserApiFp = API.nodeAPI.UserApiFp;
export const CHANGE_FILTER_SEARCH = 'CHANGE_FILTER_SEARCH';
export const SEARCH_REQUEST_SEARCH = 'SEARCH_REQUEST_SEARCH';
export const SEARCH_SUCCESS_SEARCH = 'SEARCH_SUCCESS_SEARCH';
export const TOGGLE_FILE_SELECTION_SEARCH = 'TOGGLE_FILE_SELECTION_SEARCH';
export const SELECT_ALL_SEARCH = 'SELECT_ALL_SEARCH';
export const REVERSE_SEARCH = 'REVERSE_SEARCH';
export const SHOW_MODAL_SEARCH = 'SHOW_MODAL_SEARCH';
export const HIDE_MODAL_SEARCH = 'HIDE_MODAL_SEARCH';
export const DOWNLOAD_VCG_REQUEST = 'DOWNLOAD_VCG_REQUEST';
export const DOWNLOAD_VCG_SUCCESS = 'DOWNLOAD_VCG_SUCCESS';
export const DOWNLOAD_VCG_FAILURE = 'DOWNLOAD_VCG_FAILURE';

export const FAVARITE_SUCCESS = 'FAVARITE_SUCCESS';
export const FAVARITE_REQUEST = 'FAVARITE_REQUEST';
export const FAVARITE_FAILURE = 'FAVARITE_FAILURE';

export const FILTER_FAVARITE = 'FILTER_FAVARITE';
export const SELECT_FAVARITE = 'SELECT_FAVARITE';
export const RESET_VCG_SEARCH = 'RESET_VCG_SEARCH';

export const ADD_VCG_FAVARITE_REQUEST = 'ADD_VCG_FAVARITE_REQUEST';
export const ADD_VCG_FAVARITE_SUCCESS = 'ADD_VCG_FAVARITE_SUCCESS';
export const ADD_VCG_FAVARITE_FAILED = 'ADD_VCG_FAVARITE_FAILED';

export const ADD_VCG_FAVARITE_REQUEST1 = 'ADD_VCG_FAVARITE_REQUEST1';
export const ADD_VCG_FAVARITE_SUCCESS1 = 'ADD_VCG_FAVARITE_SUCCESS1';
export const ADD_VCG_FAVARITE_FAILED1 = 'ADD_VCG_FAVARITE_FAILED1';

export const DELETE_VCG_FAVARITE_REQUEST = 'DELETE_VCG_FAVARITE_REQUEST';
export const DELETE_VCG_FAVARITE_SUCCESS = 'DELETE_VCG_FAVARITE_SUCCESS';
export const DELETE_VCG_FAVARITE_FAILED = 'DELETE_VCG_FAVARITE_FAILED';
export const FETCH_VCG_DETAIL_SUCCESS = 'FETCH_VCG_DETAIL_SUCCESS';


const logout = function(dispatch) {
  UserApiFp.logoutPost()(customFetch, baseAPI)
  .then(() => {
    dispatch(push('/login'));
  });
};
export function resetVcgSearch() {
  return {
    type: RESET_VCG_SEARCH,
  };
}

export function selectFavarite(imgObj, event) {
  return {
    type: SELECT_FAVARITE,
    imgObj,
    ctrlKey: event.ctrlKey||event.metaKey,
  };
}
export function deleteFavarite(ids) {
  return (dispatch, getState) => {
    let uid = getState().login.currentUser.userId;
    dispatch({type:DELETE_VCG_FAVARITE_REQUEST});
    customFetch(`${baseAPI}/favorite/deleteVcg?user_id=${uid}&vcg_ids=${ids}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
      if(response.status==200) {
        dispatch({type:DELETE_VCG_FAVARITE_SUCCESS, data:ids});
        notification.success({message: '取消收藏成功！'});
      }else if(response.status==401) {
        logout(dispatch);
      }else {
        dispatch({type:DELETE_VCG_FAVARITE_FAILED});
        notification.error({message: '取消收藏失败！'});
      }
    }).catch(err => {
      dispatch({type:DELETE_VCG_FAVARITE_FAILED});
      notification.error({message: '取消收藏失败！', description:err});
      throw new Error(err);
    });
  };
}
export function addFavariteForList(files) {
  return (dispatch, getState) => {
    let uid = getState().login.currentUser.userId;
    let filter = getState().visualChina.filterFavarite;

    dispatch({type:ADD_VCG_FAVARITE_REQUEST1});
    let datas = files.map(file=>{
      console.log('list  file ==== ', file);
      let aa = file.asset_family=='creative'?'Creative':'Edit';
      let data2 = JSON.stringify({id:file.id, caption:file.caption, license_type:file.license_type, small_url:file.small_url, asset_family:aa});
      let data = {
        //assetId:file.res_id,
        assetType:1,
        createdTime:file.online_time,
        detailInfo:data2,
        smallImg:file.small_url,
        title:filter.type=='Creative'?file.title:file.groupTitle,
        userId:uid,
        vcgId:file.id,
      };
      return data;
    });
    console.log('datas ===|||||||||==== ', datas);
    customFetch(`${baseAPI}/favorite/createVcg?user_id=${uid}`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(datas),
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
      if(response.status==200) {
        response.json().then(()=>{
          dispatch({type:ADD_VCG_FAVARITE_SUCCESS1, data:datas});
          notification.success({message: '添加收藏成功！'});
        });
      }else if(response.status==401) {
        logout(dispatch);
      }else {
        dispatch({type:ADD_VCG_FAVARITE_FAILED1});
        notification.error({message: '添加收藏失败！', description:response.status});
      }
    }).catch(err => {
      dispatch({type:ADD_VCG_FAVARITE_FAILED1});
      notification.error({message: '添加收藏失败！', description:err});
      logout(dispatch);
      throw new Error(err);
    });
  };
}

export function addFavarite() {
  return (dispatch, getState) => {
    let selectedFavarite = getState().visualChina.selectedFavarite;
    let favariteImgs = getState().visualChina.favariteImgs.list;
    let uid = getState().login.currentUser.userId;
    dispatch({type:ADD_VCG_FAVARITE_REQUEST});
    let data = selectedFavarite.map(x=>{
      return favariteImgs.find(y=>y.detail.vcgId==x.id).detail;
    });
    customFetch(`${baseAPI}/favorite/createVcg?user_id=${uid}`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
      if(response.status==200) {
        response.json().then(()=>{
          dispatch({type:ADD_VCG_FAVARITE_SUCCESS, data:data});
          notification.success({message: '添加收藏成功！'});
        });
      }else if(response.status==401) {
        logout(dispatch);
      }else {
        dispatch({type:ADD_VCG_FAVARITE_FAILED});
        notification.error({message: '添加收藏失败！', description:response.status});
      }
    }).catch(err => {
      dispatch({type:ADD_VCG_FAVARITE_FAILED});
      notification.error({message: '添加收藏失败！', description:err});
      logout(dispatch);
      throw new Error(err);
    });
  };
}
export function fetchFavarite(data) {
  return (dispatch, getState) => {
    dispatch({type:FAVARITE_REQUEST});
    let filter = getState().visualChina.filterFavarite;
    if(data) {
      dispatch({type:FILTER_FAVARITE, data});
      filter = Object.assign(filter, data);
    }
    let userId = getState().login.currentUser.userId;
    let querys = `?user_id=${userId}&asset_type=1&source=2&pageNum=${filter.pageNum}&pageSize=${filter.pageSize}`;
    customFetch(`${baseAPI}/favorite/pageList${querys}`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
      if(response.status==200) {
        response.json().then(data=>{
          //console.log(data.keyWord);
          dispatch({type:FAVARITE_SUCCESS, data:data});
        });
      }else if(response.status==401) {
        logout(dispatch);
      }else {
        dispatch({type:FAVARITE_FAILURE});
        //throw new Error(err);
      }
      //alert(data.json().keyWord);
    }).catch(err => {
      dispatch({type:FAVARITE_FAILURE});
      logout(dispatch);
      throw new Error(err);
    });
  };
}

export function changeKeyword(x) {
  return (dispatch, getState) => {
    let filter = getState().visualChina.filter;
    let newfilter = Object.assign({}, filter, {keyword:x});
    dispatch({type:CHANGE_FILTER_SEARCH, data:newfilter});
  };
}

export function vcgSearch(data) {
  return (dispatch, getState) => {
    dispatch({type:SEARCH_REQUEST_SEARCH, data:{isLoading:true}});
    let filter = getState().visualChina.filter;
    let uid = getState().login.currentUser.userId;
    let newfilter = filter;
    if(data) {
      if(data.type=='Edit') {
        if(!getState().login.currentUser.permissions.includes('vcg_edit_view')) {
          data.type=='Creative';
        }
        data.likeId = '';
        data.likedUrl = '';
        data.page=1;
        data.graphical_style = '';
        filter.graphical_style = '';
        data.sort='time';
      }else if(data.type=='Creative') {
        if(!getState().login.currentUser.permissions.includes('vcg_view')) {
          data.type=='Edit';
        }
        data.page=1;
        data.graphical_style = '';
        filter.graphical_style = '';
        data.sort='best';
      }
      if(data.likeId&&data.likeId.length>0) {
        data.keyword = '';
      }
      if(data.keyword&&data.keyword.length>0) {
        data.likeId = '';
        data.likedUrl = '';
      }
      newfilter = Object.assign({}, filter, data);
      dispatch({type:CHANGE_FILTER_SEARCH, data:newfilter});
    }

    let querys = `?keyword=${newfilter.keyword}&page=${newfilter.page}&nums=${newfilter.nums}&type=${newfilter.type}&license_type=${newfilter.license_type}&sort=${newfilter.sort}&orientation=${newfilter.orientation}&graphical_style=${newfilter.graphical_style}&uid=${uid}`;
    let searchUrl = encodeURI(`${baseAPI}/vcgSearch${querys}`);
    if(newfilter.likeId&&newfilter.likeId.length>0) {
      querys = `?likeId=${newfilter.likeId}&page=${newfilter.page}&nums=${newfilter.nums}&license_type=${newfilter.license_type}&orientation=${newfilter.orientation}&graphical_style=${newfilter.graphical_style}`;
      searchUrl = `${baseAPI}/vcgSearchByImg${querys}`;
    }
    customFetch(searchUrl, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
      if(response.status==200) {
        response.json().then(data=>{
          //console.log(data.keyWord);
          if(data.total_count>(newfilter.nums*1000)) {
            data.total_count = newfilter.nums*1000;
          }
          dispatch({type:SEARCH_SUCCESS_SEARCH, data:data});
          if(newfilter.type=='Edit') {
            let ids = data.list.map(x=>x.id).join(',');
            let u = `${baseAPI}/getEditDetails?ids=${ids}`;
            customFetch(u, {
              credentials: 'include',
              method: 'GET',
              headers: {'Content-Type': 'application/json'},
            })
            .then(response => {
              if(response.status==200) {
                response.json().then(data2=>{
                  dispatch({type:FETCH_VCG_DETAIL_SUCCESS, data:data2});
                });
              }
            });
          }
        });
      }else if(response.status==401) {
        logout(dispatch);
      }
      //alert(data.json().keyWord);
    }).catch(err => {
      logout(dispatch);
      throw new Error(err);
    });
  };
}
export function downloadVcgImgs(ids, rfVcgids) {
  //const imgIds = params.imgIds;
  return (dispatch, getState) => {

    let currentUser = getState().login.currentUser;
    let dowAuth;
    let type;
    if(!type) {
      type = getState().visualChina.filter.type;
    }
    dowAuth = type=='Creative'?'vcg_download':'vcg_edit_download';
    let queyFr = rfVcgids?`&rfVcgids=${rfVcgids}`:'';
    if(currentUser.permissions.includes(dowAuth)) {
      let querys1 = `?vcgids=${ids}`;//downloadVCG
      customFetch(`${baseAPI}/assets/downloadCheck${querys1}`, {
        credentials: 'include',
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      }).then(response => {
        if(response.status==200) {
          response.json().then((checkDown)=>{
            if(checkDown.damDownload&&checkDown.damDownload.length>0) {
              confirm({
                title: '以下图片已购买过，将从企业资源库下载，请确认。',
                content: checkDown.damDownload.join(','),
                onOk: () => downVcg(querys1, queyFr, checkDown.damDownload.join(','), dispatch),
                onCancel: () => {
                  if(checkDown.vcgDownload&&checkDown.vcgDownload.length>0) {
                    let querys2id = checkDown.vcgDownload.join(',');
                    let querys2 = `?vcgids=${querys2id}`;
                    let queyFr2 = '';
                    if(rfVcgids) {
                      let rfidarr = rfVcgids.split(',');
                      let filtered = rfidarr.filter(x=>checkDown.vcgDownload.includes(x));
                      if(filtered&&filtered.length>0) {
                        let fst = filtered.join(',');
                        queyFr2 = `&rfVcgids=${fst}`;
                      }
                    }
                    downVcg(querys2, queyFr2, '', dispatch);
                  }
                },
              });
            }else {
              downVcg(querys1, queyFr, '', dispatch);
            }
          });
        }else if(response.status==401) {
          logout(dispatch);
        }
      });
    }else {
      let msg = type=='Creative'?'您没有创意类图片的下载权限！':'您没有编辑类图片的下载权限！';
      notification.error({message: msg});
      dispatch({
        type: DOWNLOAD_VCG_FAILURE,
      });
    }
  };
}

function downVcg(querys, queyFr, damIds, dispatch) {
  dispatch({
    type: DOWNLOAD_VCG_REQUEST,
  });
  let queryDamid = '';
  if(damIds&&damIds.length>0) {
    queryDamid = `&damIds=${queryDamid}`;
  }
  customFetch(`${baseAPI}/downloadVCG${querys}${queyFr}${queryDamid}`, {
    credentials: 'include',
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
  .then(response => {
    if(response.status==200) {
      response.json().then((res1)=>{
        const {url} = res1;
             //return fetch(url, {}).then(res => res.blob());
        return url;
      }).then((url) => {
        var a = document.createElement('a');
            //a.href = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = '';
        a.click();
        dispatch({
          type: DOWNLOAD_VCG_SUCCESS,
        });
      }).catch(() =>{
        dispatch({
          type: DOWNLOAD_VCG_FAILURE,
        });
      });
    }else if(response.status==401) {
      logout(dispatch);
    }else {
      response.json().then((res1)=>{
        notification.error({message: res1.message});
        dispatch({
          type: DOWNLOAD_VCG_FAILURE,
        });
      });
    }
  });
}

export function selectAll() {
  return (dispatch, getState) => {
    dispatch ({
      type: SELECT_ALL_SEARCH,
      imgobjs: getState().visualChina.vcgImages.list,
    });
  };
}
export function reversSelection() {
  return (dispatch, getState) => {
    let {vcgImages, selectedFiles} = getState().visualChina;
    let reversed = vcgImages.list.filter(file => {
      if(selectedFiles.find((fil) => (fil.id==file.id))) {
        return false;
      }else {
        return true;
      }
    });
    dispatch ({
      type: REVERSE_SEARCH,
      imgobjs: reversed,
    });
  };
}
export function selectImg_search(imgObj, event) {
  return {
    type: TOGGLE_FILE_SELECTION_SEARCH,
    imgObj,
    ctrlKey: event.ctrlKey||event.metaKey,
  };
}
export function showModal(imgObj, event) {
  return {
    type: SHOW_MODAL_SEARCH,
  };
}
export function hideModal(imgObj, event) {
  return {
    type: HIDE_MODAL_SEARCH,
  };
}
