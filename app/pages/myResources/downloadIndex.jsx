import React from 'react';
import { notification, Table, Button, Row, Modal, DatePicker, Pagination, Radio, Select, Tabs, Col } from 'antd';
import VideoCell from './components/VideoCell';
const confirm = Modal.confirm;
import { connect } from 'react-redux';
import moment from 'moment';
const RadioGroup = Radio.Group;
const Option = Select.Option;
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import {
  purChase,
  fetchDownLoadLog,
  downloadVcgImgs,
  showModal,
  hideModal,
  downloadDamImgs,
  fetchDownLoadLogDam,
  fetchContractInfo,
} from './actionDownload';
const MonthPicker = DatePicker.MonthPicker;
const monthFormat = 'YYYY-MM';
const styles = {
  card: {
    width: '220px',
    margin: '8px',
    cursor: 'pointer',
  },
  modal: {
    top: 0,
    marginTop: '15%',
    padding:0,
    backgroundColor:'rgb(64,64,64)',
  },
  image: {
    height: '150px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom',
    position: 'relative',
  },
  videoCell: {
    margin: 'auto',
    height: '150px',
    maxWidth:'300px',
    cursor: 'pointer',
  },
  pagination: {
    background: '#fff',
    padding: '8px 16px',
    flex: '1 1 auto',
    textAlign: 'right',
  },
  oparation: {
    background: '#fff',
    padding: '5px 8px 0px',
    flex: '0 0 auto',
    textAlign: 'left',
  },
  table: {
    backgroundColor:'white',
    flex:'1 1 auto',
    margin:'0 8px',
    paddingTop:20,
  },
  line: {
    width:280,
    margin: '15px auto',
    fontSize:16,
    fontWeight:'bold',
  },
  label: {
    width:90,
    display:'inline-block',
  },
};

class MyDownLoad extends React.Component {

  static propTypes = {
    currentUser: React.PropTypes.object.isRequired,
    filterDownLoad: React.PropTypes.object.isRequired,
    isshowModal: React.PropTypes.bool.isRequired,
    purChaseStatus: React.PropTypes.bool.isRequired,
    downloadLog: React.PropTypes.object.isRequired,
    downStatus: React.PropTypes.bool.isRequired,
    purChase: React.PropTypes.func.isRequired,
    fetchDownLoadLog: React.PropTypes.func.isRequired,
    downloadVcgImgs: React.PropTypes.func.isRequired,
    hideModal: React.PropTypes.func.isRequired,
    showModal: React.PropTypes.func.isRequired,
    downloadDamImgs: React.PropTypes.func.isRequired,
    downloadLogDam: React.PropTypes.object.isRequired,
    filterDownLoadDam: React.PropTypes.object.isRequired,
    fetchDownLoadLogDam: React.PropTypes.func.isRequired,
    fetchContractInfo: React.PropTypes.func.isRequired,
    contractInfo: React.PropTypes.object.isRequired,
    gotCustomerType: React.PropTypes.number,
  }

  state = {
    photoid:0,
    purpose_code:1,
    product_size:'1',
    license_type:'',
    price:0,
    description:'无详情',
    sizeCode1:'',
    sizeCode2:'',
    sizeCode3:'',
    list:false,
    filterClassify:'all',
    filterConfirmStatus:'all',
    currentDownId: '',
    currentId: 0,
  }

  componentWillMount = () => {
    this.props.fetchDownLoadLog();
    this.props.fetchDownLoadLogDam();
    this.props.fetchContractInfo(this.props.currentUser.customerId);
  }


  //使用确认
  purChase = record => {
    let aa = this.props.contractInfo.data.media_use_price[0];
    let price = aa.price;
    let code = aa.useCategoryId;
    let description = this.props.contractInfo.data.media_use_price[0].description?this.props.contractInfo.data.media_use_price[0].description:'无详情';
    this.setState({
      photoid: record.photoid,
      license_type: record.license_type,
      purpose_code: 1,
      price: price,
      sizeCode1: code,
      currentDownId: record.down_id,
      currentId: record.id,
      description,
    });
    this.props.showModal();
  }

