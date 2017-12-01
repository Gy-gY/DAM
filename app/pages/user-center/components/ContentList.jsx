import React from 'react';
import { Row } from 'antd';
import Thumbnail from '../../uploads/components/Thumbnail';

export default class ContentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageVo:{
        pageNum: 1,
        pageSize: 10,
      },
    };
  }

  static propTypes = {
    style: React.PropTypes.object,
    selectedFiles : React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
    selectedUploadFiles: React.PropTypes.array,
    toggleImgSelection:  React.PropTypes.func,
    orderBy: React.PropTypes.string,
    filterOrder: React.PropTypes.object,
    renderShade: React.PropTypes.func,
    toggleDetailModal: React.PropTypes.func,
    pagedImages: React.PropTypes.object,
    downloadImgs: React.PropTypes.func,
  }

  render() {
    let {
      style,
      selectedFiles,
      toggleImgSelection,
      pagedImages,
      toggleDetailModal,
    } = this.props;
    selectedFiles = selectedFiles || [];
    const toggleFileSelection = toggleImgSelection || (() => {});
    if (!pagedImages || !pagedImages.list) return false;
    const imgsList = pagedImages.list;
    console.log('imgsList ============== ', imgsList);
    return (
        <div>
          <Row style={style} type="flex" justify="start" align="top">
            {
              imgsList && imgsList.length > 0 && imgsList.map((file, index) => {
                return(
                  <div key={index}>
                    <Thumbnail
                      toggleDetailModal={toggleDetailModal}
                      downloadImgs={this.props.downloadImgs}
                      toggleFileSelection={toggleFileSelection.bind(null, file.id)}
                      file={file}
                      style={{ flex: '0 0 25%' }}
                      selectedFiles={selectedFiles}
                    />
                  </div>);
              })
            }
          </Row>
        </div>

    );
  }
}
