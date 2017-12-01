import React from 'react';
import { connect } from 'react-redux';
import {Row, Layout, Pagination} from 'antd';
const { Content } = Layout;
import {modal} from '../components/modal';
import DetailModal from './components/DetailModal';
import Thumbnail from './components/Thumbnail';

import {
  resetUserFavorite,
  selectFavarite,
  deleteFavarite,
  fetchFavarite,
  downloadVcgImgs,
  downloadDamImgs,
  unfavoriteImgsDam,
} from './actionFavorite';

const styles = {
  placeHolder: {
    margin: 'auto',
    fontWeight: 'bold',
    color: 'rgba(0,0,0,.25)',
    fontSize: '24px',
  },
  image: {
    width: '100%',
    minHeight: '180px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom',
    position: 'relative',
  },
  card: {
    width: '220px',
    margin: '8px',
    position:'relative',
  },
  sider: {
    background: '#fff',
    overflow: 'auto',
    marginRight: '1px',
  },
  content: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  search: {
    padding: '16px 16px',
    background: '#fff',
    flex: '0 0 auto',
  },
  breadcrumb: {
    margin: '12px 0',
  },
  button: {
    background: '#fff',
    padding: '16px 16px',
    flex: '1 0 auto',
  },
  lists: {
    background: '#fff',
    padding: '0 8px',
    flex: '1 1 100%',
    overflow: 'auto',
    alignContent: 'flex-start',
  },
  pagination: {
    background: '#fff',
    padding: '8px 16px',
    flex: '1 1 auto',
    textAlign: 'right',
  },
  shade: {
    position: 'absolute',
    top: '150px',
    left: 0,
    right: 0,
    color: 'white',
    fontSize: '16px',
    padding: '4px 16px',
    textAlign: 'right',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
};
class MyCollections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'modalBox':null,
      'searchParams':{
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
      initTable:false,
      showShade:false,
      pagination:{
        pageNum:1,
        pageSize:40,
      },
    };
  }
  static propTypes = {
    currentUser: React.PropTypes.object,
    filterFavarite : React.PropTypes.object,
    selectedFavarite : React.PropTypes.array,
    favariteStatus : React.PropTypes.bool,
    downStatus : React.PropTypes.bool,
    favariteImgs : React.PropTypes.object,
    resetUserFavorite: React.PropTypes.func.isRequired,
    selectFavarite: React.PropTypes.func.isRequired,
    deleteFavarite: React.PropTypes.func.isRequired,
    fetchFavarite: React.PropTypes.func.isRequired,
    downloadVcgImgs: React.PropTypes.func.isRequired,
    downloadDamImgs: React.PropTypes.func.isRequired,
    unfavoriteImgsDam: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchFavarite();
  }

  turnToPage = pageNum => this.props.fetchFavarite({pageNum});;

  render() {
    console.log('this.props.favariteImgs ==== ', this.props.favariteImgs);
    const {modalBox} = this.state;
    if(this.props.favariteImgs && this.props.favariteImgs.list &&this.props.favariteImgs.list.length>0) {
      return (
        <Layout>
          {modalBox}
          <Content style={styles.content}>
            <Row
              style={styles.lists}
              type="flex"
              justify="start"
            align="top">

              {this.props.favariteImgs && this.props.favariteImgs.list && this.props.favariteImgs.list.map(x => {
                let file={};
                if(x.detail.detailInfo) {
                  file = JSON.parse(x.detail.detailInfo);//vcg
                  file.source = 'vcg';
                  if(file.asset_family=='Creative') {
                    file.title = file.id;
                  }else {
                    file.title = x.detail.title;
                  }
                }else {//dam
                  file.id=x.detail.assetId;
                  file.title=x.basic.title;
                  file.license_type=x.basic.licenseType;
                  file.source = 'dam';
                  let oss=x.detail.oss176||x.detail.oss400||x.detail.oss800;
                  let url = oss?oss:'';
                  if (url.startsWith('https:') || url.startsWith('http:')) {
                    file.small_url=x.detail.oss176;
                  }else {
                    file.small_url=`//${x.detail.oss176}`;
                  }
                  file.asset_family=x.detail.assetFamily;
                }
                return (
                  <Thumbnail
                    key={file.id}
                    file={file}
                    unfavoriteImgsDam={this.props.unfavoriteImgsDam}
                    title={file.title}
                    deleteFavarite={this.props.deleteFavarite}
                    favariteStatus={this.props.favariteStatus}
                    downStatus={this.props.downStatus}
                    downloadVcgImgs={this.props.downloadVcgImgs}
                    selectFavarite={event => this.props.selectFavarite(file, event)}
                    selectedFavarite={this.props.selectedFavarite}
                    downloadDamImgs={this.props.downloadDamImgs}
                  />
                );
              })}
            </Row>

            <Pagination
              style={styles.pagination}
              current={this.props.filterFavarite.pageNum}
              pageSize={this.props.filterFavarite.pageSize}
              total={this.props.favariteImgs.total}
              onChange={this.turnToPage} />
          </Content>

        </Layout>
      );
    }else{
      return(
        <Row
          style={styles.lists}
        type="flex">
          <div style={styles.placeHolder}>
            您还没有收藏资源
          </div>
        </Row>
      );
    }
  }

  delCollection(params) {
    const msg = { 'title': '提示', 'body': '确定取消收藏此文件？'};
    const config = {
      'width':400,
      'title': '提示',
      'content':msg.body,
      'type':'confirm',
      'onOk':this.confirmDelCollection.bind(this, params),
      'closable':true,
    };
    this.openAlert(config);
  }

  confirmDelCollection(params) {

  }


  showDetailImgInfo(item) {
    let {basic, detail} = item;
    console.log('detail=====', detail);
    const config = {
      'width':'1700',
      'title': <small style={{'fontSize':'14px'}}>图片信息</small>,
      'body': <DetailModal basic={basic} detail={detail}/>,
      'isBody':true,
      'isButton':false,
      'type':'form',
      'style':{top: 0, paddingTop: 24},
    };
    this.openAlert(config);
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
      'onOk':null,
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
    currentUser: state.login.currentUser,
    filterFavarite : state.myFavorite.filterFavarite,
    selectedFavarite : state.myFavorite.selectedFavarite,
    favariteStatus : state.myFavorite.favariteStatus,
    downStatus : state.myFavorite.downStatus,
    favariteImgs : state.myFavorite.favariteImgs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetUserFavorite: () => dispatch(resetUserFavorite()),
    selectFavarite: (imgObj, event) => dispatch(selectFavarite(imgObj, event)),
    deleteFavarite: (ids) => dispatch(deleteFavarite(ids)),
    fetchFavarite: (data) => dispatch(fetchFavarite(data)),
    downloadVcgImgs: (ids) => dispatch(downloadVcgImgs(ids)),
    downloadDamImgs: (ids) => dispatch(downloadDamImgs(ids)),
    unfavoriteImgsDam: (ids) => dispatch(unfavoriteImgsDam(ids)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCollections);
