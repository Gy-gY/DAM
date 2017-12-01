import {API as api, baseAPI, customFetch} from '../apis';
import {UsercontrollerApiFp, UserworkgroupcontrollerApiFp, WorkgroupcontrollerApiFp} from '../apis/passportApi';
import TreeHelper from '../common/tree_helper';
export const userGroupActionTypes = {
  'USERGROUP_LIST_SUCCESS'      : 'USERGROUP_LIST_SUCCESS',
  'ADD_USERGROUP_SUCCESS'       : 'ADD_USERGROUP_SUCCESS',
  'DEL_USERGROUP_SUCCESS'       : 'DEL_USERGROUP_SUCCESS',
  'EDIT_USERGROUP_SUCCESS'      : 'EDIT_USERGROUP_SUCCESS',
  'CREATE_USER_SUCCESS'         : 'CREATE_USER_SUCCESS',
  'CREATE_USER_FAILURE'         : 'CREATE_USER_FAILURE',
  'EDIT_USER_SUCCESS'           : 'EDIT_USER_SUCCESS',
  'DEL_USER_SUCCESS'            : 'DEL_USER_SUCCESS',
  'QUERY_USER_SUCCESS'          : 'QUERY_USER_SUCCESS',
  'MOVE_USER_SUCCESS'           : 'MOVE_USER_SUCCESS',
  'QUERY_ROLE_LIST_SUCCESS'     : 'QUERY_ROLE_LIST_SUCCESS',
  'SEND_INVITATIONCODE_SUCCESS' : 'SEND_INVITATIONCODE_SUCCESS',
};
const passportAPI = api.passportAPI;

//获取组列表
export function getRoleList() {
  return (dispatch) => {
    fetch(`${baseAPI}/role/list`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('获取权限失败！');
      }).then(data => dispatch(getRoleListSuccess(data)));
  };
}

function getRoleListSuccess(data) {
  return {
    type: userGroupActionTypes.QUERY_ROLE_LIST_SUCCESS,
    roleList:data,
  };
}

//获取组列表
export function getGroupTreeData(dispatch) {
  return passportAPI.WorkgroupcontrollerApiFp.workgroupsGet({})(customFetch, baseAPI)
  .then((res)=>{
    dispatch({
      type: userGroupActionTypes.USERGROUP_LIST_SUCCESS,
      treeData: TreeHelper.parseNodesToTrees(res),
    });
  });
}

//添加群组
export function addUserGroupNode(params) {
  return (dispatch) => {
    return fetch(`${baseAPI}/workgroups/create`, {
      credentials: 'include',
      body:JSON.stringify(params),
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('提交失败！');
      }).then(data => dispatch(saveUserGroupSuccess(data)));
  };
}

export function editUserGroupNode(params) {
  return (dispatch) => {
    return fetch(`${baseAPI}/workgroups/${params.id}`, {
      credentials: 'include',
      body:JSON.stringify(params),
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('提交失败！');
      }).then(data => dispatch(editUserGroupSuccess(data)));
  };
}

function saveUserGroupSuccess(data) {
  return {
    type: userGroupActionTypes.ADD_USERGROUP_SUCCESS,
    treeData:[],
    userGroup:data,
  };
}

function editUserGroupSuccess(data) {
  return {
    type: userGroupActionTypes.EDIT_USERGROUP_SUCCESS,
    userGroup:data,
  };
}


//删除组节点
export function delUserGroupNode(params) {
  return (dispatch) => {
    return fetch(`${baseAPI}/workgroups/${params.id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('提交失败！');
      }).then(data => dispatch(delUserGroupSuccess(data)));
  };
}

function delUserGroupSuccess(data) {
  return {
    type: userGroupActionTypes.DEL_USERGROUP_SUCCESS,
    treeData:data,
  };
}

//编辑组节点
export function editChildUserGroupNode(dispatch, params) {
  WorkgroupcontrollerApiFp.workgroupsIdPut(params)(customFetch, baseAPI).then((res)=>{
    dispatch({
      type: userGroupActionTypes.EDIT_USERGROUP_SUCCESS,
      treeData: TreeHelper.parseNodesToTrees(res),
    });
  });
}

//创建用户
export function createUserInfo(user) {
  return (dispatch) => {
    return fetch(`${baseAPI}/user/create`, {
      credentials: 'include',
      method: 'POST',
      body:JSON.stringify(user),
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error(response);
      }).then(data => dispatch(createUserInfoSuccess(data)));
  };
}

function createUserInfoSuccess(data) {
  return {
    type: userGroupActionTypes.CREATE_USER_SUCCESS,
    user:data,
  };
}

//编辑用户
export function editUserInfo(params) {
  return (dispatch) => {
    return fetch(`${baseAPI}/user/update`, {
      credentials: 'include',
      method: 'PUT',
      body:JSON.stringify(params),
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('提交失败！');
      }).then(data => dispatch(editUserInfoSuccess(data)));
  };
}

function editUserInfoSuccess(data) {
  return {
    type: userGroupActionTypes.EDIT_USER_SUCCESS,
    user:data,
  };
}

//删除用户
export function delUserInfo(dispatch, params) {
  return UsercontrollerApiFp.userIdDelete(params)(customFetch, baseAPI).then((res)=>{
    dispatch({
      type: userGroupActionTypes.DEL_USER_SUCCESS,
      users: res,
    });
  });
}

//未分组用户添加至用户群组
export function saveUserMoveToGroup(dispatch, params) {
  return UserworkgroupcontrollerApiFp.userWorkgroupCreatePost(params)(customFetch, baseAPI).then((res)=>{
    dispatch({
      type: userGroupActionTypes.MOVE_USER_SUCCESS,
      user: res.apiResponse,
    });
  });
}

//用户未分组列表
export function getUserList(dispatch, paginationParams) {
  return UsercontrollerApiFp.userUngroupedUsersPageListGet(paginationParams)(customFetch, baseAPI).then((res)=>{
    paginationParams.total = res.list.length;
    dispatch({
      type: userGroupActionTypes.QUERY_USER_SUCCESS,
      users: res.list,
      paginationParams:paginationParams,
    });
  });
}

//获取群组下的所有用户
export function getUserListByGroupId(params) {
  return (dispatch) => {
    return fetch(`${baseAPI}/user/search?pageNum=${params.pageNum}&pageSize=${params.pageSize}`, {
      credentials: 'include',
      method: 'POST',
      body:JSON.stringify(params.workgroupId),
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('提交失败！');
      }).then(data => dispatch(getUserInfoSuccess(data, params)));
  };
}

function getUserInfoSuccess(data, params) {
  params.total = data.total;
  return {
    type: userGroupActionTypes.QUERY_USER_SUCCESS,
    users: data,
    paginationParams:params,
  };
}

//删除用户与组的关系
export function updateUserGroupReRelationship(dispatch, params) {
  return UserworkgroupcontrollerApiFp.userWorkgroupListGet(params)(customFetch, baseAPI).then((res)=>{
    dispatch({
      type: userGroupActionTypes.QUERY_USER_SUCCESS,
      users: res,
    });
  });
}

//获取群组下的所有用户
export function sendInvitationCode(params) {
  return (dispatch) => {
    return fetch(`${baseAPI}/message/sendInvitationCodeSms?userId=${params.userId}&workgroupId=${params.workgroupId}`, {
      credentials: 'include',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('提交失败！');
      }).then(data => dispatch(sendInvitationSuccess(data)));
  };
}

function sendInvitationSuccess() {
  return {
    type:userGroupActionTypes.SEND_INVITATIONCODE_SUCCESS,
  };
}
