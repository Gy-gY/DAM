import React from 'react';
import { Row } from 'antd';
import Thumbnail from './Thumbnail';

export default class ImgList extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    filter: React.PropTypes.object.isRequired,
    vcgImages: React.PropTypes.object,
    selectImg_search: React.PropTypes.func.isRequired,
    selectedFiles: React.PropTypes.array,
    showModal: React.PropTypes.func.isRequired,
    downloadVcgImgs: React.PropTypes.func.isRequired,
    downStatus: React.PropTypes.bool.isRequired,
    favariteStatus: React.PropTypes.bool.isRequired,
    addFavariteForList: React.PropTypes.func.isRequired,
    vcgSearch: React.PropTypes.func.isRequired,
    deleteFavarite: React.PropTypes.func.isRequired,
  }
  styles = {
    placeHolder: {
      margin: 'auto',
      fontWeight: 'bold',
      color: 'rgba(0,0,0,.25)',
      fontSize: '24px',
    },
    spin: {
      flex: '1 1 100%',
      alignContent: 'flex-center',
    },
  };
  componentDidMount() {
    //alert('&&&&&');
  }
  render() {
    let content = <div></div>;
    if(this.props.vcgImages&&this.props.vcgImages.list) {
      if(this.props.vcgImages.list.length>0) {
        content = <Row
          style={this.props.style}
          type="flex"
          justify="start"
                  align="top">

          {this.props.vcgImages.list&&this.props.vcgImages.list.map(file => {
            return (
              <Thumbnail
                key={file.id}
                file={file}
                vcgSearch={this.props.vcgSearch}
                filter={this.props.filter}
                deleteFavarite={this.props.deleteFavarite}
                favariteStatus={this.props.favariteStatus}
                addFavariteForList={this.props.addFavariteForList}
                downStatus={this.props.downStatus}
                downloadVcgImgs={this.props.downloadVcgImgs}
                selectedFiles={this.props.selectedFiles}
                showModal={this.props.showModal}
                selectImg_search={event => this.props.selectImg_search(file, event)}
              />
            );
          })}
      </Row>;
      }else {
        content = <Row
          style={this.props.style}
                  type="flex">
          <div style={this.styles.placeHolder}>
            没有搜索到与条件相匹配的图片
          </div>
        </Row>;
      }
    }
    return (
      <div>{content}</div>
    );
  }

  }
