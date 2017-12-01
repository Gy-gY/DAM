import {notification } from 'antd';
import {API, baseAPI, customFetch} from '../../apis';
import { push } from 'react-router-redux';
const UserApiFp = API.nodeAPI.UserApiFp;
export const FETCH_PERMISSIONLIST_SUCCESS = 'FETCH_PERMISSIONLIST_SUCCESS';
export const FETCH_ROLELIST_SUCCESS = 'FETCH_ROLELIST_SUCCESS';
export const FETCH_USERLIST_SUCCESS = 'FETCH_USERLIST_SUCCESS';
export const FETCH_ROLELIST_INUSER_SUCCESS = 'FETCH_ROLELIST_INUSER_SUCCESS';
export const FETCH_PERMISSIONS_BY_ROLEIDS_SUCCESS = 'FETCH_PERMISSIONS_BY_ROLEIDS_SUCCESS';
export const SAVE_SERVER_RETURN = 'SAVE_SERVER_RETURN';
export const POST_NEWROLEINFOR_SUCCESS = 'POST_NEWROLEINFOR_SUCCESS';

export const UPDATE_NEWUSERINFOR_SUCCESS = 'UPDATE_NEWUSERINFOR_SUCCESS';
export const FETCH_PERMISSIONS_BY_ROLEIDS_REQUEST = 'FETCH_PERMISSIONS_BY_ROLEIDS_REQUEST';


export const ADD_USER_CHANGE_USERNAME = 'ADD_USER_CHANGE_USERNAME';
export const ADD_USER_CHANGE_REALNAME = 'ADD_USER_CHANGE_REALNAME';
export const ADD_USER_CHANGE_PHONE = 'ADD_USER_CHANGE_PHONE';
export const ADD_USER_CHANGE_EMAIL = 'ADD_USER_CHANGE_EMAIL';
export const ADD_USER_CHANGE_ROLES = 'ADD_USER_CHANGE_ROLES';

export const ADD_ROLE_CHANGE_NAME = 'ADD_ROLE_CHANGE_NAME';
export const ADD_ROLE_CHANGE_DESCRIPTION = 'ADD_ROLE_CHANGE_DESCRIPTION';
export const ADD_ROLE_CHANGE_ROLEPERMISSIONS = 'ADD_ROLE_CHANGE_ROLEPERMISSIONS';



//export const ADD_USER_CHANGE_PERMISSION = 'ADD_USER_CHANGE_PERMISSION';
export const ADD_USER_CHANGE_PERMISSION = 'ADD_USER_CHANGE_PERMISSION';

export const ADD_USER_CHANGE_FOLDER_PERMISSIONS = 'ADD_USER_CHANGE_FOLDER_PERMISSIONS';
export const ADD_USER_CHANGE_MAX_DOWN = 'ADD_USER_CHANGE_MAX_DOWN';
export const ADD_USER_CHANGE_FOLDERS = 'ADD_USER_CHANGE_FOLDERS';

export const FETCH_FOLDERS_INUSER_OK = 'FETCH_FOLDERS_INUSER_OK';

export const QUERY_USER_INFO_OK = 'QUERY_USER_INFO_OK';

export const FETCH_ROLE_BYID_OK = 'FETCH_ROLE_BYID_OK';
export const FETCH_FOLDERS_INUSER_REQUEST = 'FETCH_FOLDERS_INUSER_REQUEST';
export const CLEAR__USER_INFO = 'CLEAR__USER_INFO';
export const CLEAR_ROLE_INFO = 'CLEAR_ROLE_INFO';
export const RESET_USERPWD_OK = 'RESET_USERPWD_OK';
export const UPDATE_ROLEINFOR_OK = 'UPDATE_ROLEINFOR_OK';

export const ACCEPT_ROLE_RECORD_OK = 'ACCEPT_ROLE_RECORD_OK';
export const QUERY_USER_INFO_REQUEST = 'QUERY_USER_INFO_REQUEST';
export const FETCH_ROLELIST_INUSER_REQUEST = 'FETCH_ROLELIST_INUSER_REQUEST';
export const ADD_USER_FOLDERS = 'ADD_USER_FOLDERS';
export const ADD_USER_RRROLES = 'ADD_USER_RRROLES';
export const STOP_USER_OK = 'STOP_USER_OK';
export const CHECKOUT_BLUR_DATA = 'CHECKOUT_BLUR_DATA';
export const ADD_USER_MONEY_AMOUNT = 'ADD_USER_MONEY_AMOUNT';
//添加新角色的时候在弹出的对话框中需要预先加载出权限列表供选择，下面就是权限列表的接口
//permisson manage
const logout = function(dispatch) {
  UserApiFp.logoutPost()(customFetch, baseAPI)
  .then(() => {
    dispatch(push('/login'));
  });
};


