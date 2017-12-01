import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { Layout } from 'antd';
const { Content, Sider } = Layout;
import PicDetailList from './components/PicDetailList';
import FolderArea from '../uploads/components/FolderArea';
import ContentArea from '../uploads/components/ContentArea';
import PaginationArea from '../uploads/components/PaginationArea';
import OperationArea from './components/OnlineOperation';

import {
  fetchFolders,
  fetchFolder,
  selects,
  orderImgsBy,
  getBetchImg,
  getOnlineList,
  getResourceByKeywords,
  recordCurSelectedAlbum_qyzyk,
  changeAlbumFilter_qyzyk,
} from 'actions';

import {
  changeKeyWords,
  clearSearchKeyWords,
  rememberBtnType,
  howToAlbum,
} from '../../actions/uploads';

import {
  selectFolder,
} from '../../actions/check';

import {
  getFavoriteImgs,
  favoriteImgs,
  downloadImgs,
  unfavoriteImgs,
  toggleDetailModal,
  selectAllFiles,
  reversFileSelection,
  toggleFileSelection,
  toggleDetailListModal,
  closeModalAfterSearch,
} from '../../actions/usercenter';

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

class OnlineImgs extends Component {

  static propTypes = {
    folders: React.PropTypes.array,
    selectedFiles: React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
    selecteds: React.PropTypes.array,
    selectFolder: React.PropTypes.func.isRequired,
    fetchFolders: React.PropTypes.func.isRequired,
    fetchFolder: React.PropTypes.func.isRequired,
    reversFileSelection: React.PropTypes.func.isRequired,
    selectAllFiles: React.PropTypes.func.isRequired,
    folderPendingList : React.PropTypes.object,
    allImgIds: React.PropTypes.array,
    getOnlineList: React.PropTypes.func.isRequired,
    getBetchImg: React.PropTypes.func.isRequired,
    pagedImages: React.PropTypes.object,
    downloadImgs: React.PropTypes.func,
    favoriteImgs: React.PropTypes.func,
    unfavoriteImgs: React.PropTypes.func,
    orderImgsBy: React.PropTypes.func,
    filterOrder: React.PropTypes.object,
    toggleDetailModal: React.PropTypes.func,
    currentUser: React.PropTypes.object,
    detailModal: React.PropTypes.object,
    toggleDetailListModal: React.PropTypes.func,
    detailListModal: React.PropTypes.object,
    toggleFileSelection: React.PropTypes.func.isRequired,
    getFavoriteImgs: React.PropTypes.func,
    myFavoriteImgs: React.PropTypes.object,
    downloadStatus: PropTypes.object,
    getResourceByKeywords: React.PropTypes.func,
    changeKeyWords: React.PropTypes.func,
    search_keywords: React.PropTypes.string,
    clearSearchKeyWords: React.PropTypes.func,
    closeModalAfterSearch: React.PropTypes.func,
    rememberBtnType: React.PropTypes.func,
    btnFlag: React.PropTypes.string,
    recordCurSelectedAlbum_qyzyk: React.PropTypes.func,
    qyzyk_CurSelectedAlbum: React.PropTypes.object,
    qyzyk_DisplayMode: React.PropTypes.string,
    changeAlbumFilter_qyzyk: React.PropTypes.func,
    filter_qyzyk: React.PropTypes.object,
    qyzyk_CurrentAlbumJson: React.PropTypes.object,
    howToAlbum: React.PropTypes.func,
    howtoalbum: React.PropTypes.string,
  }

  state = {
    stateFolderId: ['1'],
  }

  reloadImgs(option, filterChanged = false) {
    const params = {
      assetType: option.assetType === undefined ? this.props.filterOrder.assetType : option.assetType,
      folderId: option.folderId || this.props.selectedFolder.id,
      groupId: option.groupId,
      orderBy: option.orderType || this.props.filterOrder.orderType,
      onlineState:'ONLINE',
      reviewState:'PASSED',
      pageNum: option.pageNum || this.props.filterOrder.pageNum,
      pageSize: this.props.filterOrder.pageSize,
      ifrom: 1,
    };
    if (!params.folderId) return;
    this.props.getOnlineList(params, filterChanged);
  }

