import React from 'react';
import { connect } from 'react-redux';
import { Form} from 'antd';
import FolderArea from './components/VerificationTree';
import SearchArea from './components/VerificationSearchArea';
import BreadCrumbArea from './components/BreadCrumbArea';
import VerificationOperations from './components/VerificationOperations';
import PendingContentList from './components/PendingContentList';
import VerificationReject from './components/VerificationReject';
import VerificationImgDetail from './components/VerificationImgDetail';
import {modal} from '../components/modal';
const FormItem = Form.Item;
const createForm 					= Form.create;
import {
  fetchFolder,
  fetchFolders,
  selectUploadFiles,
  toggleImgSelection,
  selectInvert,
  selectAll,
  handlerImgStatus,
  getPendingList,
  getBetchImg,
} from 'actions';

const styles = {
  sider: {
    background: '#fff',
    marginRight: '8px',
    padding: '16px 0',
  },
  content: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  search: {
    padding: '16px 32px',
    background: '#fff',
    flex: '1 0 auto',
  },
  breadcrumb: {
    margin: '12px 0',
  },
  button: {
    background: '#fff',
    padding: '16px 32px',
    flex: '1 0 auto',
  },
  lists: {
    background: '#fff',
    flex: '1 1 100%',
    overflow: 'auto',
    alignContent: 'flex-start',
    height:'630px',
  },
  modal: {
    top: 0,
    paddingTop: 24,
  },
  imageArea: {
    flex: '2 70%',
    overflow: 'auto',
    position: 'relative',
    backgroundColor: '#404040',
  },
  image: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    maxWidth: '100%',
    transform: 'translate(-50%, -50%)',
  },
};

class VerificationIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'modalBox':null,
      'imageStatus':{
        'PASSED': 'PASSED',
        'REJECTED': 'REJECTED',
        'PENDING': 'PENDING',
      },
      queryParams:{
        pageNum:1,
        pageSize:10,
      },
      'alert':{
        'onHide': this.closeAlert.bind(this),
        'title': null,
        'body': null,
        'visible':false,
        'width':null,
        'okText':'确定',
        'cancelText':'取消',
        'footer':null,
        'maskClosable':true,
        'onCancel':this.closeAlert.bind(this),
      },
    };
  }

  static propTypes = {
    folders: React.PropTypes.array,
    // userGroups: React.PropTypes.array,
    selectedFiles: React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
    selectedUploadFiles: React.PropTypes.array,
    uploadFile: React.PropTypes.func.isRequired,
    fetchFolder: React.PropTypes.func.isRequired,
    fetchFolders: React.PropTypes.func.isRequired,
    toggleImgSelection: React.PropTypes.func.isRequired,
    selectUploadFiles: React.PropTypes.func.isRequired,
    selectInvert: React.PropTypes.func.isRequired,
    handlerImgStatus: React.PropTypes.func.isRequired,
    selectAll: React.PropTypes.func.isRequired,
    getPendingList: React.PropTypes.func.isRequired,
    getBetchImg: React.PropTypes.func.isRequired,
    selectedImgs : React.PropTypes.array,
    folderPendingList : React.PropTypes.array,
    allImgIds: React.PropTypes.array,
    imgsList: React.PropTypes.array,
    location : React.PropTypes.object,
    toggleDetailModal:React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    //this.refresh();
  }

  updateImgStatus(data) {
    const {imageStatus} = this.state;
    let params = {
      'ids': data,
      'state': imageStatus.PASSED,
    };
    this.props.handlerImgStatus(params).then(()=>{

    });
  }

  refresh(value) {
    let {selectedFolder, location} = this.props;
    let {pathname} = location;
    let {queryParams} = this.state;
    let nodeId = selectedFolder && selectedFolder.id || '0';
    nodeId = value || nodeId;
    let reviewState = 'PENDING';
    let params = {
      folderId:nodeId,
    };
    if(pathname=='/pending_list') {
      reviewState = 'PENDING';
      params.uploadState = 'INSTOCK';
    }else if(pathname=='/passed_list') {
      reviewState = 'PASSED';
    }else if(pathname=='/reject_list') {
      reviewState = 'REJECTED';
    }
    params.reviewState = reviewState;
    Object.assign(queryParams, params);
    this.setState({queryParams});
    this.props.getPendingList(queryParams).then(()=>{
      let imgItems = this.props.folderPendingList;
      let imgParams = [];
      if(imgItems && imgItems.list && imgItems.list.length>0) {
        const {list} = imgItems;
        list.map((imgItem)=>{
          let {id} = imgItem;
          imgParams.push(id);
        });
      }

      this.props.getBetchImg({ids:imgParams}).then(()=>{
      }).catch(()=>{
      });
    });
  }

  onSelectedFolders(value) {
    this.refresh(value);
  }

  handlerRejactAction(params) {
    const config = {
      'width':'600',
      'title': <small style={{'fontSize':'14px'}}>驳回原因--[{params.join(',')}]</small>,
      'body': <VerificationReject selectedImges={params} close={this.closeAlert.bind(this)} handlerSubmitReject={this.saveRejectState.bind(this)}/>,
      'isBody':true,
      'isButton':false,
      'type':'form',
    };
    this.openAlert(config);

  }

  saveRejectState(params) {
    const {imageStatus} = this.state;
    params.state = imageStatus.REJECTED;
    this.props.handlerImgStatus(params).then(()=>{
      this.refresh();
      this.alertMsg('操作成功！', 'success');
    }).catch(()=>{
      this.alertMsg('操作失败！', 'error');
    });
  }

  toggleDetailModal(imgFile) {
    const config = {
      'title': <small style={{'fontSize':'14px'}}></small>,
      'body': <VerificationImgDetail file={imgFile.detail} close={this.closeAlert.bind(this)} handlerSubmitReject={this.saveRejectState.bind(this)}/>,
      'isBody':true,
      'width':'80%',
      'height':'100%',
      'style':styles.modal,
      'isButton':false,
      wrapClassName:'full-screen-modal',
      'type':'form',
    };
    this.openAlert(config);

  }

  render() {
    let {selectedFolder, allImgIds, location, toggleDetailModal} = this.props;
    let {modalBox} = this.state;
    let nodeId = selectedFolder && selectedFolder.id;
    return (
        <PendingContentList
          key={nodeId}
          style={styles.lists}
          type = {'pending'}
          imgsList = {this.props.imgsList}
          selectedImgs={this.props.selectedImgs}
          folderPendingList = {this.props.folderPendingList}
          toggleImgSelection={this.props.toggleImgSelection}
          selectedFolder={this.props.selectedFolder}
          toggleDetailModal = {toggleDetailModal.bind(this)}
        />
    );
  }

  alertMsg(msg, type) {
    const config = {
      'width':400,
      'title': '提示',
      'onSubmit':false,
      'content':msg,
      'body':msg,
      'type':type,
      'okText':'确定',
      'closable':true,
    };
    this.openAlert(config);
  }

  closeAlert() {
    const alert = Object.assign(this.state.alert, { 'visible': false });
    this.setState({ 'alert': alert, 'modalBox':'' });
    this.forceUpdate();
  }

  openAlert(config) {
    const alert = Object.assign(this.state.alert, { 'visible': true }, config);
    this.setState({ 'alert': alert, 'modalBox':modal(alert)});
    this.forceUpdate();
  }
}

function mapStateToProps(state) {
  return {
    folders: state.uploads.folders,
    selectedImgs: state.check.selectedImgs,
    selectedFolder: state.uploads.selectedFolder,
    selectedUploadFiles: state.uploads.selectedUploadFiles,
    folderPendingList : state.check.folderPendingList.list,
    allImgIds : state.check.imgsList.allImgIds,
    imgsList : state.check.imgsList.imgs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFolder: (id) => dispatch(fetchFolder(id)),
    fetchFolders: () => dispatch(fetchFolders()),
    toggleImgSelection: (imgId) => dispatch(toggleImgSelection(imgId)),
    selectInvert : (selectedImgs, allImgIds) =>dispatch(selectInvert(selectedImgs, allImgIds)),
    selectAll : (selectedImgs) =>dispatch(selectAll(selectedImgs)),
    selectUploadFiles: (event) => dispatch(selectUploadFiles(Array.prototype.slice.call(event.target.files))),
    handlerImgStatus : (params) => handlerImgStatus(dispatch, params),
    getPendingList : (params)=> getPendingList(dispatch, params),
    getBetchImg : (params) => getBetchImg(dispatch, params),
  };
}
const WrappedVerificationIndex = createForm()(VerificationIndex);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedVerificationIndex);
