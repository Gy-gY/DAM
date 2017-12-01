import React, { PropTypes } from 'react';
import { Row, Button, Select, Input, notification } from 'antd';
import helper from '../../../common/helper';
const Option = Select.Option;

export default class OperationArea extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    selectedFiles: React.PropTypes.array,
    selectInvert: React.PropTypes.func.isRequired,
    selectAll: React.PropTypes.func.isRequired,
    allImgIds: React.PropTypes.array,
    downloadImgs: React.PropTypes.func.isRequired,
    orderImgsBy: React.PropTypes.func.isRequired,
    filterOrder: React.PropTypes.object,
    onSelectChange: React.PropTypes.func.isRequired,
    favoriteImgs: React.PropTypes.func,
    currentUser: React.PropTypes.object,
    selectedFolder: PropTypes.object,
    downloadStatus: PropTypes.object,
    getResourceByKeywords: React.PropTypes.func,
    changeKeyWords: React.PropTypes.func,
    search_keywords: React.PropTypes.string,
    pagedImages: React.PropTypes.object,
    fetchFolder: React.PropTypes.func,
    rememberBtnType: React.PropTypes.func,
    btnFlag: React.PropTypes.string,
    qyzyk_DisplayMode: React.PropTypes.string,
    changeAlbumFilter_qyzyk: React.PropTypes.func,
    filter_qyzyk: React.PropTypes.object,
    getOnlineList: React.PropTypes.func,
    howtoalbum: React.PropTypes.string,
    qyzyk_CurrentAlbumJson: React.PropTypes.object,
    qyzyk_CurSelectedAlbum: React.PropTypes.object,
  }

  state = {
    inputValue: '',
  }

  changeValue = e => {
    this.setState({inputValue: e.target.value});
    this.props.changeKeyWords(e.target.value);
  }

  startSearch = () => {
    this.props.rememberBtnType('');
    if(this.props.search_keywords == '') {
      notification.warning({message:'想搜索，总得填点什么吧'});
      return;
    }
    this.props.getResourceByKeywords(this.props.selectedFolder.id, this.props.search_keywords, 1, 50, /*this.props.btnFlag*/ '');
  }

  goBack = () => {
    let how = this.props.howtoalbum;
    if(how == 'searchTo') {
      //this.startSearch();
      this.props.getResourceByKeywords(this.props.selectedFolder.id, this.props.search_keywords, 1, 50, this.props.btnFlag);
    } else if(how == 'notSearchTo') {
      this.refresh();
    }
  }

  refresh = () => {
    if(this.props.pagedImages.from == 'folder') {
      this.props.fetchFolder(this.props.selectedFolder.id);
    } else if (this.props.pagedImages.from == 'search') {
      this.props.getResourceByKeywords(this.props.selectedFolder.id, this.props.search_keywords, 1, 50, this.props.btnFlag);
    }
  }




  orderImgsByHot = () => {
    if(this.props.qyzyk_DisplayMode == 'folder') {
      this.props.rememberBtnType('downloadCount_desc');
      if(this.props.pagedImages.from == 'folder') {
        this.props.orderImgsBy('DOWNLOADS_DESC');
      } else if (this.props.pagedImages.from == 'search') {
        this.props.getResourceByKeywords(this.props.selectedFolder.id, this.props.search_keywords, 1, 50, 'downloadCount_desc');
      }
    } else {
      //album模式，按热度排序
      this.props.orderImgsBy('DOWNLOADS_DESC');
      this.props.changeAlbumFilter_qyzyk({orderBy: 'DOWNLOADS_DESC'});
    }
  }

  orderImgsByTime = () => {
    if(this.props.qyzyk_DisplayMode == 'folder') {
      this.props.rememberBtnType('updatedTime_desc');
      if(this.props.pagedImages.from == 'folder') {
        this.props.orderImgsBy('TIME_DESC');
      } else if (this.props.pagedImages.from == 'search') {
        this.props.getResourceByKeywords(this.props.selectedFolder.id, this.props.search_keywords, 1, 50, 'updatedTime_desc');
      }
    } else {
      //album模式, 按时间排序
      this.props.orderImgsBy('TIME_DESC');
      this.props.changeAlbumFilter_qyzyk({orderBy: 'TIME_DESC'});
    }
  }

  //only for search
  orderImgsByDefault = () => {
    this.props.rememberBtnType('');
    this.props.getResourceByKeywords(this.props.selectedFolder.id, this.props.search_keywords, 1, 50, '');
  }

  //选中的资源是否包括album，如果包含，则”下载”和“收藏”按钮要置灰
  btnDisabled = () => {
    let files = this.props.selectedFiles;
    let album = files.find(file => {
      return file.assetType == helper.ASSET_TYPE.ALBUM;
    });
    return album ? true : false;
  }

  assetTypeChange_album = (value) => {
    console.log('value =================== ', value);
    this.props.changeAlbumFilter_qyzyk({assetType: value});
    let params = {
      assetType: value,
      folderId: this.props.selectedFolder.id,
      groupId: this.props.qyzyk_CurSelectedAlbum.id,
      orderBy: this.props.filterOrder.orderType,
      onlineState: 'ONLINE',
      reviewState: 'PASSED',
      pageNum: this.props.qyzyk_CurrentAlbumJson.pageNum,
      pageSize: 60,
      ifrom: 1,
    };
    this.props.getOnlineList(params, true);
  }


  retSelect_assetType = () => {
    let {
      qyzyk_DisplayMode,
      pagedImages,
      filter_qyzyk,
      filterOrder,
      onSelectChange,
    } = this.props;
    let albumMode = qyzyk_DisplayMode == 'album' ? true : false;
    let disableX = pagedImages.from == 'search' ? true : false;
    if(albumMode) {
      return (
        <Select value={filter_qyzyk.assetType} style={{ width: 100 }} onChange={this.assetTypeChange_album}>
          <Option value="">全部</Option>
          <Option value="IMG">图片</Option>
          <Option value="VIDEO">视频</Option>
          <Option value="AUDIO">音频</Option>
          <Option value="DOC">其他</Option>
        </Select>
      );
    } else {
      return (
        <Select /*value={this.props.filter.assetType}*/ value={filterOrder.assetType} style={{ width: 100 }} onChange={onSelectChange} disabled={disableX}>
          <Option value="">全部</Option>
          <Option value="GROUP">文件夹</Option>
          <Option value="IMG">图片</Option>
          <Option value="VIDEO">视频</Option>
          <Option value="AUDIO">音频</Option>
          <Option value="DOC">其他</Option>
        </Select>
      );
    }
  }


  render = () => {
    let {
      style,
      selectedFiles,
      downloadImgs,
      favoriteImgs,
      filterOrder,
      selectAll,
      selectInvert,
      selectedFolder,
      pagedImages,
      qyzyk_DisplayMode,
      filter_qyzyk,
    } = this.props;

    let folderId = selectedFolder.id;
    if (!folderId) return false;
    const canDownload = this.props.pagedImages.from == 'search' ? true : selectedFolder.permissions.includes('download_assets');
    const orderType = filterOrder.orderType;
    let num = !selectedFolder.total ? 0 : selectedFolder.total;
    let disableX = pagedImages.from == 'search' ? true : false;
    let btnStatus1 = 'default';
    let btnStatus2 = 'default';
    let btnStatus3 = 'default';
    if(pagedImages.from == 'folder') {
      btnStatus1 = orderType == 'DOWNLOADS_DESC' ? 'primary': 'default';
      btnStatus2 = orderType == 'TIME_DESC' ? 'primary': 'default';
    } else if(pagedImages.from == 'search') {
      if(this.props.btnFlag == 'downloadCount_desc') {
        btnStatus1 = 'primary';
      } else if(this.props.btnFlag == 'updatedTime_desc') {
        btnStatus2 = 'primary';
      } else if(this.props.btnFlag == '') {
        btnStatus3 = 'primary';
      }
    }
    //如果是album显示模式下，需要重新对btnStatus1和btnStatus2进行状态赋值
    if(qyzyk_DisplayMode == 'album') {
      btnStatus1 = filter_qyzyk.orderBy == 'DOWNLOADS_DESC' ? 'primary': 'default';
      btnStatus2 = filter_qyzyk.orderBy == 'TIME_DESC' ? 'primary': 'default';
    }
    let dis = this.btnDisabled();
    let showBackBtn = qyzyk_DisplayMode == 'folder' ? false : true;
    return (
      <div>
        {
          !showBackBtn && <Row style={{textAlign:'center', paddingTop:'20px', paddingBottom:'20px', height:'80px', backgroundColor:'white'}}>
            <Input value={this.props.search_keywords} onPressEnter={this.startSearch} onChange={this.changeValue} style={{width:'70%', height:'100%', borderRadius:'0px'}} placeholder="请输入关键字查询"></Input>
            <Button onClick={this.startSearch} style={{height:'100%', width:'8%', borderRadius:'0px'}} size={'large'} type="primary" icon="search">搜索</Button>
          </Row>
        }
        <Row style={style} type="flex" justify="space-between">
          <div>
            {
              showBackBtn && <Button
                style={{ margin: '0 2px' }}
                type="primary"
                onClick={this.goBack}
                             >
                {'返回'}
              </Button>
            }
          </div>
          <div>
            {
              this.props.pagedImages.from == 'search' && <Button
                type={btnStatus3}
                onClick={this.orderImgsByDefault}
                style={{ margin: '0 8px' }}>
                最佳匹配
              </Button>
            }

            <Button
              type={btnStatus1}
              onClick={this.orderImgsByHot}
              style={{ marginRight: '8px' }}>
              按热度
            </Button>

            <Button
              type={btnStatus2}
              onClick={this.orderImgsByTime}
              style={{ margin: '0 8px' }}>
              按日期
            </Button>

            <label style={{ marginLeft: 40 }}>资源类型：</label>
            {
              this.retSelect_assetType()
            }
          </div>
          <div style={{width:'10%', marginLeft:'13%', textAlign:'right', fontSize:'14px'}}>
            {'共 '}
            <span style={{color:'red'}}>{num}</span>
            {' 个结果'}
          </div>
          <div>
            {
              !showBackBtn && <Button
                onClick={this.refresh}
                style={{ margin: '0 8px' }}>
                刷新
              </Button>
            }
            <Button
              style={{ margin: '0 8px' }}
              disabled={!selectedFolder || !selectedFolder.id}
              onClick={selectAll}>
              全选
            </Button>
            <Button
              style={{ margin: '0 8px' }}
              disabled={ !selectedFolder || !selectedFolder.id }
              onClick={selectInvert}>
              反选
            </Button>

            <Button
              loading={this.props.downloadStatus.loading}
              type="primary"
              style={{ margin: '0 8px' }}
              disabled={!selectedFiles || !selectedFiles.length || !canDownload || dis}
              onClick={downloadImgs.bind(this, {ids: selectedFiles, userId: 'fake', isCheck: disableX})}
            >
              下载
            </Button>

            <Button
              type="primary"
              style={{ marginLeft: '8px' }}
              disabled={!selectedFiles || !selectedFiles.length || dis}
              onClick={favoriteImgs.bind(this, {imgIds: selectedFiles.map(file => file.id), userId: 'fake'})}
            >
              收藏
            </Button>

          </div>
        </Row>
      </div>
    );
  }
}
