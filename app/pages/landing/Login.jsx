//Login.jsx
import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Spin } from 'antd';
const FormItem = Form.Item;
import { push } from 'react-router-redux';
import {login, getCaptcha} from '../../actions';
import bg from './loginBg.jpg';
const formStyle = {
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
  //backgroundImage: 'url("https://unsplash.it/1920/1280/?random")',
  backgroundImage: `url(${bg})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};
const spinStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};
class Login extends React.Component {
  static propTypes = {
    captcha: React.PropTypes.string,
    form: React.PropTypes.object,
    login: React.PropTypes.func,
    link2regist: React.PropTypes.func,
    link2findPassword: React.PropTypes.func,
    getCaptcha: React.PropTypes.func,
    currentUser: React.PropTypes.object,
    jumpToHomePage: React.PropTypes.func,
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

  refreshCaptcha = () => {
    //this.props.getCaptcha();
  }
  componentWillMount = () => {
    //this.props.getLoginType();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // if (this.props.currentUser.done) this.props.jumpToHomePage();
    return (
      <div style={pageStyle}>
        <Form onSubmit={this.handleSubmit} className="login-form" style={formStyle}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          {/*<FormItem>
              <Row gutter={14}>
            <Col span={16}>
              {getFieldDecorator('captcha', {
              rules: [{ required: true, message: 'Please input the captcha you got!' }],
              })(
              <Input prefix={<Icon type="picture" style={{ fontSize: 13 }} />} placeholder="图形验证码" size="large" />
              )}
            </Col>
            <Col span={8}>
              <Button size="small" onClick={ this.refreshCaptcha }>
              <div dangerouslySetInnerHTML={{ __html: this.props.captcha }}/>
              </Button>
            </Col>
              </Row>
          </FormItem>*/}
          <FormItem>
            {/*getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: false,
                })(
                <Checkbox>记住我</Checkbox>
            )*/}
            <a key='findPassword' onClick={(e)=>{
              e.preventDefault();
              this.props.link2findPassword();
            }} className="login-form-forgot">忘记密码?</a>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%', marginTop:10}}>
              登录
            </Button>
            {/*或者 <a key='register' onClick={(e)=>{
                e.preventDefault();
                this.props.link2regist();
                }}>注册!</a>
            */}
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
    currentUser: state.login.currentUser,

  };
}
function mapDispatchToProps(dispatch) {
  return {
    login: (values) => dispatch(login(values)),
    link2regist:() => dispatch(push('register')),
    getCaptcha: () => dispatch(getCaptcha),
    link2findPassword:() => dispatch(push('findPassword')),
    jumpToHomePage: ()=>dispatch(push('/')),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