  //componentWillMount() {
    //fetchFolders('resource');
  //}

  componentDidMount() {
    //Load all user favorite images
    const userId = this.props.currentUser.userId;
    this.props.getFavoriteImgs({userId, pageSize: 200});
  }

  //选择目录时，更新文件
  onSelectedFolders(ids) {
    this.props.clearSearchKeyWords();
    if(ids.length > 0) {
      if((typeof ids) == 'object') {
        this.setState({stateFolderId:ids});
        this.reloadImgs({folderId: ids[0]});
        this.props.selectFolder(ids);
      } else if((typeof ids) == 'string') {
        this.setState({stateFolderId:[ids]});
        this.reloadImgs({folderId: ids});
        this.props.selectFolder(ids);
      }
    }
  }

  //这是下拉列表选择 assetType 的 change 函数
  onSelectChange = (value) => {
    this.reloadImgs({assetType: value}, true);
    this.props.orderImgsBy({assetType: value});
  }

  //操作区里面两个按钮：“按热度”， “按时间”，这里要区分，folder下没groupId，album下有groupId
  onChangeOrderType(option) {
    let {
      qyzyk_DisplayMode,
      qyzyk_CurSelectedAlbum,
    } = this.props;
    let obj = qyzyk_DisplayMode == 'folder' ? {orderType: option} : {orderType: option, groupId: qyzyk_CurSelectedAlbum.id};
    this.reloadImgs(obj);
    //下面 orderImgsBy 仅仅用于 folder 模式下
    qyzyk_DisplayMode == 'folder' && this.props.orderImgsBy({orderType: option});
  }

