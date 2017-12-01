import React from 'react';
import { Tree } from 'antd';
const { TreeNode } = Tree;
import PubSub from 'pubsub-js';

export default class ResTree extends React.Component {
  static propTypes = {
    resTreeData: React.PropTypes.array,
    selectedNode: React.PropTypes.object,
    onSelect: React.PropTypes.func,
    onCheck: React.PropTypes.func,
    getResourceTreeData: React.PropTypes.func,
  }

  onExpendNode = (expandedKeys, node) => {
    if(node.expanded) {
      if(!this.props.resTreeData.find(x=>x.parentId==node.node.props.eventKey)) {
        this.props.getResourceTreeData(node.node.props.eventKey);
      }
    }
  }
  onLoadLeaf = treeNode =>{
    return new Promise((resolve) => {
      if(!this.props.resTreeData.find(x=>x.parentId==treeNode.props.eventKey)) {
        let token = PubSub.subscribe( 'tree', ()=>{
          PubSub.unsubscribe(token);
          resolve();
        } );
      }else {
        resolve();
      }
    });
  }
  componentDidUpdate() {
    PubSub.publish('tree');
  }

  render() {
    console.log(this.props.resTreeData);
    return (
      <Tree
        onSelect={this.props.onSelect}
        onExpand={this.onExpendNode}
        loadData={this.onLoadLeaf}
        defaultExpandedKeys={this.props.selectedNode ? [this.props.selectedNode.id + ''] : []}
        defaultSelectedKeys={this.props.selectedNode ? [this.props.selectedNode.id + ''] : []}>
        {this.renderTree(this.props.resTreeData.length && this.props.resTreeData[0].parentId, this.props.resTreeData)}
      </Tree>
    );
  }
  renderTree = (parentId, nodes) => {
    let rest = nodes.filter(item => item.parentId != parentId);

    return nodes.filter(item => item.parentId == parentId).map(item => {
      let AllChildren = rest.filter(x => x.seq.includes(item.id));
      let children = AllChildren.filter(node => node.parentId == item.id);
      let title = `${item.name}`;
      let isLeaf = (item.children&&item.children.length>0)?false:true;
      if (children.length) {
        return(
          <TreeNode key={item.id} isLeaf={isLeaf} title={title} >
            {this.renderTree(item.id, rest)}
          </TreeNode>
        );
      } else {
        return(
            <TreeNode key={item.id} isLeaf={isLeaf} title={title} />
        );
      }
    });
  }

}
