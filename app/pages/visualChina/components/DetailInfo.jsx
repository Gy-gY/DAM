import React, {PropTypes} from 'react';
import { Button, Row } from 'antd';
import './usercenter.css';
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
    file: React.PropTypes.object,
    form: React.PropTypes.object,
    filter: React.PropTypes.object.isRequired,
    downloadVcgImgs: React.PropTypes.func,
    downStatus: React.PropTypes.bool,
    currentUser:PropTypes.object,
    favariteStatus: React.PropTypes.bool.isRequired,
    addFavariteForList: React.PropTypes.func.isRequired,
    deleteFavarite: React.PropTypes.func.isRequired,
    vcgSearch: React.PropTypes.func.isRequired,
    closeDetailModal: React.PropTypes.func.isRequired,

  }

  render() {
    let { file} = this.props;
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
    let title = this.props.filter.type=='Creative'?file.title:file.groupTitle;
   // let detail = this.props.filter.type=='Creative'?file.caption:file.caption;
    let copyright = file.copyright;
    if(this.props.filter.type!='Creative'&&copyright.length<=0) {
      copyright = '无肖像权、物权/如果用于商业用途，请电话咨询客户代表';
    }
    let favoriteIcon = file.isfavorite?'star':'star-o';
    let keywords = [];
    if(file.keywords&&file.keywords.length>0) {
      keywords = file.keywords.split(',');
    }

    let license = file.license_type=='rf'?<span style={{color:'#f37f02'}}>{'RF（免版税金使用版权图片）'}</span>:<span style={{color:'#1e97d6'}}>{'RM （特定适用范围版权图片）'}</span>;
    return (
      <div style={baseStyle}>
        <Row justify="end" style={{rediuBorders:5, padding: '6px 0px', textAlign: 'center'}}>
          <Button type="primary" icon='download' size="large" style={{width: '100%'}}
            loading={this.props.downStatus}
            onClick={()=>{
              let rfId = file.license_type=='rf'?file.id:'';
              this.props.downloadVcgImgs(file.id, rfId);
            }} >图片下载</Button>
          <Button type="primary" loading={this.props.favariteStatus} icon={favoriteIcon} size="large" style={{marginTop:10, width: '100%'}}
            onClick={()=>{
              if(file.isfavorite) {
                this.props.deleteFavarite(file.id);
              }else {
                this.props.addFavariteForList([file]);
              }
            }} >图片收藏</Button>
          {this.props.filter.type=='Creative'?<Button type="primary" loading={this.props.favariteStatus} icon='search' size="large" style={{marginTop:10, width: '100%'}}
            onClick={()=>{
              this.props.closeDetailModal();
              this.props.vcgSearch({likeId:file.id, likedUrl:file.small_url});
            }} >相似图查找</Button>:''}
        </Row>
        <div>
          <h2 style={styles.info.h2}>{title}</h2>
          <div style={styles.info.base}>{'基本信息'}</div>
          <div style={styles.info.line}><label style={styles.info.label}>ID:</label><span style={styles.info.text}>{file.id}</span></div>
          <div style={styles.info.line}><label style={styles.info.label}>规格:</label><span style={styles.info.text}>{`${file.width} x ${file.height} px`}</span></div>
          {this.props.filter.type=='Creative'?'':<div style={styles.info.line}><label style={styles.info.label}>上线时间:</label><span style={styles.info.text}>{file.online_time}</span></div>}
          <div style={styles.info.line}><label style={styles.info.label}>授权方式:</label><span style={styles.info.text}>{license}</span></div>
          <div style={styles.info.line}><label style={styles.info.label}>肖像权/物权:</label><span style={styles.info.text}>{copyright}</span></div>
          {this.props.filter.type=='Creative'?'':<div style={styles.info.line2}><label style={styles.info.label}>资源说明:</label><span style={styles.info.text}>{file.caption}</span></div>}
          {this.props.filter.type=='Creative'?<div style={styles.info.line2}><label style={styles.info.label}>关键字:</label></div>:''}
          {this.props.filter.type=='Creative'?<div style={styles.info.keyword}>
            {keywords.map((x, i)=>{
              return <div key={`${x}${i}`} onClick={()=>{
                this.props.closeDetailModal();
                this.props.vcgSearch({keyword:x});
              }} className={'keywords'}>{x}</div>;
            })}
          </div>:''}
          {this.props.filter.type=='Creative'?<div style={styles.info.line3}><label style={styles.info.label}>版权申明:</label><div><span style={styles.info.text}>{'  本网站所有图片及影视，音乐素材均由本公司或版权所有人授权发布，在中华人民共和国境内，本公司有权办理该图片素材或影视素材的授权使用许可，如果您侵犯了该图片素材或影视素材的知识产权，版权所有人有权依据著作权侵权惩罚性赔偿标准或最高达50万元人民币的法定赔偿标准，要求您赔偿本公司的损失。'}</span></div>
            <div><span style={styles.info.text}>{'  本公司是国内专注创意图片、视频内容授权、版权清除和委托拍摄等专业产品和服务提供商，通过本公司中文网站平台，为您提供来自全球的优质创意图片、影视素材以及音乐素材。内容不断补充的图片库，影视素材库，音乐素材库，是您专属的优质创意内容合作伙伴。'}</span></div></div>:''}

        </div>

      </div>
    );
  }
}

export default DetailInfo;
