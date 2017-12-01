import { combineReducers } from 'redux';
import update from 'immutability-helper';

import {CHANGE_FILTER_SEARCH, SEARCH_REQUEST_SEARCH, SEARCH_SUCCESS_SEARCH, TOGGLE_FILE_SELECTION_SEARCH, DOWNLOAD_VCG_FAILURE, FAVARITE_SUCCESS,
   SELECT_ALL_SEARCH, REVERSE_SEARCH, SHOW_MODAL_SEARCH, HIDE_MODAL_SEARCH, DOWNLOAD_VCG_REQUEST, DOWNLOAD_VCG_SUCCESS, FAVARITE_REQUEST,
   FAVARITE_FAILURE, FILTER_FAVARITE, SELECT_FAVARITE, RESET_VCG_SEARCH, ADD_VCG_FAVARITE_REQUEST, ADD_VCG_FAVARITE_SUCCESS,
   ADD_VCG_FAVARITE_FAILED, ADD_VCG_FAVARITE_REQUEST1, ADD_VCG_FAVARITE_SUCCESS1, ADD_VCG_FAVARITE_FAILED1, DELETE_VCG_FAVARITE_REQUEST,
   DELETE_VCG_FAVARITE_SUCCESS, DELETE_VCG_FAVARITE_FAILED, FETCH_VCG_DETAIL_SUCCESS} from './action';

function filter(state={
  nums : 50,
  keyword : '',
  likeId :'',
  likedUrl:'',
  page : 1,
  type : 'Creative',
  license_type:'',
  sort:'best',
  orientation:'',
  graphical_style:'',
}, action) {
  switch (action.type) {
  case CHANGE_FILTER_SEARCH:
    if(action.data.keyword&&state.keyword!=action.data.keyword) {
      action.data.page=1;
    }
    return Object.assign({}, state, action.data);
  case RESET_VCG_SEARCH:
    return {
      nums : 50,
      keyword : '',
      likeId :'',
      page : 1,
      type : 'Creative',
      likedUrl:'',
      license_type:'',
      sort:'best',
      orientation:'',
      graphical_style:'',
    };
  default:
    return state;
  }
}

function vcgImages(state={first:true}, action) {
  switch (action.type) {
  case SEARCH_REQUEST_SEARCH:
    return Object.assign({}, action.data);
  case SEARCH_SUCCESS_SEARCH:
    return Object.assign({}, action.data);
  case ADD_VCG_FAVARITE_SUCCESS1: {
    let dd = state.list.map(x=>{
      if(action.data.find(y=>x.id==y.vcgId)) {
        x.isfavorite=true;
      }
      return x;
    });
    return update(state, {
      list: {$set: dd},
    });
  }
  case DELETE_VCG_FAVARITE_SUCCESS: {
    let idArr = action.data.split(',');
    let dd = state.list.map(x=>{
      if(idArr.find(y=>x.id==y)) {
        x.isfavorite=false;
      }
      return x;
    });
    return update(state, {
      list: {$set: dd},
    });
  }
  case FETCH_VCG_DETAIL_SUCCESS: {
    let details = action.data;
    let list1 = state.list.map((x, i)=>{
      x.middle_url = details[i].images_data.middle_url;
      x.origen_pic_type = details[i].images_data.origen_pic_type;
      x.keywords = details[i].images_data.keywords;
      x.copyright = details[i].images_data.copyright;
      x.asset_family = details[i].images_data.asset_family;
      if(details[i].group_data&&details[i].group_data.length>0) {
        x.groupTitle = details[i].group_data[0].groupTitle;
        x.groupExplain = details[i].group_data[0].groupExplain;
      }
      return x;
    });
    return update(state, {
      list: {$set: list1},
    });
  }  
  case RESET_VCG_SEARCH:
    return {first:true};
  default:  
    return state;
  }
}

