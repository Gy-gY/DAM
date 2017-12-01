import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Button} from 'antd';
import {modal} from '../components/modal';
class ClassificationManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'modalBox':null,
      'searchParams':{
        pageNum:1,
        pageSize:10,
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
    getUserList : React.PropTypes.func,
    users : React.PropTypes.array,
    createUserInfo : React.PropTypes.func,
    status : React.PropTypes.string,
    delStatus : React.PropTypes.string,
  }

  componentWillMount() {

  }

  refresh() {
    const {searchParams} = this.state;
    this.props.getUserList(searchParams).then((res)=>{
      console.log('res===', res);
    }).catch((error)=>{
      console.error('error===', error);
      this.alertMsg('获取用户信息失败！', 'error');
    });
  }

  render() {
    const {modalBox} = this.state;
    return (
      <div>
        {modalBox}
        <div>
          <Link to="/user_group_manage"><Button type="primary">新建分类</Button></Link>&nbsp;
        </div>
        <div>
          开发中，敬请期待……
        </div>

      </div>
    );
  }


  createUser() {
    const config = {
      'width':'1200',
      'title': <small style={{'fontSize':'14px'}}>个人用户</small>,
      'body': '',
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

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps() {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassificationManage);
