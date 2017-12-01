import React from 'react';
import PubSub from 'pubsub-js';
import { Row, Col, Modal, Carousel, Tree, notification, Button } from 'antd';
import EditArea from './EditArea';
import VideoCell from './VideoCell';
const TreeNode = Tree.TreeNode;
const styles = {
  modal: {
    top: 0,
    marginTop: '10%',
    padding:0,
    backgroundColor:'rgb(64,64,64)',
  },
  treeC: {
    top: 0,
    width:'100%',
    marginTop: '10%',
    overflow:'auto',
    height:450,
    padding:10,
  },
};

export default class EditModal extends React.Component {

  static propTypes = {
    folders: React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
    fetchFolders: React.PropTypes.func.isRequired,
    isShowTree: React.PropTypes.object,
    hideTree_upload: React.PropTypes.func.isRequired,
    moveAssets_upload: React.PropTypes.func.isRequired,
    copyAssets_upload: React.PropTypes.func.isRequired,
  }

  state = {
    targetId: null,
  }
  onExpend = (expandedKeys, node) => {
    if(node.expanded) {
      if(!this.props.folders.find(x=>x.parentId==node.node.props.eventKey)) {
        this.props.fetchFolders('audit', node.node.props.eventKey);
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
  onSelectTreeNode = id => {
    if(id.length>0) {
      if(this.props.folders.find(x=>x.id==id[0]).permissions.includes('view_assets')) {
        this.setState({targetId : id});
      }else {
        notification.error({message: '无权限浏览此目录'});
      }
    }
  }

  componentDidUpdate() {
    PubSub.publish('tree');
  }

  renderTree = (parentId, nodes) => {
    let rest = nodes.filter(item => item.parentId != parentId);
    return nodes.filter(item => item.parentId == parentId).map(item => {
      let AllChildren = rest.filter(x => x.seq.includes(item.id));
      let children = AllChildren.filter(node => node.parentId == item.id);
      let title = `${item.name}`;
      let isLeaf = (item.children && item.children.length) ? false : true;
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

  render = () => {
    let {
        folders,
        selectedFolder,
      } = this.props;
    let disable = !this.state.targetId || selectedFolder.id == this.state.targetId || this.state.targetId == 1;
    return (
      <Modal
        footer={null}
        width={300}
        height={500}
        style={styles.modal}
        visible={this.props.isShowTree.show}
        wrapClassName="full-screen-modal"
        onCancel={() => {
          this.setState({ targetId: null });
          this.props.hideTree_upload();
        }}
      >
        {this.props.isShowTree.show && <div><div style={styles.treeC}>
          <Tree
            onSelect={this.onSelectTreeNode}
            onExpand={this.onExpend}
            loadData={this.onLoadLeaf}
            defaultExpandedKeys={selectedFolder ? [selectedFolder.id + ''] : []}
            defaultSelectedKeys={selectedFolder ? [selectedFolder.id + ''] : []}>
            {this.renderTree(folders.length && folders[0].parentId, folders)}
          </Tree>
        </div>
          <div>
            <Button
              type="primary"
              style={{ margin: '10px 15px 0px 0px', float:'right' }}
              onClick={() => {
                this.setState({ targetId: null });
                this.props.hideTree_upload();
              }}
            >
              取消
            </Button>
            <Button
              type="primary"
              disabled = {disable}
              style={{ margin: '10px 15px 0px 0px', float:'right' }}
              onClick={() => {
                if(this.props.isShowTree.type == 1) {
                  this.props.copyAssets_upload(selectedFolder.id, this.state.targetId);
                }else {
                  this.props.moveAssets_upload(selectedFolder.id, this.state.targetId);
                }
              }}
            >
              确认
            </Button>
        </div></div>}
      </Modal>
    );
  }
}
