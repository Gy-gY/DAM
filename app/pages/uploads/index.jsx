import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';

import FolderArea from './components/FolderArea';
import ContentArea from './components/ContentArea';
import DetailModal from './components/DetailModal';
import OperationArea from './components/OperationArea';
import PaginationArea from './components/PaginationArea';
import FolderTrees from './components/FolderTrees';
import InStockConfirm from './components/InStockConfirm';

import {
  uploadFile,
  aLiYunAfterUploadFile,
  deleteFile,
  fetchFolder,
  fetchFolders,
  selectAllFiles,
  updateFiles,
  inStockFiles,
  toggleDetailModal,
  selectUploadFiles,
  toggleFileSelection,
  reversFileSelection,
  showTree_upload,
  hideTree_upload,
  moveAssets_upload,
  copyAssets_upload,
  getALiYunParams,
  deleteUploadFile,
  showFileModal,
  hideFileModal,
  changeAlbumInfo,
  clearAlbumInfo,
  submitNewAlbum,
  openAlbum,
  recordCurSelectedAlbum,
  updateAlbum,
  getAlbumInfo,
  changeAlbumFilterType,
  getAlbumsInUpload,
  toggleInstockConfirm,
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
    flex: '1 1 100%',
    overflow: 'auto',
    alignContent: 'flex-start',
  },
  pagination: {
    background: '#fff',
    padding: '8px 16px',
    textAlign: 'right',
  },
};

class Uploads extends React.Component {

  static propTypes = {
    folders: React.PropTypes.array,
    detailModal: React.PropTypes.object,
    uploadFile: React.PropTypes.func.isRequired,
    aLiYunAfterUploadFile: React.PropTypes.func.isRequired,
    deleteFile: React.PropTypes.func.isRequired,
    inStockFiles: React.PropTypes.func.isRequired,
    fetchFolder: React.PropTypes.func.isRequired,
    fetchFolders: React.PropTypes.func.isRequired,
    updateFiles: React.PropTypes.func.isRequired,
    selectedFiles: React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
    selectAllFiles: React.PropTypes.func.isRequired,
    toggleDetailModal: React.PropTypes.func.isRequired,
    selectUploadFiles: React.PropTypes.func.isRequired,
    toggleFileSelection: React.PropTypes.func.isRequired,
    reversFileSelection: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object,
    showTree_upload: React.PropTypes.func.isRequired,
    hideTree_upload: React.PropTypes.func.isRequired,
    isShowTree_upload: React.PropTypes.object.isRequired,
    moveAssets_upload: React.PropTypes.func.isRequired,
    copyAssets_upload: React.PropTypes.func.isRequired,
    deleteUploadFile: React.PropTypes.func.isRequired,
    getDownList: React.PropTypes.func,
    downList: React.PropTypes.object,
    getALiYunParams: React.PropTypes.func,
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
    currentAlbumJson: React.PropTypes.object,
    changeAlbumFilterType: React.PropTypes.func,
    albumAssetType: React.PropTypes.string,

    getAlbumsInUpload: React.PropTypes.func,
    albums: React.PropTypes.array,
    toggleInstockConfirm: React.PropTypes.func,
    isShowInstockConfirm: React.PropTypes.bool,
  }

  state = {
    assetType: '', // IMG, VIDEO
    pageNum: 1,
    stateFolderId: ['1'],
  }

