import 	React, {Component} from 'react';
import 	{ Form, Row, Col, Select, Button, Input, Tabs, Checkbox, Tooltip, Tag, notification} from 'antd';
import { connect } from 'react-redux';
import {
  queryFolderPermission,
  getGroupTreeData,
  queryGroupPermissions,
  setFolderPermissions,
  renameFolder,
  addNewFolder,
  changeFolderValue,
  fetchAllUsers,
  queryFolderUsers,
  clearPerUsers,
  changeFolderUsers,
  fetchFolderBaseInfo,
  clearFolserBI,
  submitFolderInfo,
} from '../../../actions';
const 	createForm 					= Form.create;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class FoldersPermission extends Component {
  constructor(props) {
    super(props);
    this.state = {

      disabledX: false,
      tags: [], //元素为字符串
      inputVisible: false,
      inputValue: '',
      boxed: false,
      flag: 0,

      oldFolderName: '',

      'mockData':[],
      'targetKeys':[],
      'checkedFoldersObjList':[],
      'folderView':[],
      'folderDownload':[],
      'folderUpload':[],
      'allPermisisson':{
        'viewAssets':'view_assets',
        'downloadAssets':'download_assets',
        'uploadAssets':'upload_assets',
      },
      'dataSource':[],
      'initViewPermission':[],
      'initDownloadPermission':[],
      'initUploadPermission':[],
      'groupPermissionList':[],
    };
  }


  static propTypes = {
    form: React.PropTypes.object,
    folder:React.PropTypes.object,
    folders:React.PropTypes.array,
    checkedFolders:React.PropTypes.array,
    treeData:React.PropTypes.array,
    dispatch: React.PropTypes.func.isRequired,
    close:React.PropTypes.func,
    newName: React.PropTypes.string,
    setPermissionSuccess:React.PropTypes.func,
    style: React.PropTypes.object,
    queryFolderPermission:React.PropTypes.func.isRequired,
    loadGroupTreeData:React.PropTypes.func.isRequired,
    queryGroupPermissions:React.PropTypes.func.isRequired,
    setFolderPermissions:React.PropTypes.func.isRequired,
    renameFolder:React.PropTypes.func.isRequired,
    addNewFolder:React.PropTypes.func.isRequired,
    findSubTreeById:React.PropTypes.func,
    groupTreeData: React.PropTypes.array,
    selectedNode: React.PropTypes.object,
    changeFolderValue: React.PropTypes.func,
    folderValues: React.PropTypes.object,
    fetchAllUsers: React.PropTypes.func,
    allUsers: React.PropTypes.array,

    queryFolderUsers: React.PropTypes.func,
    folderUsers: React.PropTypes.object,
    clearPerUsers: React.PropTypes.func,
    changeFolderUsers: React.PropTypes.func,
    fetchFolderBaseInfo: React.PropTypes.func,
    clearFolserBI: React.PropTypes.func,
    submitFolderInfo: React.PropTypes.func,
    rememberOldFolderName: React.PropTypes.string,
  }


  componentWillMount() {
    this.props.fetchAllUsers();
    //如果是编辑，那么得查询选中目录的 baseinfo 和 权限
    if(!this.isNew()) {
      let folderId = this.props.checkedFolders[0];
      this.props.fetchFolderBaseInfo(folderId);
      this.props.queryFolderUsers(folderId);
    } else {
      if(this.props.selectedNode.ifoldlevel >= 3) {
        this.props.queryFolderUsers(this.props.selectedNode.id);
      }
    }
  }

  //CheckBox 是不是要继承父权限
  onChangeCheckBox = (e) => {
    this.setState({flag: 1});
    if (e.target.checked) {
      //继承父权限，则查询父目录的权限，并自动赋值
      this.props.clearPerUsers();
      let { selectedNode } = this.props;
      let { id } = selectedNode;
      this.props.queryFolderUsers(id);
      this.setState({disabledX: true, boxed: true});
    } else {
      this.setState({disabledX: false, boxed: false});
    }
  }


  tabChange = (key) => {
    console.log(key);
    console.log(typeof key);//string
  }

  handleClose = (removedTag) => {
    let tags = this.props.folderValues.keyWords.split(',').filter(tag => tag !== removedTag);
    this.setState({ tags });
    this.props.changeFolderValue('folderKeyWords', tags);
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    console.log('e = ', e.target.value);
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirmEnter = (e) => {
    e.preventDefault();
    console.log('关键词：', e.target.value);
    const state = this.state;
    const inputValue = state.inputValue;
    let kw = this.props.folderValues.keyWords;
    let aTmp = !kw ? [] : kw.split(',');
    let tags = aTmp[0] == '' ? [] : aTmp;
    //去除重复关键词
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: true,
      inputValue: '',
    });

    this.props.changeFolderValue('folderKeyWords', tags);
  }

  handleInputConfirmBlur = (e) => {
    console.log('关键词：', e.target.value);
    const state = this.state;
    const inputValue = state.inputValue;
    let kw = this.props.folderValues.keyWords;
    let aTmp = !kw ? [] : kw.split(',');
    let tags = aTmp[0] == '' ? [] : aTmp;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
    this.props.changeFolderValue('folderKeyWords', tags);
  }





  saveInputRef = input => {
    this.input = input;
  }



  changeFolderName = (e) => {
    this.props.changeFolderValue('folderName', e.target.value);
  }

  changeFolderCaption = (e) => {
    this.props.changeFolderValue('folderCaption', e.target.value);
  }


  isNew = () => {
    if(this.props.checkedFolders.length == 0) {
      return true;
    } else {
      return false;
    }
  }


  viewSelect = (value) => {
    this.props.changeFolderUsers('add_a_view_user', value);
  }
  viewDeselect = (value) => {
    this.props.changeFolderUsers('del_a_view_user', value);
  }

  downloadSelect = (value) => {
    this.props.changeFolderUsers('add_a_down_user', value);
  }
  downloadDeselect = (value) => {
    this.props.changeFolderUsers('del_a_down_user', value);
  }

  uploadChange = (values) => {
    this.props.changeFolderUsers('uploadUsers', values);
  }



  render() {
    console.log('目录基本信息汇总：', this.props.folderValues);
    console.log('该目录的用户列表: ', this.props.folderUsers);

    let folderBI = this.props.folderValues;
    let folderUs = this.props.folderUsers;
    let { disabledX, inputVisible, inputValue } = this.state;

    let biName = '';
    let biCaption = '';
    let biKeyWords = [];

    let viewUsers = [];
    let downloadUsers = [];
    let uploadUsers = [];

    biName = folderBI.folderName;
    biCaption = folderBI.folderCaption;
    if(folderBI.keyWords) {
      biKeyWords = folderBI.keyWords.split(',');
    }

    viewUsers = folderUs.view_assets;
    downloadUsers = folderUs.download_assets;
    uploadUsers = folderUs.upload_assets;

    let children = [];

    //拿到userlist列表，并填充到select标签
    let ulist = this.props.allUsers;
    if (ulist.length > 0) {
      ulist.forEach((item) => {
        children.push(<Option key={item.userId}>{item.realName}</Option>);
      });
    }
    let { getFieldDecorator } = this.props.form;

    //编辑：如果 ifoldlevel >=4：CheckBox灰色，钩子要打上，三个下拉框灰色
    //新建：只能通过 父目录判断，如果selectedNode.ifoldlevel >= 3：CheckBox变灰，钩子打上，三个下拉框灰色
    let checkBoxDisabled = false;
    let defChecked = false;

    if(this.isNew()) {
      switch(this.props.selectedNode.ifoldlevel) {
      case 1:
        checkBoxDisabled = true;
        defChecked = false;
        break;
      case 2:
        defChecked = false;
        checkBoxDisabled = false;
        break;
      default:
        checkBoxDisabled = true;
        disabledX = true;
        defChecked = true;
        break;
      }
    } else {
      if(folderBI.ifoldlevel >= 4) {
        checkBoxDisabled = true;
        disabledX = true;
        defChecked = true;
      } else {
        if(folderBI.ifoldlevel == 2) {//一级
          defChecked = false;
          checkBoxDisabled = true;
        } else if(folderBI.ifoldlevel == 3) {//二级
          checkBoxDisabled = false;
          if(folderBI.iextend == 1) {
            defChecked = true;
            if(this.state.flag == 0) {
              disabledX = true;
            } else if (this.state.flag == 1) {
              disabledX = this.state.disabledX;
            }
          }
        }
      }
    }

    return(
      <div>
        <Tabs defaultActiveKey="1" onChange={this.tabChange}>
          <TabPane tab="目录属性" key="1">
            <div style={{width:'100%', textAlign:'left'}}>
              <Form style={{textAlign:'left', marginTop:'10px'}}>
                <FormItem
                  label='目录名称'
                  style={{height: '22px'}}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 14 }}
                >
                  {
                    getFieldDecorator('foldername',
                      {initialValue: biName,
                        rules: [{
                          required: true,
                          message: '目录名称不能为空',
                        }],
                      })(<Input onBlur={this.changeFolderName.bind(this)}/>)
                  }
                </FormItem>

                <FormItem
                  label='目录说明'
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 14 }}
                >
                  {
                    getFieldDecorator('folderdescription',
                      {initialValue: biCaption,
                        //rules: [{required: true, message: '对目录来点描述吧'}],
                      })(<Input type='textarea' style={{ height: 80 }} onBlur={this.changeFolderCaption.bind(this)} />)
                  }
                </FormItem>


                <FormItem
                  label='目录关键词'
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 14 }}
                >
                  {
                    getFieldDecorator('keywords',
                      {initialValue: biKeyWords,
                        //rules: [{required: true, message: '请输入关键词'}],
                      })(<div style={{width:'100%', height:'80px', border:'1px solid #eee', overflowY:'scroll'}}>
                        {biKeyWords.map((tag, index) => {
                          const isLongTag = tag.length > 20;
                          const tagElem = (
                            <Tag key={tag} closable afterClose={() => this.handleClose(tag)}>
                              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </Tag>
                          );
                          return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
                        })}
                        {inputVisible && (
                          <Input
                            ref={this.saveInputRef}
                            type="text"
                            size="small"
                            style={{ width: 78 }}
                            value={inputValue}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputConfirmBlur}
                            onPressEnter={this.handleInputConfirmEnter}
                          />
                        )}
                        {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+新标签</Button>}
                      </div>)
                  }
                </FormItem>
              </Form>
            </div>
          </TabPane>



          <TabPane tab="设置权限" key="2">
            <div style={{width:'100%'}}>
              <Row>
                <div style={{height:'50px', marginTop:'16px', paddingLeft:'80px'}}>
                  <Checkbox
                    disabled={checkBoxDisabled}
                    onChange={this.onChangeCheckBox.bind(this)}
                    defaultChecked={defChecked}
                  >继承父权限</Checkbox>
                </div>
              </Row>

              <Row>
                <Row style={{paddingLeft: '80px'}}>
                  <label>允许浏览：</label>
                  <Select
                    mode="multiple"
                    placeholder="请选择"
                    disabled={disabledX}
                    onSelect={this.viewSelect}
                    onDeselect={this.viewDeselect}
                    style={{ width: 400 }}
                    defaultValue={viewUsers}
                    value={viewUsers}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {children}
                  </Select>
                </Row>

                <Row style={{paddingLeft: '80px', marginTop: '16px'}}>
                  <label>允许下载：</label>
                  <Select
                    mode="multiple"
                    placeholder="请选择"
                    disabled={disabledX}
                    onSelect={this.downloadSelect}
                    onDeselect={this.downloadDeselect}
                    style={{ width: 400 }}
                    defaultValue={downloadUsers}
                    value={downloadUsers}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {children}
                  </Select>
                </Row>

                <Row style={{paddingLeft: '80px', marginTop: '16px'}}>
                  <label>允许上传：</label>
                  <Select
                    mode="multiple"
                    placeholder="请选择"
                    disabled={disabledX}
                    onChange={this.uploadChange}
                    style={{ width: 400 }}
                    defaultValue={uploadUsers}
                    value={uploadUsers}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {children}
                  </Select>
                </Row>

              </Row>
            </div>
          </TabPane>
        </Tabs>

        <Row gutter={2} style={{marginTop:'15px'}}>
          <Col style={{textAlign:'center'}}>
            <span><Button type="primary" htmlType="submit" onClick={this.submitFolder.bind(this)}>保存</Button>&nbsp;&nbsp;&nbsp;</span>
            <Button onClick={this.close.bind(this)}>取消</Button>
          </Col>
        </Row>
      </div>
    );
  }

  close() {
    this.props.clearFolserBI();
    this.props.clearPerUsers();
    this.props.close();
  }


  //新版提交函数，如果是新建，则提交新建目录信息，如果是编辑，则提交Update信息包含目录重命名
  submitFolder = () => {
    let name = this.props.folderValues.folderName;
    let folders = this.props.folders;
    if(this.isNew()) {
      if(name == '') {
        notification.error({message: '请填写目录名称哦'});
        return;
      } else {
        let len = folders.length;
        for(let i = 0; i < len; i++) {
          if(folders[i].name == name) {
            notification.error({message: `当前目录已有 “${name}” 请换个名字吧`});
            return;
          }
        }
      }
      //如果是新建目录，调用新建目录函数,得到返回的新id
      let iextend = 2;
      if(this.state.boxed == true || this.props.selectedNode.ifoldlevel >= 3) {
        iextend = 1;
      }

      this.props.addNewFolder({
        folders: this.props.folders,
        tree: this.props.treeData,
        id: this.props.selectedNode.id,
        newFolder: {
          name: name,
          caption: this.props.folderValues.folderCaption,
          keywords: this.props.folderValues.keyWords,
          //如果继承，iextend传1，否则传0，也就是：如果CheckBox勾上传1，如果父ifoldlevel>=3 传1
          iextend: iextend,
        },
      }).then(res => {
        this.props.submitFolderInfo(res.id);
      });
    } else {
      //如果是编辑，则提交更新信息，同时包括目录名称、描述，关键词
      //let oldname = this.props.rememberOldFolderName;
      let newname = this.props.folderValues.folderName;
      if(newname == '') {
        notification.error({message: '请填写目录名称哦'});
        return;
      }
      let iextend = 2;

      if(this.state.boxed == true || this.props.folderValues.ifoldlevel >= 4 || (this.props.folderValues.iextend == 1 && this.state.flag == 0)) {
        iextend = 1;
      }
      console.log('iextend ==编辑-提交=== ', iextend);
      this.props.renameFolder({
        tree: this.props.treeData,
        folders: this.props.folders,
        id: this.props.checkedFolders[0],
        newName: newname,
        resFolder: {
          name: newname,
          caption: this.props.folderValues.folderCaption,
          keywords: this.props.folderValues.keyWords,
          //如果继承，iextend传1，否则传0，也就是：如果CheckBox勾上传1，如果自己ifoldlevel>=4 传1
          iextend: iextend,
        },
      });
      //更新其他信息
      this.props.submitFolderInfo(this.props.checkedFolders[0]);
    }
    this.props.close();
  }
}



