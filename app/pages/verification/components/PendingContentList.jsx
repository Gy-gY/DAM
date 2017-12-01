import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'antd';
import {getPendingList, getBetchImg} from '../../../actions';
import Thumbnail from './Thumbnail';
class ContentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageVo:{
        pageNum:1,
        pageSize:10,
      },
    };
  }

  static propTypes = {
    style: React.PropTypes.object,
    selectedImgs : React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
    selectedUploadFiles: React.PropTypes.array,
    getPendingList :  React.PropTypes.func.isRequired,
    folderPendingList : React.PropTypes.array,
    getBetchImg :  React.PropTypes.func.isRequired,
    toggleImgSelection:  React.PropTypes.func.isRequired,
    imgsList : React.PropTypes.array,
    type :  React.PropTypes.string,
    toggleDetailModal: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    //this.refresh();
  }

  refresh() {
    let {selectedFolder} = this.props;
    let nodeId = selectedFolder && selectedFolder.id || '0';
    let params = {
      folderId:nodeId,
      reviewState:'PENDING',
    };
    Object.assign(params, this.state.pageVo);
    this.props.getPendingList(params).then(()=>{
      let imgItems = this.props.folderPendingList;
      let imgParams = [];
      if(imgItems && imgItems.list && imgItems.list.length>0) {
        const {list} = imgItems;
        list.map((imgItem)=>{
          let {id} = imgItem;
          imgParams.push(id);
        });
      }

      this.props.getBetchImg({ids:imgParams}).then(()=>{
        console.log('imgsList=====', this.props.imgsList);
      }).catch(()=>{
        console.log('imgsList===', this.props.imgsList);
      });
    });
  }

  render() {

    let {
      style,
      selectedImgs,
      imgsList,
      toggleImgSelection,
      toggleDetailModal,
    } = this.props;
    selectedImgs = selectedImgs || [];
    return (

        <Row style={style} type="flex" justify="start" align="top">
          {imgsList && imgsList.map(item => {
            let {basic} = item;
            return <Thumbnail key={basic.id} toggleDetailModal={toggleDetailModal.bind(null, item)} toggleFileSelection={toggleImgSelection.bind(null, basic.id, item)} file={item} fileUrl={'http://'+item.detail.oss176} style={{ flex: '0 0 25%' }} selectedImgs={selectedImgs}/>;
          })}
        </Row>

    );
  }
}
function mapStateToProps(state) {
  return {
    folderPendingList : state.check.folderPendingList.list,
    imgsList : state.check.imgsList.imgs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPendingList : (params)=> getPendingList(dispatch, params),
    getBetchImg : (params) => getBetchImg(dispatch, params),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentList);
