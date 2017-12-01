import React from 'react';
import { Layout } from 'antd';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;
const Content = Layout.Content;
import TreeHelper from '../../../common/tree_helper';

const styles = {
  content: {
    padding: '0 24px',
    borderLeft: '1px solid #e9e9e9',
  },
  title: {
    textAlign: 'center',
  },
};

export default class FolderArea extends React.Component {

  static propTypes = {
    folders: React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
    fetchFolder: React.PropTypes.func.isRequired,
    fetchFolders: React.PropTypes.func.isRequired,
    onSelectedFolders: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchFolders();
  }

  render() {

    let {
      folders,
      fetchFolder,
      selectedFolder,
      onSelectedFolders,
    } = this.props;
    if (folders.length == 0) return false;
    const rootFolder = TreeHelper.rootFolders(folders);
    return (
      <Content style={styles.content}>
        <h2 style={styles.title}>目录操作</h2>
        <div>
          <Tree
            onSelect={onSelectedFolders.bind(this)}
            defaultExpandedKeys={rootFolder}>
            {this.renderTree(null, folders)}
          </Tree>
        </div>
      </Content>
    );
  }

  renderTree = (parentId, nodes) => {

    let rest = nodes.filter(item => item.parentId != parentId);

    return nodes.filter(item => item.parentId == parentId).map(item => {
      if (rest.length)
        return (
          <TreeNode key={item.id} title={item.name}>
            {this.renderTree(item.id, rest)}
          </TreeNode>
        );
      else
        return <TreeNode key={item.id} title={item.name}/>;
    });
  }

}
