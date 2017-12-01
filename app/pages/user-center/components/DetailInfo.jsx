import React, {PropTypes} from 'react';
import { Button, Row } from 'antd';

const styles = {
  panel: {
  },
  info: {
    label: {
      fontSize: '1.1em',
      fontWeight: 'bold',
    },
    line:{
      marginBottom:8,
    },
    line2:{
      marginBottom:8,
      maxHeight:400,
      overflow:'auto',
    },
    line3:{
      marginTop:15,
      maxHeight:200,
      overflow:'auto',
    },
    text: {
      marginLeft: '5px',
      fontSize: '1.1em',
    },
    keywords:{
      borderRadius:5,
      padding:5,
      margin:'0px 5px 5px 0px',
      float:'left',
      cursor:'pointer',
      border:'1px solid #6B6B6B',
      color:'#6B6B6B',
    },
    keyword:{
      width:'100%',
      maxHeight:200,
      overflow:'auto',
    },
    base:{
      borderTop:'1px solid rgb(230,230,230)',
      borderBottom:'1px solid rgb(230,230,230)',
      padding:'10px 0',
      margin:'10px 0',
      fontWeight:'bold',
      fontSize:14,
    },
    h2:{
      overflow:'hidden',
      textOverflow:'ellipsis',
      display:'box',
      WebkitBoxOrient:'vertical',
      WebkitLineClamp:2,
    },
  },
};
class DetailInfo extends React.Component {

  static propTypes = {
    file: React.PropTypes.object.isRequired,
    form: React.PropTypes.object,
    style: PropTypes.object,
    favorite: PropTypes.func,
    unfavoriteImgs: React.PropTypes.func,
    myFavoriteImgIds: React.PropTypes.array,
    download: PropTypes.func,
    downloadStatus: PropTypes.object,
    currentUser:PropTypes.object,
    getResourceByKeywords: React.PropTypes.func,
    selectedFolder: React.PropTypes.object,
    changeKeyWords: React.PropTypes.func,
    toggleDetailListModal: React.PropTypes.func,
    closeModalAfterSearch: React.PropTypes.func,
  }

  startSearch = (value) => {
    this.props.closeModalAfterSearch();
    this.props.changeKeyWords(value);
    this.props.getResourceByKeywords(this.props.selectedFolder.id, value, 1);
  }

  render() {
    let { file } = this.props;
    let type = {
      '1':'RM',
      '2':'RF',
      '3':'RR',
    };
    const baseStyle = {
      height: '100%',
      float:'right',
      padding:30,
      width:370,
      // alignContent: 'space-between',
    };

    let license = '';
    if(file.licenseType=='2') {
      license = <span style={{color:'#f37f02'}}>{'RF（免版税金使用版权图片）'}</span>;
    }else if(file.licenseType=='1') {
      license = <span style={{color:'#1e97d6'}}>{'RM （特定适用范围版权图片）'}</span>;
    }else if(file.licenseType=='4') {
      license = <span>{'自有授权'}</span>;
    }

    let keywords = [];
    if(file.keywords&&file.keywords.length>0) {
      keywords = file.keywords.split(',');
    }
    let folderKeywords = [];
    if(file.folderKeywords&&file.folderKeywords.length>0) {
      folderKeywords = file.folderKeywords.split(',');
    }
    let isfavorite = this.props.myFavoriteImgIds.includes(file.id)?true:false;
    return (
      <div style={baseStyle}>
        <Row justify="end" style={{rediuBorders:5, padding: '6px 0px', textAlign: 'center'}}>
          <Button type="primary" icon='download' size="large" style={{width: '100%'}}
            loading={this.props.downloadStatus.loading}
            onClick={this.props.download.bind(this, {ids: [file.id], userId: this.props.currentUser.userId})} >图片下载</Button>
          <Button type="primary" icon={isfavorite?'star':'star-o'} size="large" style={{marginTop:10, width: '100%'}}
            onClick={()=>{
              if(isfavorite) {
                this.props.unfavoriteImgs({imgIds: [file.id], userId: this.props.currentUser.userId});
              }else {
                this.props.favorite({imgIds: [file.id], userId: this.props.currentUser.userId});
              }
            }} >图片收藏</Button>

        </Row>
        <div>
          <h2 style={styles.info.h2}>{file.title}</h2>
          <div style={styles.info.base}>{'基本信息'}</div>
          {this.props.selectedFolder.id==11&&<div style={styles.info.line}><label style={styles.info.label}>VCGID:</label><span style={styles.info.text}>{file.resId}</span></div>}

          <div style={styles.info.line}><label style={styles.info.label}>资源ID:</label><span style={styles.info.text}>{file.resId ? file.resId : file.assetId}</span></div>
          <div style={styles.info.line}><label style={styles.info.label}>资源说明:</label><span style={styles.info.text}>{file.description}</span></div>
          <div style={styles.info.line}><label style={styles.info.label}>地点:</label><span style={styles.info.text}>{file.location}</span></div>
          <div style={styles.info.line}><label style={styles.info.label}>署名：</label><span style={styles.info.text}>{file.creditLine}</span></div>
          <div style={styles.info.line2}><label style={styles.info.label}>授权方式:</label><span style={styles.info.text}>{license}</span></div>

          <div style={styles.info.line2}><label style={styles.info.label}>授权人:</label><span style={styles.info.text}>{file.licenseAuthorizer}</span></div>

          <div style={styles.info.line2}><label style={styles.info.label}>授权开始时间:</label><span style={styles.info.text}>{file.licenseStartTime}</span></div>

          <div style={styles.info.line2}><label style={styles.info.label}>授权结束时间:</label><span style={styles.info.text}>{file.licenseExpireTime}</span></div>

          <div style={styles.info.line2}><label style={styles.info.label}>关键字:</label></div>
          <div style={styles.info.keyword}>
            {keywords.map((x, i)=>{
              return <div onClick={this.startSearch.bind(null, x)} key={`${x}${i}`} className={'keywords'}>{x}</div>;
            })}
          </div>
          <div style={styles.info.line2}><label style={styles.info.label}>目录关键字:</label></div>
          <div style={styles.info.keyword}>
            {folderKeywords.map((x, i)=>{
              return <div onClick={this.startSearch.bind(null, x)} key={`${x}${i}`} className={'keywords'}>{x}</div>;
            })}
          </div>
        </div>

      </div>
    );
  }

}

export default DetailInfo;
