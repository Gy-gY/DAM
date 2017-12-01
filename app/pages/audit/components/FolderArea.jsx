import PubSub from 'pubsub-js';
import React from 'react';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

export default class FolderArea extends React.Component {

  static propTypes = {
    folders: React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
    fetchFolder: React.PropTypes.func,
    fetchFolders: React.PropTypes.func.isRequired,
    paths:React.PropTypes.object, //enabled的folder id 集合
  }
  state = {
    selectedKeys : ['1'],
  }
  onExpend = (expandedKeys, node) => {
    if(node.expanded) {

      if(!this.props.folders.find(x => x.parentId == node.node.props.eventKey)) {
        this.props.fetchFolders('audit', node.node.props.eventKey);
      }
    }
  }
  onLoadLeaf = (treeNode) => {
    return new Promise((resolve) => {
      if(!this.props.folders.find(x => x.parentId == treeNode.props.eventKey)) {
        let token = PubSub.subscribe( 'tree', () => {
          PubSub.unsubscribe(token);
          resolve();
        } );
      }else {
        resolve();
      }
    });
  }
  onSelectTreeNode = id => {
    if(id != 1) {
      if(id.length > 0) {
        this.setState({selectedKeys:id});
        this.props.fetchFolder({folderId:id});
      }
    }
  }
  componentDidMount() {
    this.props.fetchFolders();
  }
  componentDidUpdate() {
    PubSub.publish('tree');
  }
  render() {
    let {
      folders,
      selectedFolder,
    } = this.props;
    return (
      <Tree
        onSelect={this.onSelectTreeNode}
        onExpand={this.onExpend}
        loadData={this.onLoadLeaf}
        selectedKeys={this.state.selectedKeys}
        defaultExpandedKeys={selectedFolder && selectedFolder.id > 0 ? [selectedFolder.id + ''] : ['1']}
        defaultSelectedKeys={selectedFolder ? [selectedFolder.id + ''] : []}>
        {this.renderTree(folders.length && folders[0].parentId, folders)}
      </Tree>
    );
  }

  renderTree = (parentId, nodes) => {
    let rest = nodes.filter(item => item.parentId != parentId);
    return nodes.filter(item => item.parentId == parentId).map(item => {
      let AllChildren = rest.filter(x => x.seq.includes(item.id));
      let children = AllChildren.filter(node => node.parentId == item.id);
      let title = `${item.name}`;
      let isLeaf = (item.children && item.children.length) ? false:true;
      //if(item.hasManyAssets) {
      //  title = <span style={{color: '#f04134'}}>{title}</span>;
      //}
      //disabled={!item.permissions.includes('view_assets')}
      if (children.length) {
        return (
          <TreeNode key={item.id} isLeaf={isLeaf} title={title} >
            {this.renderTree(item.id, rest)}
          </TreeNode>
        );
      } else {
        return <TreeNode key={item.id} isLeaf={isLeaf} title={title} />;
      }
    });
  }
}
