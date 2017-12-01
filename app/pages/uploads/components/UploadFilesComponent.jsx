import React, {Component} from 'react';
import {baseAPI} from '../../../apis';
import {connect} from 'react-redux';
import {
    Button,
    Modal,
    Icon,
    Upload,
    Layout,
    Breadcrumb,
} from 'antd';
const confirm = Modal.confirm;
const { Content } = Layout;
import {
  deleteUploadFile,
  updateFiles_upload,
  fetchFolders,
  moveAssets_upload_file,
  fetchFolder,
} from 'actions';
import UploadEditForm from './UploadEditForm';
let uploadFileTimes = 0;
class UploadFilesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      fileKey: parseInt(Math.random()*100),
      selectFiles:[],
      tempSelectedFiles:{},
    };
  }

  static propTypes = {
    uploads: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    deleteUploadFile: React.PropTypes.func.isRequired,
    updateFiles_upload: React.PropTypes.func.isRequired,
    folders: React.PropTypes.array,
    fetchFolders: React.PropTypes.func.isRequired,
    moveAssets_upload_file: React.PropTypes.func.isRequired,
    closeAlert:React.PropTypes.func,
    fileListSuccess:React.PropTypes.func,
    fetchFolder:React.PropTypes.func.isRequired,
    uploadFile:React.PropTypes.func.isRequired,
    aLiYunAfterUploadFile:React.PropTypes.func.isRequired,
    getALiYunParams:React.PropTypes.func.isRequired,
    form:React.PropTypes.object,
    displayMode:React.PropTypes.string,
    selectedFiles: React.PropTypes.array,
    curSelectedAlbum: React.PropTypes.object,
  }

  uploadChange({file, fileList, event}) {
    let {isUploadAliYun} = this.props.currentUser;
    const {status} = file;
    let extName = file.name.split('.').pop();
    if(status == 'done') {
      uploadFileTimes = 0;
      if(!isUploadAliYun) {
        this.uploadVCGServer(file, fileList);
      }else{
        this.uploadAliYunServer(file, fileList);
      }
    }
    this.props.fileListSuccess(fileList);
    this.setState({fileList:fileList});
    this.forceUpdate();
  }

  uploadAliYunServer(file, fileList) {
    console.log('阿里云方式上传');
    let {
      currentUser,
      displayMode,
      curSelectedAlbum,
    } = this.props;
    let extName = file.name.split('.').pop();
    const {uid, type, name} = file;
    let params = {
      fileName:name,
      ossPath:`DamResource/img/orig/${currentUser.userId}/${uid}.${extName}`,
      type,
    };
    let paramList = [];
    paramList.push(params);
    this.props.getALiYunParams().then(() => {
      let groupId = undefined;
      if(displayMode == 'album') {
        groupId = curSelectedAlbum.id;
      }
      this.props.aLiYunAfterUploadFile(paramList, groupId).then((res) => {
        let item = res.file;
        let {imgUploads} = item;
        file.id = item.id;
        file.url = imgUploads.url;
        file.response = item;
        file.name = item.title;
      });
    });
  }

  uploadVCGServer(file, fileList) {
    console.log('本地服务器方式上传');
    if (file.response) {
      let data = file.response.data;
      if (data) {
        data.map((item)=>{
          let {imgUploads} = item;
          file.id = item.id;
          file.url = imgUploads.url;
          file.response = item;
        });
      }
      if (file.response.status == '201') {
        file.error = file.response.message;
      }
    }
  }

  uploadBeforeUpload(file) {
    return new Promise((resolve) => {
      uploadFileTimes++;
      setTimeout(() => {
        resolve(file);
      }, 1000*uploadFileTimes);
    });//每1秒上传发一次请求，不可同时发出所有请求
  }

  uploadEvent() {
    let {currentUser, uploads} = this.props;
    let {aLiYunParams:{accessid, expire, host, policy, signature}} = uploads;
    let fileName = this.getTempFileName(32);
    let {isUploadAliYun} = this.props.currentUser;
    if(!isUploadAliYun) {
      host = `${baseAPI}/uploadHandler/batchUpload?resType=1&userId=${currentUser.userId}&folderId=${uploads.selectedFolder.id}`;
    }
    return {
      action: host,
      listType: 'picture-card',
      accept: 'image/png,image/jpeg,image/jpg,mp4',
      multiple: true,
      data: (file)=>{
        let {uid} = file;
        let extName = file.name.split('.').pop();
        let ossPath = `DamResource/img/orig/${currentUser.userId}/${uid}.${extName}`;
        let name = `${uid}.${extName}`;
        return {
          'OSSAccessKeyId': accessid,
          'success_action_status': 200,
          'key': ossPath,
          'fileName': name,
          'signature': signature,
          'expire': expire,
          'policy': policy,
        };
      },
      onChange: this.uploadChange.bind(this),
      onSelect: this.onSelectFiles.bind(this),
      beforeUpload: this.uploadBeforeUpload.bind(this),
    };
  }

  onSelectFiles(files) {
    this.handleCacheFile(files);
    this.setState({fileKey: parseInt(Math.random()*100)});
    this.forceUpdate();
  }

  handleCacheFile(files) {
    let {selectFiles, tempSelectedFiles} = this.state;
    let selectedFolder = this.props.uploads.selectedFolder;
    let currentFolderId = parseInt(selectedFolder.id && selectedFolder.id[0]);
    selectFiles = [];
    files.map((item)=> {
      let {response} = item;
      // if(response.data.length>0) {
      let file = response;
      let {id, title} = file;
      let tempFile = tempSelectedFiles[id];
      if(tempFile) {
        file = {};//需要清空一下，然后再重新赋值
        file = tempFile;
      }else{
        file.currentFolderId = currentFolderId;
      }
      file.originTitle = title;
      selectFiles.push(file);
      // }
    });
    this.setState({selectFiles});
  }

  selectAll() {
    let {fileList}= this.state;
    fileList.map((item) => {
      item.selected = true;
    });
    this.handleCacheFile(fileList);
    this.setState({fileList});
  }

  cancelSelectAll() {
    let {fileList, selectFiles}= this.state;
    fileList.map((item) => {
      item.selected = false;
    });
    selectFiles = [];
    this.setState({fileList, selectFiles});
  }

  batchDelFiles() {
    let {selectFiles, fileList} = this.state;
    let delFileIds = [];
    selectFiles.map((file)=>{
      let {id} = file;
      delFileIds.push(id);
    });
    this.props.deleteUploadFile(delFileIds, selectFiles).then((res)=>{
      let newFileList = fileList.filter((item1)=> {
        return selectFiles.every((item2)=> {
          return item2.id !== item1.id;
        });
      });
      this.setState({fileList:newFileList});
    });
  }

  delFiles() {
    confirm({
      title: '确认提示',
      content: <span>确定要删除这些文件吗？</span>,
      onOk:this.batchDelFiles.bind(this),
    });
  }

  render() {
    const {fileList, fileKey, selectFiles} = this.state;
    let {
      updateFiles_upload,
      folders,
      fetchFolders,
      uploads,
      moveAssets_upload_file,
      closeAlert,
      fetchFolder,
      displayMode,
      curSelectedAlbum,
    } = this.props;
    let formStyle= {
      borderLeft: '1px solid #e9e9e9',
      paddingLeft: '24px',
      float: 'right',
      marginRight: '-340px',
      width:'385px',
    };
    let uploadStatusObj = this.uploadEvent();
    return(
        <div className="ant-layout-content upload-self">

          <div className="upload-container">
            <div className='upload-main' style={{width:'100%'}}>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '12px 0' }}>
                  <Button type='primary' onClick={this.delFiles.bind(this)} disabled={selectFiles.length>0?false:true}
                    style={{ margin: '0 8px' }}>
                    删除
                  </Button>
                  <Button type='primary' onClick={this.selectAll.bind(this)}
                    style={{ margin: '0 8px' }}>
                    全选
                  </Button>
                  <Button type='primary' onClick={this.cancelSelectAll.bind(this)}
                    style={{ margin: '0 8px' }}>
                    取消选中
                  </Button>
                </Breadcrumb>

                <Content style={{ background: '#fff', margin: 0, width:'99%', overflow: 'auto', height: '750px', paddingTop:10}}>
                  <Upload className="upload-list-btn" {...uploadStatusObj} fileList={fileList}>
                    <div>
                      <Icon type="plus" />
                      <div className="ant-upload-text">上传图片</div>
                    </div>
                  </Upload>
                </Content>
              </Layout>
            </div>

            <div className="ant-layout-content upload-sidebar" style={formStyle}>
              <UploadEditForm
                key={fileKey}
                selectFiles={selectFiles}
                updateFiles_upload={updateFiles_upload}
                folders={folders}
                fetchFolders={fetchFolders}
                uploads={uploads}
                moveAssets_upload_file={moveAssets_upload_file}
                closeAlert={closeAlert}
                fetchFolder={fetchFolder}
                displayMode={displayMode}
                curSelectedAlbum={curSelectedAlbum}
                saveSelectedFilesMoney={this.saveSelectedFilesMoney.bind(this)}
              />
            </div>
          </div>
        </div>
    );
  }

  saveFiles() {//编辑
    let {selectFiles} = this.state;
    let {uploads} = this.props;
    let selectedFolder = uploads.selectedFolder;
    this.props.form.validateFields((err, values) => {
      let {currentFolderId} = values;
      if(currentFolderId>1) {
        if(selectedFolder) {
          let oldFolderId = selectedFolder.id && selectedFolder.id[0];
          if(currentFolderId != oldFolderId) {
            this.props.moveAssets_upload_file(oldFolderId, currentFolderId, selectFiles);
          }
        }
      }
      if(!err) {
        this.props.updateFiles_upload(values, selectFiles).then(()=>{
          this.props.closeAlert();
          let currentFolderId = selectedFolder.id && selectedFolder.id[0];
          this.props.fetchFolder(currentFolderId, 1, '', true);
        });
      }else {
        console.error('------error-----');
      }
    });
  }

  saveSelectedFilesMoney(tempfiles) {
    let {tempSelectedFiles} = this.state;
    tempfiles.map((file)=> {
      let {id} = file;
      tempSelectedFiles[id] = file;
    });
    this.setState({tempSelectedFiles});
  }

  getTempFileName(num) {
    return parseInt(Math.random()*num);
  }
}

function mapStateToProps(state) {
  return {
    uploads:state.uploads,
    currentUser:state.login.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteUploadFile: (id, selectFiles) => dispatch(deleteUploadFile(id, selectFiles)),
    updateFiles_upload: (values, selectFiles) => dispatch(updateFiles_upload(values, selectFiles)),
    fetchFolders: (type, parentId) => dispatch(fetchFolders(type, parentId)),
    moveAssets_upload_file: (currentId, targetId, selectFiles) => dispatch(moveAssets_upload_file(currentId, targetId, selectFiles)),
    fetchFolder: (id, pageNum, assetType, filterChanged, type) => dispatch(fetchFolder(id, pageNum, assetType, filterChanged, type)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UploadFilesComponent);
