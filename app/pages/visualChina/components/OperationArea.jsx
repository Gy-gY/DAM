import React from 'react';
import { Row, Button, Select, Radio, Input, notification } from 'antd';

let Search = Input.Search;
export default class OperationArea extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    filter: React.PropTypes.object,
    vcgSearch: React.PropTypes.func.isRequired,
    selectAll: React.PropTypes.func.isRequired,
    reversSelection: React.PropTypes.func.isRequired,
    selectedFiles: React.PropTypes.array,
    vcgImages: React.PropTypes.object.isRequired,
    downloadVcgImgs: React.PropTypes.func.isRequired,
    downStatus: React.PropTypes.bool.isRequired,
    addFavariteForList: React.PropTypes.func.isRequired,
    changeKeyword: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object.isRequired,

  }
  onChangeLicense_type = (e) => {
    this.props.vcgSearch({license_type:e.target.value, page:1});
  }
  onChangeSort = (e) => {
    this.props.vcgSearch({sort:e.target.value, page:1});
  }
  onSelectOrientation = (value) => {
    this.props.vcgSearch({orientation:value, page:1});
  }
  onSelectGraphical_style = (value) => {
    this.props.vcgSearch({graphical_style:value, page:1});
  }
  onChangeType = (e) => {
    this.props.vcgSearch({type:e.target.value, graphical_style:'', page:1});
  }
  onSearch = (v)=>{
    this.props.vcgSearch({keyword:v, page:1});
  }
  clickDownload = ()=>{
    if(this.props.selectedFiles.length>10) {
      notification.warning({message: '单次下载不要超过10个资源！'});
    }else {
      let idsArray = this.props.selectedFiles.map(x=>x.id);
      let reids = this.props.selectedFiles.filter(x=>x.license_type=='rf');
      let reidsstr = reids.map(x=>x.id).join(',');
      let ids = idsArray.join(',');
      this.props.downloadVcgImgs(ids, reidsstr);
    }
  }
  likeImgStyle = {
    width: 50,
    height: 50,
    top:8,
    right:5,
    cursor:'pointer',
    float:'right',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    position: 'relative',
  }

  render() {
    let imgUrl = this.props.filter.likedUrl;
    let likedImg = (this.props.filter.likeId&&this.props.vcgImages&&this.props.vcgImages.list)?<div title = '取消相似搜索' style={{...this.likeImgStyle, backgroundImage: `url(${imgUrl})`}} onClick={()=>{this.props.vcgSearch({likeId:''});}}>
    </div>:'';


    let currentUser = this.props.currentUser;
    let alldiable = (this.props.vcgImages&&this.props.vcgImages.list&&this.props.selectedFiles.length==this.props.vcgImages.list.length)?true:false;
    let select = this.props.filter.type=='Creative'?<Select value={this.props.filter.graphical_style} style={{ width: 80 }} onChange={this.onSelectGraphical_style}>
      <Select.Option value="">全部</Select.Option>
      <Select.Option value="1">摄影图片</Select.Option>
      <Select.Option value="2">插画</Select.Option>
      <Select.Option value="5">矢量图</Select.Option>
    </Select>:'';
    return (
      <Row style={this.props.style} type="flex" justify="space-between">

        <div style={{width:'100%'}}>
          <Radio.Group value={this.props.filter.license_type} onChange={this.onChangeLicense_type}>
            <Radio.Button value="">全部</Radio.Button>
            <Radio.Button value="rm">RM</Radio.Button>
            <Radio.Button value="rf">RF</Radio.Button>
          </Radio.Group>

          {this.props.filter.type=='Creative'?<label style={{ marginLeft: 25 }}>素材类型：</label>:''}
          {select}

          <label style={{ marginLeft: 25 }}>构图：</label>
          <Select defaultValue={this.props.filter.orientation} style={{ width: 60 }} onChange={this.onSelectOrientation}>
            <Select.Option value="">全部</Select.Option>
            <Select.Option value="1">横图</Select.Option>
            <Select.Option value="2">竖图</Select.Option>
            <Select.Option value="3">方图</Select.Option>
          </Select>

          <Radio.Group style={{ marginLeft: 25 }} value={this.props.filter.sort} onChange={this.onChangeSort}>
            <Radio.Button value="best">最佳匹配</Radio.Button>
            <Radio.Button value="time">最新</Radio.Button>
          </Radio.Group>

          <Radio.Group style={{ marginLeft: 25 }} value={this.props.filter.type} onChange={this.onChangeType}>
            <Radio.Button disabled={!currentUser.permissions.includes('vcg_view')} value="Creative">创意图片</Radio.Button>
            <Radio.Button disabled={!currentUser.permissions.includes('vcg_edit_view')} value="Edit">编辑图片</Radio.Button>
          </Radio.Group>

          <Search
            placeholder="请输入ID或关键字查询"
            size='large'
            value={this.props.filter.keyword}
            onChange={(e)=>{
              this.props.changeKeyword(e.target.value);
            }}
            style={{ width: 200, float:'right' }}
            onSearch={this.onSearch}
          />

          {likedImg}
          <Button
            style={{ margin: '19px 16px 17px 8px', float:'right' }}
            disabled={this.props.selectedFiles.length==0}
            onClick={this.props.reversSelection}>
            反选
          </Button>
          <Button
            style={{ margin: '19px 8px', float:'right' }}
            disabled={alldiable}
            onClick={this.props.selectAll}>
            全选
          </Button>
          <Button
            type="primary"
            style={{ margin: '19px 8px', float:'right' }}
            disabled={this.props.selectedFiles.length<=0}
            onClick={this.clickDownload}
            loading={this.props.downStatus}
          >
            下载
          </Button>

          <span style={{display:'inline-block', float:'right', fontSize: 16, marginRight:15}}>
            共选中 <span style={{color:'red'}}>{this.props.selectedFiles.length}</span> 张图片
          </span>
        </div>
      </Row>
    );
  }


}
