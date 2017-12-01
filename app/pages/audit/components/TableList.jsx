import React from 'react';
import { Table, Button, Row, Modal } from 'antd';
import VideoCell from './VideoCell';
import helper from '../../../common/helper';
const confirm = Modal.confirm;
const styles = {
  card: {
    width: '220px',
    margin: '8px',
    cursor: 'pointer',
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
  },
};

export default class TableList extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    files: React.PropTypes.array.isRequired,
    deleteFile: React.PropTypes.func,
    toggleDetailModal_audit: React.PropTypes.func,
    toggleFileSelection: React.PropTypes.func,
    selectedFiles: React.PropTypes.array,
    offLineFiles_audit: React.PropTypes.func,
    reviewFiles_single__audit: React.PropTypes.func,
    toggleDetailModal_single_audit: React.PropTypes.func.isRequired,
    selectAllFiles: React.PropTypes.func.isRequired,
    reversFileSelection: React.PropTypes.func.isRequired,
    edit_file_audit:  React.PropTypes.func.isRequired,
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
      right:0,
      fontFamily:'tahoma',
      color:'white',
      borderRadius:'10px',
      padding:'2px 5px',
      zIndex:2,
    },
  }

  select_single = (record) => {
    this.props.toggleFileSelection(record, {ctrlKey:true});
  }

  select_all = () => {
    if(this.props.selectedFiles.length==this.props.files.length) {
      this.props.reversFileSelection();
    }else {
      this.props.selectAllFiles();
    }
  }

  select_reverse= () => {
    this.props.reversFileSelection();
  }

  offline = (record) => {
    confirm({
      title: '确定要禁用这些文件吗？',
      content: record.title,
      onOk: () => this.props.offLineFiles_audit(record),
    });
  }

  toggleDetail = (record) => {
    this.props.toggleDetailModal_single_audit(record);
  }

  pass = (record) => {
    console.log('------jsx----recored == ', record);
    confirm({
      title: '确定要入库这些文件吗？',
      content: record.title,
      onOk: () => this.props.reviewFiles_single__audit(true, record),
    });
  }

  reject = (record) => {
    confirm({
      title: '确定要驳回这些文件吗？',
      content: record.title,
      onOk: () => this.props.reviewFiles_single__audit(false, record),
    });
  }

  renderBackImg = (data) => {
    let file = helper.formatFile(data);
    let block;
    const imgUrl = file.ossImgPath;
    const imageStyle = {
      ...styles.image,
      backgroundImage: `url(${imgUrl})`,
    };
    switch(file.assetType) {
    case helper.ASSET_TYPE.VIDEO: {
      if (file.ossImgPath && file.ossVideoPath) {
        block = (<div style={{...styles.image}}>
          <VideoCell
            videoPath={file.ossVideoPath}
            videoId={file.id.toString()}
            style={ styles.videoCell }
            posterPath={file.ossImgPath}
          />
        </div>);
      }
      break;
    }
    default:
      block = (<div style={imageStyle} />);
    }
    return block;
  }
  render() {

    // let cardStyle = styles.card;
    //if (this.props.selectedFiles.find(fil=>fil.basic.id==this.props.file.basic.id)) {
    //  cardStyle = {
    //    ...styles.card,
    //    backgroundColor: 'rgba(16, 142, 233, 0.5)',
    //  };
    //}
    let data = this.props.files;
    let selectedRowKeys = this.props.selectedFiles.map(file => {
      //let nfile = helper.formatFile(file);
      return file.id;
    });
    const rowSelection = {
      selectedRowKeys: selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record) => {
        this.select_single(record);
        //disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      },
      onSelectInvert: (record) => {
        this.select_reverse(record);
        //disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      },
      onSelectAll: (record) => {
        this.select_all(record);
        //disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      },
    };
    const columns = [
      { width:'20%', title: '图片', key: 'pic', render: (text, record) => {return this.renderBackImg(record);}},
      { width:'10%', title: '供稿人', dataIndex: 'providerName', key: 'providerName' },
      { width:'10%', title: '状态', dataIndex: 'reviewState', key: 'reviewState', render: (text, record) => {
        if(record.onlineState==3) {
          return <span style={{color:'#ffbf00'}}>禁用</span>;
        }else{
          if(text==1) {
            return <span style={{color:'#108ee9'}}>待审核</span>;
          }else if(text==3) {
            return <span style={{color:'#f04134'}}>驳回</span>;
          }else if(text==4) {
            return <span style={{color:'#00a854'}}>入库</span>;
          }else{
            return '';
          }
        }}},
      { width:'20%', title: '标题', dataIndex: 'title', key: 'title' },
      { width:'10%', title: '图说', dataIndex: 'description', key: 'description' },
      { width:'10%', title: '关键词', dataIndex: 'keywords', key: 'keywords' },
      { width:'10%', title: '版权信息', dataIndex: 'copyright', key: 'copyright' },
      { width:'10%', title: '操作', dataIndex: 'address', key: 'address', render: (text, record) => {
        if(record.onlineState==3) {
          return (<Row justify="end" style={{flex: '0 0 auto', padding: '16px 16px', textAlign: 'right'}}>
            <Button type="primary" size="large" style={{ margin: '16px auto' }} onClick={this.toggleDetail.bind(null, record)}>编辑</Button>
            <Button type="primary" size="large" onClick= {this.pass.bind(null, record)}>入库</Button>
          </Row>);
        }else{
          if(record.reviewState == 1) {
            return (<Row justify="end" style={{flex: '0 0 auto', padding: '16px 16px', textAlign: 'right'}}>
              <Button type="primary" size="large" onClick={this.toggleDetail.bind(null, record)}>编辑</Button>
              <Button type="primary" size="large" style={{ margin: '16px auto' }} onClick= {this.pass.bind(null, record)}>入库</Button>
              <Button type="primary" size="large" onClick={this.reject.bind(null, record)}>驳回</Button>
            </Row>);
          }else if(record.reviewState == 3) {
            return (<Row justify="end" style={{flex: '0 0 auto', padding: '16px 16px', textAlign: 'right'}}>
              <Button type="primary" size="large" onClick={this.toggleDetail.bind(null, record)}>编辑</Button>
              <Button type="primary" size="large" style={{ margin: '16px auto' }} onClick= {this.pass.bind(null, record)}>入库</Button>
            </Row>);
          }else if(record.reviewState == 4) {
            return (<Row justify="end" style={{flex: '0 0 auto', padding: '16px 16px', textAlign: 'right'}}>
              <Button type="primary" size="large" onClick={this.toggleDetail.bind(null, record)}>编辑</Button>
              <Button type="primary" size="large" style={{ margin: '16px auto' }} onClick= {this.offline.bind(null, record)}>禁用</Button>
            </Row>);
          }
        }
      } },
    ];

    return (
      <Table style={{backgroundColor:'white', flex:'1 1 auto', margin:'0 8px'}} rowSelection={rowSelection} rowKey={record => record.id} bordered columns={columns} dataSource={data} pagination={false}/>
    );
  }
}
