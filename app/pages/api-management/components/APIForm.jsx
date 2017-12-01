import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Form, Button } from 'antd';

const FormItem = Form.Item;
import {
  createAPIClient,
} from '../../../actions/apiClient';
class APIForm extends Component {

  onSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return false;
      this.props.createAPIClient(values);
      this.props.onSubmit();
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form>
        <FormItem
          label='API用户名'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
        >
          {getFieldDecorator('username',
            {initialValue: '',
              rules: [{required: true}],
            })(<Input />)}
        </FormItem>
        <FormItem
          label='说明'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
        >
          {getFieldDecorator('description',
            {initialValue: '',
              rules: [{required: true}],
            })(<Input />)}
        </FormItem>
        <FormItem style={{textAlign: 'center', borderTop: '1px solid #e9e9e9'}}
        >
          <Button
            type='submit' onClick={this.onSubmit} style={{margin: '8px'}}>提交</Button>
          <Button type='submit' onClick={this.props.onCancel} style={{margin: '8px'}}>取消</Button>
        </FormItem>
      </Form>
    );
  }
}

APIForm.propTypes = {
  form: PropTypes.object.isRequired,
  createAPIClient: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const WrappedAPIForm = Form.create()(APIForm);

function mapDispatchToProps(dispatch) {
  return {
    createAPIClient: (params) => dispatch(createAPIClient(params)),
  };
}
export default connect(null, mapDispatchToProps)(WrappedAPIForm);
