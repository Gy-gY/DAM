import React from 'react';
import { Row, Button } from 'antd';

export default class VerificationOperations extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    selectedImgs: React.PropTypes.array,
    imgsList: React.PropTypes.array,
    folderPendingList:React.PropTypes.array,
    selectInvert: React.PropTypes.func.isRequired,
    selectAll: React.PropTypes.func.isRequired,
    allImgIds: React.PropTypes.array,
    handlerImgStatus:React.PropTypes.func.isRequired,
    handlerRejactAction:React.PropTypes.func.isRequired,
    location : React.PropTypes.object,
    type : React.PropTypes.string,
  }

  render() {

    let {
      style,
      selectedImgs,
      folderPendingList,
      imgsList,
      handlerImgStatus,
      handlerRejactAction,
      selectInvert,
      selectAll,
      allImgIds,
      type,
      location,
    } = this.props;
    return (
      <Row style={style} type="flex" justify="space-between">

        <div>
          <Button
            onClick={selectAll.bind(null, allImgIds, imgsList)}
            style={{ marginRight: '8px' }}>
            全选
          </Button>
          <Button onClick={selectInvert.bind(null, selectedImgs, allImgIds)}
            style={{ margin: '0 8px' }}>
            反选
          </Button>
        </div>

          <div>
            <Button
              type="primary"
              style={{ margin: '0 8px' }}
              disabled={!selectedImgs || !selectedImgs.length || location.pathname=='/passed_list'}
              onClick={handlerImgStatus.bind(this, selectedImgs)}
              >
              审核通过
            </Button>

            <Button
              type="primary"
              style={{ marginLeft: '8px' }}
              disabled={!selectedImgs || !selectedImgs.length || location.pathname=='/reject_list'}
              onClick={handlerRejactAction.bind(this, selectedImgs)}
              >
              审核驳回
            </Button>
          </div>

      </Row>
    );
  }

  openFileChooser = () => this.fileInput.click()

}
