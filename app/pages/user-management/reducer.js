import { combineReducers } from 'redux';
import {
  FETCH_PERMISSIONLIST_SUCCESS,
  FETCH_ROLELIST_SUCCESS,
  FETCH_USERLIST_SUCCESS,
  FETCH_ROLELIST_INUSER_SUCCESS,
  FETCH_PERMISSIONS_BY_ROLEIDS_SUCCESS,
  ADD_USER_CHANGE_USERNAME,
  ADD_USER_CHANGE_REALNAME,
  ADD_USER_CHANGE_PHONE,
  ADD_USER_CHANGE_EMAIL,
  ADD_USER_CHANGE_ROLES,
  ADD_USER_CHANGE_PERMISSION,
  ADD_USER_CHANGE_FOLDER_PERMISSIONS,
  ADD_USER_CHANGE_MAX_DOWN,

  FETCH_FOLDERS_INUSER_OK,
  FETCH_FOLDERS_INUSER_REQUEST,
  QUERY_USER_INFO_OK,

  QUERY_USER_INFO_REQUEST,

  ADD_ROLE_CHANGE_NAME,
  ADD_ROLE_CHANGE_DESCRIPTION,
  ADD_ROLE_CHANGE_ROLEPERMISSIONS,
  FETCH_PERMISSIONS_BY_ROLEIDS_REQUEST,
  FETCH_ROLELIST_INUSER_REQUEST,

  //获取某条角色信息
  FETCH_ROLE_BYID_OK,

  ADD_USER_RRROLES,

  CLEAR__USER_INFO,
  CLEAR_ROLE_INFO,

  ACCEPT_ROLE_RECORD_OK,

  ADD_USER_CHANGE_FOLDERS,
  ADD_USER_FOLDERS,

  ADD_USER_MONEY_AMOUNT,
  STOP_USER_OK,

  CHECKOUT_BLUR_DATA,

  UPDATE_NEWUSERINFOR_SUCCESS,
  SAVE_SERVER_RETURN,
  POST_NEWROLEINFOR_SUCCESS,
  RESET_USERPWD_OK,
  UPDATE_ROLEINFOR_OK,
 } from './action';
import update from 'immutability-helper';

const fetchedPermission = (state = {
  permissionData: [],
}, action) => {
  switch(action.type) {
  case FETCH_PERMISSIONLIST_SUCCESS:
    return update(state, { permissionData: { $set: action.permissionData } });
  default:
    return state;
  }
};



const fetchedRole = (state = {
  roleData: [],
}, action) => {
  switch(action.type) {
  case FETCH_ROLELIST_SUCCESS:
    return update(state, { roleData: { $set: action.roleData } });
  default:
    return state;
  }
};


const fetchedUser = (state = {
  userData: {},
}, action) => {
  switch(action.type) {
  case FETCH_USERLIST_SUCCESS:
    return update(state, { userData: { $set: action.userData } });
  default:
    return state;
  }
};

const fetchedRoleInUser = (state = {
  roleDataInUser: [],
}, action) => {
  switch(action.type) {
  case FETCH_ROLELIST_INUSER_REQUEST:
    return update(state, { roleDataInUser: { $set: [] } });
  case FETCH_ROLELIST_INUSER_SUCCESS:
    return update(state, { roleDataInUser: { $set: action.roleDataInUser } });
  default:
    return state;
  }
};


const fetchedPermissionsByRoleIds = (state = {
  perDataByRoleIds: {},
}, action) => {
  switch(action.type) {
  case FETCH_PERMISSIONS_BY_ROLEIDS_SUCCESS:
    return update(state, { perDataByRoleIds: { $set: action.perDataByRoleIds } });
  case FETCH_PERMISSIONS_BY_ROLEIDS_REQUEST:
    return update(state, { perDataByRoleIds: { $set: {} } });
  case CLEAR__USER_INFO://清空数据：userModal授权信息的中间栏
    return update(state, { perDataByRoleIds: { $set: {} } });
  default:
    return state;
  }
};


//添加用户弹框，第二个tab的最后一个目录获取
const fetchedFolders = (state = {
  folders: [],
}, action) => {
  switch(action.type) {
  case FETCH_FOLDERS_INUSER_REQUEST:
    return update(state, { folders: { $set: [] } });
  case FETCH_FOLDERS_INUSER_OK:
    return update(state, { folders: { $set: action.folders } });
  case CLEAR__USER_INFO:
    return update(state, { folders: { $set: [] } });
  default:
    return state;
  }
};


