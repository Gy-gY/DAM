import React from 'react';
import { Pagination } from 'antd';

export default class PaginationArea extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    selectedFolder: React.PropTypes.object.isRequired,
    fetchFolder: React.PropTypes.func.isRequired,
    displayMode: React.PropTypes.string,
    currentAlbumJson: React.PropTypes.object,
    curSelectedAlbum: React.PropTypes.object,
  }

  turnToPage_Folder = page => this.props.fetchFolder({pageNum: page});

  turnToPage_Album = page => {
    this.props.fetchFolder({
      pageNum: page,
      groupId: this.props.curSelectedAlbum.id,
    });
  }

  render() {
    let {
      style,
      selectedFolder,
      displayMode,
      currentAlbumJson,
    } = this.props;
    //if(!selectedFolder.total) return(<div></div>);
    if (!selectedFolder.id) return false;
    if(displayMode == 'album') {
      //if(!currentAlbumJson.total) return false;
      return(
        <Pagination
          style={style}
          current={currentAlbumJson.pageNum}
          pageSize={currentAlbumJson.pageSize}
          total={currentAlbumJson.total}
          onChange={this.turnToPage_Album}
        />
      );
    } else {
      return(
        <Pagination
          style={style}
          current={selectedFolder.pageNum}
          pageSize={selectedFolder.pageSize}
          total={selectedFolder.total}
          onChange={this.turnToPage_Folder}
        />
      );
    }
  }










  // render() {
  //   if(this.props.selectedFolder.total)
  //     return (
  //     <Pagination
  //       style={this.props.style}
  //       current={this.props.selectedFolder.pageNum}
  //       pageSize={this.props.selectedFolder.pageSize}
  //       total={this.props.selectedFolder.total}
  //       onChange={this.turnToPage}
  //     />
  //     );
  //   else
  //   return (<div/>);
  // }



}
