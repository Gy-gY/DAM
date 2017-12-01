import React, {PropTypes} from 'react';
import { Row } from 'antd';

// 内容展示区的站位内容
// 当用户没有从目录树上选择内容，或者目录内容为空时显示
const ContentPlaceHolder = props => {
  const styles = {
    placeHolder: {
      margin: 'auto',
      fontWeight: 'bold',
      color: 'rgba(0,0,0,.25)',
      fontSize: '24px',
    },
  };

  const { selectedFolder} = props;
  console.log('selectedFolder=============', selectedFolder);
  if (!selectedFolder.id) {
    return (
      <Row
        style={props.style}
        type="flex">
        <div style={styles.placeHolder}>
          请选择要浏览的目录
        </div>
      </Row>
    );
  } else if (!selectedFolder.list || selectedFolder.list.length <= 0) {
    return (
      <Row
        style={props.style}
        type="flex">
        <div style={styles.placeHolder}>
          此目录为空
          </div>
      </Row>);
  }
};

ContentPlaceHolder.propTypes = {
  selectedFolder: PropTypes.object.isRequired,
  style: PropTypes.object,
};

export default ContentPlaceHolder;