  render() {
    let {
      selectedFolder,
      allImgIds,
      detailListModal,
      folders,
      pagedImages,
      selectedFiles,
      toggleDetailListModal,
      toggleFileSelection,
      fetchFolders,
      currentUser,
      myFavoriteImgs,
      favoriteImgs,
      unfavoriteImgs,
      rememberBtnType,
      btnFlag,
      recordCurSelectedAlbum_qyzyk,
      qyzyk_DisplayMode,
      getOnlineList,
      changeAlbumFilter_qyzyk,
      filter_qyzyk,
      filterOrder,
      howToAlbum,
      howtoalbum,
      qyzyk_CurSelectedAlbum,
      qyzyk_CurrentAlbumJson,
    } = this.props;
    const myFavoriteImgIds = myFavoriteImgs.list.map(img => img.id);
    const imgs = pagedImages.imgs;

    if (folders) { //过滤出用户有浏览权限权限的目录列表
      folders = folders.filter(folder => folder.permissions&&folder.permissions.includes('view_assets'));
    }

    let files = imgs.list;
    let disableX = pagedImages.from == 'search' ? true : false;
    files.map(file => {
      let loading = this.props.downloadStatus.loading?'loading':'download';
      if (myFavoriteImgIds.includes(file.id)) {
        file.shadeItems = [{iconType: 'star',
          onClick: unfavoriteImgs.bind(this, {imgIds: [file.id], userId: currentUser.userId})},
        {iconType: loading,
          onClick: this.downloadImgs.bind(this, {ids: [file], userId: 'fake', isCheck: disableX})}];
      } else {
        file.shadeItems = [{iconType: 'star-o',
          onClick: favoriteImgs.bind(this, {imgIds: [file.id], userId: currentUser.userId}) },
        {iconType: loading,
          onClick: this.downloadImgs.bind(this, {ids: [file], userId: 'fake', isCheck: disableX})}];
      }
    });

    selectedFolder.list = files;
    selectedFolder.pageNum = imgs.pageNum;
    selectedFolder.pageSize = imgs.pageSize;
    selectedFolder.total = imgs.total;
    selectedFolder.permissions = [];
    if(folders && selectedFolder.id) {
      let find = folders.find(folder => folder.id == selectedFolder.id);
      if(find) {
        selectedFolder.permissions = find.permissions;
      }
    }


  //  const fileIds = files.map(file => file.id);
    const fetchFolder = this.onSelectedFolders.bind(this);

    return (
      <Layout>

        <Sider style={styles.sider}>
          <FolderArea
            folders={folders}
            stateFolderId={this.state.stateFolderId}
            selectedFolder={selectedFolder}
            fetchFolder={fetchFolder}
            fetchFolders={fetchFolders}
            type='resource'
          />
        </Sider>

        <Content style={styles.content}>
          <OperationArea
            style={styles.button}
            onSelectChange={this.onSelectChange}
            selectedFolder={selectedFolder}
            selectedFiles={selectedFiles}
            selectAll={this.props.selectAllFiles.bind(null, {ids: files})}
            selectInvert={this.props.reversFileSelection.bind(null, files)}
            downloadImgs={this.downloadImgs.bind(this)}
            allImgIds={allImgIds}
            orderImgsBy={this.onChangeOrderType.bind(this)}
            filterOrder={this.props.filterOrder}
            favoriteImgs={this.props.favoriteImgs}
            currentUser={this.props.currentUser}
            downloadStatus={this.props.downloadStatus}
            changeKeyWords={this.props.changeKeyWords}
            search_keywords={this.props.search_keywords}
            getResourceByKeywords={this.props.getResourceByKeywords}
            clearSearchKeyWords={this.props.clearSearchKeyWords}
            pagedImages={pagedImages}
            howtoalbum={howtoalbum}
            fetchFolder={fetchFolder}
            rememberBtnType={rememberBtnType}
            btnFlag={btnFlag}
            filter_qyzyk={filter_qyzyk}
            changeAlbumFilter_qyzyk={changeAlbumFilter_qyzyk}
            qyzyk_DisplayMode={qyzyk_DisplayMode}
            qyzyk_CurrentAlbumJson={qyzyk_CurrentAlbumJson}
            getOnlineList={getOnlineList}
            qyzyk_CurSelectedAlbum={qyzyk_CurSelectedAlbum}
          />

          <PicDetailList
            {...detailListModal}
            unfavoriteImgs={this.props.unfavoriteImgs}
            myFavoriteImgIds={myFavoriteImgIds}
            download={this.props.downloadImgs}
            favorite={this.props.favoriteImgs}
            imgs = {files}
            closeDetailModal={toggleDetailListModal}
            downloadStatus={this.props.downloadStatus}
            selectedFolder={selectedFolder}
            currentUser={this.props.currentUser}
            changeKeyWords={this.props.changeKeyWords}
            closeModalAfterSearch={this.props.closeModalAfterSearch}
            getResourceByKeywords={this.props.getResourceByKeywords}
            selectedFiles={selectedFiles} />

          <ContentArea
            isLoading={pagedImages.isFetching}
            style={styles.lists}
            toggleFileSelection={toggleFileSelection}
            selectedFiles={selectedFiles}
            selectedFolder={selectedFolder}
            toggleDetailModal={toggleDetailListModal.bind(this, {files})}
            recordCurSelectedAlbum_qyzyk={recordCurSelectedAlbum_qyzyk}
            getOnlineList={getOnlineList}
            pagedImages={pagedImages}
            howToAlbum={howToAlbum}
          />

          <PaginationArea
            style={styles.pagination}
            getResourceByKeywords={this.props.getResourceByKeywords}
            search_keywords={this.props.search_keywords}
            pagedImages={pagedImages}
            selectedFolder={selectedFolder}
            btnFlag={btnFlag}
            qyzyk_DisplayMode={qyzyk_DisplayMode}
            getOnlineList={getOnlineList}
            filter_qyzyk={filter_qyzyk}
            filterOrder={filterOrder}
            qyzyk_CurSelectedAlbum={qyzyk_CurSelectedAlbum}
            qyzyk_CurrentAlbumJson={qyzyk_CurrentAlbumJson}
            fetchFolder={(folderId, pageNum) => this.reloadImgs({pageNum: pageNum})}
          />

        </Content>
      </Layout>
    );
  }

