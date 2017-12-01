import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux';
import userMaster from './user';
import resources from './resources';
import login from './login';
import privileges from './privileges';
import uploads from './uploads';
import check from './check';
import usercenter from './usercenter';
import audit from './audit';
import folderPermissions from './folderPermissions';
import locale from './locale';
import home from './home';
import apiClient from './apiClient';
import visualChina from '../pages/visualChina/reducer';
import resourceManage from '../pages/resourceManage/reducer';
import permissions_reducer from '../pages/user-management/reducer';
import contractInfo from '../pages/contract/reducer';
import myFavorite from '../pages/myResources/reducerFavorite';
import myDownload from '../pages/myResources/reducerDownload';
const rootReducer = (state, action) => {
  if (action.type == 'RESET') {
    const {router} = state;
    state = {router};
  }
  return appReducer(state, action);
};

const appReducer = combineReducers({
  router: routerReducer,
  resources,
  resourceManage,
  login,
  audit,
  // session,
  privileges,
  myFavorite,
  myDownload,
  uploads,
  check,
  usercenter,
  folderPermissions,
  locale,
  userMaster,
  permissions_reducer,
  contractInfo,
  home,
  apiClient,
  visualChina,
});

export default rootReducer;