export function fetchPermissionList() {
  return dispatch => {
    return fetch('/api/permission/list', {
      method: 'GET',
      headers: {'Accept': 'application/json'},
      credentials: 'include',
    })
    .then(response => {
      if(response.status==401) {
        logout(dispatch);
      } else {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error('获取权限管理失败！');
        }
      }
    })
    .then(data => {
      dispatch({
        type: FETCH_PERMISSIONLIST_SUCCESS,
        permissionData: data,
      });
    });
  };
}

export function clearData() {
  return dispatch => {
    dispatch({type: CLEAR__USER_INFO});
  };
}

export function clearData_Role() {
  return dispatch => {
    dispatch({type: CLEAR_ROLE_INFO});
  };
}



//role manage
export function fetchRoleList() {
  return dispatch => {
    return fetch('/api/role/list', {
      method: 'GET',
      headers: {'Accept': 'application/json'},
      credentials: 'include',
    })
    .then(response => {
      if(response.status==401) {
        logout(dispatch);
      } else {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error('获取角色管理失败！');
        }
      }
    })
    .then(data => {
      dispatch({
        type: FETCH_ROLELIST_SUCCESS,
        roleData: data,
      });
    });
  };
}



//user manage , 取出数据列表
export function fetchUserList(pageNum) {
  return dispatch => {
    return fetch(`/api/user/pageList?orderby=1&pageNum=${pageNum}&pageSize=10`, {
      method: 'GET',
      headers: {'Accept': 'application/json'},
      credentials: 'include',
    })
    .then(response => {
      if(response.status==401) {
        logout(dispatch);
      } else {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error('获取用户管理失败！');
        }
      }
    })
    .then(data => {
      dispatch({
        type: FETCH_USERLIST_SUCCESS,
        userData: data,
      });
    });
  };
}




//用户管理中添加用户时，需要先从server获取角色列表，每个角色又对应相应的权限
export function fetchRoleListInUser() {
  return dispatch => {
    dispatch({
      type: FETCH_ROLELIST_INUSER_REQUEST,
      roleDataInUser: [],
    });
    return fetch('/api/role/list', {
      method: 'GET',
      headers: {'Accept': 'application/json'},
      credentials: 'include',
    })
    .then(response => {
      if(response.status==401) {
        logout(dispatch);
      } else {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error('获取角色管理失败！！');
        }
      }
    })
    .then(data => {
      dispatch({
        type: FETCH_ROLELIST_INUSER_SUCCESS,
        roleDataInUser: data,
      });
    });
  };
}


// in users
export function fetchPermissionsByRoleIds(roleIds) {
  if(roleIds.length == 0) {
    return dispatch => {
      dispatch({
        type: FETCH_PERMISSIONS_BY_ROLEIDS_SUCCESS,
        perDataByRoleIds: {},
      });
    };
  }
  return dispatch => {
    dispatch({
      type: FETCH_PERMISSIONS_BY_ROLEIDS_REQUEST,
      perDataByRoleIds: {},
    });
    return fetch('/api/permission/rolePermission?roleIds='+roleIds, {
      method: 'GET',
      headers: {'Accept': 'application/json'},
      credentials: 'include',
    })
    .then(response => {
      if(response.status==401) {
        logout(dispatch);
      } else {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error('获取角色管理失败！！');
        }
      }
    })
    .then(data => {
      dispatch({
        type: FETCH_PERMISSIONS_BY_ROLEIDS_SUCCESS,
        perDataByRoleIds: data,
      });
    });
  };
}



//添加用户弹框，第二个tab的最后一个目录获取
export function fetchFolders(id = 1) {
  return dispatch => {
    dispatch({
      type: FETCH_FOLDERS_INUSER_REQUEST,
      folders: [],
    });
    return fetch(`/api/folders/${id}/sub_folders`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(response => {
      if(response.status==401) {
        logout(dispatch);
      } else {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error('获取目录失败！！');
        }
      }
    })
    .then(data => {
      console.log('action data = ', data);
      dispatch({
        type: FETCH_FOLDERS_INUSER_OK,
        folders: data,
      });
    });
  };
}



