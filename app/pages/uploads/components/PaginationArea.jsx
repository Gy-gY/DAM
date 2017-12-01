import React from 'react';
import { Pagination } from 'antd';

export default class PaginationArea extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    selectedFolder: React.PropTypes.object.isRequired,
    fetchFolder: React.PropTypes.func.isRequired,
    assetType: React.PropTypes.string,
    getResourceByKeywords: React.PropTypes.func,
    search_keywords: React.PropTypes.string,
    pagedImages: React.PropTypes.object,
    btnFlag: React.PropTypes.string,
    curSelectedAlbum: React.PropTypes.object,
    currentAlbumJson: React.PropTypes.object,
    displayMode: React.PropTypes.string,
    qyzyk_DisplayMode: React.PropTypes.string,
    getOnlineList: React.PropTypes.func,
    filter_qyzyk: React.PropTypes.object,
    qyzyk_CurSelectedAlbum: React.PropTypes.object,
    filterOrder: React.PropTypes.object,
    qyzyk_CurrentAlbumJson: React.PropTypes.object,
  }

  turnToPage_upload = page => {
    let {
      pagedImages,
      getResourceByKeywords,
      selectedFolder,
      search_keywords,
      btnFlag,
      assetType,
      fetchFolder,
    } = this.props;
    if(pagedImages && pagedImages.from == 'search') {
      getResourceByKeywords(selectedFolder.id, search_keywords, page, selectedFolder.pageSize, btnFlag);
    } else {
      fetchFolder(selectedFolder.id, page, assetType);
    }
  }

  turnToPage_qyzyk_album = page => {
    let params = {
      assetType: this.props.filter_qyzyk.assetType,
      folderId: this.props.selectedFolder.id,
      groupId: this.props.qyzyk_CurSelectedAlbum.id,
      orderBy: this.props.filter_qyzyk.orderBy,
      onlineState:'ONLINE',
      reviewState:'PASSED',
      pageNum: page,
      pageSize: 60,
      ifrom: 1,
    };
    this.props.getOnlineList(params, false);
  }

  turnToPage_qyzyk_folder = page => {
    let params = {
      assetType: this.props.filterOrder.assetType,
      folderId: this.props.selectedFolder.id,
      orderBy: this.props.filterOrder.orderType,
      onlineState: 'ONLINE',
      reviewState: 'PASSED',
      pageNum: page,
      pageSize: 60,
      ifrom: 1,
    };
    this.props.getOnlineList(params, false);
  }


  //这里的render，要区分：是上传模块，则只有folder模式，如果是企业资源库，则有folder和album模式，
  render = () => {
    let {
      style,
      selectedFolder,
      qyzyk_DisplayMode,
      qyzyk_CurrentAlbumJson,
    } = this.props;
    if (!selectedFolder.id) return false;

    if(window.location.href.includes('user_resources')) { //企业资源库
      if(qyzyk_DisplayMode == 'folder') {
        return (
          <Pagination
            style={style}
            current={selectedFolder.pageNum}
            pageSize={selectedFolder.pageSize}
            total={selectedFolder.total}
            onChange={this.turnToPage_qyzyk_folder}
          />
        );
      } else if(qyzyk_DisplayMode == 'album') {
        return (
          <Pagination
            style={style}
            current={qyzyk_CurrentAlbumJson.pageNum}
            pageSize={qyzyk_CurrentAlbumJson.pageSize}
            total={qyzyk_CurrentAlbumJson.total}
            onChange={this.turnToPage_qyzyk_album}
          />
        );
      }
    } else if(window.location.href.includes('uploads')) { //上传
      return (
        <Pagination
          style={style}
          current={selectedFolder.pageNum}
          pageSize={selectedFolder.pageSize}
          total={selectedFolder.total}
          onChange={this.turnToPage_upload}
        />
      );
    }
  }
}
