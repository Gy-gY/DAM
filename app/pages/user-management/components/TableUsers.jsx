import React from 'react';
import ModalAddUser from './ModalAddUser';
import { Table, Button, Modal, Row, Pagination, notification } from 'antd';
import './UserManager.css';

const confirm = Modal.confirm;
export default class TableUsers extends React.Component {
  static propTypes = {
    fetchUserList: React.PropTypes.func.isRequired,
    fetchedUser: React.PropTypes.object,
    clearData: React.PropTypes.func.isRequired,
    fetchRoleListInUser: React.PropTypes.func,
    fetchedRoleInUser: React.PropTypes.object,

    fetchPermissionsByRoleIds: React.PropTypes.func.isRequired,
    fetchedPermissionsByRoleIds: React.PropTypes.object,

    save: React.PropTypes.func.isRequired,
    formData: React.PropTypes.object,

    changeValue: React.PropTypes.func.isRequired,

    fetchFolders: React.PropTypes.func,
    fetchedFolders: React.PropTypes.object,

    queryUserInfoById: React.PropTypes.func,
    queriedUserInfo: React.PropTypes.object,

    userTableRecord: React.PropTypes.object,
    modalStatus: React.PropTypes.string,

    updateUserInfo: React.PropTypes.func,
    resetPwd: React.PropTypes.func,

    currentUser:  React.PropTypes.object,
    stopUser: React.PropTypes.func,
    onBlurData: React.PropTypes.func,
    checkedOutBlurData: React.PropTypes.object,
    saveErrors: React.PropTypes.object,
  }
  state = {
    showModal: false,
    record: {},
    status: '',
    modalTitle: '',
    pageNumber: 1,
  }

  columns = [{
    title: '用户姓名',
    dataIndex: 'realName',
    key: 'realName',
    width: '6%',
  }, {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    width: '6%',
  }, {
    title: '角色',
    dataIndex: 'roleName',
    key: 'roleName',
    width: '10%',
  }, {
    title: '权限',
    dataIndex: 'permissionName',
    key: 'permissionName',
    width: '31%',
  }, {
    title: '创建人',
    dataIndex: 'createdBy',
    key: 'createdBy',
    width: '6%',
  }, {
    title: '创建时间',
    dataIndex: 'regTime',
    key: 'regTime',
    width: '8%',
  }, {
    title: '更新人',
    dataIndex: 'updatedBy',
    key: 'updatedBy',
    width: '6%',
  }, {
    title: '更新时间',
    dataIndex: 'updatedTime',
    key: 'updatedTime',
    width: '6%',
  }, {
    title: '状态',
    dataIndex: 'statuss',
    key: 'statuss',
    width: '6%',
  }, {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: '14%',
    render: (text, record, index) => {
      let per = this.props.currentUser.permissions;
      let canView = per.includes('user_view');
      let canEdit = per.includes('user_edit');
      return(
        <div className="aa">
          {canView ? <a className="bb" onClick={this.openViewModal.bind(this, record)}>查看</a> : ''}
          {canEdit ? <a className="bb" onClick={this.openEditModal.bind(this, record)}>编辑</a> : ''}
          <a className="bb cc" onClick={this.resetPwd.bind(this, record)}>重置密码</a>
          <a className="bb" onClick={this.stopUser.bind(this, record)}>{record.status==1?'停用':'启用'}</a>
        </div>
      );
    },
  }];

  stopUser = (record) => {
    let _this = this;
    this.props.stopUser(record.userId);
    setTimeout(function() {_this.props.fetchUserList(_this.state.pageNumber);}, 300);
  }

  openViewModal = (record) => {
    this.props.fetchRoleListInUser();
    this.props.queryUserInfoById(record.userId);
    this.setState({
      showModal: true,
      status: 'view',
      modalTitle: '查看用户',
    });
    let roleIds = record.roles.map(role => {
      return role.id;
    });
    this.props.fetchPermissionsByRoleIds(roleIds);
  }

  openEditModal = (record) => {
    this.props.fetchRoleListInUser();
    this.props.queryUserInfoById(record.userId);
    this.setState({
      showModal: true,
      status: 'edit',
      modalTitle: '编辑用户',
    });

    let roleIds = record.roles.map(role => {
      return role.id;
    });
    this.props.fetchPermissionsByRoleIds(roleIds);
  }

  handleAdd = () => {
    this.props.clearData();
    this.props.fetchRoleListInUser();
    this.setState({
      showModal: true,
      status: 'new',
      modalTitle: '添加用户',
    });
  }