//对应action中的 queryUserInfoById(id) -> QUERY_USER_INFO_OK
const queriedUserInfo = (state = {
  userView: {},
}, action) => {
  switch(action.type) {
  case QUERY_USER_INFO_OK:
    console.log('reducer === action.userView ==== ', action.userView);
    return update(state, { userView: {$set: action.userView} });
  case QUERY_USER_INFO_REQUEST:
    return update(state, { userView: {$set: {}} });
  case CLEAR__USER_INFO:
    return update(state, { userView: {$set: {}} });
  default:
    return state;
  }
};

//获取某条角色 byid
const fetchedRoleById = (state = {
  roleData: {},
}, action) => {
  switch(action.type) {
  case FETCH_ROLE_BYID_OK:
    return update(state, { roleData: {$set: action.roleData} });
  case CLEAR_ROLE_INFO:
    return update(state, { roleData: { $set: {} } });
  default:
    return state;
  }
};




//新建用户，数据组装
const formData = (state = {
  userName: '',
  realName: '',
  mobile: '',
  email: '',
  roles: [],
  userFolderPermissions: [],
  userExtend: { maxDownCount: 0, maxDownAmount: 0.00 },

  userId: '',
  rolesJson: [],
  userFolderPermissionsJSON: [],
  defaultKey: [],
  currentKey: '',
  curKeyToFolders: [],

  folders: [],
  rrroles: [],

  storeView: [],
  storeDownload: [],
  storeUpload: [],
}, action)=>{
  switch(action.type) {
  //如果修改某条用户的信息，当action按id查询到该用户的所有信息之后，发射QUERY_USER_INFO_OK到这里
  //那么在编辑状态下各个控件获取默认值的时候就直接从this.props.formData中获取。
  case QUERY_USER_INFO_OK: {
    let userName = action.userView.userName;
    let realName = action.userView.realName;
    let mobile = action.userView.mobile;
    let email = action.userView.email;
    let userId = action.userView.userId;
    //左边复选框组 的勾选ids
    let roles = action.userView.roles.map(role => {
      return role.id;
    });
    //右边目录树要勾选的项的ids
    let userFolderPermissions = action.userView.userFolderPermissions.map(x => {
      return x.folderId;
    });
    let rolesJson = action.userView.roles.map(role => {
      return {id: role.id};
    });
    let userFolderPermissionsJSON = action.userView.userFolderPermissions.map(x => {
      return {
        folderId: x.folderId,
        permissionId: x.permissionId,
      };
    });
    //每当查看或编辑某条用户的时候，要把userFolderPermissions按照目录的三个权限区分开来分别存放到storeView、storeDownload、storeUpload
    let sView = [];
    let sDown = [];
    let sUpload = [];
    action.userView.userFolderPermissions.forEach(item => {
      if(item.permissionKey == 'view_assets') {
        let viewObj = {
          permissionId: item.permissionId,
          folderId: item.folderId,
        };
        sView.push(viewObj);
      } else if(item.permissionKey == 'download_assets') {
        let downObj = {
          permissionId: item.permissionId,
          folderId: item.folderId,
        };
        sDown.push(downObj);
      } else if (item.permissionKey == 'upload_assets') {
        let upObj = {
          permissionId: item.permissionId,
          folderId: item.folderId,
        };
        sUpload.push(upObj);
      }
    });
    return update(state, {
      userName: { $set: userName },
      realName: { $set: realName },
      mobile  : { $set: mobile },
      email   : { $set: email },
      userId  : { $set: userId },
      roles   : { $set: roles},
      userFolderPermissions: { $set: userFolderPermissions},
      rolesJson: { $set: rolesJson },
      userFolderPermissionsJSON: { $set: userFolderPermissionsJSON },
      storeView: { $set: sView },
      storeDownload: { $set: sDown },
      storeUpload: { $set: sUpload },
      userExtend: { $set: action.userView.userExtend },
    });
  }
  //新建的时候，把所有数据都清空，
  case CLEAR__USER_INFO:
    return update(state, {
      userName: { $set: ''},
      realName: { $set: ''},
      mobile  : { $set: ''},
      email   : { $set: ''},
      roles   : { $set: []},
      userExtend : { maxDownCount: {$set: 0}, maxDownAmount: {$set: 0.00} },
      userFolderPermissions: { $set: []},
      storeView: { $set: [] },
      storeDownload: { $set: [] },
      storeUpload: { $set: [] },
    });
  case ADD_USER_RRROLES:
    return update(state, { rrroles: { $set: action.data.value} });
  case ADD_USER_FOLDERS:
    return update(state, { folders: { $set: action.data.value} });
  case ADD_USER_CHANGE_USERNAME:
    return update(state, { userName: { $set: action.data.value} });
  case ADD_USER_CHANGE_REALNAME:
    return update(state, { realName: { $set: action.data.value} });
  case ADD_USER_CHANGE_PHONE:
    return update(state, { mobile: { $set: action.data.value} });
  case ADD_USER_CHANGE_EMAIL:
    return update(state, { email: { $set: action.data.value} });
  case ADD_USER_CHANGE_ROLES:
    console.log('reducer  roles ===  ', action.data.value);
    return update(state, { roles: { $set: action.data.value} });
  //currentKey:
  case ADD_USER_CHANGE_PERMISSION:
    return update(state, { currentKey: { $set: action.data.value} });// 'view_assets.12'

  //curKeyToFolders
  case ADD_USER_CHANGE_FOLDERS: {
    let curKey = state.currentKey.split('.')[0];
    let curPerId = parseInt(state.currentKey.split('.')[1]);
    if(curKey == 'view_assets') {
      let viewGoodData = action.data.value.map(x => {
        return {
          permissionId: curPerId,
          folderId: parseInt(x),
        };
      });
      state.storeView = viewGoodData;
      return update(state, { userFolderPermissions: { $set: viewGoodData} });
    } else if(curKey == 'download_assets') {
      let downloadGoodData = action.data.value.map(x => {
        return {
          permissionId: curPerId,
          folderId: parseInt(x),
        };
      });
      state.storeDownload = downloadGoodData;
      return update(state, { userFolderPermissions: { $set: downloadGoodData} });
    } else if(curKey == 'upload_assets') {
      let uploadGoodData = action.data.value.map(x => {
        return {
          permissionId: curPerId,
          folderId: parseInt(x),
        };
      });
      state.storeUpload = uploadGoodData;
      return update(state, { userFolderPermissions: { $set: uploadGoodData} });
    }
    return state;
  }

  case ADD_USER_CHANGE_FOLDER_PERMISSIONS:
    return update(state, { userFolderPermissions: { $set: action.data.value} });
  case ADD_USER_CHANGE_MAX_DOWN:
    return update(state, { userExtend: { maxDownCount: { $set: action.data.value} } });
  case ADD_USER_MONEY_AMOUNT:
    return update(state, { userExtend: { maxDownAmount: { $set: action.data.value } } });
  default:
    return state;
  }
};


