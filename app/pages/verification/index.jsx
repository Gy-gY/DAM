import React from 'react';
import { connect } from 'react-redux';
import { Layout, Form, Tabs, Button, Row} from 'antd';
const { Content, Sider } = Layout;
import FolderArea from './components/VerificationTree';
import SearchArea from './components/VerificationSearchArea';
import BreadCrumbArea from './components/BreadCrumbArea';
import VerificationOperations from './components/VerificationOperations';
import VerificationReject from './components/VerificationReject';
import VerificationImgDetail from './components/VerificationImgDetail';
import VerificationIndex from './verificationIndex';
import ImgTableList from './components/VerificationTableList';
import {modal} from '../components/modal';
const TabPane = Tabs.TabPane;
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

class Index extends React.Component {
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
      'nodeValue':[0],
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
    imgsId: React.PropTypes.array,
    location : React.PropTypes.object,
  }

  componentWillMount() {
    this.refresh();
  }

  updateImgStatus(data) {
    const {selectedImgs} = this.props;
    console.log('selectedImgs===', selectedImgs);
    const {imageStatus} = this.state;
    let params = {
      'ids': data,
      'state': imageStatus.PASSED,
    };

    // this.props.handlerImgStatus(params).then(()=>{
    //   this.alertMsg('操作成功！', 'success');
    //   let {queryParams} = this.state;
    //   console.log('queryParams===', queryParams);
    //   this.queryImgList(queryParams);
    // });
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
    this.queryImgList(queryParams);
  }

  queryImgList(queryParams) {
    this.props.getPendingList(queryParams).then(()=>{
      let imgItems = this.props.folderPendingList;
      let imgParams = [];
      if(imgItems && imgItems && imgItems.length>0) {
        imgItems.map((item)=>{
          let {id} = item;
          imgParams.push(id);
        });
      }

      this.props.getBetchImg({ids:imgParams}).then(()=>{
        console.log('imgsList===success==', this.props.imgsList);
      }).catch(()=>{
        console.error('imgsList==error===', this.props.imgsList);
      });
    });
  }

  onSelectedFolders(value) {
    this.refresh(value);
    this.setState({nodeValue:value});
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
      let {queryParams} = this.state;
      this.queryImgList(queryParams);
      this.alertMsg('操作成功！', 'success');
    }).catch(()=>{
      this.alertMsg('操作失败！', 'error');
    });
  }

  toggleDetailModal(imgFile) {
    let file = imgFile.detail||imgFile;
    const config = {
      'title': <small style={{'fontSize':'14px'}}></small>,
      'body': <VerificationImgDetail file={file} close={this.closeAlert.bind(this)} handlerSubmitReject={this.saveRejectState.bind(this)}/>,
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
    let {location} = this.props;
    let {modalBox} = this.state;
    return (
      <Layout>
        {modalBox}
        <Sider style={styles.sider}>
          <FolderArea
            folders={this.props.folders}
            selectedFolder={this.props.selectedFolder}
            onSelectedFolders = {this.onSelectedFolders.bind(this)}
            fetchFolders={this.props.fetchFolders}/>
        </Sider>

        <Content style={styles.content}>
            <SearchArea
              style={styles.search}
              selectedFolder={this.props.selectedFolder} />

            <BreadCrumbArea
              style={styles.breadcrumb}
              selectedFolder={this.props.selectedFolder} />

            <Tabs>
              <TabPane tab="图片" key="1" style={{height:'75%'}}>{this.showImgTile(location)}</TabPane>
              <TabPane tab="列表" key="2" style={{height:'75%'}}>{this.showImgList(location)}</TabPane>
            </Tabs>
        </Content>
      </Layout>

    );
  }

  showImgTile(location) {
    let {allImgIds, imgsList} = this.props;
    return (
      <span>
      <VerificationOperations
        style={styles.button}
        folderPendingList = {this.props.folderPendingList}
        selectedImgs={this.props.selectedImgs}
        selectAll = {this.props.selectAll}
        selectInvert = {this.props.selectInvert}
        location = {location}
        type = {'pending'}
        key={location.pathname}
        allImgIds = {allImgIds}
        imgsList = {imgsList}
        handlerImgStatus = {this.updateImgStatus.bind(this)}
        handlerRejactAction = {this.handlerRejactAction.bind(this)}
      />
      <VerificationIndex location={location} toggleDetailModal={this.toggleDetailModal.bind(this)}/>
    </span>
    );
  }

  showImgList() {
    let {selectedFolder, location} = this.props;
    let {pathname} = location;
    let {imgsList} = this.props;
    let dataSource = [];
    let buttonStyle = {
      background: '#fff',
      padding: '16px 32px',
      flex: '1 0 auto',
      marginLeft:'80%',
    };
    imgsList.map((item)=>{
      let {basic, detail} = item;
      dataSource.push({
        'id':basic.id,
        'url':detail.oss176,
        'oss800':detail.oss800,
        'providerId':detail.providerId,
        'createdTime':basic.createdTime,
        'she':'lll',
        'sheDate':'2017-04-27',
        'reviewState':basic.reviewState,
      });
    });
    //待审核页面：'审核通过'显示、'驳回'显示
    //审核通过页面：'审核通过'不显示、'驳回'显示
    //审核驳回页面：'审核通过'显示、'驳回'不显示
    let btnPassStyle = false, btnRejectStyle = false;
    if(pathname.indexOf('pending_list')>-1) {
      btnPassStyle = false;
      btnRejectStyle = false;
    }else if(pathname.indexOf('passed_list')>-1) {
      btnPassStyle = true;
      btnRejectStyle = false;
    }else if(pathname.indexOf('reject_list')>-1) {
      btnPassStyle = false;
      btnRejectStyle = true;
    }
    console.log('this.props===', this.props);
    return (
      <div style={{backgroundColor:'rgb(255,255,255)', overflow:'hidden'}}>
        <Row style={buttonStyle} type="flex" justify="space-between">
        <div>
          <Button
            type="primary"
            style={{ margin: '0 8px' }}
            disabled={this.props.imgsId.length==0 || btnPassStyle}
            onClick={this.updateImgStatus.bind(this, this.props.imgsId)}
            >
            审核通过
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: '8px' }}
            disabled={this.props.imgsId.length==0 || btnRejectStyle}
            onClick = {this.handlerRejactAction.bind(this, this.props.imgsId)}
            >
            审核驳回
          </Button>
        </div>
      </Row>
        <ImgTableList dataSource = {dataSource} location={location} selectedFolder={selectedFolder} toggleDetailModal={this.toggleDetailModal.bind(this)}/>
      </div>
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
    imgsId : state.check.selectedImgRow.imgsId||[],
    imgDetailItems : state.check.imgsDetailList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFolder: (id) => dispatch(fetchFolder(id)),
    fetchFolders: () => dispatch(fetchFolders()),
    toggleImgSelection: (imgId, imgItem) => dispatch(toggleImgSelection(imgId, imgItem)),
    selectInvert : (selectedImgs, allImgIds) =>dispatch(selectInvert(selectedImgs, allImgIds)),
    selectAll : (selectedImgs, imgsList) =>dispatch(selectAll(selectedImgs, imgsList)),
    selectUploadFiles: (event) => dispatch(selectUploadFiles(Array.prototype.slice.call(event.target.files))),
    handlerImgStatus : (params) => handlerImgStatus(dispatch, params),
    getPendingList : (params)=> getPendingList(dispatch, params),
    getBetchImg : (params) => getBetchImg(dispatch, params),
  };
}
const WrappedIndex = createForm()(Index);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedIndex);
