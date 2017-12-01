import React, {PropTypes, Component}from 'react';
import { Card, Icon } from 'antd';
import VideoCell from './VideoCell';
import helper from '../../../common/helper';
import albumLogo from '../../../../assets/images/icons/album.jpg';

const styles = {
  card: {
    width: '220px',
    margin: '8px',
    position:'relative',
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
  shade: {
    position: 'absolute',
    top: '0px',
    left: 0,
    right: 0,
    color: 'white',
    fontSize: '16px',
    padding: '4px 0px',
    textAlign: 'right',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  body: {
    textAlign: 'center',
    padding: '10px 16px',
    wordWrap: 'break-word',
    borderTop: '1px solid #e9e9e9',
  },

  videoCell: {
    width: '220px',
    height: '180px',
  },

  badge: {
    position:'absolute',
    top:0,
    right:0,
    fontFamily:'tahoma',
    color:'white',
    borderRadius:'10px',
    padding:'2px 5px',
    zIndex:2,
  },
};

export default class Thumbnial extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    file: React.PropTypes.object.isRequired,
    deleteFile: React.PropTypes.func,
    toggleDetailModal: React.PropTypes.func,
    toggleFileSelection: React.PropTypes.func,
    selectedFiles: React.PropTypes.array,
    downloadImgs: React.PropTypes.func,
    badges: React.PropTypes.array, //{message: xx, color: xx}
    selectedFolder: React.PropTypes.object,
    fetchFolder: React.PropTypes.func,
    assetType: React.PropTypes.string,
    recordCurSelectedAlbum: React.PropTypes.func,
    changeAlbumFilterType: React.PropTypes.func,
    recordCurSelectedAlbum_qyzyk: React.PropTypes.func,
    getOnlineList: React.PropTypes.func,
    pagedImages: React.PropTypes.object,
    howToAlbum: React.PropTypes.func,
  }

  state = {
    showShade: false,
  }

  doblueClick = () => {
    let {
      toggleDetailModal,
      selectedFiles,
      recordCurSelectedAlbum_qyzyk,
      pagedImages,
      howToAlbum,
    } = this.props;
    console.log('selectedFiles ------双击-------->>> ', selectedFiles);
    console.log('pagedImages ------双击-------->>> ', pagedImages);
    if(selectedFiles[0].assetType == helper.ASSET_TYPE.ALBUM) {
      console.log('企业资源库双击所选的资源: ', selectedFiles[0]);
      recordCurSelectedAlbum_qyzyk(selectedFiles[0]);
      //下面开始请求该album下资源，并进入该album
      const params = {
        assetType: '',
        folderId: this.props.selectedFolder.id,
        groupId: selectedFiles[0].id,
        orderBy: 'TIME_DESC',
        onlineState: 'ONLINE',
        reviewState: 'PASSED',
        pageNum: 1,
        pageSize: 60,
        ifrom: 1,
      };
      if (!params.folderId) return;
      if(pagedImages.from == 'search') {
        //如果是搜索下的双击album，需要记录一下，点返回按钮的时候，返回搜索界面，如果不是搜索下的album，双击进入album后返回不是搜索界面
        howToAlbum('searchTo');
      } else {
        howToAlbum('notSearchTo');
      }
      this.props.getOnlineList(params, false);
    } else {
      toggleDetailModal();
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
        block = (
          <div style={{...styles.image}}>
            <VideoCell
              videoPath={file.ossVideoPath}
              videoId={file.id.toString()}
              style={styles.videoCell}
              posterPath={file.ossImgPath}
            />
          </div>
        );
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
    const {file, badges} = this.props;
    let cardStyle = styles.card;
    if (this.props.selectedFiles.find(x => x.id == file.id)) {
      cardStyle = {
        ...styles.card,
        backgroundColor: 'rgba(16, 142, 233, 0.5)',
      };
    }

    return (
      <Card
        style={cardStyle}
        bodyStyle={{ padding: 0 }}
        onClick={this.props.toggleFileSelection}
        onMouseOver={() => this.setState({showShade: true})}
        onMouseLeave={() => this.setState({showShade: false})}
        onDoubleClick={this.doblueClick}
        //onDoubleClick={this.props.toggleDetailModal.bind(null)}
      >
        {
          badges && badges.length && badgeComponent(badges)
        }
        {
          this.renderBackImg(file)
        }
        {

          file.shadeItems && this.state.showShade && file.assetType!=helper.ASSET_TYPE.ALBUM && <ShadeComponent file={file}/>
        }
        <div title={file.title} style={styles.body}><h3>{this.getCaption(file.title, 46)}</h3></div>
      </Card>
    );
  }
}

const badgeComponent = (badges) => {
  const first = badges[0];
  const color = first.color;
  const message = first.message;
  return (
    <div style={{background:color, ...styles.badge}}>
        {message}
    </div>
  );
};

badgeComponent.PropTypes = {
  badges: PropTypes.arrayOf().isRequired,
  color: PropTypes.string.isRequired,
};

class ShadeComponent extends Component {
  render() {
    const items = this.props.file.shadeItems;
    if(!items) return false;
    return (
      <div style={styles.shade}>
        {
          items.map((item, key) => {
            return <Icon
              type={item.iconType}
              key={key}
              style={{marginRight: '10px', 'cursor':'pointer'}}
              onClick={item.onClick}
                   />;
          })
        }
      </div>
    );
  }
}

ShadeComponent.propTypes = {
  file: PropTypes.object.isRequired,
};
