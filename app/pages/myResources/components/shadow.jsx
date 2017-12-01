import React from 'react';
import { Icon } from 'antd';

export default class ShadeComponent extends React.Component {

  static propTypes = {
    file: React.PropTypes.object.isRequired,
    downloadVcgImgs: React.PropTypes.func.isRequired,
    downStatus: React.PropTypes.bool.isRequired,
    favariteStatus: React.PropTypes.bool.isRequired,
    deleteFavarite: React.PropTypes.func.isRequired,
    downloadDamImgs: React.PropTypes.func.isRequired,
    unfavoriteImgsDam: React.PropTypes.func.isRequired,
  }
  style={
    position: 'absolute',
    top: '0px',
    left: 0,
    right: 0,
    color: 'white',
    fontSize: '16px',
    padding: '4px 10px',
    textAlign: 'right',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  }
  render() {
    let add2Favorite = <Icon title={'取消收藏'} type={'star'} key={`favorite-${this.props.file.id}`}
      style={{marginRight: '10px', 'cursor':'pointer'}}
      onClick={()=>{
        if(this.props.file.source=='vcg') {
          this.props.deleteFavarite(this.props.file.id);
        }else {
          this.props.unfavoriteImgsDam(this.props.file.id.toString());
        }
      }}/>;
    if(this.props.favariteStatus) {
      add2Favorite = <Icon type={'loading'}/>;
    }
    return (
      <div style={this.style}>
        {add2Favorite}
        {
          this.props.downStatus?<Icon type={'loading'}/>:<Icon title={'下载'} type={'download'} key={`download-${this.props.file.id}`}
            style={{marginRight: '0px', 'cursor':'pointer'}}
            onClick={()=>{
              if(this.props.file.source=='vcg') {
                let rfid = this.props.file.license_type=='rf'?this.props.file.id:'';
                this.props.downloadVcgImgs(this.props.file.id, rfid);
              }else {
                this.props.downloadDamImgs(this.props.file.id);
              }

            }}/>
        }

      </div>
    );
  }
}
