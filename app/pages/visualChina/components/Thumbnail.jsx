import React from 'react';
import { Card } from 'antd';
import ShadeComponent from './shadow';

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
    height: 65,
    fontWeight:'bold',
    fontSize:14,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
};

export default class Thumbnial extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    favariteStatus: React.PropTypes.bool.isRequired,
    file: React.PropTypes.object.isRequired,
    filter: React.PropTypes.object.isRequired,
    deleteFile: React.PropTypes.func,
    toggleDetailModal_audit: React.PropTypes.func,
    vcgSearch: React.PropTypes.func.isRequired,
    selectImg_search: React.PropTypes.func,
    selectedFiles: React.PropTypes.array,
    renderShade: React.PropTypes.func, //自定义shade行为
    showModal: React.PropTypes.func,
    downloadVcgImgs: React.PropTypes.func.isRequired,
    downStatus: React.PropTypes.bool.isRequired,
    addFavariteForList: React.PropTypes.func.isRequired,
    deleteFavarite: React.PropTypes.func.isRequired,
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
      left:0,
      fontFamily:'tahoma',
      color:'white',
      borderRadius:'10px',
      padding:'2px 5px',
      zIndex:2,
    },
  }

  renderBackImg = (file) => {
    let block;
    const imgUrl = file.small_url;
    const imageStyle = {
      ...styles.image,
      backgroundImage: `url(${imgUrl})`,
    };
    block = (<div style={imageStyle} />);

    return block;
  }
  getCaption(len) {
    let str = this.props.filter.type=='Creative'?this.props.file.id:this.props.file.groupTitle;
    let str_length = 0;
    let str_len = 0;
    let str_cut = new String();
    if(str&&str.length) {
      str_len = str.length;
    }
    for(var i = 0;i<str_len;i++) {
      let a = str.charAt(i);
      str_length++;
      if(escape(a).length > 4)
      {
       //中文字符的长度经编码之后大于4
        str_length++;
      }
      str_cut = str_cut.concat(a);
      if(str_length>=len)
       {
        str_cut = str_cut.concat('...');
        return str_cut;
      }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if(str_length<len) {
      return str;
    }
  }
  render() {
    let bg={color:'', msg:''};
    if(this.props.file.license_type == 'rm') {
      bg.color = '#1e97d6';//rm
      bg.msg = 'RM';
    }else if(this.props.file.license_type == 'rf') {
      bg.color = '#f37f02';//rf
      bg.msg = 'RF';
    }

    let cardStyle = styles.card;
    if (this.props.selectedFiles.find(fil=>fil.id==this.props.file.id)) {
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
          onClick={this.props.selectImg_search}
          onMouseOver={()=> this.setState({showShade: true})}
          onMouseLeave={()=> this.setState({showShade: false})}
          onDoubleClick={this.props.showModal}
        >
          {
            this.renderBackImg(this.props.file)
          }
          {
            this.state.showShade?<ShadeComponent filter={this.props.filter} vcgSearch={this.props.vcgSearch} deleteFavarite={this.props.deleteFavarite} addFavariteForList={this.props.addFavariteForList} favariteStatus={this.props.favariteStatus} downStatus={this.props.downStatus} downloadVcgImgs={this.props.downloadVcgImgs} file={this.props.file}/>:''
          }

          <div style={styles.body}>
            {this.getCaption(46)}
          </div>
        </Card>
      </div>
    );
  }
}
