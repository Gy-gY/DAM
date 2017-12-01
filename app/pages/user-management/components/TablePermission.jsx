import React from 'react';
import { Table, Button, Row, Modal, Form, Input, Tree } from 'antd';
import './UserManager.css';
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

const styles = {
  separator: {
    width:'100%',
    height:'20px',
    lineHeight:'20px',
    backgroundColor:'#797979',
    textAlign:'center',
    fontSize:'12px',
    color: '#fff',
  },
  viewFont: {
    color: '#999',
  },
};
class TablePermisson extends React.Component {
  static propTypes = {
    fetchPermissionList: React.PropTypes.func.isRequired,
    fetchedPermission: React.PropTypes.object,
    form: React.PropTypes.object.isRequired,
    currentUser:  React.PropTypes.object,
  }

  state = {
    showModal: false,
    defaultPerName: '',
    defaultModuleName: '',
    defaultPerCode: '',
    defaultPerDescription: '',
  }

  columns = [{
    title: '权限名称',
    dataIndex: 'displayName',
    key: 'displayName',
    width: '15%',
  }, {
    title: '权限code',
    dataIndex: 'keyName',
    key: 'keyName',
    width: '25%',
  }, {
    title: '权限说明',
    dataIndex: 'description',
    key: 'description',
    width: '20%',
  }, {
    title: '创建人',
    dataIndex: 'createdBy',
    key: 'createdBy',
    width: '10%',
  }, {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: '20%',
  }, {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: '10%',
    render: (text, record, index) => {
      let permissions = this.props.currentUser.permissions;
      let canView = permissions.includes('auth_view');
      return(
        <div className="aa" style={{textAlign:'center'}}>
          {canView ? <a onClick={this.clickView.bind(this, record)} className="bb">查看</a> : ''}
        </div>
      );
    },
  }];


  clickView = (record) => {
    this.setState({
      showModal: true,
      defaultPerName: record.displayName,
      defaultModuleName: record.moduleName,
      defaultPerCode: record.keyName,
      defaultPerDescription: record.description,
    });
  }

  onClose = () => {
    this.setState({showModal: false});
  }

  handleRefresh = () => {
    this.props.fetchPermissionList();
  }

  componentWillMount = () => {
    this.props.fetchPermissionList();
  }

  render = () => {
    const { getFieldDecorator } = this.props.form;
    let Tables = this.props.fetchedPermission.permissionData.map(item => {
      let data = item.children.map(kid => {
        kid.key = kid.id;
        kid.moduleName = item.displayName;
        return kid;
      });
      return (
        <div>
          <div style={styles.separator}>{item.displayName}</div>
          <Table
            key={item.id}
            bordered
            columns={this.columns}
            dataSource={data}
            pagination={false}
          >
          </Table>
        </div>
      );
    });


    //弹框中权限树的渲染
    // const loop = data => data.map(item => {
    //   if (item.children) {
    //     return <TreeNode title={item.displayName} key={item.id} disabled={true}>{loop(item.children)}</TreeNode>;
    //   }
    //   return <TreeNode title={item.displayName} key={item.id} isLeaf={true} disabled={true} />;
    // });
    // let treeData = [];
    // if(this.props.fetchedPermission.permissionData) {
    //   treeData = loop(this.props.fetchedPermission.permissionData);
    // }



    let footButton = (() => {
      return(
        <div style={{textAlign: 'center'}}>
          <Button type="primary" onClick={this.onClose}>关闭</Button>
        </div>
      );
    })();



    return (
      <div>
        <Row>
          <Button className="editable-add-btn" onClick={this.handleRefresh}>刷新</Button>
        </Row>
        <Row>
          {Tables}
        </Row>

        <Modal
          visible={this.state.showModal}
          title={'查看权限'}
          footer={footButton}
          onCancel={this.onClose}
        >
          <div>
            <Form>
              <FormItem
                label='权限名称'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
              >
                {
                  getFieldDecorator('rolename',
                    {initialValue: this.state.defaultPerName,
                    })(<Input disabled={true} style={styles.viewFont}/>)
                }
              </FormItem>

              <FormItem
                label='所属模块'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
              >
                {
                  getFieldDecorator('roledescription',
                    {initialValue: this.state.defaultModuleName,
                    })(<Input style={styles.viewFont} disabled/>)
                }
              </FormItem>

              <FormItem
                label='权限code'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
              >
                {
                  getFieldDecorator('roledescription',
                    {initialValue: this.state.defaultPerCode,
                    })(<Input style={styles.viewFont} disabled/>)
                }
              </FormItem>

              <FormItem
                label='权限说明'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
              >
                {
                  getFieldDecorator('perdescription',
                    {initialValue: this.state.defaultPerDescription,
                    })(<Input style={styles.viewFont} type='textarea' disabled/>)
                }
              </FormItem>

            </Form>
          </div>
        </Modal>

      </div>
    );
  }

}


export default Form.create()(TablePermisson);
