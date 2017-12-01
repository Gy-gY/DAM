
import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
const FormItem = Form.Item;
import {regist} from '../../actions';

let formStyle = {
  form:{
    width:400,
    height:450,
    position:'relative',
    left:'50%',
    top:'50%',
    marginTop:-175,
    marginLeft:-200,
    border:'2px solid #49a9ee',
    borderRadius:'10px',
    padding:'30px 30px 50px 30px',
  },
  h1:{
    textAlign:'center',
    marginBottom:30,
  },
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
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div>

        <Form onSubmit={this.handleSubmit} className="login-form" style={formStyle.form}>
          <h1 style={formStyle.h1}>邀请码注册</h1>
          <FormItem {...formItemLayout} label='手机号：'>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入手机号!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="手机号" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='输入密码：'>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='再输一次：'>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='邀请码：'>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入邀请!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='验证码：'>
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
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
              注册
            </Button>
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
    regist: (values) => dispatch(regist(values)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
