import React from 'react';
import { Card, Spin } from 'antd';

const styles = {
  card: {
    width: '220px',
    margin: '8px',
  },
  image: {
    width: '100%',
    minHeight: '220px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  body: {
    textAlign: 'center',
    padding: '10px 16px',
    wordWrap: 'break-word',
    borderTop: '1px solid #e9e9e9',
  },
};

export default class Thumbnial extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    file: React.PropTypes.object.isRequired,
    uploadFile: React.PropTypes.func.isRequired,
  }

  state = {
    imageData: null,
  }

  componentDidMount() {
    var reader = new FileReader();
    reader.onload = e => {
      this.setState({
        imageData: e.target.result,
      });
    };
    reader.readAsDataURL(this.props.file.data);
    this.props.uploadFile(this.props.file);
  }

  render() {

    let imageStyle = {
      ...styles.image,
      backgroundImage: `url(${this.state.imageData})`,
    };

    let item = (
      <Card style={styles.card} bodyStyle={{ padding: 0 }}>
        <div style={imageStyle}></div>
        <div style={styles.body}>
          <h3>{this.props.file.data.name}</h3>
        </div>
      </Card>
    );

    if (this.props.file.isUploading)
      return <Spin delay={500} tip="正在上传……">{item}</Spin>;
    else if (this.props.file.isUploadFalied)
      return <Spin tip="上传失败">{item}</Spin>;
    else
      return item;
  }
}
