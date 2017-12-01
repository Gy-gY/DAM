import React from 'react';
import { connect } from 'react-redux';
import {Form, Table} from 'antd';
const createForm 					= Form.create;
import {
  getPendingList,
  getBetchImg,
  selectedImgRow,
} from 'actions';


class VerificationTableList extends React.Component {
  constructor(props) {
    super(props);
    console.log('props====', props);
    this.state = {
      'columns':[
        {
          'title':'ID',
          'dataIndex':'id',
          'key':'id',
          'className':'center',
        }, {
          'title':'图片',
          'dataIndex':'url', //oss176
          'key':'url',
          'width':200,
          'render':(text)=><img src={'http://'+text}></img>,
        }, {
          'title':'上传人',
          'dataIndex':'providerId',
          'key':'providerId',
        }, {
          'title':'上传时间',
          'dataIndex':'createdTime',
          'key':'createdTime',
        }, {
          'title':'审核人',
          'dataIndex':'she',
          'key':'she',
        }, {
          'title':'审核时间',
          'dataIndex':'sheDate',
          'key':'sheDate',
        }, {
          'title':'查看详情',
          'dataIndex':'operation',
          'key':'operation',
          'render':(text, record)=><a onClick={this.showImgDetailInfo.bind(this, record)}>查看</a>,
        }, {
          'title':'状态',
          'dataIndex':'reviewState',
          'key':'reviewState',
        },
      ],
      'imageStatus':{
        'PASSED': 'PASSED',
        'REJECTED': 'REJECTED',
        'PENDING': 'PENDING',
      },
      queryParams:{
        pageNum:1,
        pageSize:10,
      },
      'dataSource':[],
    };
  }

  static propTypes = {
    selectedFolder: React.PropTypes.object,
    location : React.PropTypes.object,
    getPendingList: React.PropTypes.func.isRequired,
    getBetchImg: React.PropTypes.func.isRequired,
    toggleDetailModal: React.PropTypes.func.isRequired,
    selectedImgRow: React.PropTypes.func.isRequired,
    folderPendingList : React.PropTypes.array,
    dataSource: React.PropTypes.array,
    imgs : React.PropTypes.array,
  }

  componentWillMount() {
    //this.refresh();
  }


  onSelectedFolders(value) {
    this.refresh(value);
  }

  render() {
    let {columns} = this.state;
    let {dataSource} = this.props;
    let rowSelection = {
      selections:true,
      onChange: (selectedRowKeys, selectedRows) => {
        let imgs = [];
        selectedRows.map((item)=>{
          let {id} = item;
          imgs.push(id);
        });
        this.props.selectedImgRow(imgs);
      },


      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };
    return (
        <div style={{height:'630px'}}>
        <Table columns={columns} rowSelection={rowSelection} dataSource={dataSource} size='small' bordered={true}/>
      </div>
    );
  }

  showImgDetailInfo(record) {
    this.props.toggleDetailModal(record);
  }
}

function mapStateToProps(state) {
  return {
    folders: state.uploads.folders,
    selectedImgs: state.check.selectedImgs,
    selectedFolder: state.uploads.selectedFolder,
    selectedUploadFiles: state.uploads.selectedUploadFiles,
    folderPendingList : state.check.folderPendingList.list,
    allImgIds : state.check.imgsList.allImgIds,
    imgsList : state.check.imgsList.imgs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPendingList : (params)=> getPendingList(dispatch, params),
    getBetchImg : (params) => getBetchImg(dispatch, params),
    selectedImgRow :(imgId) => selectedImgRow(dispatch, imgId),
  };
}
const WrappedVerificationTableList = createForm()(VerificationTableList);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedVerificationTableList);
