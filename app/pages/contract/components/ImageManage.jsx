import React from 'react';
import { Table, Button, Row, Modal, DatePicker, Pagination, Radio, Select, Col, notification } from 'antd';
const confirm = Modal.confirm;
import moment from 'moment';
import VideoCell from '../../myResources/components/VideoCell';
const RadioGroup = Radio.Group;
const Option = Select.Option;
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
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
    flex: '0 0 auto',
    textAlign: 'right',
  },
  oparation: {
    background: '#fff',
    padding: '20px 8px',
    flex: '0 0 auto',
    textAlign: 'left',
  },
  table: {
    backgroundColor:'white',
    flex:'1 1 auto',
    margin:'0 8px',
  },
  line: {
    width:260,
    margin: '15px auto',
    fontSize:16,
    fontWeight:'bold',
  },
  label: {
    width:85,
    display:'inline-block',
  },
};


export default class ImageManage extends React.Component {
  static propTypes = {
    fetchDownLoadLog: React.PropTypes.func,
    downloadLog: React.PropTypes.object,
    filterDownLoad: React.PropTypes.object,
    isshowModal: React.PropTypes.bool,
    showModal: React.PropTypes.func,
    hideModal: React.PropTypes.func,
    purChase: React.PropTypes.func,
    currentUser: React.PropTypes.object,
    downStatus: React.PropTypes.bool,
    downloadVcgImgs: React.PropTypes.func,
    downloadLogDam: React.PropTypes.object,
    fetchContractInfoMM: React.PropTypes.func,
    contractInfoMM: React.PropTypes.object,
    fetchDownLoadLogDam: React.PropTypes.func,
    fetchAllUsrs: React.PropTypes.func,
    allUserList: React.PropTypes.array,
    fetchDownCount: React.PropTypes.func,
    downcount: React.PropTypes.object,
    purChaseStatus: React.PropTypes.bool,
  }

  state = {
    photoid: 0,
    purpose_code: 1,
    product_size: '1',
    price: 150,
    purchased: true,
    list: false,
    filterClassify: 'all',
    filterConfirmStatus: 'all',
    description: '无详情',
    filterUser: 'all',
    currentDownId: '',
    currentId: 0,
  }

  onChange = moment => {
    let data = {
      start_date:moment.startOf('month').format('YYYY-MM-DD'),
      end_date:moment.endOf('month').format('YYYY-MM-DD'),
      moment,
    };
    this.props.fetchDownLoadLog(data);
  }

  componentDidMount = () => {
    this.props.fetchDownLoadLog();
    this.props.fetchDownCount();
    this.props.fetchContractInfoMM();
    this.props.fetchAllUsrs();
  }

