import React, {PropTypes} from 'react';
import { Row, Button, Modal, Select, notification, Radio} from 'antd';
import {modal} from '../../components/modal';
import UploadFilesComponent from './UploadFilesComponent';
import ModalCreate from './ModalCreate';
import helper from '../../../common/helper';
const confirm = Modal.confirm;
const Option = Select.Option;
const RadioGroup = Radio.Group;

export default class SearchArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'modalBox': null,
      'fileList': [],
      'alert': {
        'show': false,
        'isButton': true,
        'bsSize': 'small',
        'dialogClassName': 'custom-modal',
        'onHide': this.closeAlert,
        'title': null,
        'body': null,
        'submitAlert': null,
        'visible': false,
        'width': null,
        'okText': '确定',
        'cancelText': '取消',
        'footer': null,
        'onCancel': this.closeAlert,
      },
    };
  }

  static propTypes = {
    style: React.PropTypes.object,
    folders: React.PropTypes.array,
    deleteFile: React.PropTypes.func.isRequired,
    inStockFiles: React.PropTypes.func.isRequired,
    selectedFiles: React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
    selectAllFiles: React.PropTypes.func.isRequired,
    toggleDetailModal: React.PropTypes.func.isRequired,
    selectUploadFiles: React.PropTypes.func.isRequired,
    reversFileSelection: React.PropTypes.func.isRequired,
    permissions: React.PropTypes.array,
    currentUser: React.PropTypes.object,
    onChangeFilter: PropTypes.func,
    fetchFolder: PropTypes.func,
    assetType: PropTypes.string,
    showTree_upload: React.PropTypes.func.isRequired,
    getALiYunParams: React.PropTypes.func,
    uploadFile: React.PropTypes.func.isRequired,
    aLiYunAfterUploadFile: React.PropTypes.func.isRequired,
    deleteUploadFile: React.PropTypes.func.isRequired,
    showFileModal: React.PropTypes.func,
    fileModalInfo: React.PropTypes.object,
    hideFileModal: React.PropTypes.func,
    changeAlbumInfo: React.PropTypes.func,
    albumInfo: React.PropTypes.object,
    clearAlbumInfo: React.PropTypes.func,
    submitNewAlbum: React.PropTypes.func,
    openAlbum: React.PropTypes.func,
    displayMode: React.PropTypes.string,
    recordCurSelectedAlbum: React.PropTypes.func,
    curSelectedAlbum: React.PropTypes.object,
    updateAlbum: React.PropTypes.func,
    getAlbumInfo: React.PropTypes.func,
    changeAlbumFilterType: React.PropTypes.func,
    albumAssetType: React.PropTypes.string,
    getAlbumsInUpload: React.PropTypes.func,
    albums: React.PropTypes.array,
    toggleInstockConfirm: React.PropTypes.func,
  }

  state = {
    filterType: '',
  }

  //全部、图片、视频、文件夹.......
  onSelectChange_folder = (value) => {
    this.setState({
      filterType: value,
    });
    this.props.onChangeFilter({
      assetType: value,
    });
    let {selectedFolder, fetchFolder} = this.props;
    fetchFolder(selectedFolder.id, 1, value, true);
  }

  onSelectChange_album = (value) => {
    let {selectedFolder, fetchFolder, curSelectedAlbum, changeAlbumFilterType} = this.props;
    fetchFolder(selectedFolder.id, 1, value, true, curSelectedAlbum.id);
    changeAlbumFilterType(value);
  }

  clickEditBtn = () => {
    let {
      selectedFiles,
      toggleDetailModal,
      recordCurSelectedAlbum,
    } = this.props;
    if(selectedFiles[0]) {
      if(selectedFiles[0].assetType == helper.ASSET_TYPE.ALBUM) {
        recordCurSelectedAlbum(selectedFiles[0]);
        this.props.showFileModal(false);
      } else {
        toggleDetailModal();
      }
    }
  }

  //从album下返回到Folder下，重新走一次网络请求
  goBack = () => {
    let {selectedFolder, fetchFolder} = this.props;
    let {id, pageNum} = selectedFolder;
    fetchFolder(id, pageNum, this.state.filterType, false);
  }

  showCreateModal = () => {
    this.props.showFileModal(true);
  }

  retSelect = () => {
    let albumMode = this.props.displayMode == 'album' ? true : false;
    if(albumMode) {
      return (
        <Select value={this.props.albumAssetType} style={{ width: 100 }} onChange={this.onSelectChange_album}>
          <Option value="">全部</Option>
          <Option value="IMG">图片</Option>
          <Option value="VIDEO">视频</Option>
          <Option value="AUDIO">音频</Option>
          <Option value="DOC">其他</Option>
        </Select>
      );
    } else {
      return (
        <Select value={this.props.assetType} style={{ width: 100 }} onChange={this.onSelectChange_folder}>
          <Option value="">全部</Option>
          {/* <Option value="GROUP">文件夹</Option> */}
          <Option value="IMG">图片</Option>
          <Option value="VIDEO">视频</Option>
          <Option value="AUDIO">音频</Option>
          <Option value="DOC">其他</Option>
        </Select>
      );
    }
  }

  render() {
    let {
      style,
      selectedFiles,
      selectedFolder,
      selectAllFiles,
      reversFileSelection,
      fileModalInfo,
      hideFileModal,
      changeAlbumInfo,
      albumInfo,
      clearAlbumInfo,
      displayMode,
      submitNewAlbum,
      updateAlbum,
      getAlbumInfo,
      inStockFiles,
      toggleInstockConfirm,
    } = this.props;
    let albumMode = displayMode == 'album' ? true : false;
    let {modalBox} = this.state;
    const folderId = selectedFolder.id;
    const canUpload = selectedFolder.permissions.includes('upload_assets');
    let findAlbum = selectedFiles.find(x => {
      return x.assetType == helper.ASSET_TYPE.ALBUM;
    });
    let editBtnDisabled = (findAlbum && selectedFiles.length > 1) ? true : false;
    return (
      <div>
        {modalBox}
        <Row style={style} type="flex" justify="space-between">
          {
            canUpload && albumMode &&
            <Button
              style={{ margin: '0 6px' }}
              onClick={this.goBack}
              type="primary"
            >
              返回
            </Button>
          }
          {
            canUpload &&
            <div>
              <label style={{ marginLeft: 10 }}>资源类型：</label>
              {this.retSelect()}
            </div>
          }

          { canUpload &&
            <div>
              <Button
                style={{ margin: '0 8px' }}
                disabled={!selectedFolder.list || !selectedFolder.list.length}
                onClick={selectAllFiles}
              >
                全选
              </Button>
              <Button
                style={{ margin: '0 8px' }}
                disabled={!selectedFolder.list || !selectedFolder.list.length}
                onClick={reversFileSelection}
              >
                反选
              </Button>

              <input
                type="file"
                multiple
                style={{ display: 'none' }}
                accept="image/png, image/jpeg, image/gif, video/mp4"
                ref={input => this.fileInput = input}
                onChange={this.uploadFiles.bind(this)}
              />

              <Button
                type="primary"
                style={{ margin: '0 8px 0 30px' }}
                disabled={selectedFolder.isUpdating || folderId == 1}
                onClick={this.openFileChooser}
              >
                上传文件
              </Button>

              {/* {!albumMode && <Button
                type="primary"
                style={{ margin: '0 8px 0 8px' }}
                onClick={this.showCreateModal}
                >
                创建文件夹
              </Button>} */}

              <Button
                type="primary"
                style={{ margin: '0 8px' }}
                disabled={!selectedFiles.length || selectedFolder.isUpdating || editBtnDisabled}
                onClick={this.clickEditBtn}
              >
                编辑
              </Button>

              <Button
                type="primary"
                style={{ margin: '0 8px' }}
                disabled={!selectedFiles.length || selectedFolder.isUpdating}
                onClick={this.showDeleteConfirm}>
                删除
              </Button>

              <Button
                type="primary"
                style={{ marginLeft: '8px' }}
                disabled={!selectedFiles.length || selectedFolder.isUpdating}
                onClick={this.showInStockConfirm}>
                提交
              </Button>

              <Button
                type="primary"
                style={{ marginLeft: '30px' }}
                disabled={!(selectedFiles.length && selectedFiles.length > 0)}
                onClick={() => {
                  this.props.showTree_upload(1);
                }}
              >
                复制
              </Button>

              <Button
                type="primary"
                style={{ marginLeft: '8px' }}
                disabled={!(selectedFiles.length && selectedFiles.length > 0)}
                onClick={() => {
                  this.props.showTree_upload(2);
                }}
              >
                移动
              </Button>
            </div>
          }
        </Row>
        {
          this.props.fileModalInfo.isOpen && <ModalCreate
            fileModalInfo={fileModalInfo}
            hideFileModal={hideFileModal}
            changeAlbumInfo={changeAlbumInfo}
            albumInfo={albumInfo}
            clearAlbumInfo={clearAlbumInfo}
            submitNewAlbum={submitNewAlbum}
            updateAlbum={updateAlbum}
            selectedFolder={selectedFolder}
            toggleInstockConfirm={toggleInstockConfirm}
            getAlbumInfo={getAlbumInfo}
            inStockFiles={inStockFiles}
                                             />
        }
      </div>
    );
  }

  uploadFiles(event) {
    let selectedFiles = Array.prototype.slice.call(event.target.files);
    let errorFilesArray = [];
    selectedFiles.map(file => {
      let {name} = file;
      let extName = name.split('.').pop().toLowerCase();//获取文件后缀
      if(extName == 'png' || extName == 'jpeg' || extName == 'gif' || extName == 'mp4' || extName == 'jpg') {
        console.log('name------------', name);
      }else{
        errorFilesArray.push(name);
      }
    });
    if(errorFilesArray.length > 0) {
      notification.error({message: `您选择的${errorFilesArray.join(',')}不合法，请重新选择`});
    } else {
      this.props.selectUploadFiles(event);
    }
  }

  openFileChooser = () => {
    let {isUploadAliYun} = this.props.currentUser;
    this.props.getALiYunParams();
    if(!isUploadAliYun) {
      this.fileInput.click();
    } else {
      this.switchALiYuUploadFiles();
    }
  }

  switchALiYuUploadFiles() {
    let {
      aLiYunAfterUploadFile,
      folders,
      displayMode,
      selectedFiles,
      curSelectedAlbum,
    } = this.props;
    this.fileListSuccess([]);
    const config = {
      'width': '90%',
      'height': '500',
      'style': {
        top: 0,
        marginTop: '24px',
        padding:0,
        backgroundColor:'rgb(64,64,64)',
      },
      'title': <samll style={{'fontSize':'14px'}}>文件上传</samll>,
      'body': <UploadFilesComponent curSelectedAlbum={curSelectedAlbum} selectedFiles={selectedFiles} displayMode={displayMode} fileListSuccess={this.fileListSuccess.bind(this)} folders={folders} getALiYunParams={this.props.getALiYunParams} aLiYunAfterUploadFile={aLiYunAfterUploadFile} closeAlert={this.onCancelWin.bind(this)}></UploadFilesComponent>,
      'isBody':true,
      'isButton':false,
      'maskClosable': false,
      'type':'form',
    };
    this.openAlert(config);
  }

  showDeleteConfirm = () => {
    confirm({
      title: '确定要删除这些文件吗？',
      content: this.getFileNames(),
      onOk: () => this.props.deleteFile(),
    });
  }

  showInStockConfirm = () => {
    let {
      toggleInstockConfirm,
      getAlbumsInUpload,
      selectedFolder,
    } = this.props;
    toggleInstockConfirm(1);
    getAlbumsInUpload(selectedFolder.id);
  }

  getFileNames = () => {
    let {
      selectedFiles,
      selectedFolder,
    } = this.props;
    let titles = selectedFolder.list.filter(file => selectedFiles.find(x => x.id == file.id)).map(file => <p key={file.id}>{file.title}</p>);
    return titles;
  }

  fileListSuccess(fileList) {
    this.setState({fileList});
  }

  closeAlert = () => {
    if(this.state.fileList.length>0) {
      confirm({
        title: '关闭提示',
        content: <span>确认删除此批次的图片？</span>,
        onOk: () => this.delAndCloseWin(),
      });
    } else {
      this.onCancelWin();
    }
  }

  delAndCloseWin() {
    //删除这次上传的图片
    this.props.deleteUploadFile([], this.state.fileList).then(()=>{
      this.onCancelWin();
    });
  }

  onCancelWin() {
    const alert = Object.assign(this.state.alert, { 'visible': false });
    this.setState({ 'alert': alert, modalBox: ''});
    this.forceUpdate();
  }

  openAlert(config) {
    const alert = Object.assign(this.state.alert, { 'visible': true }, config);
    this.setState({'alert': alert, modalBox: modal(alert)});
    //this.forceUpdate();
  }
}