//新建角色，数据组装,其实，不仅仅是新建，edit之后提交也是这个数据格式。
const formDataNewRole = (state = {
  name: '',
  permission_ids: '',
  description: '',

  id: null,
}, action) => {
  switch(action.type) {
  case ADD_ROLE_CHANGE_NAME:
    return update(state, { name: { $set: action.data.value} });
  case ADD_ROLE_CHANGE_ROLEPERMISSIONS:
    return update(state, { permission_ids: { $set: action.data.value} });
  case ADD_ROLE_CHANGE_DESCRIPTION:
    return update(state, { description: { $set: action.data.value} });
  //下面的case是edit的时候查询到的一条数据，由action中fetchRoleById返回的roleData
  case ACCEPT_ROLE_RECORD_OK: {
    let permission_ids = action.roleRecord.permissions.map(item => {
      return item.id;
    });
    permission_ids = permission_ids.toString();
    return update(state, {
      name: { $set: action.roleRecord.name },
      description: { $set: action.roleRecord.description },
      id: { $set: action.roleRecord.id },
      permission_ids: { $set: permission_ids },
    });
  }
  default:
    return state;
  }
};


const checkedOutBlurData = (state = {}, action) => {
  switch(action.type) {
  case CHECKOUT_BLUR_DATA:
    return update(state, { $set: action.data });
  default:
    return state;
  }
};

const saveErrors = (state = {}, action) => {
  switch(action.type) {
  case SAVE_SERVER_RETURN:
    return update(state, { $set: action.serverInfo });
  default:
    return state;
  }
};


const permissions_reducer = combineReducers({
  fetchedPermission,
  formData,
  formDataNewRole,
  fetchedRole,
  fetchedUser,
  fetchedRoleInUser,
  fetchedPermissionsByRoleIds,
  fetchedFolders,
  queriedUserInfo,
  fetchedRoleById,
  checkedOutBlurData,
  saveErrors,
});

export default permissions_reducer;
