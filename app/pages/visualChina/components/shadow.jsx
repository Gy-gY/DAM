import React from 'react';
import { Icon } from 'antd';

export default class ShadeComponent extends React.Component {

  static propTypes = {
    file: React.PropTypes.object.isRequired,
    downloadVcgImgs: React.PropTypes.func.isRequired,
    downStatus: React.PropTypes.bool.isRequired,
    favariteStatus: React.PropTypes.bool.isRequired,
    addFavariteForList: React.PropTypes.func.isRequired,
    deleteFavarite: React.PropTypes.func.isRequired,
    vcgSearch: React.PropTypes.func.isRequired,
    filter: React.PropTypes.object.isRequired,
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
    let add2Favorite = this.props.file.isfavorite?<Icon title={'取消收藏'} type={'star'} key={`favorite-${this.props.file.id}`}
      style={{marginRight: '10px', 'cursor':'pointer'}}
      onClick={()=>{
        this.props.deleteFavarite(this.props.file.id);
      }}/>:<Icon title={'收藏'} type={'star-o'} key={`favorite-${this.props.file.id}`}
        style={{marginRight: '10px', 'cursor':'pointer'}}
        onClick={()=>{
          this.props.addFavariteForList([this.props.file]);
        }}/>;
    if(this.props.favariteStatus) {
      add2Favorite = <Icon type={'loading'}/>;
    }
    return (
      <div style={this.style}>
        {this.props.filter.type=='Creative'?
          <Icon title={'相似图查找'} type={'search'} key={`search-${this.props.file.id}`}
            style={{marginRight: '10px', 'cursor':'pointer'}}
            onClick={()=>{
              this.props.vcgSearch({likeId:this.props.file.id, likedUrl:this.props.file.small_url});
            }}/>:''}
        {add2Favorite}
        {
          this.props.downStatus?<Icon type={'loading'}/>:<Icon title={'下载'} type={'download'} key={`download-${this.props.file.id}`}
            style={{marginRight: '0px', 'cursor':'pointer'}}
            onClick={()=>{
              let reids = this.props.file.license_type=='rf'?this.props.file.id:'';
              this.props.downloadVcgImgs(this.props.file.id, reids);
            }}/>
        }

      </div>
    );
  }
}