  //从日历控件上选择时间段
  onChange = (moment) => {
    console.log('moment === ', moment);
    let data = {
      start_date:moment.startOf('month').format('YYYY-MM-DD'),
      end_date:moment.endOf('month').format('YYYY-MM-DD'),
      moment,
    };
    this.setState({
      list:false,
      //filterClassify:'all',
      //confirmStatus:'all',
    });
    this.props.fetchDownLoadLog(data);
  }

  turnToPage = pageNum => this.props.fetchDownLoadLog({pageNum});

  turnToPage2 = pageNum => this.props.fetchDownLoadLogDam({pageNum});


  onOk = () => {
    let currentUser = this.props.currentUser;
    let sum = currentUser.maxDownAmount-(this.state.price+currentUser.downAmount);
    //let downsum = currentUser.maxDownCount-currentUser.downCount-1;
    if(sum>0||currentUser.maxDownAmount==-1) {
      if(this.state.purpose_code==1) {
        let resolution = this.props.contractInfo.data && this.props.contractInfo.data.imagepack_resolution;
        let size = '10';
        switch(resolution) {
        case '750':
          size = '1';
          break;
        case '1024':
          size = '2';
          break;
        case '1700':
          size = '5';
          break;
        case '2048':
          size = '8';
          break;
        case '2500':
          size = '10';
          break;
        case '4000':
          size = '28';
          break;
        case '5000':
          size = '48';
          break;
        default:
          size = '';
        }
        let param = {
          type: 1,
          photo_id: this.state.photoid,
          sale_mode: this.state.purpose_code,
          license_type: this.state.license_type,
          purpose_code: this.state.sizeCode1,
          purchaseTime: moment().format('YYYY-MM-DD HH:mm:ss'),
          price: this.state.price,
          product_size: size,
          down_id: this.state.currentDownId,
          id: this.state.currentId,
          purpose_name: this.props.contractInfo.data.media_use_price.find(x=>x.useCategoryId==this.state.sizeCode1).purposeName,
        };
        if(this.state.list) {
          let ll = this.state.list;
          let oo = ll.list.map(x=>{
            if(x.photoid==this.state.photoid) {
              x.purpose_name = param.purpose_name;
              x.purchaseTime = param.purchaseTime;
              x.price = param.price;
              x.purchased = true;
            }
            return x;
          });
          ll.list = oo;
          this.setState({list:ll});
        }
        this.props.purChase(param);
      }else {
        if(this.state.license_type == 'rm') {
          let param = {
            type:2,
            photo_id:this.state.photoid,
            sale_mode:this.state.purpose_code,
            license_type:this.state.license_type,
            product_size:this.state.sizeCode3,
            purpose_code:this.state.sizeCode2,
            purchaseTime:moment().format('YYYY-MM-DD HH:mm:ss'),
            price:this.state.price,
            down_id:this.state.currentDownId,
            id: this.state.currentId,
            purpose_name:this.props.contractInfo.data.business_use_price.find(x=>x.useId==this.state.sizeCode2).purposeName,
          };
          if(this.state.list) {
            let ll = this.state.list;
            let oo = ll.list.map(x=>{
              if(x.photoid==this.state.photoid) {
                x.purpose_name = param.purpose_name;
                x.purchaseTime = param.purchaseTime;
                x.price = param.price;
                x.purchased = true;
              }
              return x;
            });
            ll.list = oo;
            this.setState({list:ll});
          }
          this.props.purChase(param);
        }else if(this.state.license_type == 'rf') {
          let size='';
          switch (this.state.sizeCode3) {
          case '1':
            size = '750';
            break;
          case '2':
            size = '1024';
            break;
          case '5':
            size = '1700';
            break;
          case '8':
            size = '2048';
            break;
          case '10':
            size = '2500';
            break;
          case '28':
            size = '4000';
            break;
          case '48':
            size = '5000';
            break;
          default:
            size = '';
          }
          let productSize = this.props.contractInfo.data['business_size _price'].find(x=>x.productSize==size).productSize;
          let param = {
            type:3,
            photo_id:this.state.photoid,
            sale_mode:this.state.purpose_code,
            product_size:this.state.sizeCode3,
            license_type:this.state.license_type,
            purchaseTime:moment().format('YYYY-MM-DD HH:mm:ss'),
            price:this.state.price,
            down_id:this.state.currentDownId,
            id: this.state.currentId,
            purpose_name:this.getSize(productSize).n,
          };
          if(this.state.list) {
            let ll = this.state.list;
            let oo = ll.list.map(x=>{
              if(x.photoid==this.state.photoid) {
                x.purpose_name = param.purpose_name;
                x.purchaseTime = param.purchaseTime;
                x.price = param.price;
                x.purchased = true;
              }
              return x;
            });
            ll.list = oo;
            this.setState({list:ll});
          }
          this.props.purChase(param);
        }else {
          this.props.hideModal();
          notification.error({message: '编辑类图片的商业用途，请咨询客户代表'});
        }
      }
    } else {
      this.props.hideModal();
      notification.error({message: '您已超限额！'});
    }
  }

