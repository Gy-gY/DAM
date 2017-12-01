import React from 'react';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;
import PubSub from 'pubsub-js';
export default class FolderArea extends React.Component {

  static propTypes = {
    folders: React.PropTypes.array,
    selectedFolder: React.PropTypes.number,
    fetchFolder: React.PropTypes.func.isRequired,
    fetchFolders: React.PropTypes.func.isRequired,
  }

  onExpend = (expandedKeys, node) => {
    if(node.expanded) {
      if(!this.props.folders.find(x=>x.parentId==node.node.props.eventKey)) {
        this.props.fetchFolders(node.node.props.eventKey);
      }
    }
  }
  onLoadLeaf = (treeNode) =>{
    return new Promise((resolve) => {
      if(!this.props.folders.find(x=>x.parentId==treeNode.props.eventKey)) {
        let token = PubSub.subscribe( 'tree', ()=>{
          PubSub.unsubscribe(token);
          resolve();
        } );
      }else {
        resolve();
      }
    });
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
      fetchFolder,
      selectedFolder,
    } = this.props;
    return (
      <div>
        <Tree
          onSelect={fetchFolder}
          onExpand={this.onExpend}
          loadData={this.onLoadLeaf}
          defaultExpandedKeys={selectedFolder&&selectedFolder>0 ? [selectedFolder + ''] : ['1']}
          defaultSelectedKeys={selectedFolder ? [selectedFolder + ''] : []}>
          {this.renderTree(folders.length && folders[0].parentId, folders)}
        </Tree>
      </div>
    );
  }
  renderTree = (parentId, nodes) => {
    if(nodes.length>0) {
      let rest = nodes.filter(item => item.parentId != parentId);
      return nodes.filter(item => item.parentId == parentId).map(item => {
        let AllChildren = rest.filter(x => x.seq.includes(item.id));
        let children = AllChildren.filter(node => node.parentId == item.id);
        let title = `${item.name}`;

        let isLeaf = (item.children&&item.children.length)? false:true;
        //if(item.hasManyAssets) {
        //  title = <span style={{color: '#f04134'}}>{title}</span>;
        //}
        if (children.length) {
          return (
            <TreeNode key={item.id} isLeaf={isLeaf} title={title} >
              {this.renderTree(item.id, rest)}
            </TreeNode>
          );
        }else {
          return <TreeNode key={item.id} isLeaf={isLeaf} title={title} />;
        }
      });
    }
  }


}
