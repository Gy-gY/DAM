import React from 'react';
import { Layout, Spin } from 'antd';
import { connect } from 'react-redux';
import Search from './components/Search';
import ImgList from './components/imgList';
import {vcgSearch, changeKeyword, deleteFavarite, addFavariteForList, selectImg_search, addFavarite, selectAll, reversSelection, showModal, hideModal, downloadVcgImgs, fetchFavarite, selectFavarite} from './action';
import PaginationArea from './components/PaginationArea';
import OperationArea from './components/OperationArea';
import PicDetailModal from './components/PicDetailList';
import Favarite from './components/Favarite';


class VisualChina extends React.Component {

  static propTypes = {
    vcgImages: React.PropTypes.object.isRequired,
    filter: React.PropTypes.object.isRequired,
    vcgSearch: React.PropTypes.func.isRequired,
    selectImg_search: React.PropTypes.func.isRequired,
    selectedFiles: React.PropTypes.array,
    addFavarite: React.PropTypes.func.isRequired,
    selectAll: React.PropTypes.func.isRequired,
    reversSelection: React.PropTypes.func.isRequired,
    showModal: React.PropTypes.func.isRequired,
    hideModal: React.PropTypes.func.isRequired,
    toggleModal: React.PropTypes.bool.isRequired,
    downloadVcgImgs: React.PropTypes.func.isRequired,
    downStatus: React.PropTypes.bool.isRequired,
    favariteStatus: React.PropTypes.bool.isRequired,
    fetchFavarite: React.PropTypes.func.isRequired,
    favariteImgs: React.PropTypes.object.isRequired,
    filterFavarite: React.PropTypes.object.isRequired,
    selectFavarite: React.PropTypes.func.isRequired,
    selectedFavarite: React.PropTypes.array,
    addFavariteForList: React.PropTypes.func.isRequired,
    deleteFavarite: React.PropTypes.func.isRequired,
    changeKeyword: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object.isRequired,
  }
  styles = {
    loadingC:{
      height:'100%',
      zIndex:5,
      width:'100%',
      position:'absolute',
      backgroundColor:'black',
      opacity:0.5,
    },
    loading:{
      zIndex:11,
      margin:'auto',
      left:'50%',
      marginLeft:-22,
      top:'50%',
      position:'absolute',
    },
    content: {
      display: 'flex',
      flexFlow: 'column nowrap',
    },
    button: {
      background: '#fff',
      padding: '0px 16px',
      flex: '0 0 auto',
    },
    lists: {
      background: '#fff',
      padding: '0 8px',
      flex: '1 1 auto',
      overflow: 'auto',
      alignContent: 'flex-start',
    },
    pagination: {
      background: '#fff',
      padding: '8px 16px',
      flex: '1 1 auto',
      textAlign: 'right',
    },
  };
  renderCon = ()=>{
    let styleList = this.styles.lists;
    let vcgImages = this.props.vcgImages;
    let spin = '';
    if(vcgImages.isLoading) {
      spin=<div><div style={this.styles.loadingC}></div><div style={this.styles.loading}><Spin size='large'/></div></div>;
    }
    if(vcgImages.first) {
      return <div style={{height:'100%', backgroundColor:'white'}}>{spin}<Search currentUser={this.props.currentUser} vcgSearch={this.props.vcgSearch}></Search></div>;
    }else {
      return (<Layout>
        {spin}
        <Favarite deleteFavarite={this.props.deleteFavarite} addFavarite={this.props.addFavarite} favariteStatus={this.props.favariteStatus} downStatus={this.props.downStatus} downloadVcgImgs={this.props.downloadVcgImgs} selectedFavarite={this.props.selectedFavarite} selectFavarite={this.props.selectFavarite} fetchFavarite={this.props.fetchFavarite} filterFavarite={this.props.filterFavarite} favariteImgs={this.props.favariteImgs}></Favarite>

          <PicDetailModal vcgSearch={this.props.vcgSearch} deleteFavarite={this.props.deleteFavarite} addFavariteForList={this.props.addFavariteForList} favariteStatus={this.props.favariteStatus}filter={this.props.filter} downStatus={this.props.downStatus} downloadVcgImgs={this.props.downloadVcgImgs} files={this.props.vcgImages.list?this.props.vcgImages.list:[]} file={this.props.selectedFiles[0]} isOpen={this.props.toggleModal} closeDetailModal={this.props.hideModal}/>
            <Layout.Header style={{backgroundColor:'white', padding:0}}>
              <OperationArea currentUser={this.props.currentUser} changeKeyword={this.props.changeKeyword} addFavariteForList={this.props.addFavariteForList} downStatus={this.props.downStatus} downloadVcgImgs={this.props.downloadVcgImgs} vcgImages={this.props.vcgImages} selectAll={this.props.selectAll} reversSelection={this.props.reversSelection} selectedFiles={this.props.selectedFiles} filter={this.props.filter} style={this.styles.button} vcgSearch={this.props.vcgSearch}></OperationArea>
              </Layout.Header>
                <Layout.Content style={{backgroundColor:'white'}}>
                  <ImgList vcgSearch={this.props.vcgSearch} filter={this.props.filter} deleteFavarite={this.props.deleteFavarite} addFavariteForList={this.props.addFavariteForList} favariteStatus={this.props.favariteStatus} downloadVcgImgs={this.props.downloadVcgImgs} downStatus={this.props.downStatus} showModal={this.props.showModal} selectedFiles={this.props.selectedFiles} selectImg_search={this.props.selectImg_search} style={styleList} vcgImages={vcgImages}></ImgList>
                  </Layout.Content>
                    <Layout.Footer style={{padding:0}}>
                      <PaginationArea filter={this.props.filter} style={this.styles.pagination} vcgSearch={this.props.vcgSearch} vcgImages={this.props.vcgImages}></PaginationArea>
                    </Layout.Footer>
                  </Layout>);
    }
  }

  render() {
    return this.renderCon();
  }
}


function mapStateToProps(state) {
  return {
    currentUser:state.login.currentUser,
    vcgImages:state.visualChina.vcgImages,
    filter:state.visualChina.filter,
    selectedFiles:state.visualChina.selectedFiles,
    toggleModal:state.visualChina.toggleModal,
    downStatus:state.visualChina.downStatus,
    favariteStatus:state.visualChina.favariteStatus,
    favariteImgs:state.visualChina.favariteImgs,
    filterFavarite:state.visualChina.filterFavarite,
    selectedFavarite: state.visualChina.selectedFavarite,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    vcgSearch: (data) => dispatch(vcgSearch(data)),
    selectImg_search: (imgObj, event) => dispatch(selectImg_search(imgObj, event)),
    selectAll: () => dispatch(selectAll()),
    reversSelection: () => dispatch(reversSelection()),
    showModal: () => dispatch(showModal()),
    hideModal: () => dispatch(hideModal()),
    downloadVcgImgs: (ids, rfVcgids) => dispatch(downloadVcgImgs(ids, rfVcgids)),
    fetchFavarite: (data) => dispatch(fetchFavarite(data)),
    selectFavarite: (img, e) => dispatch(selectFavarite(img, e)),
    addFavarite: () => dispatch(addFavarite()),
    addFavariteForList: (files) => dispatch(addFavariteForList(files)),
    deleteFavarite: (ids) => dispatch(deleteFavarite(ids)),
    changeKeyword: (key) => dispatch(changeKeyword(key)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisualChina);
