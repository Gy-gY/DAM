import React from 'react';
import { Row, Button } from 'antd';

export default class OperationArea extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    selectedImgs: React.PropTypes.array,
    selectInvert: React.PropTypes.func,
    selectAll: React.PropTypes.func,
    allImgIds: React.PropTypes.array,
    changeFilterType: React.PropTypes.func,
    filterType: React.PropTypes.string,
  }

  render() {

    let {
      style,
      changeFilterType,
      filterType,
    } = this.props;

    return (
      <Row style={style} type="flex" justify="space-between">
        <div>
          <Button
            type={ filterType =='download'? 'primary': 'default'}
            onClick={changeFilterType.bind(null, {filterType: 'download'})}
            style={{ marginRight: '8px' }}>
            我的下载
          </Button>
          <Button
            type={ filterType=='favorite'? 'primary': 'default'}
            onClick={changeFilterType.bind(null, {filterType: 'favorite'})}
            style={{ margin: '0 8px' }}>
            我的收藏
          </Button>
        </div>
      </Row>
    );
  }
}
