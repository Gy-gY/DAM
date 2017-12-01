import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';

import FolderArea from './components/FolderArea';
import ContentArea from './components/ContentArea';
import DetailModal from './components/DetailModal';
import OperationArea from './components/OperationArea';
import PaginationArea from './components/PaginationArea';
import FolderTrees from './components/FolderTrees';
import {
  fetchFolder_audit,
  fetchFolders,
  selectAllFiles_audit,
  reviewFiles_audit,
  toggleDetailModal_audit,
  selectUploadFiles_audit,
  toggleFileSelection_audit,
  reversFileSelection_audit,
  offLineFiles_audit,
  edit_file_audit,
  switchTable_audit,
  toggleDetailModal_single_audit,
  reviewFiles_single__audit,
  showTree_audit,
  hideTree_audit,
  moveAssets_audit,
  copyAssets_audit,
  arrowFile,
  showFileModal_audit,
  hideFileModal_audit,
  changeAlbumInfo_audit,
  clearAlbumInfo_audit,
  submitNewAlbum_audit,
  recordCurSelectedAlbum_audit,
  getAlbumInfo_audit,
  updateAlbum_audit,
  getAlbumsByFolderId,
  clearAlbumList,
} from 'actions';


const styles = {
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
    flex: '0 0 auto',
    textAlign: 'right',
  },
};

class audit extends React.Component {

  static propTypes = {
    folders: React.PropTypes.array,
    detailModal_audit: React.PropTypes.object,
    reviewFiles_audit: React.PropTypes.func.isRequired,
    fetchFolder_audit: React.PropTypes.func.isRequired,
    fetchFolders: React.PropTypes.func.isRequired,
    offLineFiles_audit: React.PropTypes.func.isRequired,
    selectedFiles: React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
    filter: React.PropTypes.object,
    edit_file_audit: React.PropTypes.func.isRequired,
    selectAllFiles_audit: React.PropTypes.func.isRequired,
    toggleDetailModal_audit: React.PropTypes.func.isRequired,
    selectUploadFiles_audit: React.PropTypes.func.isRequired,
    toggleFileSelection_audit: React.PropTypes.func.isRequired,
    toggleDetailModal_single_audit: React.PropTypes.func.isRequired,
    reversFileSelection_audit: React.PropTypes.func.isRequired,
    permissions: React.PropTypes.array,
    switchTable_audit: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object,
    showTable: React.PropTypes.bool.isRequired,
    reviewFiles_single__audit: React.PropTypes.func.isRequired,
    showTree_audit: React.PropTypes.func.isRequired,
    hideTree_audit: React.PropTypes.func.isRequired,
    isShowTree: React.PropTypes.object.isRequired,
    moveAssets_audit: React.PropTypes.func.isRequired,
    copyAssets_audit: React.PropTypes.func.isRequired,
    arrowFile: React.PropTypes.func,
    currentFile: React.PropTypes.object,
    showFileModal_audit: React.PropTypes.func,
    fileModalInfo: React.PropTypes.object,
    hideFileModal_audit: React.PropTypes.func,
    changeAlbumInfo_audit: React.PropTypes.func,
    albumInfo: React.PropTypes.object,
    clearAlbumInfo_audit: React.PropTypes.func,
    submitNewAlbum_audit: React.PropTypes.func,
    retAlbumInfo: React.PropTypes.object,
    curSelectedAlbum: React.PropTypes.object,
    recordCurSelectedAlbum_audit: React.PropTypes.func,
    getAlbumInfo_audit: React.PropTypes.func,
    updateAlbum_audit: React.PropTypes.func,
    filter_album: React.PropTypes.object,
    displayMode: React.PropTypes.string,
    currentAlbumJson: React.PropTypes.object,
    getAlbumsByFolderId: React.PropTypes.func,
    albums: React.PropTypes.object,
    clearAlbumList: React.PropTypes.func,
    MCBtnStatus: React.PropTypes.bool,
  }