  purChase = record => {
    let aa = this.props.contractInfoMM.data.media_use_price[0];
    let price = aa.price;
    let code = aa.useCategoryId;
    let description = this.props.contractInfoMM.data.media_use_price[0].description?this.props.contractInfoMM.data.media_use_price[0].description:'无详情';
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

  turnToPage = pageNum => this.props.fetchDownLoadLog({pageNum});

  onOk = () => {
    let currentUser = this.props.currentUser;
    let sum = currentUser.maxDownAmount - (this.state.price+currentUser.downAmount);
    if(sum > 0 || currentUser.maxDownAmount == -1) {
      if(this.state.purpose_code==1) {

        let resolution = this.props.contractInfoMM.data && this.props.contractInfoMM.data.imagepack_resolution;
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
          purpose_name: this.props.contractInfoMM.data.media_use_price.find(x => x.useCategoryId == this.state.sizeCode1).purposeName,
        };
        if(this.state.list) {
          let ll = this.state.list;
          let oo = ll.list.map(x => {
            if(x.photoid == this.state.photoid) {
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
      } else {
        if(this.state.license_type == 'rm') {
          let param = {
            type:2,
            photo_id:this.state.photoid,
            sale_mode:this.state.purpose_code,
            product_size:this.state.sizeCode3,
            license_type:this.state.license_type,
            purpose_code:this.state.sizeCode2,
            purchaseTime:moment().format('YYYY-MM-DD HH:mm:ss'),
            price:this.state.price,
            down_id:this.state.currentDownId,
            id:this.state.currentId,
            purpose_name:this.props.contractInfoMM.data.business_use_price.find(x=>x.useId==this.state.sizeCode2).purposeName,
          };
          if(this.state.list) {
            let ll = this.state.list;
            let oo = ll.list.map(x => {
              if(x.photoid == this.state.photoid) {
                x.purpose_name = param.purpose_name;
                x.purchaseTime = param.purchaseTime;
                x.price = param.price;
                x.purchased = true;
              }
              return x;
            });
            ll.list = oo;
            this.setState({list: ll});
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
          let productSize = this.props.contractInfoMM.data['business_size _price'].find(x=>x.productSize==size).productSize;
          let param = {
            type:3,
            photo_id:this.state.photoid,
            sale_mode:this.state.purpose_code,
            product_size:this.state.sizeCode3,
            license_type:this.state.license_type,
            purchaseTime:moment().format('YYYY-MM-DD HH:mm:ss'),
            price:this.state.price,
            down_id:this.state.currentDownId,
            id:this.state.currentId,
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
    }else {
      this.props.hideModal();
      notification.error({message: '您已超限额！'});
    }
  }

  onChangeRadio = e => {
    if(e.target.value == 1) {
      this.setState({sizeCode1:this.props.contractInfoMM.data.media_use_price[0].useCategoryId});
      let description = this.props.contractInfoMM.data.media_use_price[0].description?this.props.contractInfoMM.data.media_use_price[0].description:'无详情';
      this.setState({price:this.props.contractInfoMM.data.media_use_price[0].price, description});
    } else {
      this.setState({price:''});
      if(this.state.license_type=='rm') {
        this.setState({sizeCode2:this.props.contractInfoMM.data.business_use_price[0].useId});
        let description = this.props.contractInfoMM.data.business_use_price[0].description?this.props.contractInfoMM.data.business_use_price[0].description:'无详情';
        this.setState({price:this.props.contractInfoMM.data.business_use_price[0].price, description});
        let obj = this.getSize(this.props.contractInfoMM.data['business_size _price'][0].productSize);
        this.setState({sizeCode3:obj.v});
      } else {
        let obj = this.getSize(this.props.contractInfoMM.data['business_size _price'][0] && this.props.contractInfoMM.data['business_size _price'][0].productSize);
        this.setState({price:this.props.contractInfoMM.data['business_size _price'][0] && this.props.contractInfoMM.data['business_size _price'][0].price, description:'无详情'});
        this.setState({sizeCode3:obj.v});
      }
    }
    this.setState({purpose_code:e.target.value});
  }


  onselectRmSize = v => {
    this.setState({sizeCode3: v});
  }

  onSelect= v => {
    if(this.state.purpose_code == 1) {
      let ff = this.props.contractInfoMM.data.media_use_price.find(x => x.useCategoryId == v);
      let price = ff.price;
      let description = ff.description ? ff.description : '无详情';
      this.setState({price: price, sizeCode1: v, description});
    }else {
      if(this.state.license_type == 'rm') {
        let ff = this.props.contractInfoMM.data.business_use_price.find(x => x.useId == v);
        let price = ff.price;
        let description = ff.description ? ff.description : '无详情';
        this.setState({price: price, sizeCode2: v, description});
      }else if(this.state.license_type == 'rf') {
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
        let price = this.props.contractInfoMM.data['business_size _price'].find(x => x.productSize == size).price;
        this.setState({
          price: price,
          sizeCode3: v,
          description: '无详情',
        });
      }
    }
  }

  renderBackImg = data => {
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
    { width:'8%', title: '下载用户', key: 'realName', dataIndex: 'realName'},
    { width:'8%', title: '下载日期', dataIndex: 'downloadTime', key: 'downloadTime' },
    { width:'10%', title: '图片用途/图片尺寸', key: 'purpose_name', render: (text, record) => {
      if(record.purchased) {
        if(record.license_type=='rf') {
          if(record.purpose_name) {
            return record.purpose_name;
          } else {
            return this.getSize(record.product_size).n;
          }
        } else {
          return record.purpose_name;
        }
      } else {
        return '';
      }
    }},
    { width:'8%', title: '用途确认时间', dataIndex: 'purchaseTime', key: 'purchaseTime' },
    { width:'5%', title: '费用', dataIndex: 'price', key: 'price' },
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
            this.props.downloadVcgImgs(record.photoid, rfid, '' );
          }}>下载</Button>
        </Row>);
      }
    } },
  ];


  changeDate = moment => {
    let data = {
      start_date: moment.startOf('month').format('YYYY-MM-DD'),
      end_date: moment.endOf('month').format('YYYY-MM-DD'),
      moment,
    };
    this.setState({
      list: false,
    });
    this.props.fetchDownLoadLog(data);
  }

  changeClassify = value => {
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

  changeConfirmStatus = value => {
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

  changeUser = value => {
    this.setState({
      filterUser: value,
    });
    //根据筛选条件去后台取下载记录：
    let data = {
      user_id: value,
    };
    this.props.fetchDownLoadLog(data);
  }

  getSize = size => {
    switch(size) {
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
    obj.user = this.props.filterDownLoad.user_id;
    return obj;
  }

  render = () => {
    let obj_c = this.getStatus();
    let children = [<Option key={'all'}>{'全部'}</Option>];
    let ulist = this.props.allUserList;
    if (ulist.length > 0) {
      ulist.forEach(item => {
        children.push(<Option key={item.userId}>{item.realName}</Option>);
      });
    }
    let download_count = this.props.downcount.data ? this.props.downcount.data.downCount : 0;
    let data = this.state.list ? this.state.list : this.props.downloadLog;
    //let data = this.props.downloadLog;
    console.log('合同模块 data(or state.list)--------> ', data);
    console.log('合同模块 this.props.downloadLog----->', this.props.downloadLog);
    let select = '';
    if(this.props.contractInfoMM.data) {
      if(this.state.purpose_code == 1) {
        select = <div><div style={{...styles.line}}><label style={styles.label}>媒体用途:</label>
          <Select value={this.state.sizeCode1} style={{ width: 170 }} onChange={this.onSelect}>
            {this.props.contractInfoMM.data.media_use_price.map(x => {
              return <Option title={x.purposeName} key={x.useCategoryId} value={x.useCategoryId}>{x.purposeName}</Option>;
            })}
          </Select>
        </div>
          <div style={styles.line}><label style={{width: 85, display: 'block', float: 'left'}}>用途详情:</label><span style={{fontSize:14, display:'block', float:'left', width:175, lineHeight:'15px', fontWeight:'bold'}}>{this.state.description}</span></div>
      </div>;
      }else {
        if(this.state.license_type == 'rm') {
          select = <div><div style={{...styles.line}}><label style={styles.label}>商业用途:</label>
            <Select value={this.state.sizeCode2} style={{ width: 170 }} onChange={this.onSelect}>
              {this.props.contractInfoMM.data.business_use_price.map(x => {
                return <Option title={x.purposeName} key={x.useId} value={x.useId}>{x.purposeName}</Option>;
              })}
            </Select>
          </div>
            <div style={styles.line}><label style={{width:85, display: 'block', float: 'left'}}>用途详情:</label><span style={{fontSize:14, display:'block', float:'left', width:175, lineHeight:'15px', fontWeight:'bold'}}>{this.state.description}</span></div>
              <div style={{clear:'both'}}/>
              <div style={{...styles.line}}><label style={styles.label}>图片规格:</label>
                <Select value={this.state.sizeCode3} style={{ width: 170 }} onChange={this.onselectRmSize}>
                  {this.props.contractInfoMM.data['business_size _price'].map(x => {
                    let obj = this.getSize(x.productSize);
                    return <Option key={obj.v} value={obj.v}>{obj.n}</Option>;
                  })}
                </Select>
              </div>
        </div>;
        } else if(this.state.license_type == 'rf') {
          select = <div><div style={{...styles.line}}><label style={styles.label}>图片规格:</label>
            <Select value={this.state.sizeCode3} style={{ width: 170 }} onChange={this.onSelect}>
              {this.props.contractInfoMM.data['business_size _price'].map(x => {
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

    return(
      this.props.contractInfoMM.data ? <div style={{height:'100%', overflow:'auto'}}>
        <div style={{display: 'flex', flexFlow: 'column nowrap', height:'100%', overflow:'auto'}}>
          <div style={styles.oparation}>
            <MonthPicker style={{float:'left'}} allowClear={false} onChange={this.changeDate} size="large" value={obj_c.moment} format={monthFormat} />
            <div style={{float:'left', marginLeft:20}}><label>图片分类：</label>
              <Select size='large' value={obj_c.licenseType} style={{ width: 80 }} onChange={this.changeClassify}>
                <Select.Option value="all">全部</Select.Option>
                <Select.Option value="rf">创意RF</Select.Option>
                <Select.Option value="rm">创意RM</Select.Option>
                <Select.Option value="edit">编辑类</Select.Option>
              </Select>
            </div>
            <div style={{float:'left', marginLeft:20}}><label>确认状态：</label>
              <Select size='large' value={obj_c.confirmStatus} style={{ width: 80 }} onChange={this.changeConfirmStatus}>
                <Select.Option value="all">全部</Select.Option>
                <Select.Option value="1">已确认</Select.Option>
                <Select.Option value="2">未确认</Select.Option>
              </Select>
            </div>
            <div style={{float:'left', marginLeft:20}}><label>用户筛选：</label>
              <Select size='large' value={obj_c.user} style={{ width: 180 }} onChange={this.changeUser}>
                {children}
              </Select>
            </div>

            <Row style={{width:200, float:'right'}}>
              <Row style={{marginBottom:4}}>
                <Col span={8}>下载数量：</Col>
                <Col style={{textAlign:'left'}} span={15}>{this.props.contractInfoMM.data.max_download==-1?'无限额':`${download_count}/${parseInt(this.props.contractInfoMM.data.max_download)} 张`}</Col>
              </Row>
              <Row style={{marginBottom:4}}>
                <Col span={8}>使用数量：</Col>
                <Col style={{textAlign:'left'}} span={15}>{this.props.contractInfoMM.data&&`${this.props.contractInfoMM.data.used} 张`}</Col>
              </Row>
              <Row>
                <Col span={8}>使用金额：</Col>
                <Col style={{textAlign:'left'}} span={15}>{this.props.contractInfoMM.data.contract_amount==-1?'无限额':`${parseInt(this.props.contractInfoMM.data.used_amount)}/${parseInt(this.props.contractInfoMM.data.contract_amount)} 元`}</Col>
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
          <div style={{clear:'both'}}></div>
          <div style={styles.line}><label style={styles.label}>图片费用:</label><span style={{color:'#F84949'}}>{this.state.price}</span></div>
        </Modal>
      </div> : null
    );
  };
}
