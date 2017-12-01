import React from 'react';
import { connect } from 'react-redux';
import { Button, Layout} from 'antd';
import GroupTree from './components/GroupTree';
import UserInfo from './components/UserInfo';
import UserList from './components/UserList';
import PaginationArea from './components/PaginationArea';
import {getUserList} from '../../actions';
import {
  getGroupTreeData,
  getUserListByGroupId,
  updateUserGroupReRelationship,
  getRoleList,
  delUserGroupNode,
  createUserInfo,
  addUserGroupNode,
  editUserGroupNode,
} from '../../actions';
import {modal} from '../components/modal';
import UserGroupInfo from './components/UserGroupInfo';
const { Sider, Content } = Layout;
const styles = {
  sider: {
    background: '#fff',
    overflow: 'auto',
    marginRight: '1px',
  },
  content: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  search: {
    padding: '16px 16px',
    background: '#fff',
    flex: '0 0 auto',
  },
  breadcrumb: {
    margin: '12px 0',
  },
  button: {
    background: '#fff',
    padding: '16px 16px',
    flex: '1 0 auto',
  },
  lists: {
    background: '#fff',
    padding: '0 8px',
    flex: '1 1 100%',
    overflow: 'auto',
    alignContent: 'flex-start',
  },
  pagination: {
    background: '#fff',
    padding: '8px 16px',
    textAlign: 'right',
  },
};
class UserGroupManage extends React.Component {
  constructor(props) {
    super(props);
    this.props.loadGroupTreeData();
    this.state = {
      'modalBox':null,
      'nodeParams':{},
      'selectedRows':[],
      'paginationParams':{
        pageNum:1,
        pageSize:10,
        total:0,
      },
      'alert':{
        'onHide': this.closeAlert.bind(this),
        'title': null,
        'body': null,
        'visible':false,
        'width':null,
        'okText':'确定',
        'cancelText':'取消',
        'footer':null,
        'maskClosable':true,
        'onCancel':this.closeAlert.bind(this),
      },
    };
  }

  static propTypes = {
    groupTreeData: React.PropTypes.array,
    loadGroupTreeData: React.PropTypes.func,
    createUserInfo : React.PropTypes.isRequired,
    updateUserGroupReRelationship : React.PropTypes.func,
    getUserListByGroupId : React.PropTypes.func,
    history :React.PropTypes.func,
    users : React.PropTypes.array,
    getRoleList: React.PropTypes.func.isRequired,
    delChildUserGroupNode: React.PropTypes.func.isRequired,
    addUserGroupNode: React.PropTypes.func.isRequired,
    editUserGroupNode:React.PropTypes.func.isRequired,
    paginationParams:React.PropTypes.object,
    role : React.PropTypes.array,
    userStatus:React.PropTypes.string,
  }

  componentWillMount() {
    this.getRoleList();
  }

  getRoleList() {
    this.props.getRoleList();
  }

  render() {
    const {modalBox, nodeParams, paginationParams} = this.state;
    const treeDataParams = {
      'selectedUserGroup':this.queryUserListByGroupId.bind(this),
    };
    const userListParams = {
      'unbindUserGroup' : this.unbindUserGroup.bind(this),
      'nodeParams' : nodeParams,
      'users' : this.props.users,
      'isRowSelection' : true,
      'type': 'groupAction',
      'refresh':this.queryUserListByGroupId.bind(this),
      'paginationParams': paginationParams,
    };
    return (
      <Layout>
        {modalBox}
        <Sider
          style={{ background: 'rgb(255, 255, 255)', 'marginRight': '1px', width: '180px'}}
        >
          <span style={{padding:'10px'}}>
            <Button type="primary" onClick={this.createUserGroup.bind(this, this.props.role.roleList)}>新建</Button>&nbsp;
            <Button type="primary" disabled={nodeParams.key?false:true} onClick={this.delUserGroup.bind(this)}>删除</Button>&nbsp;
            <Button type="primary" disabled={nodeParams.key?false:true} onClick={this.editUserGroup.bind(this)}>编辑</Button>&nbsp;
          </span>
          <GroupTree {...treeDataParams} parentObj={this.props.groupTreeData}/>
        </Sider>
        <Content style={{ background: 'rgb(255, 255, 255)', 'borderRadius': '5px', padding: '20px'}}>
          <div>
            <Button type="primary" disabled={nodeParams.key?false:true} onClick={this.createUserInfo.bind(this)}>新建用户</Button>
          </div><br/>
          <div>
            <UserList {...userListParams}/>
          </div>
          <PaginationArea
            style={styles.pagination}
            pagination={this.props.paginationParams}
            nodeParams={this.state.nodeParams}
            pageOnchange={this.queryUserListByGroupId.bind(this)}
            />
        </Content>
      </Layout>
    );
  }

  //删除群组
  delUserGroup() {
    const {nodeParams} = this.state;
    if(this.props.users.list.length>0) {
      this.alertMsg('该群组下存在用户，无法执行删除操作！', 'error');
      return false;
    }
    let params = {id:nodeParams.id || nodeParams.key};
    const msg = { 'title': '提示', 'body': '确定要执行此操作？'};
    const config = {
      'width':400,
      'title': '提示',
      'content':msg.body,
      'type':'confirm',
      'onOk':this.confirmDelUser.bind(this, params),
      'closable':true,
    };
    this.openAlert(config);
  }

  confirmDelUser(params) {
    const {nodeParams, paginationParams} = this.state;
    this.props.delChildUserGroupNode(params).then(()=>{
      this.queryUserListByGroupId(nodeParams, paginationParams);
      this.alertMsg('操作成功！', 'success');
    }).catch(()=>{
      this.alertMsg('操作失败！', 'error');
    });
  }

