import React, {PropTypes} from 'react';
import { Button, Modal, Input, Row, notification } from 'antd';
import {addNewFolder} from '../../../actions';
import ResTree from './ResTree';

import TreeHelper from '../../../common/tree_helper';

export default class Operations extends React.Component {

  state = {
    showMergeDialog: false,
    modalVisiable: false,
    modalSeleted: null, //Tree Model中被选中的文件夹IDs
    modalHandleOk: () => {
      this.setState({
        modalVisiable: false,
      });
    },
    modalHandleCancel:  () => {
      this.setState({
        modalVisiable: false,
      });
    },
  };

  static propTypes = {
    style: React.PropTypes.object,
    onClick: React.PropTypes.func,
    resTreeData: React.PropTypes.array,
    folders: React.PropTypes.array,
    selectedNode: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    checkedFolders: React.PropTypes.array,
    setFolderPermissions:React.PropTypes.func,
    isLoading: PropTypes.bool,
    deleteFolder:React.PropTypes.func,
    //mergeAfterParentNode:React.PropTypes.func,
    mergeFolders:React.PropTypes.func,
    copyFolder:React.PropTypes.func,
    moveFolder:React.PropTypes.func,
    getResourceTreeData: React.PropTypes.func,
    clearPerUsers: React.PropTypes.func,
    clearFolserBI: React.PropTypes.func,
    onSelectFolder: React.PropTypes.func,
  }
  style = {
    operationButton: {
      marginRight: '8px',
    },
  };

  // 确定新建的文件夹的名称，根据兄弟文件夹的名称来计算
  // 如 兄弟文件夹有 未命名1 则，新建的文件夹为未命名2
  makeFolderName = (brotherFolders) => {
    if(!brotherFolders) return '未命名0';
    const reg = /^未命名[0-9]+$/;
    const unNamedFolders = brotherFolders.filter((folder) => {
      return reg.test(folder.name);
    }).sort((a, b) => {
      return a.name < b.name;
    });
    if (unNamedFolders.length == 0) {
      return '未命名0';
    }
    const maxNum = parseInt(unNamedFolders[0].name.replace('未命名', ''));
    const num = maxNum + 1;
    return '未命名' + num.toString();
  }