  onChangeRadio= (e) => {
    if(e.target.value==1) {
      this.setState({sizeCode1:this.props.contractInfo.data.media_use_price[0].useCategoryId});
      let description = this.props.contractInfo.data.media_use_price[0].description?this.props.contractInfo.data.media_use_price[0].description:'无详情';
      this.setState({price:this.props.contractInfo.data.media_use_price[0].price, description});
    }else {
      this.setState({price:''});
      if(this.state.license_type=='rm') {
        this.setState({sizeCode2:this.props.contractInfo.data.business_use_price[0].useId});
        let description = this.props.contractInfo.data.business_use_price[0].description?this.props.contractInfo.data.business_use_price[0].description:'无详情';
        this.setState({price:this.props.contractInfo.data.business_use_price[0].price, description});
        let obj = this.getSize(this.props.contractInfo.data['business_size _price'][0].productSize);
        this.setState({sizeCode3:obj.v});
      }else {
        let obj = this.getSize(this.props.contractInfo.data['business_size _price'][0].productSize);
        this.setState({price:this.props.contractInfo.data['business_size _price'][0].price, description:'无详情'});
        this.setState({sizeCode3:obj.v});
      }
    }
    this.setState({purpose_code:e.target.value});
  }

  onselectRmSize = v => {
    this.setState({sizeCode3:v});
  }

  onSelect= v => {
    if(this.state.purpose_code == 1) {
      let ff = this.props.contractInfo.data.media_use_price.find(x => x.useCategoryId == v);
      let price = ff.price;
      let description = ff.description ? ff.description : '无详情';
      this.setState({price:price, sizeCode1:v, description});
    } else {
      if(this.state.license_type == 'rm') {
        let ff = this.props.contractInfo.data.business_use_price.find(x => x.useId == v);
        let price = ff.price;
        let description = ff.description ? ff.description : '无详情';
        this.setState({price: price, sizeCode2: v, description});
      } else if(this.state.license_type == 'rf') {
        let size = '';
        switch (v) {
        case '1':
          size = '750';
          break;
        case '2':
          size = '1024';
          break;
        case '5':
          size = '1700';
          break;
        case '8':
          size = '2048';
          break;
        case '10':
          size = '2500';
          break;
        case '28':
          size = '4000';
          break;
        case '48':
          size = '5000';
          break;
        default:
          size = '';
        }
        let price = this.props.contractInfo.data['business_size _price'].find(x => x.productSize == size).price;
        this.setState({price:price, sizeCode3:v, description:'无详情'});
      }
    }
  }
  renderBackImg = (data) => {
    let file = data;
    let block;
    const imgUrl = file.small_url;
    const imageStyle = {
      ...styles.image,
      backgroundImage: `url(${imgUrl})`,
    };
    switch(file.asset_type) {
    case 2: {
      if (file.ossImgPath && file.ossVideoPath) {
        block = (<div style={{...styles.image}}>
          <VideoCell videoPath={file.ossVideoPath} videoId={file.id.toString()} style={ styles.videoCell }
            posterPath={file.ossImgPath}/>
        </div>);
      }
      break;
    }
    default:
      block = (<div style={imageStyle} />);
    }
    return block;
  }

