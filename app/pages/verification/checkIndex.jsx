import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
const { Content, Sider } = Layout;

import FolderArea from './components/VerificationTree';
import SearchArea from './components/VerificationSearchArea';
import BreadCrumbArea from './components/BreadCrumbArea';
import CheckOperations from './components/CheckOperations';
import PendingContentList from './components/PendingContentList';
import {
  selectFolder,
  fetchFolders,
  selectUploadFiles,
  toggleImgSelection,
  selectInvert,
  selectAll,
  handlerImgStatus,
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
  },
};

class CheckIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'imageStatus':{
        'PASSED': 'PASSED',
        'REJECTED': 'REJECTED',
        'PENDING': 'PENDING',
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
    selectFolder: React.PropTypes.func.isRequired,
    fetchFolders: React.PropTypes.func.isRequired,
    toggleImgSelection: React.PropTypes.func.isRequired,
    selectUploadFiles: React.PropTypes.func.isRequired,
    selectInvert: React.PropTypes.func.isRequired,
    handlerImgStatus: React.PropTypes.func.isRequired,
    selectAll: React.PropTypes.func.isRequired,
    selectedImgs : React.PropTypes.array,
    folderPendingList : React.PropTypes.array,
    allImgIds: React.PropTypes.array,
  }

  updateImgStatus(data) {
    const {imageStatus} = this.state;
    let params = {
      'ids': data,
      'state': imageStatus.PENDING,
    };
    this.props.handlerImgStatus(params);
  }

  render() {
    let {selectedFolder, allImgIds} = this.props;
    let nodeId = selectedFolder && selectedFolder.id;
    return (
      <Layout>

        <Sider style={styles.sider}>
          <FolderArea
            folders={this.props.folders}
            selectedFolder={this.props.selectedFolder}
            fetchFolder={this.props.selectFolder}
            fetchFolders={this.props.fetchFolders}/>
        </Sider>

        <Content style={styles.content}>
          <SearchArea
            style={styles.search}
            selectedFolder={this.props.selectedFolder} />

          <BreadCrumbArea
            style={styles.breadcrumb}
            selectedFolder={this.props.selectedFolder} />

          <CheckOperations
            style={styles.button}
            folderPendingList = {this.props.folderPendingList}
            selectedImgs={this.props.selectedImgs}
            selectAll = {this.props.selectAll}
            selectInvert = {this.props.selectInvert}
            handlerImgStatus = {this.updateImgStatus.bind(this)}
            allImgIds = {allImgIds}
          />

          <PendingContentList
            key={nodeId}
            style={styles.lists}
            selectedImgs={this.props.selectedImgs}
            folderPendingList = {this.props.folderPendingList}
            toggleImgSelection={this.props.toggleImgSelection}
            selectedFolder={this.props.selectedFolder}
          />
        </Content>

      </Layout>
    );
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectFolder: (id) => selectFolder(dispatch, id),
    fetchFolders: () => dispatch(fetchFolders()),
    toggleImgSelection: (imgId) => dispatch(toggleImgSelection(imgId)),
    selectInvert : (selectedImgs, allImgIds) =>dispatch(selectInvert(selectedImgs, allImgIds)),
    selectAll : (selectedImgs) =>dispatch(selectAll(selectedImgs)),
    selectUploadFiles: (event) => dispatch(selectUploadFiles(Array.prototype.slice.call(event.target.files))),
    handlerImgStatus : (params) => handlerImgStatus(dispatch, params),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckIndex);
