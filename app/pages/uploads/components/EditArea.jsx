import React from 'react';
import { Form, Input, Button, Collapse, Row, Select, DatePicker } from 'antd';
const Panel = Collapse.Panel;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
import TagArea from './TagArea';
import moment from 'moment';
import '../../user-center/usercenter.css';

class EditArea extends React.Component {

  static propTypes = {
    form: React.PropTypes.object.isRequired,
    selectedFiles: React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
    updateFiles: React.PropTypes.func.isRequired,
    deleteFiles: React.PropTypes.func,
    commitFiles: React.PropTypes.func,
    currentUser: React.PropTypes.object,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = values;
        let licenseTimeRange = params['licenseTimeRange'];
        params['licenseStartTime'] = licenseTimeRange[0] == null ? null : moment(licenseTimeRange[0]).format('YYYY-MM-DD');
        params['licenseExpireTime'] = licenseTimeRange[1] == null ? null : moment(licenseTimeRange[1]).format('YYYY-MM-DD');
        delete params.licenseTimeRange;
        this.props.updateFiles(params);
      }
    });
  }

  batchDelete = () => {
    this.props.deleteFiles();
  }

  batchCommit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = values;
        let licenseTimeRange = params['licenseTimeRange'];
        params['licenseStartTime'] = licenseTimeRange[0] == null ? null : moment(licenseTimeRange[0]).format('YYYY-MM-DD');
        params['licenseExpireTime'] = licenseTimeRange[1] == null ? null : moment(licenseTimeRange[1]).format('YYYY-MM-DD');
        delete params.licenseTimeRange;
        //this.props.updateFiles(params, true);
        this.props.commitFiles(true, params);
      }
    });
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

    let { selectedFiles, selectedFolder } = this.props;
    let targetFiles = selectedFolder.list.filter(item => selectedFiles.find(x => x.id == item.id));
    let folderKeywords = [];
    console.log('targetFiles =============== ', targetFiles);
    if(targetFiles[0].folderKeywords&&targetFiles[0].folderKeywords.length>0) {
      folderKeywords = targetFiles[0].folderKeywords.split(',');
    }
    return (
        targetFiles.length?<div style={{height: '800px'}}>
          <Form onSubmit={this.handleSubmit} style={{overflow: 'auto', height: '750px', paddingTop:10}}>
            <Collapse bordered={false} defaultActiveKey={['1', '2', '3']}>

              <Panel header="基本信息" key="1">
                <FormItem
                  {...formItemLayout}
                  label="资源名称"
                >
                  {getFieldDecorator('title', {
                    initialValue: targetFiles.length > 1 ? '' : targetFiles[0].title,
                    rules: [{
                      required: true, message: '请输入资源名称',
                    }],
                  })(
                    <Input placeholder="请输入资源名称" />
                  )}
                </FormItem>

                {/* <FormItem
                  {...formItemLayout}
                  label="资源ID"
                  >
                  {getFieldDecorator('resId', {
                    initialValue: targetFiles.length > 1 ? '' : targetFiles[0].title,
                    rules: [{
                    }],
                  })(
                    <Input placeholder="请输入资源名称" disabled={true}/>
                  )}
                </FormItem> */}

                <FormItem
                  {...formItemLayout}
                  label="资源说明"
                >
                  {getFieldDecorator('description', {
                    initialValue: targetFiles.length > 1 ? '' : targetFiles[0].description,
                  })(
                    <Input type="textarea" placeholder="请输入资源说明" autosize={{ minRows: 6, maxRows: 6 }} />
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="地点"
                >
                  {getFieldDecorator('location', {
                    initialValue: targetFiles.length > 1 ? '' : targetFiles[0].location,
                    rules: [],
                  })(
                    <Input placeholder="请输入地点" />
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="署名"
                >
                  {getFieldDecorator('creditLine', {
                    initialValue: targetFiles.length > 1 ? '' : targetFiles[0].creditLine,
                    rules: [],
                  })(
                    <Input placeholder="请输入署名" />
                  )}
                </FormItem>
              </Panel>

              <Panel header="关键词" key="2">
                {/*
                  <FormItem
                  {...formItemLayout}
                  label="人物"
                  >
                  {getFieldDecorator('keywords')(
                  <TagArea keywords={targetFiles.length > 1 ? '' : targetFiles[0].keywords}/>
                  )}
                  </FormItem>
                  <FormItem
                  {...formItemLayout}
                  label="地标"
                  >
                  {getFieldDecorator('keywords')(
                  <TagArea keywords={targetFiles.length > 1 ? '' : targetFiles[0].keywords}/>
                  )}
                  </FormItem>
                */}
                <FormItem
                  {...formItemLayout}
                  label="关键字"
                >
                  {getFieldDecorator('keywords')(
                    <TagArea keywords={targetFiles.length > 1 ? '' : targetFiles[0].keywords} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="目录关键字"
                >
                  <div>
                    {folderKeywords.map((x, i)=>{
                      return <div style={{height:30, lineHeight:'20px'}} key={`${x}${i}`} className={'keywords'}>{x}</div>;
                    })}
                  </div>
                </FormItem>
              </Panel>

              <Panel header="版权信息" key="3">
                <FormItem
                  {...formItemLayout}
                  label="授权人"
                >
                  {getFieldDecorator('licenseAuthorizer', {
                    initialValue: targetFiles.length > 1 ? '' : targetFiles[0].licenseAuthorizer,
                    rules: [{
                      message: '请输入授权人',
                    }],
                  })(
                    <Input placeholder="请输入授权人" />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="授权方式"
                >
                  {getFieldDecorator('licenseType', { //1RM 2RF 3RR
                    initialValue: targetFiles.length > 1 ? '' : targetFiles[0].licenseType? targetFiles[0].licenseType.toString():'',
                    rules: [{
                      message: '请输入授权方式',
                    }],
                  }, )(
                    <Select>
                      <Select.Option value='1'>RM</Select.Option>
                      <Select.Option value='2'>RF</Select.Option>
                      <Select.Option value='4'>自有授权</Select.Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="授权期限"
                >
                  {
                    (() => {
                      const startTime = targetFiles[0].licenseStartTime ? moment(targetFiles[0].licenseStartTime) : '';
                      const endTime = targetFiles[0].licenseExpireTime ? moment(targetFiles[0].licenseExpireTime) : '';
                      return getFieldDecorator('licenseTimeRange', { // targetFiles[0].licenseExpireTime
                        initialValue: targetFiles.length > 1 ? ['', ''] : [startTime, endTime],
                      })(<RangePicker placeholder="" format="YYYY-MM-DD" />);
                    })()
                  }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="授权范围"
                >
                  {getFieldDecorator('licenseDescription', {
                    initialValue: targetFiles.length > 1 ? '' : targetFiles[0].licenseDescription,
                  })(
                    <Input type="textarea" placeholder="请输入授权范围" autosize={{ minRows: 6, maxRows: 6 }} />
                  )}
                </FormItem>
              </Panel>
            </Collapse>
          </Form>
          <Row justify="end" style={{padding: '16px 16px', textAlign: 'right' }}>
            <Button type="danger" size="large" onClick={this.batchDelete}>删除</Button>
            <Button type="primary" size="large" style={{ margin: '0 16px' }} onClick={this.batchCommit}>提交</Button>
            <Button type="primary" onClick={this.handleSubmit} htmlType="submit" size="large">保存</Button>
          </Row>
        </div>:<div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        </div>
    );
  }
}

export default Form.create()(EditArea);