  downloadImgs(folders) {
    let ids = [];
    const {userId} = this.props.currentUser;
    folders.ids.map((item)=>{
      ids.push(item.id);
    });
    this.props.downloadImgs({ids:ids, userId, isCheck:folders.isCheck});
  }
}

function mapStateToProps(state) {
  return {
    folders: state.uploads.folders,
    selectedFiles: state.usercenter.selectedFiles,
    selectedFolder: state.check.selectedFolder,
    allImgIds : state.resources.onlinePagedImages.allImgIds,
    filterOrder: state.check.filterOrder,
    detailModal: state.usercenter.detailModal,
    detailListModal: state.usercenter.detailListModal,
    currentUser: state.login.currentUser,
    pagedImages: state.resources.onlinePagedImages,
    myFavoriteImgs: state.usercenter.favoriteAssets.assets,
    downloadStatus: state.usercenter.downloadStatus,
    search_keywords: state.uploads.search_keywords,
    btnFlag: state.uploads.btnFlag,
    qyzyk_DisplayMode: state.check.qyzyk_DisplayMode,
    qyzyk_CurSelectedAlbum: state.check.qyzyk_CurSelectedAlbum,
    filter_qyzyk: state.check.filter_qyzyk,
    qyzyk_CurrentAlbumJson: state.check.qyzyk_CurrentAlbumJson,
    howtoalbum: state.uploads.howtoalbum,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectFolder: (id) => selectFolder(dispatch, id),
    fetchFolders: (type, parentId) => dispatch(fetchFolders(type, parentId)),
    fetchFolder: (id, pageNum, assetType, filterChanged, type) => dispatch(fetchFolder(id, pageNum, assetType, filterChanged, type)),
    toggleFileSelection: (fileId, event) => dispatch(toggleFileSelection(fileId, event)),
    reversFileSelection : (allImgIds) => dispatch(reversFileSelection(allImgIds)),
    selectAllFiles : (selectedFiles) => dispatch(selectAllFiles(selectedFiles)),
    selects: (event) => dispatch(selects(Array.prototype.slice.call(event.target.files))),
    getOnlineList : (params, filterChanged) => dispatch(getOnlineList(params, filterChanged)),
    getBetchImg : (params) => getBetchImg(dispatch, params),
    downloadImgs: (params) => downloadImgs(dispatch, params),
    favoriteImgs: (params) => favoriteImgs(dispatch, params),
    unfavoriteImgs: (params) => unfavoriteImgs(dispatch, params),
    orderImgsBy: (orderType) => orderImgsBy(dispatch, orderType),
    toggleDetailModal: (params) => toggleDetailModal(dispatch, params),
    toggleDetailListModal: (params) => dispatch(toggleDetailListModal(params)),
    getFavoriteImgs: (params) => getFavoriteImgs(dispatch, params),
    changeKeyWords: (keyWords) => dispatch(changeKeyWords(keyWords)),
    clearSearchKeyWords: () => dispatch(clearSearchKeyWords()),
    getResourceByKeywords: (folderId, keywords, pageNum, pageSize, orderby) => dispatch(getResourceByKeywords(folderId, keywords, pageNum, pageSize, orderby)),
    closeModalAfterSearch: () => dispatch(closeModalAfterSearch()),
    rememberBtnType: (flag) => dispatch(rememberBtnType(flag)),
    recordCurSelectedAlbum_qyzyk: (album) => dispatch(recordCurSelectedAlbum_qyzyk(album)),
    changeAlbumFilter_qyzyk: (filter) => dispatch(changeAlbumFilter_qyzyk(filter)),
    howToAlbum: (strMethod) => dispatch(howToAlbum(strMethod)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OnlineImgs);
