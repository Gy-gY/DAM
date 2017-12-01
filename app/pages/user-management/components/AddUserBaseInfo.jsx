import React from 'react';
import { Input, Form } from 'antd';
const FormItem = Form.Item;



class AddUserBaseInfo extends React.Component {

  static propTypes = {
    form: React.PropTypes.object.isRequired,
    changeValue: React.PropTypes.func.isRequired,
    queryUserInfoById: React.PropTypes.func,
    queriedUserInfo: React.PropTypes.object,
    formData: React.PropTypes.object,

    userTableRecord: React.PropTypes.object,
    modalStatus: React.PropTypes.string,
    onBlurData: React.PropTypes.func,
  }

  state = {
    disabled: false,
  }

  componentWillReceiveProps = () => {
    if(this.props.modalStatus == 'new') {
      this.setState({disabled: false});
    }
    if(this.props.modalStatus == 'view') {
      //求出左边多选框中需要被勾选的项的ids
      this.setState({disabled: true});
    }
    if(this.props.modalStatus == 'edit') {
      this.setState({disabled: false});
    }
  }

  changeLoginName(e) {
    this.props.changeValue('userName', e.target.value);
  }


  changeRealName(e) {
    this.props.changeValue('realName', e.target.value);
  }


  changeMobile(e) {
    this.props.changeValue('mobile', e.target.value);
  }


  changeEmail(e) {
    this.props.changeValue('email', e.target.value);
  }

  onBlur() {
    this.props.form.validateFields((err, values) => {
      this.props.onBlurData(err);
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Form>
          <FormItem
            label='邮箱地址'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 10 }}
          >
            {
              getFieldDecorator('email',
                {initialValue: this.props.formData.email,
                  rules: [{
                    type: 'email',
                    message: '不正确的邮箱地址',
                  }, {
                    required: true,
                    message: '邮箱不能为空',
                  }],
                })(<Input onBlur={this.onBlur.bind(this)} placeholder={'请使用邮箱作为登录账户，默认密码为12345678'} disabled={this.state.disabled} onChange={this.changeEmail.bind(this)}/>)
            }
          </FormItem>

          <FormItem
            label='用户姓名'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 10 }}
          >
            {
              getFieldDecorator('realname',
                {initialValue: this.props.formData.realName,
                  rules: [{required: true, message: '用户姓名不能为空'}],
                })(<Input onBlur={this.onBlur.bind(this)} disabled={this.state.disabled} onChange={this.changeRealName.bind(this)}/>)
            }
          </FormItem>


          <FormItem
            label='手机号码'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 10 }}
          >
            {
              getFieldDecorator('phonenumber',
                {initialValue: this.props.formData.mobile,
                  rules: [{required: true, message: '手机号码不能为空'}],
                })(<Input onBlur={this.onBlur.bind(this)} disabled={this.state.disabled} onChange={this.changeMobile.bind(this)}/>)
            }
          </FormItem>

        </Form>

      </div>
    );
  }
}


export default Form.create()(AddUserBaseInfo);
