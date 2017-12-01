import React, {PropTypes} from 'react';
import { Row, Spin } from 'antd';
import hepler from '../../../common/helper';

import Thumbnail from './Thumbnail';
import PlaceHolder from './PlaceHolder';
import ContentPlaceHolder from './ContentPlaceHolder';

const styles = {
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

export default class ContentArea extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    uploadFile: React.PropTypes.func,
    selectedFiles: React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
    toggleDetailModal: React.PropTypes.func,
    toggleFileSelection: React.PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    openAlbum: React.PropTypes.func,
    fetchFolder: React.PropTypes.func,
    assetType: React.PropTypes.string,
    displayMode: React.PropTypes.string,
    curSelectedAlbum: React.PropTypes.object,
    recordCurSelectedAlbum: React.PropTypes.func,
    changeAlbumFilterType: React.PropTypes.func,
    recordCurSelectedAlbum_qyzyk: React.PropTypes.func,
    getOnlineList: React.PropTypes.func,
    pagedImages: React.PropTypes.object,
    howToAlbum: React.PropTypes.func,
  }

  render() {
    let {
      style,
      uploadFile,
      selectedFiles,
      selectedFolder,
      toggleDetailModal,
      toggleFileSelection,
      isLoading,
      openAlbum,
      fetchFolder,
      assetType,
      displayMode,
      curSelectedAlbum,
      recordCurSelectedAlbum,
      changeAlbumFilterType,
      recordCurSelectedAlbum_qyzyk,
      getOnlineList,
      pagedImages,
      howToAlbum,
    } = this.props;
    if (isLoading) return (<Row style={style}><Spin size='default' style={styles.spin}/></Row>);
    if (selectedFolder.id && selectedFolder.list && selectedFolder.list.length > 0) {
      return(
        <Row
          style={style}
          type="flex"
          justify="start"
          align="top"
        >
          {
            selectedFolder && selectedFolder.list && selectedFolder.list.map((file, index) => {
              file = hepler.formatFile(file);
              if (file.hasOwnProperty('isUploading') || file.isVideoTranscoding) {
                return(
                  <PlaceHolder
                    key={`${file.id}${index}`}
                    file={file}
                    uploadFile={uploadFile}
                    displayMode={displayMode}
                    selectedFiles={selectedFiles}
                    curSelectedAlbum={curSelectedAlbum}
                  />
                );
              } else {
                return(
                  <Thumbnail
                    key={`${file.id}${index}`}
                    file={file}
                    openAlbum={openAlbum}
                    badges={file.badges}
                    selectedFiles={selectedFiles}
                    toggleFileSelection={event => toggleFileSelection(file, event)}
                    toggleDetailModal={toggleDetailModal}
                    selectedFolder={selectedFolder}
                    fetchFolder={fetchFolder}
                    assetType={assetType}
                    recordCurSelectedAlbum={recordCurSelectedAlbum}
                    changeAlbumFilterType={changeAlbumFilterType}
                    recordCurSelectedAlbum_qyzyk={recordCurSelectedAlbum_qyzyk}
                    getOnlineList={getOnlineList}
                    pagedImages={pagedImages}
                    howToAlbum={howToAlbum}
                  />
                );
              }
            })
          }
        </Row>);
    } else {
      return <ContentPlaceHolder style={style} selectedFolder={selectedFolder} />;
    }
  }
}
