import React from 'react';
import { Layout, Menu } from 'antd';
import ContractInfo from './components/ContractInfo';
import ImageManage from './components/ImageManage';
import { connect } from 'react-redux';

import {
  fetchContractInfo,
  fetchDownLoadLog,
  showModal,
  hideModal,
  purChase,
  downloadVcgImgs,
  fetchContractInfoMM,
  fetchDownLoadLogDam,
  fetchAllUsrs,
  fetchDownCount,
} from './action';

const { Content, Sider } = Layout;

class Contract extends React.Component {
  static propTypes = {
    fetchContractInfo: React.PropTypes.func,
    fetchedContractInfo: React.PropTypes.object,
    fetchDownLoadLog: React.PropTypes.func,
    downloadLog: React.PropTypes.object,
    filterDownLoad: React.PropTypes.object,
    isshowModal: React.PropTypes.bool,
    showModal: React.PropTypes.func,
    hideModal: React.PropTypes.func,
    purChase: React.PropTypes.func,
    fetchDownLoadLogDam: React.PropTypes.func,
    currentUser: React.PropTypes.object,
    downStatus: React.PropTypes.bool,
    downloadVcgImgs: React.PropTypes.func,
    downloadLogDam: React.PropTypes.object,
    fetchContractInfoMM: React.PropTypes.func,
    contractInfoMM: React.PropTypes.object,
    fetchAllUsrs: React.PropTypes.func,
    allUserList: React.PropTypes.array,
    fetchDownCount: React.PropTypes.func,
    downcount: React.PropTypes.object,
    purChaseStatus: React.PropTypes.bool,
  }

  state = {
    itemKey: 1,
    seeContract: this.props.currentUser.permissions.indexOf('contract_manager') > -1 ? true : false,
    seeAssets: this.props.currentUser.permissions.indexOf('used_assets_manager') > -1 ? true : false,
  }

  onSelect = (obj) => {
    console.log('obj ========= ', obj);
    this.setState({itemKey: obj.key});
  }

  renderInfo = () => {
    let seeContract = this.state.seeContract;
    let seeAssets = this.state.seeAssets;
    let seeBoth = seeContract && seeAssets;

    if(seeContract && !seeAssets) {
      return(
        <ContractInfo
          fetchContractInfo={this.props.fetchContractInfo}
          fetchedContractInfo={this.props.fetchedContractInfo}
          contractInfoMM={this.props.contractInfoMM}
          fetchDownCount={this.props.fetchDownCount}
          downcount={this.props.downcount}
          fetchContractInfoMM={this.props.fetchContractInfoMM}
        />
      );
    } else if(!seeContract && seeAssets) {
      return(
        <ImageManage
          fetchDownLoadLog={this.props.fetchDownLoadLog}
          purChase={this.props.purChase}
          downloadLog={this.props.downloadLog}
          filterDownLoad={this.props.filterDownLoad}
          isshowModal={this.props.isshowModal}
          showModal={this.props.showModal}
          hideModal={this.props.hideModal}
          currentUser={this.props.currentUser}
          downStatus={this.props.downStatus}
          downloadVcgImgs={this.props.downloadVcgImgs}
          downloadLogDam={this.props.downloadLogDam}
          fetchContractInfoMM={this.props.fetchContractInfoMM}
          fetchDownCount={this.props.fetchDownCount}
          downcount={this.props.downcount}
          contractInfoMM={this.props.contractInfoMM}
          fetchDownLoadLogDam={this.props.fetchDownLoadLogDam}
          fetchAllUsrs={this.props.fetchAllUsrs}
          allUserList={this.props.allUserList}
          purChaseStatus={this.props.purChaseStatus}
        />
      );
    } else if(seeBoth) {
      return(
          this.state.itemKey == 1 ? <ContractInfo
            fetchContractInfo={this.props.fetchContractInfo}
            fetchedContractInfo={this.props.fetchedContractInfo}
            contractInfoMM={this.props.contractInfoMM}
            fetchDownCount={this.props.fetchDownCount}
            downcount={this.props.downcount}
            fetchContractInfoMM={this.props.fetchContractInfoMM}
                                    /> : <ImageManage
                                      fetchDownLoadLog={this.props.fetchDownLoadLog}
                                      purChase={this.props.purChase}
                                      downloadLog={this.props.downloadLog}
                                      filterDownLoad={this.props.filterDownLoad}
                                      isshowModal={this.props.isshowModal}
                                      showModal={this.props.showModal}
                                      hideModal={this.props.hideModal}
                                      currentUser={this.props.currentUser}
                                      downStatus={this.props.downStatus}
                                      downloadVcgImgs={this.props.downloadVcgImgs}
                                      downloadLogDam={this.props.downloadLogDam}
                                      fetchDownCount={this.props.fetchDownCount}
                                      downcount={this.props.downcount}
                                      fetchContractInfoMM={this.props.fetchContractInfoMM}
                                      contractInfoMM={this.props.contractInfoMM}
                                      fetchDownLoadLogDam={this.props.fetchDownLoadLogDam}
                                      fetchAllUsrs={this.props.fetchAllUsrs}
                                      allUserList={this.props.allUserList}
                                      purChaseStatus={this.props.purChaseStatus}
                                         />
      );
    }
  }

  render = () => {
    let seeContract = this.state.seeContract;
    let seeAssets = this.state.seeAssets;
    let seeBoth = seeContract && seeAssets;

    return(
      <div style={{backgroundColor:'#fff'}}>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
          >
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={seeBoth ? ['1'] : []}
              onSelect={this.onSelect}
            >

              {seeContract ? <Menu.Item key="1">
                <span className="nav-text">{'合同信息'}</span>
              </Menu.Item> : ''}
              {seeAssets ? <Menu.Item key="2">
                <span className="nav-text">{'资产管理'}</span>
              </Menu.Item> : ''}

            </Menu>
          </Sider>

          <Layout style={{backgroundColor:'#fff'}}>
            <Content style={{width:'98%', marginLeft:'1%'}}>
              {this.renderInfo()}
            </Content>
          </Layout>

        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetchedContractInfo: state.contractInfo.fetchedContractInfo,
    downloadLog: state.contractInfo.downloadLog,
    filterDownLoad: state.contractInfo.filterDownLoad,
    isshowModal:state.contractInfo.isshowModal,
    currentUser:state.login.currentUser,
    downStatus: state.contractInfo.downStatus,
    downloadLogDam: state.contractInfo.downloadLogDam,
    contractInfoMM: state.contractInfo.contractInfoMM,
    allUserList: state.contractInfo.allUserList,
    downcount: state.contractInfo.downcount,
    purChaseStatus: state.contractInfo.purChaseStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchContractInfo: () => dispatch(fetchContractInfo()),
    fetchDownLoadLog: (data) => dispatch(fetchDownLoadLog(data)),
    showModal: () => dispatch(showModal()),
    hideModal: () => dispatch(hideModal()),
    purChase: (param) => dispatch(purChase(param)),
    downloadVcgImgs: (ids, rfVcgids, damIds) => dispatch(downloadVcgImgs(ids, rfVcgids, damIds)),
    fetchContractInfoMM: () => dispatch(fetchContractInfoMM()),
    fetchDownLoadLogDam: (data) => dispatch(fetchDownLoadLogDam(data)),
    fetchAllUsrs: () => dispatch(fetchAllUsrs()),
    fetchDownCount: () => dispatch(fetchDownCount()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contract);
