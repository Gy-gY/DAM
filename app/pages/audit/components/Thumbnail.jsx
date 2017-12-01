import React from 'react';
import { Card, Icon } from 'antd';
import VideoCell from './VideoCell';
import helper from '../../../common/helper';
import albumLogo from '../../../../assets/images/icons/album.jpg';


const styles = {
  card: {
    width: '220px',
    margin: '8px',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    minHeight: '180px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    position: 'relative',
  },
  album: {
    width: '100%',
    minHeight: '180px',
    backgroundSize: '60%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundImage: `url(${albumLogo})`,
  },
  videoCell: {
    width: '220px',
    height: '180px',
    cursor: 'pointer',
  },
  shade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    color: 'white',
    fontSize: '16px',
    padding: '4px 16px',
    textAlign: 'right',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  body: {
    textAlign: 'center',
    padding: '10px 16px',
    wordWrap: 'break-word',
    borderTop: '1px solid #e9e9e9',
  },
};

export default class Thumbnial extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    file: React.PropTypes.object.isRequired,
    deleteFile: React.PropTypes.func,
    toggleDetailModal_audit: React.PropTypes.func,
    toggleFileSelection: React.PropTypes.func,
    selectedFiles: React.PropTypes.array,
    renderShade: React.PropTypes.func, //自定义shade行为
    arrowFile: React.PropTypes.func,
    fetchFolder_audit: React.PropTypes.func,
    recordCurSelectedAlbum_audit: React.PropTypes.func,
    filter: React.PropTypes.object,
    filter_album: React.PropTypes.object,
    selectedFolder: React.PropTypes.object,
  }

  state = {
    showShade: false,
  }
  BadgeStyle = {
    contain:{
      position:'relative',
    },
    badge:{
      position:'absolute',
      top:0,
      right:0,
      fontFamily:'tahoma',
      color:'white',
      borderRadius:'10px',
      padding:'2px 5px',
      zIndex:2,
    },
  }

  doblueClick = () => {
    let {
      toggleDetailModal_audit,
      selectedFiles,
      fetchFolder_audit,
      recordCurSelectedAlbum_audit,
      filter_album,
      selectedFolder,
    } = this.props;
    if(selectedFiles[0].assetType == helper.ASSET_TYPE.ALBUM) {
      recordCurSelectedAlbum_audit(selectedFiles[0]);
      let ft = {
        groupId: selectedFiles[0].id,
        folderId: selectedFolder.id,
        pageNum : 1,
        onlineState : '',
        reviewState : 'PENDING',
        assetType : '',
        pageSize: 40,
        orderBy: 'TIME_DESC',
      };
      filter_album = Object.assign(filter_album, ft);
      fetchFolder_audit(filter_album, true);
    } else {
      toggleDetailModal_audit();
    }
  }


  getCaption(title, len) {
    let str = title;
    let str_length = 0;
    let str_len = 0;
    let str_cut = new String();
    if(str && str.length) {
      str_len = str.length;
    }
    for(var i = 0;i < str_len;i++) {
      let a = str.charAt(i);
      str_length++;
      if(escape(a).length > 4)
      {
       //中文字符的长度经编码之后大于4
        str_length++;
      }
      str_cut = str_cut.concat(a);
      if(str_length >= len)
       {
        str_cut = str_cut.concat('...');
        return str_cut;
      }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if(str_length < len) {
      return str;
    }
  }

  renderShade = (showShade) => {
    if (showShade)
      return (
        <div style={styles.shade}>
          <Icon
            type="eye-o"
            style={{marginRight: '8px'}}
            onClick={e => {
              e.stopPropagation();
              this.props.toggleDetailModal_audit();
            }} />
          <Icon
            type="edit"
            style={{marginRight: '8px'}}
            onClick={e => {
              e.stopPropagation();
              this.props.toggleDetailModal_audit();
            }} />
          <Icon
            type="delete"
            onClick={e => {
              e.stopPropagation();
              this.showDeleteConfirm();
            }}/>
        </div>
      );
    return false;
  }

  renderBackImg = (file) => {
    let block;
    const imgUrl = file.ossImgPath;
    const imageStyle = {
      ...styles.image,
      backgroundImage: `url(${imgUrl})`,
    };
    switch(file.assetType) {
    //如果是视频，显示如下样式
    case helper.ASSET_TYPE.VIDEO: {
      if (file.ossImgPath && file.ossVideoPath) {
        block = (<div style={{...styles.image}}>
          <VideoCell videoPath={file.ossVideoPath} videoId={file.id.toString()} style={ styles.videoCell }
            posterPath={file.ossImgPath}/>
        </div>);
      }
      break;
    }
    //如果是Album，显示如下样式
    case helper.ASSET_TYPE.ALBUM: {
      block = (<div style={styles.album}></div>);
      break;
    }
    //剩下的都是图片样式
    default:
      block = (<div style={imageStyle} />);
    }
    return block;
  }

  render() {
    let bg = {color:'', msg:''};
    if(this.props.file.onlineState == 3) {
      bg.color = '#ffbf00';
      bg.msg = '已禁用';
    } else {
      if(this.props.file.reviewState == 1) {
        bg.color = '#108ee9';
        bg.msg = '待审核';
      } else if(this.props.file.reviewState == 3) {
        bg.color = '#f04134';
        bg.msg = '已驳回';
      } else if(this.props.file.reviewState == 4) {
        bg.color = '#00a854';
        bg.msg = '已入库';
      }
    }

    let cardStyle = styles.card;
    if (this.props.selectedFiles.find(fil => fil.id == this.props.file.id)) {
      cardStyle = {
        ...styles.card,
        backgroundColor: 'rgba(16, 142, 233, 0.5)',
      };
    }

    // const renderShade = this.props.renderShade || this.renderShade;
    return (
      <div style={this.BadgeStyle.contain}>
        <div style={{background:bg.color, ...this.BadgeStyle.badge}}>
          {bg.msg}
        </div>
        <Card
          style={cardStyle}
          bodyStyle={{ padding: 0 }}
          onClick={this.props.toggleFileSelection}
          onDoubleClick={this.doblueClick}
          //onDoubleClick={this.props.toggleDetailModal_audit}
        >
          {
            this.renderBackImg(this.props.file)
          }
          <div style={styles.body}>
            <h3 title={this.props.file.title}>{this.getCaption(this.props.file.title, 46)}</h3>
          </div>
        </Card>
      </div>
    );
  }
}
