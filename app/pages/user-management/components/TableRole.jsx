import React from 'react';
import { Table, Button, Row, Modal, Form, Input, Tree, notification } from 'antd';
import './UserManager.css';
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const styles = {
  treeDiv: {
    width: '240px',
    height: '300px',
    border: '1px solid #ccc',
    overflowY: 'scroll',
  },
};

class TableRole extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,

    fetchRoleList: React.PropTypes.func.isRequired,
    fetchedRole: React.PropTypes.object,

    saveNewRole: React.PropTypes.func,
    formDataNewRole: React.PropTypes.object,
    currentUser:  React.PropTypes.object,

    fetchPermissionList: React.PropTypes.func.isRequired,
    fetchedPermission: React.PropTypes.object,

    changeValue_CreateRole: React.PropTypes.func,

    fetchRoleById: React.PropTypes.func,
    fetchedRoleById: React.PropTypes.object,

    clearData_Role: React.PropTypes.func.isRequired,
    updateRoleInfo: React.PropTypes.func,
    acceptRoleRecord: React.PropTypes.func,
  }


  state = {
    showModal: false,
    isView: false,
    status: '',
    modalTitle: '',
    defaultName: '',
    defaultPermissions: [],
    defaultDescription: '',
  }


  columns = [{
    title: '角色名称',
    dataIndex: 'name',
    key: 'name',
    width: '8%',
  }, {
    title: '角色说明',
    dataIndex: 'description',
    key: 'description',
    width: '9%',
  }, {
    title: '权限',
    dataIndex: 'permission',
    key: 'permission',
    width: '39%',
  }, {
    title: '创建人',
    dataIndex: 'createdBy',
    key: 'createdBy',
    width: '7%',
  }, {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: '10%',
  }, {
    title: '更新人',
    dataIndex: 'updatedBy',
    key: 'updatedBy',
    width: '7%',
  }, {
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: '10%',
  }, {
    title: '操作',
    dataIndex: 'roleoperation',
    key: 'roleoperation',
    width: '10%',
    render: (text, record, index) => {
      let permissions = this.props.currentUser.permissions;
      let canView = permissions.includes('role_view');
      let canEdit = permissions.includes('role_edit');
      return(
        <div className="aa">
          {canView ? <a className="bb" onClick={this.clickView.bind(this, record)}>查看</a> : ''}
          {canEdit ? <a className="bb" onClick={this.clickEdit.bind(this, record)}>编辑</a> : ''}
        </div>
      );
    },
  }];



  clickView = (record) => {
    this.setState({
      showModal: true,
      isView: true,
      status: 'view',
      modalTitle: '查看角色',
      defaultName: record.name,
      defaultDescription: record.description,
      defaultPermissions: record.permissions.map(item => {
        return item.id.toString();
      }),
    });
  }



  clickEdit = (record) => {
    this.props.acceptRoleRecord(record);
    this.setState({
      showModal: true,
      isView: false,
      status: 'edit',
      modalTitle: '编辑角色',
    });
  }



  submitRole = () => {
    this.props.form.validateFields((err, values) => {
      if(!err) {
        if(this.state.status == 'edit') {
          this.props.updateRoleInfo();
        } else if (this.state.status == 'new') {
          this.props.saveNewRole();
        }
        this.setState({showModal: false});
        this.props.fetchRoleList();
      } else {
        if(err.rolename) {
          notification.error({message: err.rolename.errors[0].message});
        } else if (err.roledescription) {
          notification.error({message: err.roledescription.errors[0].message});
        }
      }
    });

  }

  handleAdd = () => {
    //this.props.clearData_Role();
    this.setState({
      showModal: true,
      isView: false,
      status: 'new',
      modalTitle: '添加角色',
      defaultName: '',
      defaultPermissions: [],
      defaultDescription: '',
    });
  }

  onClose = () => {
    this.setState({showModal: false});
  }

  handleRefresh = () => {
    this.props.fetchRoleList();
  }

  componentWillMount = () => {
    this.props.fetchRoleList();
    this.props.fetchPermissionList();
  }

  afterClose = () => {
    this.handleRefresh();
  }

  /*下面是添加角色的changevalue函数*/
  //Input
  changeRoleName = (e) => {
    this.props.changeValue_CreateRole('name', e.target.value);
  }

  //树
  changeRolePermission = (selectedKeys, info) => {
    let perIds = selectedKeys.toString();
    this.props.changeValue_CreateRole('rolePermissions', perIds);
  }

  //Input
  changeRoleDescription = (e) => {
    this.props.changeValue_CreateRole('description', e.target.value);
  }



  getDefaultValues = () => {
    let mState = this.state.status;
    let obj = {
      roleName: '',
      permission_ids: [],
      roleDescription: '',
    };
    switch(mState) {
    case 'new':
      obj = {
        roleName: '',
        permission_ids: [],
        roleDescription: '',
      };
      break;
    case 'edit': {
      let roleRecord = this.props.formDataNewRole;
      obj = {
        roleName: roleRecord.name,
        permission_ids: roleRecord.permission_ids.split(','),
        roleDescription: roleRecord.description,
      };
      break;
    }
    case 'view':
      obj = {
        roleName: this.state.defaultName,
        permission_ids: this.state.defaultPermissions,
        roleDescription: this.state.defaultDescription,
      };
      break;
    default:
      break;
    }
    return obj;
  }




  render = () => {
    let permissions = this.props.currentUser.permissions;
    let canAdd = permissions.includes('role_add');

    const { getFieldDecorator } = this.props.form;
    //填充表格
    let data = [];
    data = this.props.fetchedRole.roleData && this.props.fetchedRole.roleData.map(item => {
      item.key = item.id;
      item.permission = item.permissions.map(per => {
        return per.displayName;
      }).join('；');
      return item;
    });

    let footButtons = (() => {
      return(
        <div style={{textAlign: 'center', marginTop:'8px'}}>
          <Button disabled={this.state.isView} type='primary' onClick={this.submitRole} style={{margin: '8px'}}>保存</Button>
          <Button onClick={this.onClose} style={{margin: '8px'}}>取消</Button>
        </div>
      );
    })();

    //填充弹框中的权限树
    const loop = data => data.map(item => {
      if (item.children) {
        return <TreeNode disabled={this.state.isView} title={item.displayName} key={item.id}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode disabled={this.state.isView} title={item.displayName} key={item.id} isLeaf={true} />;
    });
    let treeData = [];
    if(this.props.fetchedPermission.permissionData) {
      treeData = loop(this.props.fetchedPermission.permissionData);
    }


    let defObj = this.getDefaultValues();

    return (
      <div>
        <Row>
          {canAdd?<Button className="editable-add-btn" onClick={this.handleAdd} style={{marginRight:'20px'}}>添加角色</Button>:''}
          <Button className="editable-add-btn" onClick={this.handleRefresh}>刷新</Button>
        </Row>

        <Row>
          <Table
            bordered
            dataSource={data}
            columns={this.columns}
            pagination={false}
          />
        </Row>



        <Modal
          width={750}
          visible={this.state.showModal}
          title={this.state.modalTitle}
          footer={footButtons}
          onCancel={this.onClose}
          afterClose={this.afterClose}
        >
          {this.state.showModal&&<Form>
            <FormItem
              label='角色名称'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 10 }}
            >
              {
                getFieldDecorator('rolename',
                  {initialValue: defObj.roleName,
                    rules: [{required: true, message: '角色名称不能为空'}],
                  })(<Input disabled={this.state.isView} onChange={this.changeRoleName.bind(this)}/>)
              }
            </FormItem>

            <FormItem
              label='拥有权限'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 10 }}
            >
              {
                getFieldDecorator('ownpermissions',
                  {initialValue: '',
                    //rules: [{required: true, message: '权限不能为空'}],
                  })(<div style={styles.treeDiv}>
                    {this.state.showModal?<Tree
                      checkable
                      defaultExpandAll={true}
                      onCheck={this.changeRolePermission.bind(this)}
                      defaultCheckedKeys={defObj.permission_ids}
                                          >
                      {treeData}
                    </Tree>:''}

                  </div>)
              }
            </FormItem>

            <FormItem
              label='角色说明'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 10 }}
            >
              {
                getFieldDecorator('roledescription',
                  {initialValue: defObj.roleDescription,
                    rules: [{required: true, message: '角色说明不能为空'}],
                  })(<Input disabled={this.state.isView} type='textarea' onChange={this.changeRoleDescription.bind(this)}/>)
              }
            </FormItem>

          </Form>}
        </Modal>
      </div>
    );
  }

}


export default Form.create()(TableRole);
