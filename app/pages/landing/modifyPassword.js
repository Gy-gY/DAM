
import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
const FormItem = Form.Item;
import { push } from 'react-router-redux';
import {login} from '../../actions';

let formStyle = {
  width:400,
  height:350,
  position:'relative',
  left:'50%',
  top:'50%',
  marginTop:-175,
  border:'2px solid #49a9ee',
  borderRadius:'10px',
  padding:'50px 30px',
};
class Login extends React.Component {
  static propTypes = {
    form: React.PropTypes.object,
    login: React.PropTypes.func,
    link2regist: React.PropTypes.func,
    link2findPassword: React.PropTypes.func,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let ths=this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        ths.props.login(values);
        // console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form" style={formStyle}>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            <Row gutter={14}>
              <Col span={16}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: 'Please input the captcha you got!' }],
                })(
                  <Input prefix={<Icon type="picture" style={{ fontSize: 13 }} />} placeholder="图形验证码" size="large" />
                )}
              </Col>
              <Col span={8}>
                <Button style={{float:'rigth'}} size="large">获取验证码</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
            )}
            <a key='findPassword' onClick={(e)=>{
              e.preventDefault();
              this.props.link2findPassword();
            }} className="login-form-forgot">忘记密码</a>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
              登录
            </Button>
            或者 <a key='register' onClick={(e)=>{
              e.preventDefault();
              this.props.link2regist();
            }}>注册!</a>
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
  };
}
function mapDispatchToProps(dispatch) {
  return {
    login: (values) => dispatch(login(values)),
    link2regist:() => dispatch(push('register')),
    link2findPassword:() => dispatch(push('findPassword')),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
