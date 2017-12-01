import React from 'react';
import { Row, Col, Form} from 'antd';
import VideoCell from './VideoCell';
const FormItem = Form.Item;
const styles = {
  modal: {
    top: 0,
    paddingTop: 24,
  },
  imageArea: {
    flex: '1 auto',
    overflow: 'auto',
    backgroundColor: '#404040',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  editArea: {
    flex: '0 0 400px',
    padding: '4px 0px',
    overflow: 'auto',
  },
  image: {
    display: 'block',
    maxWidth: '100%',
    margin: '0 auto',
  },
  imageCell: {
    width: '25%',
    flex: '1 25%',
  },

  videoCell: {
    flex: '1 auto',
    height: '100%',
  },
};

export default class EditModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      assetType:{1: '图片', 2: '视频', 3: '音频', 4: '其他'},
    };
  }


  static propTypes = {
    files: React.PropTypes.array.isRequired,
    basic:React.PropTypes.object,
    form: React.PropTypes.object,
    detail:React.PropTypes.object,
  }

  showImg() {
    const {basic, detail} = this.props;
    let imgPath = `http://${detail.oss800}`;
    if (basic.assetType==2) {
      return <VideoCell key={basic.id} videoPath={detail.previewOssid}
        posterPath={detail.coverageOssid} videoId={basic.id.toString()} style={styles.videoCell}/>;
    }else{
      return <img style={styles.image} key={basic.id} src={imgPath} />;
    }
  }

  render() {
    const {basic, detail} = this.props;
    const {assetType} = this.state;
    return (
        <Row type="flex" style={{ height: '800px', flexWrap: 'nowrap'}}>
          <Col style={styles.imageArea}>
            {this.showImg()}
          </Col>
          <Col style={styles.editArea}>
            <FormItem
              label="资源名称"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              <span>{basic.title}</span>
            </FormItem>

            <FormItem
              label="资源类型"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              <span>{assetType[basic.assetType]}</span>
            </FormItem>

            <FormItem
              label="资源说明"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              <span>{basic.description||'无'}</span>
            </FormItem>

            <FormItem
              label="地点"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              <span>{detail.location||'无'}</span>
            </FormItem>

            <FormItem
              label="署名"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              <span>{detail.providerName||'无'}</span>
            </FormItem>

            <FormItem
              label="关键字"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              <span>{basic.keywords||'无'}</span>
            </FormItem>

            <FormItem
              label="授权人"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              <span>{basic.licenseAuthorizer||'无'}</span>
            </FormItem>

            <FormItem
              label="授权方式"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              <span>{basic.licenseType||'RM'}</span>
            </FormItem>

            <FormItem
              label="授权期限"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              <span>{basic.licenseTimeRange||'无'}</span>
            </FormItem>

            <FormItem
              label="授权范围"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              <span>{basic.licenseDescription||'无'}</span>
            </FormItem>
          </Col>
        </Row>
    );
  }
}