//根据用户id查询编用户信息，用于查看和编辑用户的modal对话框*****************************
export function queryUserInfoById(id) {
  return dispatch => {
    dispatch({
      type: QUERY_USER_INFO_REQUEST,
      userView: {},
    });
    return fetch('/api/user/view?id='+id, {
      method: 'GET',
      headers: {'Accept': 'application/json'},
      credentials: 'include',
    })
    .then(response => {
      if(response.status==401) {
        logout(dispatch);
      } else {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error('获取角色管理失败！！');
        }
      }
    })
    .then(data => {
      dispatch({
        type: QUERY_USER_INFO_OK,
        userView: data,
      });
    });
  };
}



//添加用户，并保存提交
export function save() {
  return (dispatch, getState) => {
    let userId = getState().login.currentUser.userId;
    let formData = getState().permissions_reducer.formData;
    console.log('save======formData == ', formData);
    let data = {
      realName: formData.realName,
      email: formData.email,
      mobile: formData.mobile,
      roles: formData.roles,
      userExtend: formData.userExtend,
      userFolderPermissions: formData.storeDownload.concat(formData.storeView).concat(formData.storeUpload),
    };
    console.log('data=============save===============', data);
    return fetch(`/api/user/create?userId=${userId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })
    .then(response => {
      if(response.status==401) {
        logout(dispatch);
      } else {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error('新建新用户失败！');
        }
      }
    })
    .then(data => {
      //这个data是服务器收到传过去的formData数据之后返回的信息
      if(data.status) {
        notification.success({message: '新建用户成功'});
      } else {
        dispatch({
          type: SAVE_SERVER_RETURN,
          serverInfo: data,
        });
        notification.error({message: data.message});
      }
    });
  };
}


//用户管理里面，对某条数据进行了修改而提交，除了要提交创建时候的全部字段，还要添加一个userId字段，标识你修改的是哪个用户。
export function updateUserInfo() {
  return (dispatch, getState) => {
    let srcData = getState().permissions_reducer.formData;
    let loginUserId = getState().login.currentUser.userId;
    let formData = {};
    formData.realName = srcData.realName;
    formData.mobile = srcData.mobile;
    formData.email = srcData.email;

    formData.roles = srcData.roles.map(x => {
      if(typeof x == 'object') {
        return {id:x.id};
      } else {
        return {id:x};
      }
    });
    formData.userId = srcData.userId;
    formData.userFolderPermissions = srcData.storeDownload.concat(srcData.storeView).concat(srcData.storeUpload),
    formData.userExtend = srcData.userExtend;
    console.log('formData=============update===============', formData);
    //这里的userId是指登录账户的大的Id
    return fetch('/api/user/update1?userId='+loginUserId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    })
    .then(response => {
      if(response.status==401) {
        logout(dispatch);
      } else {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error('更新用户失败！！');
        }
      }
    })
    .then(data => {
      dispatch({
        type: UPDATE_NEWUSERINFOR_SUCCESS,
        newUserData: data,
      });
      if(data.status) {
        notification.success({message: '更新用户成功！'});
      } else {
        notification.error({message: data.message});
      }
    });
  };
}

//角色管理里面，对某个角色进行信息修改,需要一个
export function updateRoleInfo() {
  return (dispatch, getState) => {
    let loginUserId = getState().login.currentUser.userId;
    let formData = getState().permissions_reducer.formDataNewRole;

    let name = formData.name;
    let description = formData.description;
    let id = formData.id;//数字
    let permission_ids = formData.permission_ids;//逗号隔开
    return fetch(`/api/role/update?userId=${loginUserId}&permission_ids=${permission_ids}&name=${name}&id=${id}&description=${description}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(response => {
      if(response.status==401) {
        logout(dispatch);
      } else {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error('更新角色失败！！');
        }
      }
    })
    .then(data => {
      dispatch({
        type: UPDATE_ROLEINFOR_OK,
        newRoleData: data,
      });
    });
  };
}



