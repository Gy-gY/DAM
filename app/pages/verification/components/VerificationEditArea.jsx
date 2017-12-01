import React from 'react';
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;

import TagArea from './VerificationTagArea';

class EditArea extends React.Component {

  static propTypes = {
    form: React.PropTypes.object.isRequired,
    selectedFiles: React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
    updateFiles: React.PropTypes.func.isRequired,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.form.getFieldsValue());
    this.props.updateFiles(this.props.form.getFieldsValue());
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 18,
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    let { selectedFiles, selectedFolder } = this.props;
    let targetFiles = selectedFolder.list.filter(item => selectedFiles.includes(item.id));

    return (
      <Form onSubmit={this.handleSubmit}>

        <FormItem
          {...formItemLayout}
          label="图片名称"
        >
          {getFieldDecorator('title', {
            initialValue: targetFiles.length > 1 ? '' : targetFiles[0].title,
            rules: [{
              max: 20, message: '20个汉字以内',
            }, {
              required: true, message: '请输入图片名称',
            }],
          })(
            <Input placeholder="20个汉字以内" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="上传人"
        >
          <span>小明</span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="URL"
        >
          <span>http://example.com</span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="EXIF"
        >
          <a href="#">查看</a>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="关键字"
        >
          {getFieldDecorator('keywords')(
            <TagArea keywords={targetFiles.length > 1 ? '' : targetFiles[0].keywords}/>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="图片说明"
        >
          {getFieldDecorator('description', {
            initialValue: targetFiles.length > 1 ? '' : targetFiles[0].description,
          })(
            <Input type="textarea" placeholder="100个汉字以内" autosize={{ minRows: 6, maxRows: 6 }} />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">保存</Button>
        </FormItem>

      </Form>
    );
  }
}

export default Form.create()(EditArea);
