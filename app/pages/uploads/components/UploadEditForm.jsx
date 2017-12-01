import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {
    Form,
    Select,
    Input,
    DatePicker,
    Button,
    TreeSelect,
    Collapse,
    Layout,
    Breadcrumb,
} from 'antd';
const { RangePicker } = DatePicker;
const TreeNode = TreeSelect.TreeNode;
import TagArea from './TagArea';
//import Upload from 'antd/lib/upload';
const createForm = Form.create;
const FormItem = Form.Item;

const Panel = Collapse.Panel;

const { Content } = Layout;
class UploadEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initData:{},
      folders:[],
    };
  }

  static propTypes = {
    uploads: React.PropTypes.object,
    form:React.PropTypes.object,
    selectFiles:React.PropTypes.object,
    updateFiles_upload: React.PropTypes.func.isRequired,
    folders: React.PropTypes.array,
    fetchFolders: React.PropTypes.func.isRequired,
    moveAssets_upload_file: React.PropTypes.func.isRequired,
    closeAlert:React.PropTypes.func,
    fetchFolder:React.PropTypes.func.isRequired,
    saveSelectedFilesMoney:React.PropTypes.func,
    displayMode:React.PropTypes.string,
    curSelectedAlbum: React.PropTypes.object,
  };

  componentWillMount() {
    let {initData} = this.state;
    let {selectFiles}= this.props;
    if(selectFiles.length == 1) {//只选择一个文件时
      initData = selectFiles[0];
    }else if(selectFiles.length > 1) {//选择两个及以前时的处理
      initData = this.handleShowFiles(selectFiles);
    }
    this.setState({initData});
  }

  saveFiles() {//编辑
    let {selectFiles, uploads, fetchFolder, displayMode, curSelectedAlbum} = this.props;
    let selectedFolder = uploads.selectedFolder;
    this.props.form.validateFields((err, values) => {
      let {currentFolderId} = values;
      if(currentFolderId > 1) {
        if(selectedFolder) {
          let oldFolderId = selectedFolder.id;
          if(currentFolderId != oldFolderId) {
            this.props.moveAssets_upload_file(oldFolderId, currentFolderId, selectFiles);
          }
        }
      }
      if(selectFiles.length > 0) {
        let params = values;
        let licenseTimeRange = params['licenseTimeRange'];
        params['licenseStartTime'] = licenseTimeRange[0] == null ? null : moment(licenseTimeRange[0]).format('YYYY-MM-DD');
        params['licenseExpireTime'] = licenseTimeRange[1] == null ? null : moment(licenseTimeRange[1]).format('YYYY-MM-DD');
        this.props.updateFiles_upload(params, selectFiles).then(() => {
          let currentFolderId = selectedFolder.id && selectedFolder.id[0];
          if(displayMode == 'folder') {
            fetchFolder(currentFolderId, 1, '', true);
          } else if(displayMode == 'album') {
            fetchFolder(currentFolderId, 1, '', true, curSelectedAlbum.id);
          }
          //this.props.fetchFolder(currentFolderId, 1, '', true);
          this.props.closeAlert();
        });
      } else {
        if(displayMode == 'folder') {
          fetchFolder(currentFolderId, 1, '', true);
        } else if(displayMode == 'album') {
          fetchFolder(currentFolderId, 1, '', true, curSelectedAlbum.id);
        }
        //this.props.fetchFolder(currentFolderId, 1, '', true);
        this.props.closeAlert();
      }
    });
  }

  forEachTreeData(data) {
    let treeNodeArray = [];
    if (data) {
      data.map((childItem) => {
        let tn = (
        <TreeNode
          value={ childItem.id }
          isLeaf = {true}
          title={ <span> { childItem.name } </span>}
          key={childItem.id}
        >
        { childItem.children && [...this.forEachTreeData(childItem.children)] }
          </TreeNode>
        );
        treeNodeArray.push(tn);
      });
    }
    return treeNodeArray;
  }

  handleShowFiles(files) {
    let file = {};
    Object.assign(file, files[0]);
    let files2 = [];
    files2 = files2.concat(files);
    files.map((item)=> {
      let {
        id,
        title,
        currentFolderId,
        description,
        location,
        creditLine,
        keywords,
        licenseAuthorizer,
        licenseType,
        licenseTimeRange,
        licenseDescription,
        licenseStartTime,
        licenseExpireTime,
      } = item;
      files2.map((newItem) => {
        let id2 = newItem.id;
        let title2 = newItem.title;
        let currentFolderId2 = newItem.currentFolderId;
        let description2 = newItem.description;
        let location2 = newItem.location;
        let creditLine2 = newItem.creditLine;
        let keywords2 = newItem.keywords;
        let licenseAuthorizer2 = newItem.licenseAuthorizer;
        let licenseType2 = newItem.licenseType;
        let licenseTimeRange2 = newItem.licenseTimeRange;
        let licenseDescription2 = newItem.licenseDescription;
        let licenseStartTime2 = newItem.licenseStartTime;
        let licenseExpireTime2 = newItem.licenseExpireTime;
        if(id!=id2) {
          if(title!=title2) {
            // file.title = title;
            file.title_empty = '';
          }else if(!title && !title) {
            file.title_empty = '1';
          }

          if(description != description2) {
            file.description = '';
          }else if(!description && !description2) {
            file.description_empty = '1';
          }
          if(currentFolderId != currentFolderId2) {
            file.currentFolderId = '';
          }else if(!currentFolderId && !currentFolderId2) {
            file.currentFolderId_empty = '1';
          }

          if(location != location2) {
            file.location = '';
          }else if(!location && !location2) {
            file.location_empty = '1';
          }

          if(creditLine != creditLine2) {
            file.creditLine = '';
          }else if(!creditLine && !creditLine2) {
            file.creditLine_empty = '1';
          }

          if(keywords != keywords2) {
            file.keywords = '';
          }else if(!keywords && !keywords2) {
            file.keywords_empty = '1';
          }

          if(licenseAuthorizer != licenseAuthorizer2) {
            file.licenseAuthorizer = '';
          }else if(!licenseAuthorizer && !licenseAuthorizer2) {
            file.licenseAuthorizer_empty = '1';
          }

          if(licenseType != licenseType2) {
            file.licenseType ='';
          }else if(!licenseType && !licenseType2) {
            file.licenseType_empty = '1';
          }

          if(licenseTimeRange != licenseTimeRange2) {
            file.licenseTimeRange = '';
          }else if(!licenseTimeRange && !licenseTimeRange2) {
            file.licenseTimeRange_empty = '1';
          }

          if(licenseStartTime != licenseStartTime2) {
            file.licenseStartTime = '';
          }else if(!licenseStartTime && !licenseStartTime2) {
            file.licenseStartTime_empty = '1';
          }

          if(licenseExpireTime != licenseExpireTime2) {
            file.licenseExpireTime = '';
          }else if(!licenseExpireTime && !licenseExpireTime2) {
            file.licenseExpireTime_empty = '1';
          }

          if(licenseDescription !=licenseDescription2) {
            file.licenseDescription = '';
          }else if(!licenseDescription && !licenseDescription2) {
            file.licenseDescription_empty = '1';
          }
        }
      });
    });
    return file;
  }

  componentDidMount() {
    const { folders } = this.props;
    this.getTreeData(folders, 1);
  }

  getTreeData(data, parentId) {
    let result = [],
      temp;
    parentId = !parentId ? null : parentId;
    data.map((item) => {
      if (item.parentId == parentId) {
        result.push(item);
        temp = this.getTreeData(data, item.id);
        if (temp.length> 0) {
          item.children = temp;
        }
      }
    });
    this.setState({folders:result});
    this.forceUpdate();
    return result;
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    let {initData} = this.state;
    let {selectFiles} = this.props;
    const formItemLayout = {
      labelCol: {span: 24},
      wrapperCol: {span: 24},
    };
    let {folders} = this.state;
    const loop = data => data.map((item) => {
      let {name, id} = item;
      let style= {};
      if(id==1) {
        style={display:'none'};
      }
      return (<TreeNode value={item.id} isLeaf={true} style={style} title={name} key={item.id}>
              { item.children && [...this.forEachTreeData(item.children)] }
            </TreeNode>);
    });

    let selectedFolder = this.props.uploads.selectedFolder;
    let currentFolderId = parseInt(selectedFolder.id);
    return(
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Button onClick={this.saveFiles.bind(this)} type='primary' style={{marginTop:'-10px'}} size='large'>确认并关闭</Button>
          </Breadcrumb>
          <Content style={{ background: '#fff', margin: 0, minHeight: 280 }}>
            <Form style={{overflow: 'auto', height: '750px'}}>
              <Collapse bordered={false} defaultActiveKey={['1', '2', '3']}>

                <Panel style={{marginTop:'20px'}} header="基本信息" key="1">
                  <FormItem
                    {...formItemLayout}
                    label="资源名称"
                  >
                    {getFieldDecorator('title', {initialValue:initData.title, onBlur:this.onTitleBlur.bind(this), onChange:this.onTitleChange.bind(this),
                      validateTrigger: ['onBlur'],
                      rules: [{
                        max: 40, message: '40个汉字以内',
                      }, {
                        required: false, message: '请输入资源名称',
                      }],
                    })(
                      <Input style={(selectFiles.length>1&&!initData.title&&!initData.title_empty)?{backgroundColor:'rgb(251, 244, 246)'}:{}} placeholder="20个汉字以内" />
                    )}
                  </FormItem>

                  <FormItem label='归属文件夹' {...formItemLayout} >
                    {getFieldDecorator('currentFolderId', {initialValue:initData.currentFolderId || currentFolderId, onChange:this.onCurrentFolderIdChange.bind(this),
                      rules: [{
                        required: false, message: '选择文件目录',
                      }],
                    })(
                      <TreeSelect style={(selectFiles.length>1&&!initData.currentFolderId&&!initData.currentFolderId_empty)?{backgroundColor:'rgb(251, 244, 246)'}:{}}
                        dropdownstyle={ { maxHeight: 400, overflow: 'auto' } }
                        placeholder='选择文件目录'
                      >
                        { loop(folders) }
                      </TreeSelect>
                    )}
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="资源说明"
                  >
                    {getFieldDecorator('description', {initialValue:initData.description, onChange:this.onDescriptionChange.bind(this)})(
                      <Input style={(selectFiles.length>1&&!initData.description&&!initData.description_empty)?{backgroundColor:'rgb(251, 244, 246)'}:{}} type="textarea" placeholder="100个汉字以内" autosize={{ minRows: 6, maxRows: 6 }} />
                    )}
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="地点"
                  >
                    {getFieldDecorator('location', {initialValue:initData.location, onChange:this.onLocationChange.bind(this),
                      rules: [{
                        max: 20, message: '20个汉字以内',
                      }],
                    })(
                      <Input style={(selectFiles.length>1&&!initData.location&&!initData.location_empty)?{backgroundColor:'rgb(251, 244, 246)'}:{}} placeholder="20个汉字以内" />
                    )}
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="署名"
                  >
                    {getFieldDecorator('creditLine', {initialValue:initData.creditLine, onChange:this.onCreditLineChange.bind(this),
                      rules: [{
                        max: 20, message: '20个汉字以内',
                      }],
                    })(
                      <Input style={(selectFiles.length>1&&!initData.creditLine&&!initData.creditLine_empty)?{backgroundColor:'rgb(251, 244, 246)'}:{}} placeholder="20个汉字以内" />
                    )}
                  </FormItem>
                </Panel>

                <Panel header="关键词" key="2">
                  <FormItem
                    {...formItemLayout}
                    label="关键字"
                  >
                    {getFieldDecorator('keywords', {initialValue:initData.keywords, onChange:this.onKeywordsChange.bind(this)})(
                      <TagArea keywords={initData.keywords} style={(selectFiles.length>1&&!initData.keywords&&!initData.keywords_empty)?{backgroundColor:'rgb(251, 244, 246)'}:{}}/>
                    )}
                  </FormItem>
                </Panel>

                <Panel header="版权信息" key="3">
                  <FormItem
                    {...formItemLayout}
                    label="授权人"
                  >
                    {getFieldDecorator('licenseAuthorizer', {initialValue:initData.licenseAuthorizer, onChange:this.onLicenseAuthorizerChange.bind(this),
                      rules: [{
                        max: 20, message: '20个汉字以内',
                      }, {
                        required: true, message: '请输入授权人',
                      }],
                    })(
                      <Input style={(selectFiles.length>1&&!initData.licenseAuthorizer&&!initData.licenseAuthorizer_empty)?{backgroundColor:'rgb(251, 244, 246)'}:{}} placeholder="20个汉字以内" />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="授权方式"
                  >
                    {getFieldDecorator('licenseType', {initialValue:initData.licenseType, onChange:this.onLicenseTypeChange.bind(this),
                      rules: [{required: true, message: '请输入授权方式'}],
                    }, )(
                      <Select style={(selectFiles.length>1&&!initData.licenseType&&!initData.licenseType_empty)?{backgroundColor:'rgb(251, 244, 246)'}:{}}>
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
                        const startTime = initData.licenseStartTime ? moment(initData.licenseStartTime) : '';
                        const endTime = initData.licenseExpireTime ? moment(initData.licenseExpireTime) : '';
                        return getFieldDecorator('licenseTimeRange', {
                          initialValue:[startTime, endTime], onChange:this.onLicenseTimeRange.bind(this),
                        })(
                            <RangePicker style={(selectFiles.length>1&&!initData.licenseStartTime&&!initData.licenseStartTime_empty)?{backgroundColor:'rgb(251, 244, 246)'}:{}} placeholder="" format="YYYY-MM-DD"/>
                          );
                      })()
                    }
                  </FormItem>


                  <FormItem
                    {...formItemLayout}
                    label="授权范围"
                  >
                    {getFieldDecorator('licenseDescription', {initialValue:initData.licenseDescription, onChange:this.onLicenseDescriptionChange.bind(this)})(
                      <Input style={(selectFiles.length>1&&!initData.licenseDescription&&!initData.licenseDescription_empty)?{backgroundColor:'rgb(251, 244, 246)'}:{}} type="textarea" placeholder="100个汉字以内" autosize={{ minRows: 6, maxRows: 6 }} />
                    )}
                  </FormItem>
                </Panel>
              </Collapse>
            </Form>
          </Content>
        </Layout>
    );
  }

  onTitleBlur(e) {
    let {initData} = this.state;
    let value = e.target.value;
    if(!value) {
      e.target.value = initData.originTitle||'';
      return;
    }
  }

  onTitleChange(e) {
    let value = e.target.value;
    this.saveSelectedFilesMoney('title', value);
  }

  onCurrentFolderIdChange(value) {
    this.saveSelectedFilesMoney('currentFolderId', value);
  }

  onDescriptionChange(e) {
    let value = e.target.value;
    this.saveSelectedFilesMoney('description', value);
  }

  onLocationChange(e) {
    let value = e.target.value;
    this.saveSelectedFilesMoney('location', value);
  }

  onCreditLineChange(e) {
    let value = e.target.value;
    this.saveSelectedFilesMoney('creditLine', value);
  }

  onKeywordsChange(value) {
    this.saveSelectedFilesMoney('keywords', value);
  }

  onLicenseAuthorizerChange(e) {
    let value = e.target.value;
    this.saveSelectedFilesMoney('licenseAuthorizer', value);
  }

  onLicenseTypeChange(value) {
    this.saveSelectedFilesMoney('licenseType', value);
  }

  onLicenseTimeRange(value) {
    let licenseTimeRange = value;
    let licenseStartTime = licenseTimeRange[0] == null ? null : moment(licenseTimeRange[0]).format('YYYY-MM-DD');
    let licenseExpireTime = licenseTimeRange[1] == null ? null : moment(licenseTimeRange[1]).format('YYYY-MM-DD');
    this.saveSelectedFilesMoney('licenseStartTime', licenseStartTime);
    this.saveSelectedFilesMoney('licenseExpireTime', licenseExpireTime);
  }

  onLicenseDescriptionChange(e) {
    let value = e.target.value;
    this.saveSelectedFilesMoney('licenseDescription', value);
  }

  saveSelectedFilesMoney(key, value) {
    let {selectFiles} = this.props;
    selectFiles.map((file)=> {
      file[key] = value;
    });
    this.props.saveSelectedFilesMoney(selectFiles);
  }

  getKey() {
    return parseInt(Math.random()*100);
  }
}

export default connect()(createForm()(UploadEditForm));
