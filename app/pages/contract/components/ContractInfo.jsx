import React from 'react';
import { Row, Table, Col } from 'antd';
const styles = {
  itemL: {
    float:'left',
    width:'30%',
    textAlign:'left',
    height:'45px',
    lineHeight: '45px',
    marginBottom: '10px',
  },
  itemR: {
    float:'left',
    width:'70%',
    textAlign:'left',
    height:'45px',
    lineHeight: '45px',
    marginBottom: '10px',
  },
  itemLL: {
    float:'left',
    width:'40%',
    textAlign:'left',
    height:'45px',
    lineHeight: '45px',
    marginBottom: '10px',
  },
  itemRR: {
    float:'left',
    width:'60%',
    textAlign:'left',
    height:'45px',
    lineHeight: '45px',
    marginBottom: '10px',
  },
  ph: {
    fontSize:'19px',
    height:'80px',
    lineHeight:'50px',
    paddingTop: '20px',
    width: '50%',
  },
  clearFloat: {
    overflow: 'hidden',
  },
};

export default class ContractInfo extends React.Component {

  static propTypes = {
    fetchContractInfo: React.PropTypes.func,
    fetchedContractInfo: React.PropTypes.object,
    fetchContractInfoMM: React.PropTypes.func,
    contractInfoMM: React.PropTypes.object,
    fetchDownCount: React.PropTypes.func,
    downcount: React.PropTypes.object,
  }
  columns1 = [{
    title: '序号',
    dataIndex: 'seq',
    key: 'seq',
    width: '10%',
  }, {
    title: '用途类型',
    dataIndex: 'useType',
    key: 'useType',
    width: '10%',
  }, {
    title: '用途名称',
    dataIndex: 'useTitle',
    key: 'useTitle',
    width: '20%',
  }, {
    title: '用途详情',
    dataIndex: 'useDetail',
    key: 'useDetail',
    width: '45%',
  }, {
    title: '协议价/张',
    dataIndex: 'price',
    key: 'price',
    width: '15%',
  }];

  columns2 = [{
    title: '序号',
    dataIndex: 'seq',
    key: 'seq',
    width: '30%',
  }, {
    title: '图片规格',
    dataIndex: 'imgSpec',
    key: 'imgSpec',
    width: '40%',
  }, {
    title: '协议价/张',
    dataIndex: 'price',
    key: 'price',
    width: '30%',
  }];


  componentWillMount = () => {
    this.props.fetchContractInfoMM();
    this.props.fetchDownCount();
  }