  //新建群组
  createUserGroup(roleList) {
    const {nodeParams} = this.state;
    const config = {
      'width':'1200px',
      'title': <small style={{'fontSize':'14px'}}>创建群组</small>,
      'body': <UserGroupInfo close={this.closeAlert.bind(this)} saveOrEditNewWorkGroup = {this.saveOrEditNewWorkGroup.bind(this)} roleList = {roleList} selectTreeNode={nodeParams} handlerSubmit={this.saveUserGroup.bind(this)} cancel={this.closeAlert.bind(this)} type='create'/>,
      'isBody':true,
      'isButton':false,
      'type':'form',
    };
    this.openAlert(config);
  }

  editUserGroup() {
    const {nodeParams} = this.state;
    const config = {
      'width':'1200px',
      'title': <small style={{'fontSize':'14px'}}>编辑群组</small>,
      'body': <UserGroupInfo close={this.closeAlert.bind(this)} roleList = {this.props.role.roleList} selectTreeNode={nodeParams} saveOrEditNewWorkGroup={this.saveOrEditNewWorkGroup.bind(this)} cancel={this.closeAlert.bind(this)} type='edit'/>,
      'isBody':true,
      'isButton':false,
      'type':'form',
    };
    this.openAlert(config);
  }

  saveUserGroup() {

  }

  unbindUserGroup(userParams) { //解除绑定
    const {nodeParams} = this.state;
    const groupId = nodeParams.key;
    const {userId} = userParams;
    const submitParams = {
      userId,
      groupId,
    };
    this.props.updateUserGroupReRelationship(submitParams).then(()=>{
      this.alertMsg('操作成功！', 'success');
      this.queryUserListByGroupId(nodeParams);
    }).catch((error)=>{
      console.error('error=====', error);
    });
  }

  queryUserListByGroupId(groupNode, paginationParams) {
    paginationParams = paginationParams || this.state.paginationParams;
    let id = groupNode.id || groupNode.key; //key == 节点ID
    const params = {
      workgroupId:{workgroupId:id},
    };
    Object.assign(paginationParams, params);
    this.setState({nodeParams:groupNode, paginationParams:paginationParams});
    this.props.getUserListByGroupId(paginationParams);
  }

  //添加、编辑群组
  saveOrEditNewWorkGroup(params, type) {
    if(type=='create') {
      this.props.addUserGroupNode(params).then(()=>{
        this.alertMsg('操作成功！', 'success');
      }).catch(()=>{
        this.alertMsg('操作失败！', 'error');
      });
    }else if(type=='edit') {
      const {nodeParams} = this.state;
      const groupId = nodeParams.key || nodeParams.id;
      params.id = groupId;
      this.props.editUserGroupNode(params).then(()=>{
        this.props.loadGroupTreeData();
        this.alertMsg('编辑成功！', 'success');
      }).catch(()=>{
        this.alertMsg('编辑失败！', 'error');
      });
    }

  }

  //添加, 编辑组用户
  saveOrEditNewWorkGroupUser(params) {
    this.alertMsg('操作成功！', 'success');
    const {paginationParams} = this.state;
    this.props.getUserListByGroupId(paginationParams);
  }

  createUserInfo() {
    const config = {
      'width':'800',
      'title': <small style={{'fontSize':'14px'}}>个人用户</small>,
      'body': <UserInfo key={this.props.userStatus} nodeParams={this.state.nodeParams} userStatus={this.props.userStatus} saveOrEditNewWorkGroupUser={this.saveOrEditNewWorkGroupUser.bind(this)} close={this.closeAlert.bind(this)} type='create'/>,
      'isBody':true,
      'isButton':false,
      'type':'form',
    };
    this.openAlert(config);
  }

  alertMsg(msg, type) {
    const config = {
      'width':400,
      'title': '提示',
      'onSubmit':false,
      'content':msg,
      'body':msg,
      'type':type,
      'okText':'确定',
      'onOk':null,
      'closable':true,
    };
    this.openAlert(config);
  }

  closeAlert() {
    const alert = Object.assign(this.state.alert, { 'visible': false });
    this.setState({ 'alert': alert, 'modalBox':'' });
    this.forceUpdate();
  }

  openAlert(config) {
    const alert = Object.assign(this.state.alert, { 'visible': true }, config);
    this.setState({ 'alert': alert, 'modalBox':modal(alert)});
    this.forceUpdate();
  }
}

function mapStateToProps(state) {
  return {
    groupTreeData: state.userMaster.groupTree.treeData,
    users : state.userMaster.userList.users,
    paginationParams:state.userMaster.userList.paginationParams,
    role : state.userMaster.role,
    'userStatus':state.userMaster.user.userStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadGroupTreeData: () => getGroupTreeData(dispatch),
    getUserList     : (paginationParams) => getUserList(dispatch, paginationParams),
    getUserListByGroupId : (params) => getUserListByGroupId(dispatch, params),
    unbindUserGroup : (params) => updateUserGroupReRelationship (dispatch, params),
    getRoleList : () => dispatch(getRoleList()),
    delChildUserGroupNode: (params) => dispatch(delUserGroupNode(params)),
    createUserInfo  : (user) => dispatch(createUserInfo(user)), //createUserInfo(dispatch, user),
    addUserGroupNode : (params) => dispatch(addUserGroupNode(params)),
    editUserGroupNode: (params) => dispatch(editUserGroupNode(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserGroupManage);