  columns = [
    { width:'4%', title: '序号', key: 'num', render: (text, record, index) => (index+1)},
    { width:'20%', title: '缩略图', key: 'providerName', render: (text, record) => {return this.renderBackImg(record);}},
    { width:'4%', title: '图片分类', key: 'license_type', render: (text, record) => {
      if(record.license_type == 'rm') {
        return <span style={{color:'#1e97d6'}}>RM</span>;
      }else if(record.license_type == 'rf') {
        return <span style={{color:'#f37f02'}}>RF</span>;
      }else {
        return <span>编辑类</span>;
      }}},
    { width:'8%', title: '图片ID', dataIndex: 'photoid', key: 'photoid' },
    // { width:'8%', title: '下载用户', key: 'description', render: ()=> this.props.currentUser.userName},
    { width:'8%', title: '下载用户', key: 'realName', dataIndex: 'realName'},
    { width:'8%', title: '下载日期', dataIndex: 'downloadTime', key: 'downloadTime' },
    { width:'10%', title: '图片用途/图片尺寸', key: 'purpose_name', render: (text, record) => {
      if(record.purchased) {
        if(record.license_type=='rf') {
          if(record.purpose_name) {
            return record.purpose_name;
          }else {
            return this.getSize(record.product_size).n;
          }
        }else {
          return record.purpose_name;
        }
      }else {
        return '';
      }
    }},
    { width:'8%', title: '用途确认时间', dataIndex: 'purchaseTime', key: 'purchaseTime' },
    { width:'5%', title: '费用', dataIndex: 'price', key: 'price'},
    { width:'20%', title: '操作', key: 'buttons', render: (text, record) => {
      if(record.purchased) {
        return (<Row justify="end" style={{flex: '0 0 auto', padding: '16px 16px', textAlign: 'left'}}>
          <Button type="primary" loading={this.props.downStatus} size="large" style={{ marginRight: '16px' }} onClick={()=>{
            confirm({
              title: '以下图片已购买过，将从企业资源库下载，请确认。',
              content: record.photoid,
              onOk: () => {
                let rfid = record.license_type == 'rf' ? record.photoid : '';
                this.props.downloadVcgImgs(record.photoid, rfid, record.photoid);
              },
            });
          }}>下载</Button>
          <Button type="primary" disabled={true} size="large" onClick= {() => {alert('撤销');}}>撤销</Button>
        </Row>);
      }else {
        return (<Row justify="end" style={{flex: '0 0 auto', paddingLeft: 16, textAlign: 'left'}}>
          <Button type="primary" size="large" style={{ marginRight: '16px' }} onClick= {() => { this.purChase(record);}}>使用确认</Button>
          <Button type="primary" loading={this.props.downStatus} size="large" onClick={() => {
            let rfid = record.license_type == 'rf' ? record.photoid : '';
            this.props.downloadVcgImgs(record.photoid, rfid, '');
          }}>下载</Button>
        </Row>);
      }
    } },
  ];