  render = () => {
    let fetchedContractInfo = this.props.contractInfoMM;
    console.log('render(1026)->合同信息：', fetchedContractInfo);
    let download_count = this.props.downcount.data ? this.props.downcount.data.downCount : 0;
    let dataSource1 = [];
    let dataSource2 = [];
    let contract_id = '';
    let contract_name = '';
    let contract_type = '';
    let start_end = '';
    let contract_amount = 0;
    let max_download = 0;
    let vcg_watermark = '0';
    let custom_watermark = '0';
    let imagepack_resolution = '0';

    if(fetchedContractInfo.message == 'ok') {
      let ret = fetchedContractInfo.data;
      contract_id = ret.contract_id;
      contract_name = ret.contract_name;
      switch(ret.contract_type) {
      case '1':
        contract_type = '长期合同';
        break;
      case '2':
        contract_type = '单张合同';
        break;
      case '3':
        contract_type = '框架协议';
        break;
      case '4':
        contract_type = '虚拟协议';
        break;
      default:
        break;
      }
      start_end = ret.auth_start_date.split(' ')[0] + ' ~ ' + ret.auth_end_date.split(' ')[0];
      contract_amount = ret.contract_amount;
      max_download = ret.max_download;
      if(max_download == 0) {
        max_download = '无限制';
      }
      vcg_watermark = ret.vcg_watermark == '0' ? '否' : '是';
      custom_watermark = ret.custom_watermark == '0' ? '否' : '是';
      imagepack_resolution = '长边' + ret.imagepack_resolution + 'px';

      let seqNum = ret.business_use_price.length;
      let ds_business = ret.business_use_price.map((item, index) => {
        return {
          key: index + 'business',
          seq: index + 1,
          useType: '商业用途',
          useTitle: item.purposeName,
          useDetail: item.description,
          price: item.price + '元',
        };
      });
      let ds_media = ret.media_use_price.map((item, index) => {
        return {
          key: index + 'media',
          seq: index + 1 + seqNum,
          useType: '媒体用途',
          useTitle: item.purposeName,
          useDetail: item.description,
          price: item.price + '元',
        };
      });
      dataSource1 = ds_business.concat(ds_media);

      dataSource2 = ret['business_size _price'].map((item, index) => {
        return {
          key: index,
          seq: index + 1,
          imgSpec: '长边' + item.productSize + 'px',
          price: item.price + '元',
        };
      });
    }

    return(
      <div style={{background:'#fff'}}>
        <div style={{height:'80px'}}>
          <div style={{...styles.ph, float:'left'}}>{'合同基本信息'}</div>
          <div style={{float:'right', width: '50%', height:'100%'}}>
            <div style={{width:'100%', marginTop:'5px'}}>
              <Row>
                <Col style={{float:'right'}} span={6}>{this.props.contractInfoMM.data&&(this.props.contractInfoMM.data.max_download==-1?'无限额':`${download_count}/${parseInt(this.props.contractInfoMM.data.max_download)} 张`)}</Col>
                <Col span={4} style={{textAlign:'center', float:'right'}}>下载数量：</Col>
              </Row>
            </div>
            <div style={{width:'100%', marginTop:'5px'}}>
              <Row>
                <Col style={{float:'right'}} span={6}>{this.props.contractInfoMM.data&&`${this.props.contractInfoMM.data.used} 张`}</Col>
                <Col span={4} style={{float:'right', textAlign:'center'}}>使用数量：</Col>
              </Row>
            </div>
            <div style={{width:'100%', marginTop:'5px'}}>
              <Row>
                <Col style={{float:'right'}} span={6}>{this.props.contractInfoMM.data&&(this.props.contractInfoMM.data.contract_amount==-1?'无限额':`${parseInt(this.props.contractInfoMM.data.used_amount)}/${parseInt(this.props.contractInfoMM.data.contract_amount)} 元`)}</Col>
                <Col span={4} style={{float:'right', textAlign:'center'}}>使用金额：</Col>
              </Row>
            </div>
          </div>
        </div>
        <hr />
        <Row style={{marginBottom: '50px'}}>
          <div style={{width:'50%', float:'left', height:'300px', borderRight:'1px solid #ccc'}}>
            <div style={{overflow:'hidden', margin:'0 auto', width:'90%'}}>

              <div style={styles.clearFloat}>
                <div style={styles.itemL}>{'合同编号'}</div>
                <div style={styles.itemR}>{contract_id}</div>
              </div>

              <div style={styles.clearFloat}>
                <div style={styles.itemL}>{'合同名称'}</div>
                <div style={styles.itemR}>{contract_name}</div>
              </div>

              <div style={styles.clearFloat}>
                <div style={styles.itemL}>{'合同形式'}</div>
                <div style={styles.itemR}>{contract_type}</div>
              </div>

              <div>
                <div style={styles.itemL}>{'合同起止日期'}</div>
                <div style={styles.itemR}>{start_end}</div>
              </div>
            </div>
          </div>


          <div style={{width:'50%', float:'left', height:'300px'}}>
            <div style={{overflow:'hidden', margin:'0 auto', width:'90%'}}>
              <div style={styles.clearFloat}>
                <div style={styles.itemLL}>{'年度合同总金额'}</div>
                <div style={styles.itemRR}>{contract_amount}</div>
              </div>

              <div style={styles.clearFloat}>
                <div style={styles.itemLL}>{'下载封顶张数'}</div>
                <div style={styles.itemRR}>{max_download}</div>
              </div>

              <div style={styles.clearFloat}>
                <div style={styles.itemLL}>{'允许下载图片尺寸'}</div>
                <div style={styles.itemRR}>{imagepack_resolution}</div>
              </div>

              <div style={styles.clearFloat}>
                <div style={styles.itemLL}>{'资产中国水印'}</div>
                <div style={styles.itemRR}>{vcg_watermark}</div>
              </div>

              <div>
                <div style={styles.itemLL}>{'客户自定义水印'}</div>
                <div style={styles.itemRR}>{custom_watermark}</div>
              </div>
            </div>
          </div>
        </Row>

        <p style={styles.ph}>{'合同授权价格清单'}</p>
        <Row>
          <div style={{width:'100%', height: '40px', lineHeight: '40px', background: '#797979', textAlign: 'center', color:'#fff'}}>
            {'合同授权的用途价格清单'}
          </div>
          <Table
            bordered
            dataSource={dataSource1}
            columns={this.columns1}
            pagination={false}
          />
          <div style={{width:'100%', height: '60px'}}></div>
        </Row>

        <Row>
          <div style={{width:'100%', height: '40px', lineHeight: '40px', background: '#797979', textAlign: 'center', color:'#fff'}}>
            {'合同授权的RF商业用途价格清单'}
          </div>
          <Table
            bordered
            dataSource={dataSource2}
            columns={this.columns2}
            pagination={false}
          />
          <div style={{width:'100%', height: '60px'}}></div>
        </Row>
      </div>
    );
  }
}