function mapStateToProps(state) {
  return {
    folder:state.folderPermissions.folder,
    groupTreeData: state.userMaster.groupTree.treeData,
    folderValues: state.resources.folderValues,
    allUsers: state.resources.allUsers,
    folderUsers: state.folderPermissions.folderUsers,
    rememberOldFolderName: state.resources.rememberOldFolderName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    queryFolderPermission : (folderId) => dispatch(queryFolderPermission(folderId)),
    loadGroupTreeData: () => getGroupTreeData(dispatch),
    queryGroupPermissions: (type) => dispatch(queryGroupPermissions(type)),
    setFolderPermissions: (params, folderId) => dispatch(setFolderPermissions(params, folderId)),
    renameFolder:(params) => renameFolder(dispatch, params),
    addNewFolder:(params) => addNewFolder(dispatch, params),
    changeFolderValue: (key, value) => dispatch(changeFolderValue(key, value)),
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    queryFolderUsers: (folderId) => dispatch(queryFolderUsers(folderId)),
    clearPerUsers: () => dispatch(clearPerUsers()),
    changeFolderUsers: (key, value) => dispatch(changeFolderUsers(key, value)),
    fetchFolderBaseInfo: (folderId) => dispatch(fetchFolderBaseInfo(folderId)),
    clearFolserBI: () => dispatch(clearFolserBI()),
    submitFolderInfo: (folderId) => dispatch(submitFolderInfo(folderId)),
  };
}

const WrappedFoldersPermission = createForm()(FoldersPermission);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedFoldersPermission);