  columns2 = [
    { width:'5%', title: '序号', key: 'num', render: (text, record, index) => index+1},
    { width:'30%', title: '缩略图', key: 'providerName', render: (text, record) => {return this.renderBackImg(record);}},
    { width:'5%', title: '图片分类', key: 'license_type', render: (text, record) => {
      if(record.license_type == 'rm') {
        return <span style={{color:'#1e97d6'}}>RM</span>;
      }else if(record.license_type == 'rf') {
        return <span style={{color:'#f37f02'}}>RF</span>;
      }}},
    { width:'10%', title: '图片ID', dataIndex: 'id', key: 'id' },
    { width:'15%', title: '下载用户', key: 'description', render: () => this.props.currentUser.userName},
    { width:'20%', title: '下载日期', dataIndex: 'updatedTime', key: 'updatedTime' },
    { width:'15%', title: '操作', key: 'buttons', render: (text, record) => {
      return (<Row justify="end" style={{flex: '0 0 auto', paddingLeft: 16, textAlign: 'left'}}>
        <Button type="primary" loading={this.props.downStatus} size="large" style={{ marginRight: '16px' }} onClick={() => {this.props.downloadDamImgs(record.id);}}>下载</Button>
      </Row>);
    }},
  ];

  changeClassify = (value) => {
    let result = 0;
    switch(value) {
    case 'rm':
      result = 1;
      break;
    case 'rf':
      result = 2;
      break;
    case 'rr':
      result = 3;
      break;
    case 'edit':
      result = 4;
      break;
    }
    this.setState({
      filterClassify: value,
    });
    //根据筛选条件去后台取下载记录：
    let data = {
      licenseType: result,
    };
    this.props.fetchDownLoadLog(data);
  }

  changeConfirmStatus = (value) => {
    this.setState({
      filterConfirmStatus: value,
    });
    //根据筛选条件去后台取下载记录：
    let result = 0;
    switch(value) {
    case '1':
      result = 2;
      break;
    case '2':
      result = 1;
      break;
    }
    let data = {
      confirmStatus: result,
    };
    this.props.fetchDownLoadLog(data);
  }

  getSize = (size) => {
    switch (size) {
    case '750':
      return {v:'1', n:'长边（750px 1M）'};
    case '1024':
      return {v:'2', n:'长边（1024px 2M）'};
    case '1700':
      return {v:'5', n:'长边（1700px 5M）'};
    case '2048':
      return {v:'8', n:'长边（2048px 8M）'};
    case '2500':
      return {v:'10', n:'长边（2500px 10M）'};
    case '4000':
      return {v:'28', n:'长边（4000px 28M）'};
    case '5000':
      return {v:'48', n:'长边（5000px 48M）'};
    default:
      return {v:'0', n:'未知的尺寸'};
    }
  }

  getStatus = () => {
    let {
      licenseType,
      confirmStatus,
      moment,
    } = this.props.filterDownLoad;
    let obj = {};
    switch(licenseType) {
    case 1:
      obj.licenseType = 'rm';
      break;
    case 2:
      obj.licenseType = 'rf';
      break;
    case 3:
      obj.licenseType = 'rr';
      break;
    case 4:
      obj.licenseType = 'edit';
      break;
    default:
      obj.licenseType = 'all';
      break;
    }

    switch(confirmStatus) {
    case 1:
      obj.confirmStatus = '2';
      break;
    case 2:
      obj.confirmStatus = '1';
      break;
    default:
      obj.confirmStatus = 'all';
      break;
    }
    obj.moment = moment;
    return obj;
  }

