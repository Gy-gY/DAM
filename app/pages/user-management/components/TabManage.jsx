import React from 'react';
import { Tabs } from 'antd';
import TableUsers from './TableUsers';
import TableRole from './TableRole';
import TablePermisson from './TablePermission';
const TabPane = Tabs.TabPane;
const styles = {
  tab: {
    width: '98%',
    margin: '0 auto',
  },
};

export default class TabManage extends React.Component {

  static propTypes = {
    fetchPermissionList: React.PropTypes.func.isRequired,
    fetchedPermission: React.PropTypes.object,

    fetchRoleList: React.PropTypes.func.isRequired,
    fetchedRole: React.PropTypes.object,

    fetchUserList: React.PropTypes.func.isRequired,
    fetchedUser: React.PropTypes.object,

    fetchRoleListInUser: React.PropTypes.func.isRequired,
    fetchedRoleInUser: React.PropTypes.object,

    fetchPermissionsByRoleIds: React.PropTypes.func.isRequired,
    fetchedPermissionsByRoleIds: React.PropTypes.object,

    save: React.PropTypes.func.isRequired,
    formData: React.PropTypes.object,

    saveNewRole: React.PropTypes.func.isRequired,
    formDataNewRole: React.PropTypes.object,


    changeValue: React.PropTypes.func,
    changeValue_CreateRole: React.PropTypes.func,

    fetchFolders: React.PropTypes.func,
    fetchedFolders: React.PropTypes.object,

    queryUserInfoById: React.PropTypes.func,
    queriedUserInfo: React.PropTypes.object,
    clearData: React.PropTypes.func.isRequired,
    clearData_Role: React.PropTypes.func.isRequired,
    currentUser:  React.PropTypes.object,

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
    let per = this.props.currentUser.permissions;
    let canUserTab = per.includes('user_add') || per.includes('user_edit') || per.includes('user_view');
    let canRoleTab = per.includes('role_add') || per.includes('role_view') || per.includes('role_edit');
    let canPerTab = per.includes('auth_view');

    let defaultActiveKey = '1';
    if(canUserTab) {
      defaultActiveKey = '1';
    } else if (canRoleTab) {
      defaultActiveKey = '2';
    } else if (canPerTab) {
      defaultActiveKey = '3';
    }
    return(
      <Tabs defaultActiveKey={defaultActiveKey} style={styles.tab}>
        {canUserTab ? <TabPane
          key="1"
          tab={<span>用户管理</span>}>
          <TableUsers
            fetchUserList={this.props.fetchUserList}
            fetchedUser={this.props.fetchedUser}
            clearData={this.props.clearData}
            currentUser={this.props.currentUser}

            fetchRoleListInUser={this.props.fetchRoleListInUser}
            fetchedRoleInUser={this.props.fetchedRoleInUser}

            fetchPermissionsByRoleIds={this.props.fetchPermissionsByRoleIds}
            fetchedPermissionsByRoleIds={this.props.fetchedPermissionsByRoleIds}

            save={this.props.save}
            formData={this.props.formData}

            changeValue={this.props.changeValue}

            fetchFolders={this.props.fetchFolders}
            fetchedFolders={this.props.fetchedFolders}

            queryUserInfoById={this.props.queryUserInfoById}
            queriedUserInfo={this.props.queriedUserInfo}

            updateUserInfo={this.props.updateUserInfo}
            resetPwd={this.props.resetPwd}
            stopUser={this.props.stopUser}
            onBlurData={this.props.onBlurData}
            checkedOutBlurData={this.props.checkedOutBlurData}

            saveErrors={this.props.saveErrors}
          />
        </TabPane> : ''}



        {canRoleTab ? <TabPane
          key="2"
          tab={<span>角色管理</span>}>
          <TableRole
            fetchRoleList={this.props.fetchRoleList}
            fetchedRole={this.props.fetchedRole}

            saveNewRole={this.props.saveNewRole}
            formDataNewRole={this.props.formDataNewRole}
            currentUser={this.props.currentUser}

            fetchPermissionList={this.props.fetchPermissionList}
            fetchedPermission={this.props.fetchedPermission}

            changeValue_CreateRole={this.props.changeValue_CreateRole}

            fetchRoleById={this.props.fetchRoleById}
            fetchedRoleById={this.props.fetchedRoleById}

            clearData_Role={this.props.clearData_Role}
            updateRoleInfo={this.props.updateRoleInfo}
            acceptRoleRecord={this.props.acceptRoleRecord}
          />
        </TabPane> : ''}



        {canPerTab ? <TabPane
          key="3"
          tab={<span>权限管理</span>}>
          <TablePermisson
            currentUser={this.props.currentUser}

            fetchPermissionList={this.props.fetchPermissionList}
            fetchedPermission={this.props.fetchedPermission}
          />
        </TabPane> : ''}

      </Tabs>
    );
  };
}