  render() {
    let {
      folders,
      detailModal_audit,
      currentUser,
      reviewFiles_audit,
      fetchFolder_audit,
      switchTable_audit,
      fetchFolders,
      edit_file_audit,
      offLineFiles_audit,
      selectedFiles,
      showTable,
      reviewFiles_single__audit,
      toggleDetailModal_single_audit,
      selectedFolder,
      selectAllFiles_audit,
      filter,
      moveAssets_audit,
      copyAssets_audit,
      toggleDetailModal_audit,
      selectUploadFiles_audit,
      toggleFileSelection_audit,
      reversFileSelection_audit,
      arrowFile,
      currentFile,
      showFileModal_audit,
      fileModalInfo,
      hideFileModal_audit,
      changeAlbumInfo_audit,
      albumInfo,
      clearAlbumInfo_audit,
      submitNewAlbum_audit,
      curSelectedAlbum,
      recordCurSelectedAlbum_audit,
      getAlbumInfo_audit,
      updateAlbum_audit,
      filter_album,
      displayMode,
      getAlbumsByFolderId,
      albums,
      clearAlbumList,
      currentAlbumJson,
      MCBtnStatus,
    } = this.props;
    let vcgFolderId = folders.find(x => x.parentId == -1 && x.id != 1) ? folders.find(x => x.parentId == -1 && x.id != 1).id : 0;
    return (
      <Layout>

        <Layout.Sider style={styles.sider}>
          <FolderArea
            folders={folders}
            selectedFolder={selectedFolder}
            fetchFolder={fetchFolder_audit}
            fetchFolders={fetchFolders}
          />
        </Layout.Sider>

        <Layout.Content style={styles.content}>

          <OperationArea
            style={styles.button}
            switchTable_audit={switchTable_audit}
            offLineFiles_audit={offLineFiles_audit}
            reviewFiles_audit={reviewFiles_audit}
            selectedFiles={selectedFiles}
            selectedFolder={selectedFolder}
            vcgFolderId={vcgFolderId}
            showTable={showTable}
            filter={filter}
            albums={albums}
            showTree_audit={this.props.showTree_audit}
            toggleDetailModal={toggleDetailModal_audit}
            fetchFolder_audit={fetchFolder_audit}
            selectAllFiles={selectAllFiles_audit}
            selectUploadFiles={selectUploadFiles_audit}
            reversFileSelection={reversFileSelection_audit}
            folders={folders}
            fetchFolder={fetchFolder_audit}
            currentUser={currentUser}
            showFileModal_audit={showFileModal_audit}
            fileModalInfo={fileModalInfo}
            hideFileModal_audit={hideFileModal_audit}
            changeAlbumInfo_audit={changeAlbumInfo_audit}
            albumInfo={albumInfo}
            clearAlbumInfo_audit={clearAlbumInfo_audit}
            submitNewAlbum_audit={submitNewAlbum_audit}
            curSelectedAlbum={curSelectedAlbum}
            recordCurSelectedAlbum_audit={recordCurSelectedAlbum_audit}
            getAlbumInfo_audit={getAlbumInfo_audit}
            updateAlbum_audit={updateAlbum_audit}
            displayMode={displayMode}
            filter_album={filter_album}
            getAlbumsByFolderId={getAlbumsByFolderId}
          />

          <ContentArea
            isLoading={selectedFolder.isUpdating}
            showTable={showTable}
            style={styles.lists}
            filter={filter}
            edit_file_audit={edit_file_audit}
            reviewFiles_single__audit={reviewFiles_single__audit}
            offLineFiles_audit={offLineFiles_audit}
            toggleFileSelection={toggleFileSelection_audit}
            selectedFiles={selectedFiles}
            toggleDetailModal_audit={toggleDetailModal_audit}
            toggleDetailModal_single_audit={toggleDetailModal_single_audit}
            selectedFolder={selectedFolder}
            selectAllFiles={selectAllFiles_audit}
            arrowFile={arrowFile}
            filter_album={filter_album}
            fetchFolder_audit={fetchFolder_audit}
            reversFileSelection={reversFileSelection_audit}
            recordCurSelectedAlbum_audit={recordCurSelectedAlbum_audit}
          />

          <PaginationArea
            style={styles.pagination}
            selectedFolder={selectedFolder}
            fetchFolder={fetchFolder_audit}
            displayMode={displayMode}
            curSelectedAlbum={curSelectedAlbum}
            currentAlbumJson={currentAlbumJson}
          />

          <DetailModal
            {...detailModal_audit}
            edit_file_audit={edit_file_audit}
            offLineFiles_audit={offLineFiles_audit}
            reviewFiles_audit={reviewFiles_audit}
            toggleDetailModal_audit={toggleDetailModal_audit}
            selectedFolder={selectedFolder}
            currentUser={currentUser}
            arrowFile={arrowFile}
            showTable={showTable}
            currentFile={currentFile}
            selectedFiles={selectedFiles}
          />

          {this.props.isShowTree.show && <FolderTrees
            folders={folders}
            vcgFolderId={vcgFolderId}
            selectedFolder={selectedFolder}
            moveAssets_audit={moveAssets_audit}
            copyAssets_audit={copyAssets_audit}
            hideTree_audit={this.props.hideTree_audit}
            isShowTree={this.props.isShowTree}
            fetchFolders={fetchFolders}
            getAlbumsByFolderId={getAlbumsByFolderId}
            albums={albums}
            displayMode={displayMode}
            selectedFiles={selectedFiles}
            clearAlbumList={clearAlbumList}
            curSelectedAlbum={curSelectedAlbum}
            MCBtnStatus={MCBtnStatus}
                                         />}
        </Layout.Content>

      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    folders: state.audit.folders,
    detailModal_audit: state.audit.detailModal_audit,
    selectedFiles: state.audit.selectedFiles,
    filter: state.audit.filter,
    selectedFolder: state.audit.selectedFolder,
    showTable: state.audit.showTable,
    currentUser: state.login.currentUser,
    isShowTree: state.audit.isShowTree,
    permissions: state.login.currentUser.permissions,
    currentFile: state.audit.currentFile,
    fileModalInfo: state.audit.fileModalInfo,
    albumInfo: state.audit.albumInfo,
    retAlbumInfo: state.audit.retAlbumInfo,
    curSelectedAlbum: state.audit.curSelectedAlbum,
    filter_album: state.audit.filter_album,
    displayMode: state.audit.displayMode,
    currentAlbumJson: state.audit.currentAlbumJson,
    albums: state.audit.albums,
    MCBtnStatus: state.audit.MCBtnStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    offLineFiles_audit: (record) => dispatch(offLineFiles_audit(record)),
    reviewFiles_single__audit: (pass, record) => dispatch(reviewFiles_single__audit(pass, record)),
    switchTable_audit: (data) => dispatch(switchTable_audit(data)),
    fetchFolder_audit: (data, filterChenged) => dispatch(fetchFolder_audit(data, filterChenged)),
    fetchFolders: (type, parentId) => dispatch(fetchFolders(type, parentId)),
    edit_file_audit: (file, datas) => dispatch(edit_file_audit(file, datas)),
    reviewFiles_audit: (pass, params, single) => dispatch(reviewFiles_audit(pass, params, single)),
    selectAllFiles_audit: () => dispatch(selectAllFiles_audit()),
    toggleDetailModal_audit: () => dispatch(toggleDetailModal_audit()),
    toggleDetailModal_single_audit: (file) => dispatch(toggleDetailModal_single_audit(file)),
    selectUploadFiles_audit: (event) => dispatch(selectUploadFiles_audit(Array.prototype.slice.call(event.target.files))),
    toggleFileSelection_audit: (file, event) => dispatch(toggleFileSelection_audit(file, event)),
    reversFileSelection_audit: () => dispatch(reversFileSelection_audit()),
    showTree_audit: (type) => dispatch(showTree_audit(type)),
    hideTree_audit: () => dispatch(hideTree_audit()),
    moveAssets_audit: (currentId, targetId, sourceGroupId, targetGroupId) => dispatch(moveAssets_audit(currentId, targetId, sourceGroupId, targetGroupId)),
    copyAssets_audit: (currentId, targetId, targetGroupId) => dispatch(copyAssets_audit(currentId, targetId, targetGroupId)),
    arrowFile: (file) => dispatch(arrowFile(file)),
    showFileModal_audit: (isNew) => dispatch(showFileModal_audit(isNew)),
    hideFileModal_audit: () => dispatch(hideFileModal_audit()),
    changeAlbumInfo_audit: (key, value) => dispatch(changeAlbumInfo_audit(key, value)),
    clearAlbumInfo_audit: () => dispatch(clearAlbumInfo_audit()),
    submitNewAlbum_audit: (folderId, params) => dispatch(submitNewAlbum_audit(folderId, params)),
    recordCurSelectedAlbum_audit: (album) => dispatch(recordCurSelectedAlbum_audit(album)),
    getAlbumInfo_audit: () => dispatch(getAlbumInfo_audit()),
    updateAlbum_audit: (params) => dispatch(updateAlbum_audit(params)),
    getAlbumsByFolderId: (folderId) => dispatch(getAlbumsByFolderId(folderId)),
    clearAlbumList: () => dispatch(clearAlbumList()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(audit);
