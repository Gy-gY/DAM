import React from 'react';
import { Row, Col, Modal } from 'antd';
import VerificationEditArea from './VerificationEditArea';
const styles = {
  modal: {
    top: 0,
    paddingTop: 24,
  },
  imageArea: {
    flex: '2 70%',
    overflow: 'auto',
    position: 'relative',
    backgroundColor: '#404040',
  },
  image: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    maxWidth: '100%',
    transform: 'translate(-50%, -50%)',
  },
};

export default class VerificationImgDetail extends React.Component {

  static propTypes = {
    file: React.PropTypes.object,
    isOpen: React.PropTypes.bool.isRequired,
    closeDetailModal: React.PropTypes.func.isRequired,
  }

  render() {

    if (!this.props.file)
      return null;
    const {file} = this.props;
    return (
        <Row type="flex" style={{ height: '100%', flexWrap: 'nowrap'}}>
          
          <Col style={styles.imageArea}>
            <img style={styles.image} src={'http://'+file.oss800} />
          </Col>
        </Row>
    );
  }
}
