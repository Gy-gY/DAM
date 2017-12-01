import React from 'react';
import { Card, Spin, notification} from 'antd';
import helper from '../../../common/helper';

const styles = {
  card: {
    width: '220px',
    margin: '8px',
  },
  image: {
    width: '100%',
    minHeight: '180px',
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

export default class PlaceHolder extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    file: React.PropTypes.object.isRequired,
    uploadFile: React.PropTypes.func.isRequired,
    displayMode: React.PropTypes.string,
    selectedFiles: React.PropTypes.array,
    curSelectedAlbum: React.PropTypes.object,
  }

  state = {
    imageData: null,
  }

  componentDidMount() {
    if (this.props.file.assetType === helper.ASSET_TYPE.IMG) { //Preview Image On Broser.
      var reader = new FileReader();
      reader.onload = e => {
        this.setState({
          imageData: e.target.result,
        });
      };
      reader.readAsDataURL(this.props.file.data);
    }
    if (this.props.file.isVideoTranscoding) { // On video transcoding, skip upload File.
      return false;
    }

    let groupId = undefined;
    if(this.props.displayMode == 'album') {
      groupId = this.props.curSelectedAlbum.id;
    }
    this.props.uploadFile(this.props.file, groupId).then(() => {
      notification.info({message: '上传成功！'});
    });
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
          <h3>{this.props.file.title}</h3>
        </div>
      </Card>
    );

    if (this.props.file.isUploading)
      return <Spin delay={500} tip="正在上传……">{item}</Spin>;
    else if (this.props.file.isUploadFalied)
      return <Spin tip="上传失败">{item}</Spin>;
    else if (this.props.file.isVideoTranscoding)
      return <Spin tip="上传成功，正在转码...">{item}</Spin>;
    return item;
  }
}