  onClick = (key) => {
    const selectedNode = this.props.selectedNode; //当前左侧树上被选择的点
    const treeData = this.props.resTreeData; //树对象
    const checkedFolders = this.props.checkedFolders; //当前被勾选的节点
    console.log('click operation buttons', 'key:', key,
    'selectNode:', selectedNode, 'treeData', treeData);
    if (checkedFolders.length == 0 && key != 'newFolder') {
      Modal.warn({
        title: '警告',
        content: '请选择文件夹后再执行操作',
        okText: '确定',
        cancelText: '取消',
      });
    } else if (!selectedNode || !selectedNode.id) {
      Modal.warn({
        title: '警告',
        content: '请在目录树上选择要操作的目录',
        okText: '确定',
        cancelText: '取消',
      });
    } else {
      switch (key) {
      case 'newFolder': {
        const newFolderName = this.makeFolderName(this.props.folders);
        addNewFolder(this.props.dispatch, {tree: treeData, id: selectedNode.id, newFolder: {name: newFolderName}});
        break;
      }
      case 'deleteFolder': {
        const toDeleteFolders = checkedFolders;
        Modal.confirm({
          title: '删除文件夹',
          content: '是否确定删除所选文件夹？',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            console.log('Folder Action =>', 'delete Folder', toDeleteFolders);
            toDeleteFolders.map((id)=>{
              this.props.deleteFolder({folders: this.props.folders, tree: treeData, parentId: selectedNode.id, id: id});
            });
          },
        });
        break;
      }
      case 'copyFolderTo': {
        const fromIds = checkedFolders;
        this.setState({modalVisiable: true, modalHandleOk: () => {
          const toId = this.state.modalSeleted[0];

          this.props.copyFolder({
            fromId: fromIds[0],
            toId: toId,
          });

          this.setState({modalVisiable: false});
        }});
        break;
      }

      case 'moveFolderTo': {
        const fromIds = checkedFolders;
        this.setState({modalVisiable: true, modalHandleOk: () => {
          fromIds.forEach((fromId) => {
            const toId = this.state.modalSeleted[0];
            this.props.moveFolder({
              fromId: fromId,
              toId: toId,
              folders: this.props.folders,
              tree: treeData,
            });
          });
          this.setState({modalVisiable: false});
        }});
        break;
      }

      case 'mergeFolders': {
        const toMergeFolders = checkedFolders;
        toMergeFolders.map((id)=>{
          return TreeHelper.findSubTreeById(treeData, id).name;
        });
        this.setState({showMergeDialog: true});
        break;
      }
      }
    }
  }

  //Dialog show when try to merge folders
  mergeDialog = () => {
    const checkIds = this.props.checkedFolders; //当前被勾选的文件夹
    const parentNode = this.props.selectedNode; //当前被勾选的文件夹的父节点
    if (!checkIds || !parentNode ) return false;
    const folderNames = checkIds.map(id => {
      let f = this.props.folders.find(folder => {
        return folder.id == id;
      });

      return f && '"' + f.name + '"';
    });

    const treeData = this.props.resTreeData;
    const onOk = () => {
      const newName = this.refs.mergeName.refs.input.value;
      if(!newName) {
        notification.error({message:'请填写合并后的名称'});
        return;
      }
      this.props.mergeFolders({
        tree: treeData,
        fromIds: checkIds,
        id: parentNode.id,
        newFolder: {name: newName},
        folders: this.props.folders,
      });
      this.setState({showMergeDialog: false});
    };
    const onCancel = () => {
      this.setState({showMergeDialog: false});
    };
    const content = '文件夹' + folderNames.join(',') + '将被合并';
    return (
      <Modal
        onOk={ onOk }
        onCancel= { onCancel }
        title='文件夹合并'
        visible={this.state.showMergeDialog}>
        <div style={{margin: '20px', textAlign: 'center'}}>
          <h3>{content}</h3>
          <br />
          <p>合并后原文件删除</p>
          <br />
          <br />
          <Input placeholder='请重新命名' ref='mergeName' required/>
        </div>
      </Modal>);
  }

  //A tree
  treeModal= () => {
    const onSelect = (selectedKeys) => {
      this.setState({modalSeleted: selectedKeys});
      // TODO Load Sub Folder
    };
    return (
      <Modal visible={this.state.modalVisiable}
        onOk={this.state.modalHandleOk}
        onCancel={this.state.modalHandleCancel}
      >
        <ResTree onSelect={ onSelect } resTreeData={this.props.resTreeData} getResourceTreeData={this.props.getResourceTreeData}/>
      </Modal>
    );
  };

  setFolderPermissions(isNew) {
    if(isNew) {
      this.props.clearFolserBI();
      this.props.clearPerUsers();
    }
    let newName = this.makeFolderName(this.props.folders);
    this.props.setFolderPermissions(isNew?[]:this.props.checkedFolders, this.props.resTreeData, isNew?newName:'');
  }

  refresh = (id) => {
    this.props.onSelectFolder(id);
  }

  isEmptyObject = (obj) => {
    for (let key in obj) {
      return false;
    }
    return true;
  }

  render() {
    let isEmpty = this.isEmptyObject(this.props.selectedNode);
    let disabled = this.props.selectedNode == null || this.props.checkedFolders.length == 0 ? true : false;
    let createDisabled = ((this.props.selectedNode == null)||isEmpty) ? true : false;
    let permissionDisabled = disabled;
    if(this.props.checkedFolders.length>1) {
      permissionDisabled = true;
    }
    let { style } = this.props;
    return (
      <Row style={style} type='flex'>
        { this.mergeDialog() }
        { this.treeModal() }
        <Button style={ this.style.operationButton } onClick={this.refresh.bind(null, this.props.selectedNode.id)}>刷新</Button>
        <Button loading={this.props.isLoading} style={ this.style.operationButton } disabled={createDisabled} onClick={this.setFolderPermissions.bind(this, true)}>新建</Button>
        <Button style={ this.style.operationButton } disabled={disabled} onClick={this.onClick.bind(this, 'copyFolderTo')}>复制到</Button>
        <Button style={ this.style.operationButton } disabled={disabled} onClick={this.onClick.bind(this, 'moveFolderTo')}>移动到</Button>
        <Button style={ this.style.operationButton } disabled={disabled} onClick={this.onClick.bind(this, 'mergeFolders')}>合并</Button>
        {/*<Button style={ this.style.operationButton } onClick={this.onClick.bind(this, 'mirrorFolder')}>映射</Button>*/}
        <Button style={ this.style.operationButton } disabled={permissionDisabled} onClick={this.setFolderPermissions.bind(this, false)}>编辑</Button>
        <Button style={ this.style.operationButton } disabled={disabled} onClick={this.onClick.bind(this, 'deleteFolder')}>删除</Button>
      </Row>
    );
  }
}
