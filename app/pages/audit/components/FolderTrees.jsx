import React from 'react';
import PubSub from 'pubsub-js';
import { Modal, Tree, notification, Button, Radio, Spin } from 'antd';
import helper from '../../../common/helper';

const RadioGroup = Radio.Group;
const TreeNode = Tree.TreeNode;
const styles = {
  modal: {
    top: 0,
    marginTop: '10%',
    padding:0,
    backgroundColor:'rgb(64,64,64)',
  },
  treeC: {
    // top: 0,
    width: '50%',
    marginTop: '2%',
    overflow: 'auto',
    height: 450,
    padding: 10,
    marginRight: 5,
    float: 'left',
  },
  albumList: {
    float: 'left',
    width: '40%',
    height: 450,
    border: '1px solid #ddd',
    marginTop: '2%',
    // textAlign: 'center',
    overflow: 'auto',
  },
  radioStyle: {
    display: 'block',
    height: '28px',
    lineHeight: '28px',
    marginBottom: '2px',
    backgroundColor: '#e9e9e9',
  },
};

export default class EditModal extends React.Component {

  static propTypes = {
    folders: React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
    fetchFolders: React.PropTypes.func.isRequired,
    isShowTree: React.PropTypes.object,
    hideTree_audit: React.PropTypes.func.isRequired,
    moveAssets_audit: React.PropTypes.func.isRequired,
    copyAssets_audit: React.PropTypes.func.isRequired,
    vcgFolderId: React.PropTypes.number,
    getAlbumsByFolderId: React.PropTypes.func,
    albums: React.PropTypes.object,
    selectedFiles: React.PropTypes.array,
    displayMode: React.PropTypes.string,
    curSelectedAlbum: React.PropTypes.object,
    clearAlbumList: React.PropTypes.func,
    MCBtnStatus: React.PropTypes.bool,
  }

  state = {
    targetId: null,
    selectedAlbumId: null,
    selectValue: [],
  }

  selectAlbum = (value) => {
    this.setState({
      selectedAlbumId: value,
      selectValue: value,
    });
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
    this.setState({
      selectValue: [],
    });
    this.props.clearAlbumList();
    this.props.getAlbumsByFolderId(parseInt(id[0]));
    if(id.length > 0) {
      if(this.props.folders.find(x => x.id == id[0]).permissions.includes('view_assets')) {
        this.setState({targetId : id});
      } else {
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

  radioChange = e => {
    this.setState({
      selectedAlbumId: e.target.value,
      selectValue: e.target.value,
    });
  }

  renderSelect = () => {
    let { albums } = this.props;
    if(albums.isLoading) {
      return (
        <Spin tip="加载中..."></Spin>
      );
    }
    if(albums.list.length == 0) {
      return(
        <div style={{fontSize: '18px', textAlign: 'center', marginTop: '200px'}}>
          没有对应选项
        </div>
      );
    } else {
      let kids = albums.list.map(kid => {
        return (<Radio style={styles.radioStyle} key={kid.id} value={kid.id}>{kid.title}</Radio>);
      });
      return (
        <RadioGroup
          onChange={this.radioChange}
          value={this.state.selectValue}
          style={{width: '100%'}}
        >
          {kids}
        </RadioGroup>
      );
    }
  }

  render = () => {
    let {
        folders,
        selectedFolder,
        selectedFiles,
      } = this.props;
    let disable = !this.state.targetId ||
                  selectedFolder.id == this.state.targetId ||
                  this.state.targetId == 1 ||
                  this.state.targetId == this.props.vcgFolderId;

    let disableSureBtn = disable;
    if(this.state.selectedAlbumId) {
      disableSureBtn = false;
    }
    let showSelect = true;
    if(selectedFiles[0]) {
      if(selectedFiles[0].assetType == helper.ASSET_TYPE.ALBUM) {
        showSelect = false;
      }
    }
    let width = showSelect ? 800 : 400;
    let treeStyle = showSelect ? {...styles.treeC} : {...styles.treeC, width: '100%'};
    return (
      <Modal
        footer={null}
        width={width}
        height={520}
        style={styles.modal}
        visible={this.props.isShowTree.show}
        wrapClassName="full-screen-modal"
        onCancel={() => {
          this.setState({ targetId: null, selectedAlbumId: null });
          this.props.hideTree_audit();
          this.props.clearAlbumList();
        }}
      >
        {
          this.props.isShowTree.show &&
          <div>
            <div style={{height: 470}}>
              <div /*style={{...styles.treeC, float: 'left'}}*/ style={treeStyle}>
                <Tree
                  onSelect={this.onSelectTreeNode}
                  onExpand={this.onExpend}
                  loadData={this.onLoadLeaf}
                  defaultSelectedKeys={['1']}
                  defaultExpandedKeys={selectedFolder ? [selectedFolder.id + ''] : []}
                  //defaultSelectedKeys={selectedFolder ? [selectedFolder.id + ''] : []}
                >
                  {this.renderTree(folders.length && folders[0].parentId, folders)}
                </Tree>
              </div>
              {showSelect &&
                <div style={styles.albumList}>
                  {this.renderSelect()}
                </div>}
            </div>
            <div style={{height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Button
                type="primary"
                style={{marginRight: '4%'}}
                onClick={() => {
                  this.setState({ targetId: null });
                  this.props.hideTree_audit();
                  this.props.clearAlbumList();
                }}
              >
                取消
              </Button>
              <Button
                type="primary"
                loading={this.props.MCBtnStatus}
                disabled = {disableSureBtn}
                onClick={() => {
                  if(this.props.isShowTree.type == 1) {
                    //1：复制
                    if(this.state.selectedAlbumId == null) {
                      this.props.copyAssets_audit(selectedFolder.id, this.state.targetId).then(res => {
                        console.log('copy res1 = ', res);
                        this.props.clearAlbumList();
                      }).catch(err => {
                        console.log('err == ', err);
                        this.props.clearAlbumList();
                      });
                    } else {
                      this.props.copyAssets_audit(selectedFolder.id, this.state.targetId, this.state.selectedAlbumId).then(res => {
                        console.log('copy res2 = ', res);
                        this.props.clearAlbumList();
                      }).catch(err => {
                        console.log('err == ', err);
                        this.props.clearAlbumList();
                      });
                    }
                  } else {
                    //2：移动
                    if(this.props.displayMode == 'folder') {
                      //这种情况没有 sourceGroupId
                      this.props.moveAssets_audit(selectedFolder.id, this.state.targetId, null, this.state.selectedAlbumId).then(res => {
                        console.log('move res1 = ', res);
                        this.props.clearAlbumList();
                      }).catch(err => {
                        console.log('err = ', err);
                        this.props.clearAlbumList();
                      });
                    } else if(this.props.displayMode == 'album') {
                      //这种情况肯定有 sourceGroupId
                      this.props.moveAssets_audit(selectedFolder.id, this.state.targetId, this.props.curSelectedAlbum.id, this.state.selectedAlbumId).then(res => {
                        console.log('move res2 = ', res);
                        this.props.clearAlbumList();
                      }).catch(err => {
                        console.log('err = ', err);
                        this.props.clearAlbumList();
                      });
                    }
                  }
                }}
              >
                确认
              </Button>
            </div>
          </div>
        }
      </Modal>
    );
  }
}
