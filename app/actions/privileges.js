import { notification } from 'antd';
import { API, baseAPI, customFetch } from '../apis';
const { FoldersApiFp } = API.resourceAPI;
import update from 'immutability-helper';
const FoldersApi = API.resourceAPI.FoldersApiFp;
const { WorkgroupcontrollerApiFp,
  DefaultApiFp } = API.passportAPI;

export const FETCH_USER_GROUPS_REQUEST = 'FETCH_USER_GROUPS_REQUEST';
export const FETCH_USER_GROUPS_SUCCESS = 'FETCH_USER_GROUPS_SUCCESS';
export const FETCH_USER_GROUPS_FAILURE = 'FETCH_USER_GROUPS_FAILURE';

export const FETCH_FOLDERS_REQUEST = 'FETCH_FOLDERS_REQUEST';
export const FETCH_FOLDERS_SUCCESS = 'FETCH_FOLDERS_SUCCESS';
export const FETCH_FOLDERS_FAILURE = 'FETCH_FOLDERS_FAILURE';

export const FETCH_PRIVILEGE_REQUEST = 'FETCH_PRIVILEGE_REQUEST';
export const FETCH_PRIVILEGE_SUCCESS = 'FETCH_PRIVILEGE_SUCCESS';
export const FETCH_PRIVILEGE_FAILURE = 'FETCH_PRIVILEGE_FAILURE';

export const SET_ROLE = 'SET_ROLE';
export const SET_FOLDERS = 'SET_FOLDERS';

export const UPDATE_PRIVILEGE_REQUEST = 'UPDATE_PRIVILEGE_REQUEST';
export const UPDATE_PRIVILEGE_SUCCESS = 'UPDATE_PRIVILEGE_SUCCESS';
export const UPDATE_PRIVILEGE_FAILURE = 'UPDATE_PRIVILEGE_FAILURE';

function fetchUserGroupsRequest() {
  return {
    type: FETCH_USER_GROUPS_REQUEST,
  };
}

function fetchUserGroupsSuccess(userGroups) {
  return {
    type: FETCH_USER_GROUPS_SUCCESS,
    userGroups,
  };
}

function fetchUserGroupsFailure(error) {
  return {
    type: FETCH_USER_GROUPS_FAILURE,
    error,
  };
}

export function fetchUserGroups() {
  return dispatch => {
    dispatch(fetchUserGroupsRequest);
    WorkgroupcontrollerApiFp.workgroupsGet({})(customFetch, baseAPI)
      .then(groups => dispatch(fetchUserGroupsSuccess(groups)))
      .catch(err => dispatch(fetchUserGroupsFailure(err)));
  };
}

function fetchFoldersRequest() {
  return {
    type: FETCH_FOLDERS_REQUEST,
  };
}

function fetchFoldersSuccess(folders) {
  return {
    type: FETCH_FOLDERS_SUCCESS,
    folders,
  };
}

function fetchFoldersFailure(error) {
  return {
    type: FETCH_FOLDERS_FAILURE,
    error,
  };
}

