import React from 'react';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;
import PubSub from 'pubsub-js';
export default class FolderArea extends React.Component {

  static propTypes = {
    folders: React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
    fetchFolder: React.PropTypes.func.isRequired,
    fetchFolders: React.PropTypes.func.isRequired,
    type:React.PropTypes.string,
    paths:React.PropTypes.object, //enabled的folder id 集合
    stateFolderId: React.PropTypes.array,
    getDownList: React.PropTypes.func,
    downList: React.PropTypes.object,
    getALiYunParams: React.PropTypes.func,
  }

  onExpend = (expandedKeys, node) => {
    // console.log('--------onExpend-----------');
    // console.log('expandedKeys = ', expandedKeys);
    // console.log('node = ', node);
    if(node.expanded) {
      if(!this.props.folders.find(x => x.parentId == node.node.props.eventKey)) {
        this.props.fetchFolders(this.props.type, node.node.props.eventKey);
      }
    }
  }

  onLoadLeaf = (treeNode) => {
    // console.log('--------onLoadLeaf-----------');
    // console.log('treeNode = ', treeNode);
    return new Promise(resolve => {
      if(!this.props.folders.find(x => x.parentId == treeNode.props.eventKey)) {
        let token = PubSub.subscribe( 'tree', () => {
          PubSub.unsubscribe(token);
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  componentDidMount() {
    this.props.fetchFolders(this.props.type);
  }

  componentDidUpdate() {
    PubSub.publish('tree');
  }


  render() {
    let {
      folders,
      fetchFolder,
      selectedFolder,
    } = this.props;
    return (
      <div>
        <Tree
          onSelect={fetchFolder}
          onExpand={this.onExpend}
          selectedKeys={this.props.stateFolderId}
          loadData={this.onLoadLeaf}
          defaultExpandedKeys={selectedFolder && selectedFolder.id > 0 ? [selectedFolder.id + ''] : ['1']}
          defaultSelectedKeys={selectedFolder ? [selectedFolder.id + ''] : []}>
          {this.renderTree(folders.length && folders[0].parentId, folders)}
        </Tree>
      </div>
    );
  }
  renderTree = (parentId, nodes) => {
    if(nodes.length > 0) {
      let rest = nodes.filter(item => item.parentId != parentId);
      return nodes.filter(item => item.parentId == parentId).map(item => {
        let AllChildren = rest.filter(x => x.seq.includes(item.id));
        let children = AllChildren.filter(node => node.parentId == item.id);
        let title = `${item.name}`;

        let isLeaf = (item.children && item.children.length) ? false : true;
        // if(item.hasManyAssets) {
        //   title = <span style={{color: '#f04134'}}>{title}</span>;
        // }
        if(children.length) {
          return(
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


}
