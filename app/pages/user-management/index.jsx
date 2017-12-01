import React from 'react';
import { connect } from 'react-redux';

import TabManage from './components/TabManage';
import {
  fetchPermissionList,
  fetchRoleList,
  fetchUserList,
  fetchRoleListInUser,
  fetchPermissionsByRoleIds,
  save,
  saveNewRole,
  changeValue,
  clearData,
  clearData_Role,
  changeValue_CreateRole,
  fetchFolders,
  queryUserInfoById,
  fetchRoleById,
  onBlurData,
  updateUserInfo,
  resetPwd,
  updateRoleInfo,
  acceptRoleRecord,
  stopUser,
} from './action';

const styles = {
  wrapper: {
    color: 'red',
    marginTop: '10px',
    marginBottom: '10px',
    fontSize: '20px',
    background: '#fff',
  },
};
class UserGroupManage extends React.Component {

  static propTypes = {
    fetchPermissionList: React.PropTypes.func.isRequired,
    fetchedPermission: React.PropTypes.object,
    currentUser:  React.PropTypes.object,
    fetchRoleList: React.PropTypes.func.isRequired,
    fetchedRole: React.PropTypes.object,

    fetchUserList: React.PropTypes.func.isRequired,
    fetchedUser: React.PropTypes.object,

    fetchRoleListInUser: React.PropTypes.func.isRequired,
    fetchedRoleInUser: React.PropTypes.object,

    fetchPermissionsByRoleIds: React.PropTypes.func.isRequired,
    fetchedPermissionsByRoleIds: React.PropTypes.object,

    //新建用户并提交的save
    save: React.PropTypes.func.isRequired,
    formData: React.PropTypes.object,

    //填写信息发生改变
    changeValue: React.PropTypes.func.isRequired,
    changeValue_CreateRole: React.PropTypes.func,

    fetchFolders: React.PropTypes.func,
    fetchedFolders: React.PropTypes.object,

    queryUserInfoById: React.PropTypes.func,
    queriedUserInfo: React.PropTypes.object,

    saveNewRole: React.PropTypes.func.isRequired,
    formDataNewRole: React.PropTypes.object,
    clearData: React.PropTypes.func.isRequired,
    clearData_Role: React.PropTypes.func.isRequired,

    fetchRoleById: React.PropTypes.func,
    fetchedRoleById: React.PropTypes.object,

    updateUserInfo: React.PropTypes.func,
    resetPwd: React.PropTypes.func,
    updateRoleInfo: React.PropTypes.func,
    acceptRoleRecord: React.PropTypes.func,
    stopUser: React.PropTypes.func,

    onBlurData: React.PropTypes.func,
    checkedOutBlurData: React.PropTypes.object,
    saveErrors: React.PropTypes.object,
  }

  render = () => {
    return(
      <div style={styles.wrapper}>
        <TabManage
          fetchPermissionList={this.props.fetchPermissionList}
          fetchedPermission={this.props.fetchedPermission}
          clearData={this.props.clearData}
          clearData_Role={this.props.clearData_Role}
          currentUser={this.props.currentUser}
          fetchRoleList={this.props.fetchRoleList}
          fetchedRole={this.props.fetchedRole}

          fetchUserList={this.props.fetchUserList}
          fetchedUser={this.props.fetchedUser}

          fetchRoleListInUser={this.props.fetchRoleListInUser}
          fetchedRoleInUser={this.props.fetchedRoleInUser}

          fetchPermissionsByRoleIds={this.props.fetchPermissionsByRoleIds}
          fetchedPermissionsByRoleIds={this.props.fetchedPermissionsByRoleIds}

          //提交新用户
          save={this.props.save}
          formData={this.props.formData}

          //提交新角色
          saveNewRole={this.props.saveNewRole}
          formDataNewRole={this.props.formDataNewRole}

          changeValue={this.props.changeValue}
          changeValue_CreateRole={this.props.changeValue_CreateRole}

          fetchFolders={this.props.fetchFolders}
          fetchedFolders={this.props.fetchedFolders}

          queryUserInfoById={this.props.queryUserInfoById}
          queriedUserInfo={this.props.queriedUserInfo}

          fetchRoleById={this.props.fetchRoleById}
          fetchedRoleById={this.props.fetchedRoleById}

          updateUserInfo={this.props.updateUserInfo}
          resetPwd={this.props.resetPwd}
          updateRoleInfo={this.props.updateRoleInfo}

          acceptRoleRecord={this.props.acceptRoleRecord}

          stopUser={this.props.stopUser}

          onBlurData={this.props.onBlurData}
          checkedOutBlurData={this.props.checkedOutBlurData}
          saveErrors={this.props.saveErrors}
        />
      </div>
    );
  };
}
function mapStateToProps(state) {
  return {
    fetchedPermission: state.permissions_reducer.fetchedPermission,
    fetchedRole: state.permissions_reducer.fetchedRole,
    fetchedUser: state.permissions_reducer.fetchedUser,
    fetchedRoleInUser: state.permissions_reducer.fetchedRoleInUser,
    fetchedPermissionsByRoleIds: state.permissions_reducer.fetchedPermissionsByRoleIds,
    formData: state.permissions_reducer.formData,
    formDataNewRole: state.permissions_reducer.formDataNewRole,
    currentUser: state.login.currentUser,
    fetchedFolders: state.permissions_reducer.fetchedFolders,
    queriedUserInfo: state.permissions_reducer.queriedUserInfo,
    fetchedRoleById: state.permissions_reducer.fetchedRoleById,
    checkedOutBlurData: state.permissions_reducer.checkedOutBlurData,
    saveErrors: state.permissions_reducer.saveErrors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPermissionList: () => dispatch(fetchPermissionList()),
    fetchRoleList: () => dispatch(fetchRoleList()),
    fetchUserList: (pageNum) => dispatch(fetchUserList(pageNum)),
    fetchRoleListInUser: () => dispatch(fetchRoleListInUser()),
    fetchPermissionsByRoleIds: (roleIds) => dispatch(fetchPermissionsByRoleIds(roleIds)),
    save: () => dispatch(save()),
    saveNewRole: () => dispatch(saveNewRole()),
    changeValue: (key, value) => dispatch(changeValue(key, value)),
    changeValue_CreateRole: (key, value) => dispatch(changeValue_CreateRole(key, value)),
    fetchFolders: (id) => dispatch(fetchFolders(id)),
    clearData: () => dispatch(clearData()),
    clearData_Role: () => dispatch(clearData_Role()),
    queryUserInfoById: (id) => dispatch(queryUserInfoById(id)),
    fetchRoleById: (id) => dispatch(fetchRoleById(id)),
    updateUserInfo: () => dispatch(updateUserInfo()),
    resetPwd: (id) => dispatch(resetPwd(id)),
    updateRoleInfo: () => dispatch(updateRoleInfo()),
    acceptRoleRecord: (roleRecord) => dispatch(acceptRoleRecord(roleRecord)),
    stopUser: (id) => dispatch(stopUser(id)),
    onBlurData: (err) => dispatch(onBlurData(err)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserGroupManage);