  render() {
    let obj = this.getStatus();
    let data = this.state.list ? this.state.list : this.props.downloadLog;
    console.log('我的下载模块 data(or state.list)--------> ', data);
    console.log('我的下载模块 this.props.downloadLog----->', this.props.downloadLog);
    //let data = this.props.downloadLog;
    let data2 = this.props.downloadLogDam.list;
    let currentUser = this.props.currentUser;
    let select = '';
    let utype = this.props.gotCustomerType;
    let canVCG = false;
    let canQY = false;
    switch(utype) {
    case 1:
      canVCG = true;
      canQY = true;
      break;
    case 2:
      canVCG = false;
      canQY = true;
      break;
    case 3:
      canVCG = true;
      canQY = false;
      break;
    default:
      break;
    }

    if(this.props.contractInfo.data) {
      if(this.state.purpose_code==1) {
        select = <div><div style={{...styles.line}}><label style={styles.label}>媒体用途:</label>
          <Select value={this.state.sizeCode1} style={{ width: 170 }} onChange={this.onSelect}>
            {this.props.contractInfo.data.media_use_price.map(x=>{
              return <Option title={x.purposeName} key={x.useCategoryId} value={x.useCategoryId}>{x.purposeName}</Option>;
            })}
          </Select>
        </div>
          <div style={styles.line}><label style={{width:85, display: 'block', float: 'left'}}>用途详情:</label><span style={{fontSize:14, display:'block', float:'left', width:175, lineHeight:'15px', fontWeight:'bold'}}>{this.state.description}</span></div>
          </div>;
      }else {
        if(this.state.license_type == 'rm') {
          select = <div><div style={{...styles.line}}><label style={styles.label}>商业用途:</label>
            <Select value={this.state.sizeCode2} style={{ width: 170 }} onChange={this.onSelect}>
              {this.props.contractInfo.data.business_use_price.map(x=>{
                return <Option title={x.purposeName} key={x.useId} value={x.useId}>{x.purposeName}</Option>;
              })}
            </Select>
          </div>
            <div style={styles.line}><label style={{width:85, display: 'block', float: 'left'}}>用途详情:</label><span style={{fontSize:14, display:'block', float:'left', width:175, lineHeight:'15px', fontWeight:'bold'}}>{this.state.description}</span></div>
              <div style={{clear:'both'}}/>
              <div style={{...styles.line}}><label style={styles.label}>图片规格:</label>
                <Select value={this.state.sizeCode3} style={{ width: 170 }} onChange={this.onselectRmSize}>
                  {this.props.contractInfo.data['business_size _price'].map(x=>{
                    let obj = this.getSize(x.productSize);
                    return <Option key={obj.v} value={obj.v}>{obj.n}</Option>;
                  })}
                </Select>
              </div>
            </div>;
        }else if(this.state.license_type == 'rf') {
          select = <div><div style={{...styles.line}}><label style={styles.label}>图片规格:</label>
            <Select value={this.state.sizeCode3} style={{ width: 170 }} onChange={this.onSelect}>
              {this.props.contractInfo.data['business_size _price'].map(x=>{
                let obj = this.getSize(x.productSize);
                return <Option key={obj.v} value={obj.v}>{obj.n}</Option>;
              })}
            </Select>
          </div>
            <div style={styles.line}><label style={{width:85, display: 'block', float: 'left'}}>用途详情:</label><span style={{fontSize:14, display:'block', float:'left', width:175, lineHeight:'15px', fontWeight:'bold'}}>{this.state.description}</span></div>
            </div>;
        }
      }
    }

    return (
      <div style={{height:'100%', overflow:'auto'}}>
        <Tabs style={styles.table} size='large'>
          {canVCG ? <Tabs.TabPane tab={<span style={{fontWeight:'bold', fontSize:16}}>{'资源库下载记录'}</span>} key="1">
            <div style={{display: 'flex', flexFlow: 'column nowrap', height:'100%', overflow:'auto'}}>
              <div style={styles.oparation}>
                <MonthPicker style={{float:'left'}} allowClear={false} onChange={this.onChange} size="large" value={obj.moment} format={monthFormat} />
                <div style={{float:'left', marginLeft:20}}><label>图片分类：</label>
                  <Select size='large' value={obj.licenseType} style={{ width: 80 }} onChange={this.changeClassify}>
                    <Select.Option value="all">全部</Select.Option>
                    <Select.Option value="rf">创意RF</Select.Option>
                    <Select.Option value="rm">创意RM</Select.Option>
                    <Select.Option value="edit">编辑类</Select.Option>
                  </Select>
                </div>
                <div style={{float:'left', marginLeft:20}}><label>确认状态：</label>
                  <Select size='large' value={obj.confirmStatus} style={{ width: 80 }} onChange={this.changeConfirmStatus}>
                    <Select.Option value="all">全部</Select.Option>
                    <Select.Option value="1">已确认</Select.Option>
                    <Select.Option value="2">未确认</Select.Option>
                  </Select>
                </div>
                <Row style={{width:180, float:'right'}}>
                  <Row style={{marginBottom:4}}>
                    <Col span={10}>下载数量：</Col>
                    <Col style={{textAlign:'center'}} span={10}>{currentUser.maxDownCount==-1?`${parseInt(currentUser.downCount)}/无限额`:`${parseInt(currentUser.downCount)}/${parseInt(currentUser.maxDownCount)}`}</Col>
                  </Row>
                  <Row>
                    <Col span={10}>使用金额：</Col>
                    <Col style={{textAlign:'center'}} span={10}>{currentUser.maxDownAmount==-1?`${parseInt(currentUser.downAmount)}/无限额`:`${parseInt(currentUser.downAmount)}/${parseInt(currentUser.maxDownAmount)}`}</Col>
                  </Row>
                </Row>
              </div>
              <Table style={styles.table} rowKey={(record, index) => `${record.photoid}${index}`} bordered columns={this.columns} dataSource={data.list} pagination={false}/>
              <Pagination
                style={styles.pagination}
                current={this.props.filterDownLoad.pageNum}
                pageSize={this.props.filterDownLoad.pageSize}
                total={data.total_count?data.total_count:0}
                onChange={this.turnToPage} />
            </div>
          </Tabs.TabPane> : ''}
          {canQY ? <Tabs.TabPane tab={<span style={{fontWeight:'bold', fontSize:16}}>{'企业资源库下载记录'}</span>} key="2">
            <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
              <Table style={styles.table} rowKey={(record, index) => `${record.photoid}${index}`} bordered columns={this.columns2} dataSource={data2} pagination={false}/>
              <Pagination
                style={styles.pagination}
                current={this.props.filterDownLoadDam.pageNum}
                pageSize={this.props.filterDownLoadDam.pageSize}
                total={this.props.downloadLogDam.total}
                onChange={this.turnToPage2} />
            </div>
          </Tabs.TabPane> : ''}
        </Tabs>
        <Modal
          title="使用确认"
          style={styles.modal}
          visible={this.props.isshowModal}
          okText="确认"
          cancelText="取消"
          onOk={this.onOk}
          confirmLoading={this.props.purChaseStatus}
          onCancel={this.props.hideModal}
          wrapClassName="full-screen-modal"
        >
          <div style={styles.line}><label style={styles.label}>图片用途类型:</label>
            <RadioGroup onChange={this.onChangeRadio} value={this.state.purpose_code}>
              <Radio value={1}>媒体用途</Radio>
              <Radio value={2}>商业用途</Radio>
            </RadioGroup>
          </div>
          {select}
          <div style={{clear:'both'}}/>
          <div style={styles.line}><label style={styles.label}>图片费用:</label><span style={{color:'#F84949'}}>{this.state.price}</span></div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser:state.login.currentUser,
    filterDownLoad:state.myDownload.filterDownLoad,
    downloadLog:state.myDownload.downloadLog,
    isshowModal:state.myDownload.isshowModal,
    downStatus:state.myDownload.downStatus,
    purChaseStatus:state.myDownload.purChaseStatus,
    downloadLogDam:state.myDownload.downloadLogDam,
    filterDownLoadDam:state.myDownload.filterDownLoadDam,
    contractInfo:state.myDownload.contractInfo,
    gotCustomerType:state.login.gotCustomerType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    purChase: (file) => dispatch(purChase(file)),
    fetchDownLoadLog: (data) => dispatch(fetchDownLoadLog(data)),
    downloadVcgImgs: (ids, rfids, damIds) => dispatch(downloadVcgImgs(ids, rfids, damIds)),
    showModal: () => dispatch(showModal()),
    hideModal: () => dispatch(hideModal()),
    downloadDamImgs: (id) => dispatch(downloadDamImgs(id)),
    fetchDownLoadLogDam: (data) => dispatch(fetchDownLoadLogDam(data)),
    fetchContractInfo: (customerId) => dispatch(fetchContractInfo(customerId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDownLoad);