  render() {
    let {
      folders,
      detailModal,
      uploadFile,
      aLiYunAfterUploadFile,
      deleteFile,
      inStockFiles,
      fetchFolder,
      fetchFolders,
      selectedFiles,
      selectedFolder,
      updateFiles,
      selectAllFiles,
      toggleDetailModal,
      selectUploadFiles,
      toggleFileSelection,
      reversFileSelection,
      currentUser,
      getALiYunParams,
      deleteUploadFile,
      showFileModal,
      fileModalInfo,
      hideFileModal,
      changeAlbumInfo,
      albumInfo,
      clearAlbumInfo,
      submitNewAlbum,
      openAlbum,
      displayMode,
      recordCurSelectedAlbum,
      curSelectedAlbum,
      updateAlbum,
      getAlbumInfo,
      currentAlbumJson,
      changeAlbumFilterType,
      albumAssetType,
      getAlbumsInUpload,
      albums,
      toggleInstockConfirm,
      isShowInstockConfirm,
    } = this.props;

    if (folders) { //过滤出用户有上传权限权限的目录列表
      folders = folders.filter(folder => folder.permissions && folder.permissions.includes('upload_assets'));
    }
    selectedFolder.permissions = [];
    if(folders && selectedFolder.id) {
      let find = folders.find(folder => folder.id == selectedFolder.id);
      if(find && find.permissions) {
        selectedFolder.permissions = find.permissions;
      }
    }
    const onChangeFilter = (options) => {
      console.log('options ======= ', options);
      // if (options.assetType)
      this.setState({
        assetType: options.assetType,
      });
    };
    const onSelectNode = (ids) => {
      if(ids != 1) {
        if(ids.length > 0) {
          this.setState({
            stateFolderId: ids,
          });
          fetchFolder(ids, 1, this.state.assetType, 'upload');
        }
      }
    };
    return (
      <Layout>
        <Layout.Sider style={styles.sider}>
          <FolderArea
            folders={folders}
            type='upload'
            stateFolderId={this.state.stateFolderId}
            selectedFolder={selectedFolder}
            fetchFolder={onSelectNode}
            fetchFolders={fetchFolders}
            getALiYunParams={getALiYunParams}
          />
        </Layout.Sider>

        <Layout.Content style={styles.content}>

          <OperationArea
            style={styles.button}
            selectedFiles={selectedFiles}
            selectedFolder={selectedFolder}
            toggleDetailModal={toggleDetailModal}
            deleteFile={deleteFile}
            inStockFiles={inStockFiles}
            showTree_upload={this.props.showTree_upload}
            selectAllFiles={selectAllFiles}
            selectUploadFiles={selectUploadFiles}
            reversFileSelection={reversFileSelection}
            onChangeFilter={onChangeFilter}
            assetType={this.state.assetType}
            fetchFolder={fetchFolder}
            currentUser={currentUser}
            uploadFile={uploadFile}
            aLiYunAfterUploadFile={aLiYunAfterUploadFile}
            getALiYunParams={getALiYunParams}
            folders={folders}
            showFileModal={showFileModal}
            deleteUploadFile={deleteUploadFile}
            fileModalInfo={fileModalInfo}
            hideFileModal={hideFileModal}
            changeAlbumInfo={changeAlbumInfo}
            albumInfo={albumInfo}
            clearAlbumInfo={clearAlbumInfo}
            submitNewAlbum={submitNewAlbum}
            openAlbum={openAlbum}
            displayMode={displayMode}
            recordCurSelectedAlbum={recordCurSelectedAlbum}
            curSelectedAlbum={curSelectedAlbum}
            updateAlbum={updateAlbum}
            getAlbumInfo={getAlbumInfo}
            changeAlbumFilterType={changeAlbumFilterType}
            albumAssetType={albumAssetType}
            getAlbumsInUpload={getAlbumsInUpload}
            albums={albums}
            toggleInstockConfirm={toggleInstockConfirm}
          />

          <ContentArea
            isLoading={selectedFolder.isUpdating}
            style={styles.lists}
            toggleFileSelection={toggleFileSelection}
            toggleDetailModal={toggleDetailModal}
            selectedFiles={selectedFiles}
            selectedFolder={selectedFolder}
            uploadFile={uploadFile}
            openAlbum={openAlbum}
            fetchFolder={fetchFolder}
            assetType={this.state.assetType}
            displayMode={displayMode}
            recordCurSelectedAlbum={recordCurSelectedAlbum}
            curSelectedAlbum={curSelectedAlbum}
            changeAlbumFilterType={changeAlbumFilterType}
          />

          <PaginationArea
            style={styles.pagination}
            selectedFolder={selectedFolder}
            onChangeFilter={onChangeFilter}
            assetType={this.state.assetType}
            fetchFolder={fetchFolder}
            displayMode={displayMode}
            curSelectedAlbum={curSelectedAlbum}
            currentAlbumJson={currentAlbumJson}
          />

          <DetailModal
            {...detailModal}
            updateFiles={updateFiles}
            deleteFiles={deleteFile}
            commitFiles={inStockFiles}
            closeDetailModal={toggleDetailModal}
            selectedFolder={selectedFolder}
            currentUser={currentUser}
            toggleFileSelection={toggleFileSelection}
            selectedFiles={selectedFiles}
          />

          <FolderTrees
            folders={folders}
            selectedFolder={selectedFolder}
            moveAssets_upload={this.props.moveAssets_upload}
            copyAssets_upload={this.props.copyAssets_upload}
            hideTree_upload={this.props.hideTree_upload}
            isShowTree={this.props.isShowTree_upload}
            fetchFolders={fetchFolders}
          />

          <InStockConfirm
            albums={albums}
            selectedFolder={selectedFolder}
            selectedFiles={selectedFiles}
            inStockFiles={inStockFiles}
            toggleInstockConfirm={toggleInstockConfirm}
            isShowInstockConfirm={isShowInstockConfirm}
            showFileModal={showFileModal}
          />

        </Layout.Content>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    folders: state.uploads.folders,
    detailModal: state.uploads.detailModal,
    selectedFiles: state.uploads.selectedFiles,
    selectedFolder: state.uploads.selectedFolder,
    currentUser: state.login.currentUser,
    isShowTree_upload: state.uploads.isShowTree_upload,
    fileModalInfo: state.uploads.fileModalInfo,
    albumInfo: state.uploads.albumInfo,
    displayMode: state.uploads.displayMode,
    curSelectedAlbum: state.uploads.curSelectedAlbum,
    currentAlbumJson: state.uploads.currentAlbumJson,
    albumAssetType: state.uploads.albumAssetType,
    albums: state.uploads.albums,
    isShowInstockConfirm: state.uploads.isShowInstockConfirm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    uploadFile: (file, groupId) => dispatch(uploadFile(file, groupId)),
    aLiYunAfterUploadFile: (params, groupId) => dispatch(aLiYunAfterUploadFile(params, groupId)),
    deleteFile: () => dispatch(deleteFile()),
    fetchFolder: (id, pageNum, assetType, filterChanged, groupId) => dispatch(fetchFolder(id, pageNum, assetType, filterChanged, groupId)),
    fetchFolders: (type, parentId) => dispatch(fetchFolders(type, parentId)),
    updateFiles: (values, single) => dispatch(updateFiles(values, single)),
    inStockFiles: (isSingle, params, groupId) => dispatch(inStockFiles(isSingle, params, groupId)),
    selectAllFiles: () => dispatch(selectAllFiles()),
    toggleDetailModal: () => dispatch(toggleDetailModal()),
    selectUploadFiles: (event) => dispatch(selectUploadFiles(Array.prototype.slice.call(event.target.files))),
    toggleFileSelection: (fileId, event) => dispatch(toggleFileSelection(fileId, event)),
    reversFileSelection: () => dispatch(reversFileSelection()),
    showTree_upload: (type) => dispatch(showTree_upload(type)),
    hideTree_upload: () => dispatch(hideTree_upload()),
    moveAssets_upload: (currentId, targetId) => dispatch(moveAssets_upload(currentId, targetId)),
    copyAssets_upload: (currentId, targetId) => dispatch(copyAssets_upload(currentId, targetId)),
    getALiYunParams: () => dispatch(getALiYunParams()),
    deleteUploadFile: (id, selectFiles) => dispatch(deleteUploadFile(id, selectFiles)),
    showFileModal: (isNew) => dispatch(showFileModal(isNew)),
    hideFileModal: () => dispatch(hideFileModal()),
    changeAlbumInfo: (key, value) => dispatch(changeAlbumInfo(key, value)),
    clearAlbumInfo: () => dispatch(clearAlbumInfo()),
    submitNewAlbum: (folderId, params) => dispatch(submitNewAlbum(folderId, params)),
    openAlbum: () => dispatch(openAlbum()),
    recordCurSelectedAlbum: (album) => dispatch(recordCurSelectedAlbum(album)),
    updateAlbum: (params) => dispatch(updateAlbum(params)),
    getAlbumInfo: () => dispatch(getAlbumInfo()),
    changeAlbumFilterType: (value) => dispatch(changeAlbumFilterType(value)),
    getAlbumsInUpload: (folderId) => dispatch(getAlbumsInUpload(folderId)),
    toggleInstockConfirm: (flag) => dispatch(toggleInstockConfirm(flag)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploads);