//添加新角色，并提交保存
export function saveNewRole() {
  return (dispatch, getState) => {
    let formDataNewRole = getState().permissions_reducer.formDataNewRole;
    let userId = getState().login.currentUser.userId;
    let perIds = formDataNewRole.permission_ids;
    let formatData = {
      name: formDataNewRole.name,
      description: formDataNewRole.description,
    };
    if(formDataNewRole.name == '') {
      notification.error({message: '角色名称不能为空!'});
    }
    if(perIds == '') {
      notification.error({message: '请选择权限!'});
    }
    return fetch(`/api/role/create?userId=${userId}&permission_ids=${perIds}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formatData),
    })
    .then(response => {
      if(response.status==401) {
        logout(dispatch);
      } else {
        if(response.ok) {
          return response.json();
        } else {
          notification.error({message: '新建新角色失败!'});
          throw new Error('新建新角色失败！！');
        }
      }
    })
    .then(data => {
      dispatch({
        type: POST_NEWROLEINFOR_SUCCESS,
        newRoleData: data,
      });
    });
  };
}






//新建用户的时候，利用这个dispatch实时搜集最新修改的数据并dispatch出去，
//在reducer中的formData接收这里传出的零散数据并组装
export function changeValue(key, value) {
  console.log('key = ' + key + '\nvalue = ' + value);
  let type;
  switch (key) {
  case 'userName':
    type = ADD_USER_CHANGE_USERNAME;
    break;
  case 'realName':
    type = ADD_USER_CHANGE_REALNAME;
    break;
  case 'mobile':
    type = ADD_USER_CHANGE_PHONE;
    break;
  case 'email':
    type = ADD_USER_CHANGE_EMAIL;
    break;
  case 'roles':
    type = ADD_USER_CHANGE_ROLES;
    break;
  case 'currentKey':
    type = ADD_USER_CHANGE_PERMISSION;
    break;
  case 'curKeyToFolders':
    type = ADD_USER_CHANGE_FOLDERS;
    break;
  case 'userFolderPermissions':
    type = ADD_USER_CHANGE_FOLDER_PERMISSIONS;
    break;
  case 'userExtend':
    type = ADD_USER_CHANGE_MAX_DOWN;
    break;
  case 'moneyAmount':
    type = ADD_USER_MONEY_AMOUNT;
    break;
  case 'folders':
    type = ADD_USER_FOLDERS;
    break;
  case 'rrroles':
    type = ADD_USER_RRROLES;
    break;
  default:
    break;
  }
  return dispatch => {
    dispatch({
      type: type,
      data : {
        key: key,
        value: value,
      },
    });

  };
}




//新建角色的时候，利用这个dispatch实时搜集最新修改的数据并dispatch出去
//在reducer中的formData_CreateRole接收这里传出的零散数据并组装
export function changeValue_CreateRole(key, value) {
  console.log('key = ' + key + '\nvalue = ' + value);
  let type = '';
  switch(key) {
  case 'name':
    type = ADD_ROLE_CHANGE_NAME;
    break;
  case 'description':
    type = ADD_ROLE_CHANGE_DESCRIPTION;
    break;
  case 'rolePermissions':
    type = ADD_ROLE_CHANGE_ROLEPERMISSIONS;
    break;
  default:
    break;
  }
  return dispatch => {
    dispatch({
      type: type,
      data : {
        key: key,
        value: value,
      },
    });
  };
}


//角色管理中，如果要编辑某个角色，就要先根据这个角色的id获取这条数据
export function fetchRoleById(id) {
  return dispatch => {
    return fetch(`/api/role/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include',
    })
    .then(response => {
      if(response.status==401) {
        logout(dispatch);
      } else {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error('获取角色失败！！');
        }
      }
    })
    .then(data => {
      dispatch({
        type: FETCH_ROLE_BYID_OK,
        roleData: data,
      });
    });
  };
}

export function acceptRoleRecord(roleRecord) {
  return dispatch => {
    dispatch({
      type: ACCEPT_ROLE_RECORD_OK,
      roleRecord: roleRecord,
    });
  };
}

//用户管理里面对某个用户进行密码重置，当然你得提供需要重置密码的id
export function resetPwd(id) {
  return (dispatch, getState) => {
    let loginUserId = getState().login.currentUser.userId;
    return fetch(`/api/user/resetPwd?id=${id}&userId=${loginUserId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include',
    })
    .then(response => {
      if(response.status==401) {
        logout(dispatch);
      } else {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error('重置密码失败！');
        }
      }
    })
    .then(data => {
      notification.success({
        message: '重置密码成功',
        description: '重置密码成功！',
      });
      dispatch({
        type: RESET_USERPWD_OK,
        pwdInfo: data,
      });
    });
  };
}



//停用
export function stopUser(id) {
  return (dispatch, getState) => {
    let loginUserId = getState().login.currentUser.userId;
    return fetch(`/api/user/setStatus?id=${id}&userId=${loginUserId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(response => {
      if(response.status==401) {
        logout(dispatch);
      } else {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error('重置密码失败！');
        }
      }
    })
    .then(data => {
      if(data.status) {
        notification.success({message: '操作成功'});
      } else {
        notification.error({message: '操作失败'});
      }
      dispatch({
        type: STOP_USER_OK,
        pwdInfo: data,
      });
    });
  };
}

//baseInfo里三个input框，任意一个input失去焦点都会触发
export function onBlurData(err) {
  return dispatch => {
    dispatch({
      type: CHECKOUT_BLUR_DATA,
      data: err,
    });
  };
}
