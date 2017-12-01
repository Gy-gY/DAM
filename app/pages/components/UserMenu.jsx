import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Menu, Icon, Modal, Form, Input, notification } from 'antd';
import { logout, changePassword, controlShow } from '../../actions';
const FormItem = Form.Item;


class SideMenu extends React.Component {
  static propTypes = {
    me: React.PropTypes.object.isRequired,
    changedPwd: React.PropTypes.object.isRequired,
    navigateTo: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired,
    changePassword: React.PropTypes.func.isRequired,
    controlShow: React.PropTypes.func.isRequired,
    location: React.PropTypes.object,
    form: React.PropTypes.object,
  }

  state = {
    showModal: false,
    oldPwd: '',
    newPwd: '',
    confirmPwd: '',
    okStatus: true,
  }

  render() {

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px', zIndex: 1000 }}
          onClick={this.handleClick}
          selectedKeys={[this.props.location.pathname.slice(1)]}
          onSelect={this.navigateTo}
        >
          <Menu.SubMenu key="me" title={
            <span>
              <Icon type="user" />
              <span className="nav-text">{this.props.me.displayName}</span>
            </span>
          }>
            {
              <Menu.Item key="myDownload">
                <span><Icon type="download" /></span>
                <span className="nav-text">我的下载</span>
              </Menu.Item>
            }
            {
              <Menu.Item key="myCollections">
                <span><Icon type="star" /></span>
                <span className="nav-text">我的收藏</span>
              </Menu.Item>
            }
            {
              <Menu.Item key="modifypwd">
                <span><Icon type="key" /></span>
                <span className="nav-text">修改密码</span>
              </Menu.Item>
            }
            <Menu.Item key="logout">
              <span><Icon type="logout" /></span>
              <span className="nav-text">退出</span>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>



        {this.state.showModal&&<Modal
          width={500}
          visible={this.state.showModal}
          title={'修改密码'}
          onOk={this.onOk}
          onCancel={this.onClose}
                               >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="旧密码"
              hasFeedback
            >
              {getFieldDecorator('oldpassword', {
                rules: [{
                  required: true, message: '请输入旧密码',
                }, {
                  //validator: this.checkConfirm,
                }],
              })(
                <Input type="password" onBlur={this.handleOldBlur} />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="新密码"
              hasFeedback
            >
              {getFieldDecorator('newpassword', {
                rules: [{
                  required: true, message: '请输入新密码',
                }, {
                  //  validator: this.checkConfirm,
                }],
              })(
                <Input type="password" onBlur={this.handleNewBlur} />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="确认新密码"
              hasFeedback
            >
              {getFieldDecorator('confirmpassword', {
                rules: [{
                  required: true, message: '请输入新密码确认',
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
              )}
            </FormItem>

          </Form>
        </Modal>}
      </div>
    );
  }










  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newpassword')) {
      callback('新密码和确认密码不一致');
    } else {
      callback();
    }
  }

  // checkConfirm = (rule, value, callback) => {
  //   const form = this.props.form;
  //   // if (value/* && this.state.confirmDirty*/) {
  //   //   form.validateFields(['confirm'], { force: true });
  //   // }
  //   // console.log('pwd value ------------>>>>', value);
  //   // //callback('xxxxxx');
  //
  // }


  handleOldBlur = (e) => {
    this.setState({
      oldPwd: e.target.value,
    });
  }

  handleNewBlur = (e) => {
    this.setState({
      newPwd: e.target.value,
    });
  }

  handleConfirmBlur = (e) => {
    this.setState({
      confirmPwd: e.target.value,
    });
  }

  onOk = () => {
    if(this.state.oldPwd == '') {
      notification.error({message: '旧密码不能为空'});
      return;
    }
    if(this.state.newPwd == '') {
      notification.error({message: '新密码不能为空'});
      return;
    }
    if(this.state.confirmPwd == '') {
      notification.error({message: '确认新密码不能为空'});
      return;
    }
    if(this.state.newPwd != this.state.confirmPwd) {
      notification.error({message: '新密码和确认密码不一致'});
      return;
    }
    this.setState({showModal: false});
    this.props.changePassword(this.state.oldPwd, this.state.newPwd);
  }


  onClose = () => {
    this.setState({showModal: false});
    //this.props.controlShow(false);
  }

  navigateTo = (e) => {
    if (e.key == 'logout') {
      return this.props.logout();
    }
    
    if (e.key == 'modifypwd') {
      this.setState({showModal: true});
      //this.props.controlShow(true);
    }else {
      this.props.navigateTo(e);
    }
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }
}

function mapStateToProps(state) {
  return {
    me: state.login.currentUser,
    location: state.router.location,
    changedPwd: state.login.changedPwd,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigateTo: (e) => dispatch(push(e.key)),
    logout: () => dispatch(logout()),
    changePassword: (oldPwd, newPwd) => dispatch(changePassword(oldPwd, newPwd)),
    controlShow: (flag) => dispatch(controlShow(flag)),
  };
}
const x = Form.create()(SideMenu);
export default connect(mapStateToProps, mapDispatchToProps)(x);