function selectedFiles(state = [], action) {
  switch (action.type) {
  case TOGGLE_FILE_SELECTION_SEARCH:
    if (action.ctrlKey)
      return state.find((fil)=>fil.id == action.imgObj.id) ? state.filter(fil => fil.id != action.imgObj.id) : [...state, action.imgObj];
    else
      return [action.imgObj];
  case SELECT_ALL_SEARCH:
    return action.imgobjs;
  case CHANGE_FILTER_SEARCH:
    return [];  
  case REVERSE_SEARCH:
    return action.imgobjs;
  case DOWNLOAD_VCG_SUCCESS:
    return [];
  case RESET_VCG_SEARCH:
    return [];
  default:
    return state;
  }
}

function selectedFavarite(state = [], action) {
  switch (action.type) {
  case SELECT_FAVARITE:
    if (action.ctrlKey)
      return state.find((fil)=>fil.id == action.imgObj.id) ? state.filter(fil => fil.id != action.imgObj.id) : [...state, action.imgObj];
    else
      return [action.imgObj];
  case DOWNLOAD_VCG_SUCCESS:
    return [];
  case RESET_VCG_SEARCH:
    return [];
  case DELETE_VCG_FAVARITE_SUCCESS:
    return [];
  default:
    return state;
  }
}
function toggleModal(state = false, action) {
  switch (action.type) {
  case SHOW_MODAL_SEARCH:
    return true;
  case HIDE_MODAL_SEARCH:
    return false;
  case DOWNLOAD_VCG_SUCCESS:
    return false;
  case RESET_VCG_SEARCH:
    return false;
  default:
    return state;
  }
}
function downStatus(state = false, action) {
  switch (action.type) {
  case DOWNLOAD_VCG_REQUEST:
    return true;
  case DOWNLOAD_VCG_SUCCESS:
    return false;
  case DOWNLOAD_VCG_FAILURE:
    return false;
  case RESET_VCG_SEARCH:
    return false;
  default:
    return state;
  }
}

function favariteStatus(state = false, action) {
  switch (action.type) {
  case ADD_VCG_FAVARITE_REQUEST:
    return true;
  case ADD_VCG_FAVARITE_SUCCESS:
    return false;
  case ADD_VCG_FAVARITE_FAILED:
    return false;
  case DELETE_VCG_FAVARITE_REQUEST:
    return true;
  case DELETE_VCG_FAVARITE_SUCCESS:
    return false;
  case DELETE_VCG_FAVARITE_FAILED:
    return false;  
  case ADD_VCG_FAVARITE_REQUEST1:
    return true;
  case ADD_VCG_FAVARITE_SUCCESS1:
    return false;
  case ADD_VCG_FAVARITE_FAILED1:
    return false;  
  case RESET_VCG_SEARCH:
    return false;
  default:
    return state;
  }
}

function favariteImgs(state = {list:[]}, action) {
  switch (action.type) {
  case FAVARITE_REQUEST:
    return {};
  case FAVARITE_SUCCESS:
    return action.data;
  case ADD_VCG_FAVARITE_SUCCESS1: {
    let dd = action.data.map(x=>{
      return {basic:{providerId:'vcg', providerName:'vcg'}, detail:x};
    });
    return update(state, {
      list: {$unshift: dd},
    });
  }
  case DELETE_VCG_FAVARITE_SUCCESS: {
    let idsArr = action.data.split(',');
    console.log(idsArr);
    let dd = state.list.filter(x=>{
      if(idsArr.find(y=>x.detail.vcgId==y)) {
        return false;
      }else {
        return true;
      }
    });
    return update(state, {
      list: {$set: dd},
    });
  }   
  case FAVARITE_FAILURE:
    return {};
  default:
    return state;
  }
}

function filterFavarite(state = {pageNum:1, pageSize:21}, action) {
  switch (action.type) {
  case FILTER_FAVARITE:
    return Object.assign(state, action.data);
  default:
    return state;
  }
}


const visualChina = combineReducers({
  filter,
  vcgImages,
  filterFavarite,
  selectedFiles,
  selectedFavarite,
  favariteImgs,
  toggleModal,
  downStatus,
  favariteStatus,
});

export default visualChina;
