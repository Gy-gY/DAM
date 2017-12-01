import React from 'react';
import { Breadcrumb } from 'antd';

export default class SearchArea extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    folders: React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
  }

  render() {
    return (
      <Breadcrumb style={this.props.style}>
        {this.getPath().map(item => <Breadcrumb.Item key={item.id}>{item.name}</Breadcrumb.Item>)}
      </Breadcrumb>
    );
  }

  getPath = () => {
    let { folders, selectedFolder } = this.props;
    if (selectedFolder.id) {
      let folder = folders.find(folder => folder.id == selectedFolder.id);
      return folder.seq.split(',').map(folderId => {
        return folders.find(folder => folderId == folder.id);
      });
    } else
      return [];
  }
}