  onChangePage = (page) => {
    this.setState({pageNumber: page});
    this.props.fetchUserList(page);
  }

  resetPwd = (record) => {
    let _this = this;
    confirm({
      title: '确定要重置密码?',
      content: '确定要重置密码?',
      onOk() {
        _this.props.resetPwd(record.userId);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }


  handleRefresh = () => {
    this.props.fetchUserList(this.state.pageNumber);
  }

  onClose = () => {
    this.setState({showModal: false});
  }

  componentWillMount = () => {
    this.props.fetchUserList(1);
  }

  afterClose = () => {
    this.handleRefresh();
    this.props.clearData();
  }


  isEmpty = (object) => {
    if (object === null || object === undefined) {
      return false;
    }
    for (let i in object) {
      return false;
    }
    return true;
  }


  save = () => {
    let errs = this.props.checkedOutBlurData;
    console.log('errs =====>>>> ', errs);
    //如果为空，说明无错误，正常执行程序，否则，依次检查email、realName、phonenumber
    if(!errs || this.isEmpty(errs)) {
      if(this.state.status == 'new') {
        this.props.save();
      } else if (this.state.status == 'edit') {
        this.props.updateUserInfo(this.props.queriedUserInfo.userView.userId);
      }
      this.setState({showModal: false});
    } else {
      if(errs.email) {
        notification.error({message: errs.email.errors[0].message});
      } else if(errs.realname) {
        notification.error({message: errs.realname.errors[0].message});
      } else if(errs.phonenumber) {
        notification.error({message: errs.phonenumber.errors[0].message});
      }
    }
  }

  render = () => {

    // console.log('this.props.saveErrors === render ===== ', this.props.saveErrors);
    // let saveShow = true;
    // let status = this.props.saveErrors.status;
    // if (status != 'undefined' && status == false) {
    //   saveShow = false;
    // }
    // console.log('saveShow ===========||============ ', saveShow);

    const columns = this.columns;
    let pageTotal = this.props.fetchedUser.userData.total;
    let data = [];
    if (this.props.fetchedUser.userData.list && this.props.fetchedUser.userData.list.length > 0) {
      data = this.props.fetchedUser.userData.list.map(item => {
        if(item.status == 1) {
          item.statuss = '已启用';
        } else if (item.status == 0) {
          item.statuss = '已停用';
        }
        item.key = item.userId;
        item.permissionName = '';
        if(item.roles) {
          item.roleName = item.roles.map(role => {
            if(role.permissions) {
              item.permissionName += role.permissions.map(permission => {
                return permission.displayName;
              }).join('；');
            }
            return role.name;
          }).join('；');
        }
        return item;
      });
    }

    let footButtons = (() => {
      return(
        <div style={{textAlign: 'center', marginTop:'8px'}}>
          <Button disabled={this.state.status == 'view' ? true : false} onClick={this.save} style={{margin: '8px'}}>保存并关闭</Button>
          <Button onClick={this.onClose} style={{margin: '8px'}}>取消</Button>
        </div>
      );
    })();

    let per = this.props.currentUser.permissions;
    let canAdd = per.includes('user_add');
    return (
      <div>
        <Row>
          {canAdd ? <Button className="editable-add-btn" onClick={this.handleAdd} style={{marginRight:'20px'}}>添加用户</Button> : ''}
          <Button className="editable-add-btn" onClick={this.handleRefresh}>刷新</Button>
        </Row>

        <Row>
          <Table
            bordered
            dataSource={data}
            columns={columns}
            pagination={false}
          />
        </Row>
        <Row style={{float: 'right', marginTop: '20px', marginBottom: '20px', height: '40px'}}>
          <Pagination current={this.state.pageNumber} onChange={this.onChangePage} total={pageTotal} pageSize={10} />
        </Row>

        <Modal
          width={780}
          visible={this.state.showModal}
          title={this.state.modalTitle}
          footer={footButtons}
          onCancel={this.onClose}
          afterClose={this.afterClose}
        >
          {this.state.showModal&&<ModalAddUser
            isShow={this.state.showModal}
            onClose={this.onClose}
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

            userTableRecord={this.props.queriedUserInfo.userView}
            modalStatus={this.state.status}

            resetPwd={this.props.resetPwd}
            onBlurData={this.props.onBlurData}
                                 />}
        </Modal>
      </div>
    );
  }
}
