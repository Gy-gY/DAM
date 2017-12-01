
import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
const FormItem = Form.Item;
import { push } from 'react-router-redux';
import {modifyPassword, sendCode} from '../../actions';

let formStyle = {
  backgroundColor: '#fff',
  width:300,
  position:'absolute',
  left:'75%',
  top:'50%',
  transform: 'translate(-50%, -50%)',
  border:'1px solid #49a9ee',
  borderRadius:'10px',
  padding:'50px 30px 30px 30px',
};

const pageStyle = {
  backgroundImage: 'url("https://unsplash.it/1920/1280/?random")',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

class Login extends React.Component {

  static propTypes = {
    form: React.PropTypes.object,
    modifyPassword: React.PropTypes.func,
    link2login: React.PropTypes.func,
    phoneCode: React.PropTypes.object,
    sendCode: React.PropTypes.func,
  }
  state = {
    confirmDirty: false,
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一样');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let ths=this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        ths.props.modifyPassword(values);
        // console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={pageStyle}>
      <Form onSubmit={this.handleSubmit} className="login-form" style={formStyle}>
        <FormItem>
          {getFieldDecorator('mobile', {
            rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码' }],
          })(
            <Input prefix={<Icon type="mobile" style={{ fontSize: 13 }} />} placeholder="手机号" />
          )}
        </FormItem>
        <FormItem>
          <Row gutter={14}>
              <Col span={12}>
                {getFieldDecorator('code', {
                  rules: [{ required: true, message: '请输入手机验证码' }],
                })(
                  <Input prefix={<Icon type="wallet" style={{ fontSize: 13 }} />} placeholder="手机验证码" size="large" />
                )}
              </Col>
              <Col span={8}>
                <Button onClick={(e)=>{
                  e.preventDefault();
                  if(this.props.phoneCode.canClick) {
                    this.props.form.validateFields(['mobile'], (err)=>{
                      if(!err) {
                        this.props.sendCode(this.props.form.getFieldValue('mobile'));
                      }
                    });
                  }
                }} style={{float:'rigth' }} disabled={!this.props.phoneCode.canClick} size="large">{this.props.phoneCode.message}</Button>
              </Col>
            </Row>
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="输入新密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [{ required: true, message: '请输入密码' }, {
              validator: this.checkPassword,
            }],
          })(
            <Input onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="再输一次" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%', marginBottom: '8px'}}>
            找回密码
          </Button>
          <Button style={{width:'100%'}} onClick={(e)=>{
            e.preventDefault();
            this.props.link2login();
          }}>返回登录</Button>
        </FormItem>
      </Form>
    </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(Login);

function mapStateToProps(state) {
  return {
    username: state.login.username,
    password: state.login.password,
    captcha: state.login.captcha,
    phoneCode: state.login.phoneCode,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    modifyPassword: (values) => dispatch(modifyPassword(values)),
    link2login:() => dispatch(push('login')),
    sendCode: (phone) => dispatch(sendCode(phone)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
