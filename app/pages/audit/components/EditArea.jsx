import React from 'react';
import { Form, Input, Button, Collapse, Row, DatePicker, Select} from 'antd';
const Panel = Collapse.Panel;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
import TagArea from './TagArea';
import moment from 'moment';
import '../../user-center/usercenter.css';

class EditArea extends React.Component {

  static propTypes = {
    files: React.PropTypes.array.isRequired,
    form: React.PropTypes.object.isRequired,
    selectedFiles: React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
    offLineFiles_audit: React.PropTypes.func.isRequired,
    reviewFiles_audit: React.PropTypes.func,
    edit_file_audit: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object,
    currentFile: React.PropTypes.object,
  }

  //禁用，当你打开一张中图页，走马灯游走到其他的图之后，修改其他图，此时就不能传递以前select的file了，而是现在游到的图
  offline = () => {
    this.props.offLineFiles_audit(this.props.currentFile);
    //this.props.offLineFiles_audit(this.props.files[0]);
  }

  save = () => {
    this.props.form.validateFields((err) => {
      if (!err) {
        let params = this.props.form.getFieldsValue();
        let licenseTimeRange = params['licenseTimeRange'];
        params['licenseStartTime'] = licenseTimeRange[0] == null ? null : moment(licenseTimeRange[0]).format('YYYY-MM-DD');
        params['licenseExpireTime'] = licenseTimeRange[1] == null ? null : moment(licenseTimeRange[1]).format('YYYY-MM-DD');
        delete params.licenseTimeRange;
        this.props.edit_file_audit(this.props.currentFile, params);
        // this.props.edit_file_audit(this.props.files[0], params);
      }
    });
  }

  pass = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = values;
        delete params.assetType; //Do not commit assetType

        let licenseTimeRange = params['licenseTimeRange'];
        params['licenseStartTime'] = licenseTimeRange[0] == null ? null : moment(licenseTimeRange[0]).format('YYYY-MM-DD');
        params['licenseExpireTime'] = licenseTimeRange[1] == null ? null : moment(licenseTimeRange[1]).format('YYYY-MM-DD');
        delete params.licenseTimeRange;
        this.props.reviewFiles_audit(true, params);
      }
    });
  }

  reject = () => {
    this.props.reviewFiles_audit(false);
  }

  render() {
    let isRequered = this.props.currentUser.customerId == 20001 ? false : true;
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
    console.log('---------------------targetFiles ----------->>>>> ', targetFiles);
    let folderKeywords = [];
    if(targetFiles[0].folderKeywords&&targetFiles[0].folderKeywords.length>0) {
      folderKeywords = targetFiles[0].folderKeywords.split(',');
    }
    return (
      <div style={{height: '800px'}}>
        <Form style={{overflow: 'auto', height: '750px', paddingTop:10}}>

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

              <FormItem
                {...formItemLayout}
                label="资源ID"
              >
                {getFieldDecorator('resID', {
                  // initialValue: targetFiles.length > 1 ? '' : targetFiles[0].title,
                  initialValue: targetFiles.length > 1 ? '' : (targetFiles[0].resId ? targetFiles[0].resId+'' : targetFiles[0].assetId)+'',
                  rules: [{
                      //required: true, message: '请输入资源名称',
                  }],
                })(
                  <Input type="text" readOnly={true} />
                )}
              </FormItem>
              {/*<FormItem disabled='true' enabled='false' style={{display: 'none'}}
                {...formItemLayout}
                label="资源类型"
                >
                {getFieldDecorator('assetType', {
                  initialValue: targetFiles.length > 1 ? '' : targetFiles[0].assetType,
                })(
                  <Input readOnly={true} hidden={true} type="text" autosize={{ minRows: 6, maxRows: 6 }} />
                )}
              </FormItem>*/}
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
                  initialValue: targetFiles.length > 1 ? '' : targetFiles[0].location || '',
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
                  initialValue: targetFiles.length > 1 ? '' : targetFiles[0].creditLine || '',
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
                  <TagArea keywords={targetFiles.length > 1 ? '' : targetFiles[0].keywords}/>
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
                  initialValue: targetFiles.length > 0 ? targetFiles[0].licenseAuthorizer : '',
                  rules: [{
                    required: isRequered,
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
                    required: isRequered,
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
                { (()=>{
                  const startTime = targetFiles[0].licenseStartTime? moment(targetFiles[0].licenseStartTime) : '';
                  const endTime = targetFiles[0].licenseExpireTime ? moment(targetFiles[0].licenseExpireTime) : '';
                  return getFieldDecorator('licenseTimeRange', { // targetFiles[0].licenseExpireTime
                    initialValue: targetFiles.length > 1 ? ['', ''] : [startTime, endTime],
                  })(<RangePicker placeholder="" format="YYYY-MM-DD" />);
                })()}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="授权范围"
              >
                {getFieldDecorator('licenseDescription', {
                  initialValue: targetFiles.length > 1 ? '' : targetFiles[0].licenseDescription || '待添加的字段',
                })(
                  <Input type="textarea" placeholder="请输入授权范围" autosize={{ minRows: 6, maxRows: 6 }} />
                )}
              </FormItem>

            </Panel>
          </Collapse>

        </Form>
        {
          (() => {
            if(targetFiles[0].onlineState==3) {
              return (<Row justify="end" style={{padding: '16px 16px', textAlign: 'right'}}>
                <Button type="primary" size="large" style={{ margin: '0 16px' }} onClick= {this.save}>保存</Button>
                <Button type="primary" size="large" onClick= {this.pass}>入库</Button>
              </Row>);
            }else{
              if(targetFiles[0].reviewState == 1) {
                return (<Row justify="end" style={{padding: '16px 16px', textAlign: 'right'}}>
                  <Button type="primary" size="large" style={{ margin: '0' }} onClick= {this.save}>保存</Button>
                  <Button type="primary" size="large" style={{ margin: '0 16px' }} onClick= {this.pass}>入库</Button>
                  <Button type="primary" size="large" onClick={this.reject}>驳回</Button>
                </Row>);
              }else if(targetFiles[0].reviewState == 3) {
                return (<Row justify="end" style={{padding: '16px 16px', textAlign: 'right'}}>
                  <Button type="primary" size="large" style={{ margin: '0 16px' }} onClick= {this.save}>保存</Button>
                  <Button type="primary" size="large" onClick= {this.pass}>入库</Button>
                </Row>);
              }else if(targetFiles[0].reviewState == 4) {
                return (<Row justify="end" style={{padding: '16px 16px', textAlign: 'right'}}>
                  <Button type="primary" size="large" style={{ margin: '0 16px' }} onClick= {this.save}>保存</Button>
                  <Button type="primary" size="large" onClick= {this.offline}>禁用</Button>
                </Row>);
              }
            }
          }) ()
        }
      </div>
    );
  }
}

export default Form.create()(EditArea);