// 获取目录列表
// type: 当前的列表类型， audit:编审页面 upload: 长传页面, online: 用户用图页面
// type类型影响各个页面目录树上显示的子资源数量
//默认是编审
//options 查询子资源数量时的查询条件
export function fetchFolders(type = 'audit', parentId = 1) {
  return (dispatch, getState) => {
    const userId = getState().login.currentUser.userId;
    let coutItems = () => Promise.resolve({});
    let param;
    if (type === 'upload') {
      param = {
        id: parentId,
        providerId: userId,
        assetType: '',
        uploadStates: ['UNSTAGE'],
        permissionUserId: userId,
      };

      coutItems = FoldersApi.foldersIdSubFoldersPost(param);
    } else if (type === 'audit' || type=== 'resource') {
      let reviewState = 'PENDING';
      let onlineState = '';
      let uploadState = ['INSTOCK'];
      if(type=='resource') {
        onlineState = 'ONLINE';
        reviewState = 'PASSED';
        uploadState = [];
      }
      param={
        id: parentId,
        providerId: '',
        assetType: '',
        reviewState: reviewState,
        onlineState: onlineState,
        uploadStates: uploadState,
        permissionUserId: userId,
      };
      coutItems = FoldersApi.foldersIdSubFoldersPost(param);
    }

    dispatch(fetchFoldersRequest);
    (coutItems)(customFetch, baseAPI)
      .then(dirs => {
        if(parentId!=1) {
          let oldDir = type=='audit'?getState().audit.folders:getState().uploads.folders;
          let newDir = update(oldDir, {$push: dirs});
              /*newDir.map(item => {
                if(counts[item.id]) {
                  item.assetsCount = counts[item.id]['count'];
                  item.hasManyAssets = counts[item.id]['hasManyAssets'];
                }
                return item;
              });*/
          dispatch(fetchFoldersSuccess(newDir));
        }else {
          let dd = dirs;
          if(type!='upload') {
            customFetch(`${baseAPI}/folders/viewVcgFolder`, {
              credentials: 'include',
              method: 'GET',
              headers: {'Content-Type': 'application/json'},
            }).then(resp=>resp.json().then(customDirs=>{
              customDirs.permissions = dirs[0].permissions;
              dd = update(dirs, {$push: [customDirs]});
              dispatch(fetchFoldersSuccess(dd));
            })
          );
          }else {
            dispatch(fetchFoldersSuccess(dd));
          }
        }
        //});
      })
      .catch(err => dispatch(fetchFoldersFailure(err)));
  };
}

function fetchPrivilegeRequest() {
  return {
    type: FETCH_PRIVILEGE_REQUEST,
  };
}

function fetchPrivilegeSuccess(privilege) {
  return {
    type: FETCH_PRIVILEGE_SUCCESS,
    privilege,
  };
}

function fetchPrivilegeFailure(error) {
  return {
    type: FETCH_PRIVILEGE_FAILURE,
    error,
  };
}

export function fetchPrivilege(groupId) {
  return (dispatch, getState) => {

    let { privileges } = getState();
    if (privileges.selectedGroup.workgroupId == groupId[0])
      return;

    dispatch(fetchPrivilegeRequest);
    DefaultApiFp.workgroupFolderRoleGetWorkgroupFoldersRoleGet({ workgroupId: groupId })(customFetch, baseAPI)
      .then(prvge => dispatch(fetchPrivilegeSuccess(prvge)))
      .catch(err => dispatch(fetchPrivilegeFailure(err)));
  };
}

export function selectRole(roleId) {
  return {
    type: SET_ROLE,
    roleId,
  };
}

export function selectFolders(folderIds) {
  return {
    type: SET_FOLDERS,
    folderIds,
  };
}

function updatePrivilegeRequest() {
  return {
    type: UPDATE_PRIVILEGE_REQUEST,
  };
}

function updatePrivilegeSuccess(privilege) {
  return {
    type: UPDATE_PRIVILEGE_SUCCESS,
    privilege,
  };
}

function updatePrivilegeFailure(error) {
  return {
    type: UPDATE_PRIVILEGE_FAILURE,
    error,
  };
}

export function updatePrivilege(privilege) {
  return dispatch => {
    dispatch(updatePrivilegeRequest);
    fetch('http://api.dam.vcg.com:8088/api/workgroupFolderRole/setWorkgroupFoldersRole', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(privilege),
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('权限信息更新失败');
      })
      .then(prvge => {
        notification.success({
          message: '权限更新成功',
          description: '没啥可担心的',
          duration: 3,
        });
        dispatch(updatePrivilegeSuccess(prvge));
      })
      .catch(err => {
        notification.error({
          message: '权限更新失败',
          description: '得，搞砸了',
          duration: 3,
        });
        dispatch(updatePrivilegeFailure(err));
      });
  };
}
