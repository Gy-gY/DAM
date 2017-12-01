import React, {PropTypes} from 'react';
import { Row, Spin } from 'antd';

import Thumbnail from './Thumbnail';
import TableList from './TableList';

export default class SearchArea extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    selectedFiles: React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
    selectAllFiles: React.PropTypes.func.isRequired,
    reversFileSelection: React.PropTypes.func.isRequired,
    toggleFileSelection: React.PropTypes.func.isRequired,
    toggleDetailModal_audit: React.PropTypes.func.isRequired,
    showTable: React.PropTypes.bool.isRequired,
    toggleDetailModal_single_audit: React.PropTypes.func.isRequired,
    offLineFiles_audit:React.PropTypes.func.isRequired,
    reviewFiles_single__audit:React.PropTypes.func.isRequired,
    edit_file_audit: React.PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    arrowFile: React.PropTypes.func,
    fetchFolder_audit: React.PropTypes.func,
    recordCurSelectedAlbum_audit: React.PropTypes.func,
    filter: React.PropTypes.object,
    filter_album: React.PropTypes.object,
  }
  state = {
    table :false,
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
  render() {
    let {
      style,
      selectedFiles,
      offLineFiles_audit,
      selectedFolder,
      selectAllFiles,
      edit_file_audit,
      reversFileSelection,
      toggleFileSelection,
      reviewFiles_single__audit,
      toggleDetailModal_single_audit,
      toggleDetailModal_audit,
      isLoading,
      arrowFile,
      fetchFolder_audit,
      recordCurSelectedAlbum_audit,
      filter,
      filter_album,
    } = this.props;
    if (isLoading) return (<Row style={style}><Spin size='default' style={this.styles.spin}/></Row>);
    if (!selectedFolder.id) {
      return (
        <Row
          style={style}
        type="flex">
          <div style={this.styles.placeHolder}>
            请选择要浏览的目录
          </div>
        </Row>
      );
    }else if(!selectedFolder.list||selectedFolder.list.length<=0) {
      return (
        <Row
          style={style}
        type="flex">
          <div style={this.styles.placeHolder}>
            此目录为空
          </div>
        </Row>
      );
    }else{
      if(this.props.showTable)
        return (
          <div style={style}>
            <TableList
              toggleFileSelection={toggleFileSelection}
              files={selectedFolder.list}
              edit_file_audit={edit_file_audit}
              selectedFiles={selectedFiles}
              toggleDetailModal_single_audit={toggleDetailModal_single_audit}
              reviewFiles_single__audit={reviewFiles_single__audit}
              toggleDetailModal_audit={toggleDetailModal_audit}
              offLineFiles_audit={offLineFiles_audit}
              selectAllFiles= {selectAllFiles}
              reversFileSelection= {reversFileSelection}
          />
        </div>
        );

      else
        return (
        <Row
          style={style}
          type="flex"
          justify="start"
        align="top">

          {selectedFolder && selectedFolder.list && selectedFolder.list.map(file => {
            return (
              <Thumbnail
                key={file.id}
                file={file}
                filter={filter}
                arrowFile={arrowFile}
                filter_album={filter_album}
                selectedFiles={selectedFiles}
                selectedFolder={selectedFolder}
                fetchFolder_audit={fetchFolder_audit}
                toggleDetailModal_audit={toggleDetailModal_audit}
                recordCurSelectedAlbum_audit={recordCurSelectedAlbum_audit}
                toggleFileSelection={event => toggleFileSelection(file, event)}
              />
            );
          })}
        </Row>
        );
    }

  }
}
