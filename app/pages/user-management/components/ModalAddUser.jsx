import React from 'react';
import AddUserBaseInfo from './AddUserBaseInfo';
import AddUserAuthorizeInfo from './AddUserAuthorizeInfo';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

export default class ModalAddUser extends React.Component {
  static propTypes = {
    onClose: React.PropTypes.func,
    isShow: React.PropTypes.bool,
    fetchRoleListInUser: React.PropTypes.func.isRequired,
    fetchedRoleInUser: React.PropTypes.object,

    fetchPermissionsByRoleIds: React.PropTypes.func.isRequired,
    fetchedPermissionsByRoleIds: React.PropTypes.object,

    changeValue: React.PropTypes.func.isRequired,

    fetchFolders: React.PropTypes.func,
    fetchedFolders: React.PropTypes.object,

    queryUserInfoById: React.PropTypes.func,
    queriedUserInfo: React.PropTypes.object,
    formData: React.PropTypes.object,

    userTableRecord: React.PropTypes.object,
    modalStatus: React.PropTypes.string,

    resetPwd: React.PropTypes.func,
    onBlurData: React.PropTypes.func,
  }


  render = () => {

    return(
      <Tabs onChange={this.onChange} defaultActiveKey='1'>

        <TabPane
          key="1"
          tab={<span>基本信息</span>}>
          <AddUserBaseInfo
            onClose={this.props.onClose}
            changeValue={this.props.changeValue}
            queryUserInfoById={this.props.queryUserInfoById}
            queriedUserInfo={this.props.queriedUserInfo}
            formData={this.props.formData}

            userTableRecord={this.props.userTableRecord}
            modalStatus={this.props.modalStatus}

            resetPwd={this.props.resetPwd}
            onBlurData={this.props.onBlurData}
          />
        </TabPane>
        

        <TabPane
          key="2"
          tab={<span>授权信息</span>}>
          <AddUserAuthorizeInfo
            onClose={this.props.onClose}
            fetchRoleListInUser={this.props.fetchRoleListInUser}
            fetchedRoleInUser={this.props.fetchedRoleInUser}
            fetchPermissionsByRoleIds={this.props.fetchPermissionsByRoleIds}
            fetchedPermissionsByRoleIds={this.props.fetchedPermissionsByRoleIds}
            changeValue={this.props.changeValue}
            fetchFolders={this.props.fetchFolders}
            fetchedFolders={this.props.fetchedFolders}
            queryUserInfoById={this.props.queryUserInfoById}
            queriedUserInfo={this.props.queriedUserInfo}
            formData={this.props.formData}
            userTableRecord={this.props.userTableRecord}
            modalStatus={this.props.modalStatus}
            isShow={this.props.isShow}
          />
        </TabPane>

      </Tabs>
    );
  };
}
