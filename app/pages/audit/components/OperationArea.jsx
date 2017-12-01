import React from 'react';
import { Row, Button, Radio, Modal, Select, notification } from 'antd';
import ModalCreate from './ModalCreate';
import helper from '../../../common/helper';
const confirm = Modal.confirm;
const Option = Select.Option;
export default class SearchArea extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      'reviewState': {
        'PENDING': '1', //未审核
        'INPROGRESS': '2', //审核中
        'REJECTED': '3', //驳回
        'PASSED': '4', //通过（入库）
      },
      'onlineState': {
        'ONLINE': 1, //"已上线",
        'PENDING': 2, //"未上线",
        'OFFLINE': 3, //禁用
      },
    };
  }

  static propTypes = {
    style: React.PropTypes.object,
    reviewFiles_audit: React.PropTypes.func.isRequired,
    offLineFiles_audit: React.PropTypes.func.isRequired,
    selectedFiles: React.PropTypes.array,
    fetchFolder_audit: React.PropTypes.func.isRequired,
    selectedFolder: React.PropTypes.object,
    vcgFolderId:React.PropTypes.number,
    selectAllFiles: React.PropTypes.func.isRequired,
    reversFileSelection: React.PropTypes.func.isRequired,
    filter: React.PropTypes.object,
    switchTable_audit: React.PropTypes.func.isRequired,
    showTable: React.PropTypes.bool.isRequired,
    toggleDetailModal: React.PropTypes.func.isRequired,
    showTree_audit: React.PropTypes.func.isRequired,
    folders: React.PropTypes.array,
    fetchFolder: React.PropTypes.func,
    currentUser: React.PropTypes.object,
    showFileModal_audit: React.PropTypes.func,
    fileModalInfo: React.PropTypes.object,
    hideFileModal_audit: React.PropTypes.func,
    changeAlbumInfo_audit: React.PropTypes.func,
    albumInfo: React.PropTypes.object,
    clearAlbumInfo_audit: React.PropTypes.func,
    submitNewAlbum_audit: React.PropTypes.func,
    curSelectedAlbum: React.PropTypes.object,
    recordCurSelectedAlbum_audit: React.PropTypes.func,
    getAlbumInfo_audit: React.PropTypes.func,
    updateAlbum_audit: React.PropTypes.func,
    displayMode: React.PropTypes.string,
    filter_album: React.PropTypes.object,
  }

  onRadioChange = (value) => {
    let param = {
      reviewState: '',
      onlineState: '',
    };
    if(value == 2) {
      param.reviewState = 'PENDING';
    }if(value == 3) {
      param.reviewState = 'PASSED';
      param.onlineState = 'ONLINE';
    }if(value == 4) {
      param.reviewState = 'REJECTED';
    }if(value == 5) {
      param.reviewState = 'PASSED';
      param.onlineState = 'OFFLINE';
    }
    this.props.fetchFolder_audit(param, true);
  }

  onSelectChange = (value) => {
    this.props.fetchFolder_audit({assetType: value}, true);
  }

  handleSizeChange = (e) => {
    this.props.switchTable_audit(e.target.value == '2' ? true : false);
  }

  refresh = () => {
    this.props.fetchFolder_audit(this.props.filter, false);
  }

  showCreateModal = () => {
    this.props.showFileModal_audit(true);
  }

  clickEditBtn = () => {
    let {
      toggleDetailModal,
      selectedFiles,
      showFileModal_audit,
      recordCurSelectedAlbum_audit,
    } = this.props;
    if(selectedFiles[0]) {
      if(selectedFiles[0].assetType == helper.ASSET_TYPE.ALBUM) {
        recordCurSelectedAlbum_audit(selectedFiles[0]);
        showFileModal_audit(false);
      } else {
        toggleDetailModal();
      }
    }
  }

  //从album下返回到folder下，重新走一次网络请求
  goBack = () => {
    let { filter, fetchFolder_audit } = this.props;
    fetchFolder_audit(filter, false);
  }

  judgeStatus = (file) => {
    let str = '';
    if(file.onlineState == 3) {
      //禁用
      str = 'yjy';
    } else {
      if(file.reviewState == 1) {
        //'待审核';
        str = 'dsh';
      } else if (file.reviewState == 3) {
        //'已驳回';
        str = 'ybh';
      }else if (file.reviewState == 4) {
        //'已入库';
        str = 'yrk';
      }
    }
    return str;
  }

  //复制、移动 两个按钮的禁用逻辑，多个选中文件情况下，如果同时有album和其他类型资源，这两个按钮置灰
  setFYBtnStatus = () => {
    let {selectedFiles} = this.props;
    if(selectedFiles.length > 1) {
      let albumArr = selectedFiles.filter(file => {
        return file.assetType == helper.ASSET_TYPE.ALBUM;
      });
      if(albumArr.length > 0 && albumArr.length < selectedFiles.length) {
        //说明全都是album类型
        return true;
      }
    }
    return false;
  }

  //入库、驳回、禁用 三个按钮的禁用逻辑
  setBtnStatus = () => {
    let obj = {
      RK: false,
      BH: false,
      JY: false,
    };
    let {filter, selectedFiles} = this.props;
    if(filter.reviewState == 'PASSED' && filter.onlineState == 'OFFLINE') {
      //禁用
      obj.JY = true;
    } else if(filter.reviewState == 'PENDING' && filter.onlineState == '') {
      //待审核
      obj.JY = true;
    } else if(filter.reviewState == 'PASSED' && filter.onlineState == 'ONLINE') {
      //已入库
      obj.RK = true;
      obj.BH = true;
    } else if(filter.reviewState == 'REJECTED' && filter.onlineState == '') {
      //已驳回
      obj.BH = true;
      obj.JY = true;
    } else if(filter.reviewState == '' && filter.onlineState == '') {
      //全部
      if(selectedFiles && selectedFiles.length > 0) {
        if(selectedFiles.length == 1) {
          let file = selectedFiles[0];
          let strStatus = this.judgeStatus(file);
          switch(strStatus) {
          case 'yjy':
            obj.JY = true;
            break;
          case 'dsh':
            obj.JY = true;
            break;
          case 'ybh':
            obj.BH = true;
            obj.JY = true;
            break;
          case 'yrk':
            obj.RK = true;
            obj.BH = true;
            break;
          }
        } else {
          //选中多个文件的情况，2个或者2个以上
          let strs = selectedFiles.map(file => {
            return this.judgeStatus(file);
          });
          console.log('strs ==== ', strs);
          let findAlbum = selectedFiles.find(file => {
            return file.assetType == helper.ASSET_TYPE.ALBUM;
          });
          if(findAlbum) {
            obj.BH = true;
            obj.JY = true;
            obj.RK = true;
          } else {
            if(strs.indexOf('ybh') > -1 && strs.indexOf('yjy') == -1 && strs.indexOf('dsh') == -1 && strs.indexOf('yrk') == -1) {
              //全是已驳回
              obj.BH = true;
              obj.JY = true;
            } else if(strs.indexOf('ybh') == -1 && strs.indexOf('yjy') == -1 && strs.indexOf('dsh') == -1 && strs.indexOf('yrk') > -1) {
              //全是已入库
              obj.RK = true;
              obj.BH = true;
            } else if(strs.indexOf('ybh') == -1 && strs.indexOf('yrk') == -1 && (strs.indexOf('yjy') > -1 || strs.indexOf('dsh') > -1)) {
              //待审核 和 已禁用 按钮置灰状态是一样的
              obj.JY = true;
            } else {
              //这种群体操作只让入库操作,如果选中的图片包括已入库的，需要灰掉入库按钮
              if(strs.indexOf('yrk') > -1) {
                obj.RK = true;
              }
              obj.BH = true;
              obj.JY = true;
            }
          }
        }
      }
    }
    return obj;
  }

  getDefaultReview = (ft) => {
    let defaultV = '1';
    if(ft.reviewState == 'PENDING') {
      defaultV = '2';
    }if(ft.reviewState == 'PASSED' && ft.onlineState == 'ONLINE') {
      defaultV = '3';
    }if(ft.reviewState == 'REJECTED') {
      defaultV = '4';
    }if(ft.reviewState == 'PASSED' && ft.onlineState == 'OFFLINE') {
      defaultV = '5';
    }
    return defaultV;
  }

  onSelectChange = (value) => {
    this.props.fetchFolder_audit({assetType: value}, true);
  }

  assetTypeChange_album = (value) => {
    let groupId = this.props.curSelectedAlbum.id;
    this.props.fetchFolder_audit({assetType: value, groupId}, true);
  }

  assetTypeChange_folder = (value) => {
    this.props.fetchFolder_audit({assetType: value}, true);
  }

  retSelect_assetType = () => {
    let albumMode = this.props.displayMode == 'album' ? true : false;
    if(albumMode) {
      return (
        <Select value={this.props.filter_album.assetType} style={{ width: 100 }} onChange={this.assetTypeChange_album}>
          <Option value="">全部</Option>
          <Option value="IMG">图片</Option>
          <Option value="VIDEO">视频</Option>
          <Option value="AUDIO">音频</Option>
          <Option value="DOC">其他</Option>
        </Select>
      );
    } else {
      return (
        <Select value={this.props.filter.assetType} style={{ width: 100 }} onChange={this.assetTypeChange_folder}>
          <Option value="">全部</Option>
          <Option value="GROUP">文件夹</Option>
          <Option value="IMG">图片</Option>
          <Option value="VIDEO">视频</Option>
          <Option value="AUDIO">音频</Option>
          <Option value="DOC">其他</Option>
        </Select>
      );
    }
  }


  reviewChange_album = (value) => {
    let groupId = this.props.curSelectedAlbum.id;
    let param = {
      reviewState: '',
      onlineState: '',
      groupId,
    };
    if(value == 2) {
      param.reviewState = 'PENDING';
    }if(value == 3) {
      param.reviewState = 'PASSED';
      param.onlineState = 'ONLINE';
    }if(value == 4) {
      param.reviewState = 'REJECTED';
    }if(value == 5) {
      param.reviewState = 'PASSED';
      param.onlineState = 'OFFLINE';
    }
    this.props.fetchFolder_audit(param, true);
  }

  reviewChange_folder = (value) => {
    let param = {
      reviewState: '',
      onlineState: '',
    };
    if(value == 2) {
      param.reviewState = 'PENDING';
    }if(value == 3) {
      param.reviewState = 'PASSED';
      param.onlineState = 'ONLINE';
    }if(value == 4) {
      param.reviewState = 'REJECTED';
    }if(value == 5) {
      param.reviewState = 'PASSED';
      param.onlineState = 'OFFLINE';
    }
    this.props.fetchFolder_audit(param, true);
  }

  retSelect_review = () => {
    let albumMode = this.props.displayMode == 'album' ? true : false;
    if(albumMode) {
      let defV = this.getDefaultReview(this.props.filter_album);
      return (
        <Select value={defV} style={{ width: 100 }} onChange={this.reviewChange_album}>
          <Option value='1'>全部</Option>
          <Option value='2'>待审核</Option>
          <Option value='3'>已入库</Option>
          <Option value='4'>已驳回</Option>
          <Option value='5'>已禁用</Option>
        </Select>
      );
    } else {
      let defV = this.getDefaultReview(this.props.filter);
      return (
        <Select value={defV} style={{ width: 100 }} onChange={this.reviewChange_folder}>
          <Option value='1'>全部</Option>
          <Option value='2'>待审核</Option>
          <Option value='3'>已入库</Option>
          <Option value='4'>已驳回</Option>
          <Option value='5'>已禁用</Option>
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
      showTable,
      reversFileSelection,
      fileModalInfo,
      hideFileModal_audit,
      changeAlbumInfo_audit,
      albumInfo,
      clearAlbumInfo_audit,
      submitNewAlbum_audit,
      getAlbumInfo_audit,
      updateAlbum_audit,
      displayMode,
    } = this.props;

    let offlineState = false, passState = false, editState = false, rejectState = false;
    let oBtnStatus = this.setBtnStatus();
    let yfBtnStatus = this.setFYBtnStatus();
    /*有些操作是受限的：
      待审核的不能被禁用，被禁用的一定是曾经入库过的;
      入库状态的不能驳回，只有禁用之后才能驳回
    */
    if (selectedFiles) {
      //根据图片状态控制BUTTON操作
      let {reviewState:{PENDING, REJECTED, PASSED}, onlineState:{OFFLINE}} = this.state;
      let rejectTemp = false;
      selectedFiles.map((file)=>{
        let {reviewState, onlineState} = file;
        if(reviewState==PENDING) {//待审核的图片可以做任何操作
        }else if(reviewState==REJECTED) {
          offlineState = true, passState = true, editState = true, rejectState = true;
          rejectTemp = true;
        }else if(reviewState == PASSED) {
          offlineState = false, passState = true, editState = false, rejectState = true;
        }

        if(onlineState == OFFLINE) {
          offlineState = true, passState = false, editState = false, rejectState = true;
        }
      });

      if(rejectTemp) {//多选中，只要有驳回的，其它的图片都不可操作
        offlineState = true, passState = true, editState = true, rejectState = true;
      }
    }

    let isAlbum = displayMode == 'album' ? true : false;
    if(this.props.selectedFolder.id) {
      return (
        <Row style={style} type="flex" justify="space-between">
          {
            isAlbum && <div>
              <Button
                style={{ margin: '0 2px' }}
                type="primary"
                onClick={this.goBack}
              >
                {'返回'}
              </Button>
            </div>
          }

          {
            isAlbum && <div style={{height: '28px', lineHeight: '28px'}}>
              {'当前文件夹：'}
              <span style={{color: 'red'}}>
                {this.props.curSelectedAlbum.title}
              </span>
            </div>
          }

          <div>
            <label style={{ marginLeft: 0 }}>资源状态：</label>
            {this.retSelect_review()}
            <label style={{ marginLeft: 4 }}>资源类型：</label>
            {this.retSelect_assetType()}
            <Radio.Group style={{ marginLeft: 4 }} value={showTable ? '2' : '1'} onChange={this.handleSizeChange}>
              <Radio.Button value="1">缩略图</Radio.Button>
              <Radio.Button value="2">列表</Radio.Button>
            </Radio.Group>
          </div>

          <div>
            {
              !isAlbum && <Button
                type="primary"
                style={{ margin: '0 2px' }}
                onClick={this.showCreateModal}
                          >
                创建文件夹
              </Button>
            }
            <Button
              style={{ margin: '0 2px' }}
              disabled={!selectedFolder.list || !selectedFolder.list.length}
              onClick={selectAllFiles}
            >
              全选
            </Button>
            <Button
              style={{ margin: '0 2px' }}
              disabled={!selectedFolder.list || !selectedFolder.list.length}
              onClick={reversFileSelection}
            >
              反选
            </Button>
            {
              !isAlbum && <Button
                style={{ margin: '0 2px' }}
                onClick={this.refresh}
                          >
                刷新
              </Button>
            }
            <Button
              type="primary"
              style={{ margin: '0 2px' }}
              disabled={oBtnStatus.RK}
              onClick={this.showPassConfirm}
            >
              入库
            </Button>

            <Button
              type="primary"
              style={{ margin: '0 2px' }}
              disabled={editState && !selectedFiles.length}
              onClick={this.clickEditBtn}
            >
              编辑
            </Button>

            <Button
              type="primary"
              style={{ margin: '0 2px' }}
              disabled={oBtnStatus.BH}
              onClick={this.showRejectConfirm}
            >
              驳回
            </Button>

            <Button
              type="primary"
              style={{ margin: '0 2px' }}
              disabled={oBtnStatus.JY}
              onClick={this.showOffLineConfirm}
            >
              禁用
            </Button>

            <Button
              type="primary"
              style={{ marginLeft: '2px' }}
              disabled={!(selectedFiles.length && selectedFiles.length > 0) || yfBtnStatus}
              onClick={() => {
                this.props.showTree_audit(1);
              }}
            >
              复制
            </Button>

            <Button
              type="primary"
              style={{ marginLeft: '2px' }}
              disabled={!(selectedFiles.length && selectedFiles.length > 0) || (this.props.selectedFolder.id == this.props.vcgFolderId) || yfBtnStatus}
              onClick={() => {
                this.props.showTree_audit(2);
              }}
            >
              移动
            </Button>
          </div>
          {
            this.props.fileModalInfo.isOpen && <ModalCreate
              fileModalInfo={fileModalInfo}
              hideFileModal_audit={hideFileModal_audit}
              changeAlbumInfo_audit={changeAlbumInfo_audit}
              albumInfo={albumInfo}
              selectedFolder={selectedFolder}
              submitNewAlbum_audit={submitNewAlbum_audit}
              clearAlbumInfo_audit={clearAlbumInfo_audit}
              getAlbumInfo_audit={getAlbumInfo_audit}
              updateAlbum_audit={updateAlbum_audit}
                                               />
          }
        </Row>
      );
    } else {
      return(<Row style={style} type="flex" justify="space-between"></Row>);
    }
  }

  showPassConfirm = () => {
    if(this.props.selectedFiles[0].assetType == helper.ASSET_TYPE.ALBUM) {
      this.props.reviewFiles_audit(true);
    } else {
      let isChinaNet = this.props.currentUser.customerId == 20001 ? true : false;
      let find = this.props.selectedFiles.find(x=>(!x.licenseType||!x.licenseAuthorizer||!x.title));
      if(isChinaNet) {
        let zwFind = this.props.selectedFiles.find(x => !x.title);
        if(zwFind) {
          notification.warning({message:'资源名称为必选项，请填写!'});
        } else {
          confirm({
            title: '确定要入库这些文件吗？',
            content: this.getFileNames(),
            onOk: () => this.props.reviewFiles_audit(true),
          });
        }
      } else {
        if(find) {
          notification.warning({message:'所提交资源中存在空的必填项，请编辑资源信息!'});
        } else {
          confirm({
            title: '确定要入库这些文件吗？',
            content: this.getFileNames(),
            onOk: () => this.props.reviewFiles_audit(true),
          });
        }
      }
    }
  }

  showRejectConfirm = () => {
    confirm({
      title: '确定要驳回这些文件吗？',
      content: this.getFileNames(),
      onOk: () => this.props.reviewFiles_audit(false),
    });
  }

  showOffLineConfirm = () => {
    let files = this.props.selectedFiles;
    confirm({
      title: '确定要禁用这些文件吗？',
      content: this.getFileNames(),
      //onOk: () => this.props.offLineFiles_audit(false),
      onOk: () => {
        files.forEach(file => {
          this.props.offLineFiles_audit(file);
        });
      },
    });
  }
  getFileNames = () => {
    let {
      selectedFiles,
      selectedFolder,
    } = this.props;

    return selectedFolder.list
      .filter(file => selectedFiles.includes(file.id))
      .map(file => <p key={file.id}>{file.title}</p>);
  }

}
