import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import ResTree from './components/ResTree';
import FolderView from './components/FolderView';
import Operations from './components/Operations';
import {
  getResourceTreeData,
  renameFolder,
  checkFolders_folder,
  onSelectFolder_folder,
  deleteFolder,
  mergeFolders,
  copyFolder,
  moveFolder,

  clearFolserBI,
  clearPerUsers,
} from '../../actions';
import { Layout } from 'antd';
const { Sider, Content } = Layout;
import TreeHelper from '../../common/tree_helper';
import FoldersPermission from './components/FoldersPermission';
import {modal} from '../components/modal';

const styles = {
  content: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  lists: {
    background: '#fff',
    padding: '0 8px',
    flex: '1 1 100%',
    overflow: 'auto',
    alignContent: 'flex-start',
  },
  button: {
    background: '#fff',
    padding: '16px 16px',
    flex: '0 0 auto',
    justifyContent: 'flex-end',
  },
};


class ResTreeManage extends React.Component {

  static propTypes = {
    resTreeData: React.PropTypes.array,
    loadResTreeData: React.PropTypes.func,
    dispatch: React.PropTypes.func.isRequired,
    errorMsg: React.PropTypes.string,
    checkedFolders: React.PropTypes.array,
    folders: React.PropTypes.array,
    isLoading: PropTypes.bool,
    deleteFolder: React.PropTypes.func,
    getResourceTreeData: React.PropTypes.func.isRequired,
    onSelectFolder: React.PropTypes.func.isRequired,
    selectedNode: React.PropTypes.object,
    checkFolders_folder: React.PropTypes.func.isRequired,
    mergeFolders: React.PropTypes.func,
    copyFolder: React.PropTypes.func,
    moveFolder: React.PropTypes.func,

    clearPerUsers: React.PropTypes.func,
    clearFolserBI: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      treeData:null,
      loading: false,
      visible: false,
      //selectedNode: {}, //当前目录树上被选中的节点
      modalBox:null,
      alert:{
        'onHide': this.closeAlert.bind(this),
        'title': null,
        'body': null,
        'visible':false,
        'width':null,
        'okText':'确定',
        'cancelText':'取消',
        'footer':null,
        'maskClosable':false,
        'onCancel':this.closeAlert.bind(this),
      },
    };
  }

  componentDidMount() {
    //this.props.getResourceTreeData();
  }
  findSubTreeById = (id)=>{
    return TreeHelper.findSubTreeById(this.props.resTreeData, id);
  }


  setFolderPermissions(checkedFolders, treeData, newName) {
    let {selectedNode} = this.state;
    const config = {
      'width':'600px',
      'title': <small style={{'fontSize':'14px'}}>目录编辑</small>,
      'body': <FoldersPermission folders={this.props.folders} dispatch={this.props.dispatch} selectedNode={selectedNode} newName={newName} findSubTreeById={this.findSubTreeById.bind(this)} setPermissionSuccess={this.setPermissionSuccess.bind(this)} close={this.closeAlert.bind(this)} treeData={treeData} checkedFolders = {checkedFolders} cancel={this.closeAlert.bind(this)}/>,
      'isBody':true,
      'isButton':false,
      'type':'form',
    };
    this.openAlert(config);
  }

  setPermissionSuccess() {
    this.alertMsg('设置成功', 'success');
  }

  render() {
    const onSelect = (selectedKeys) => {
      this.props.checkFolders_folder([]);
      const selectedId = selectedKeys[0];
      if(!selectedId || selectedId === this.props.selectedNode.id) return;
      this.props.onSelectFolder(selectedId);
      let subTree = this.props.resTreeData.find(x=>x.id==selectedId);
      if (subTree) this.setState({ selectedNode: subTree});
    };

    const onCheckPic = (id, e)=>{
      const pressCtrl = e.ctrlKey||e.metaKey;
      let folders = this.props.checkedFolders;
      if (!pressCtrl) {
        folders.indexOf(id) < 0 ? (folders = []) && folders.push(id) : folders = [];
      } else {
        folders.indexOf(id) < 0 ? folders.push(id) : (folders = this.props.checkedFolders.filter(checkedId=>checkedId != id));
      }
      this.props.checkFolders_folder(folders);
    };

    const onTextBlur = (oldName, id, evt) => {
      const newName = evt.target.value;
      if (oldName == newName) return;
      renameFolder(this.props.dispatch, {tree: this.props.resTreeData, id: id, newName: newName});
    };

    const treeData = this.props.resTreeData;

    const tree = () => {
      if (treeData.id != -1 ) {
        return <ResTree getResourceTreeData={this.props.getResourceTreeData} onSelect={ onSelect } resTreeData={treeData} selectedNode={ this.props.selectedNode }/>;
      } else {
        return false;
      }
    };
    let {modalBox} = this.state;
    return (
      <Layout ref="ResTreeManage">
        {modalBox}
        <Sider
          style={{ background: 'rgb(255, 255, 255)', 'marginRight': '1px', overflow:'auto' }}
        >
          { tree() }
        </Sider>
        <Content style={styles.content}>
          <Operations
            onClick={this.onClick}
            selectedNode={this.props.selectedNode}
            style={styles.button}
            isLoading={this.props.isLoading}
            setFolderPermissions = {this.setFolderPermissions.bind(this)}
            deleteFolder={this.props.deleteFolder}
            mergeFolders={this.props.mergeFolders}
            copyFolder={this.props.copyFolder}
            moveFolder={this.props.moveFolder}
            getResourceTreeData={this.props.getResourceTreeData}
            folders={this.props.folders}
            clearFolserBI={this.props.clearFolserBI}
            clearPerUsers={this.props.clearPerUsers}
            checkedFolders={ this.props.checkedFolders}
            dispatch={this.props.dispatch}
            resTreeData={this.props.resTreeData }
            onSelectFolder={this.props.onSelectFolder}
          />
          <FolderView style={styles.lists} onCheckPic={ onCheckPic } folders={this.props.folders}
            selectedNode={this.props.selectedNode} checkedFolders={this.props.checkedFolders}
            dispatch={this.props.dispatch} onTextBlur={ onTextBlur }/>
        </Content>
      </Layout>
    );
  }

  alertMsg(msg, type) {
    const config = {
      'width':400,
      'title': '提示',
      'onSubmit':false,
      'content':msg,
      'body':msg,
      'type':type,
      'okText':'确定',
      'onOk':null,
      'closable':true,
    };
    this.openAlert(config);
  }

  closeAlert() {
    const alert = Object.assign(this.state.alert, { 'visible': false });
    this.setState({ 'alert': alert, 'modalBox':'' });
    this.forceUpdate();
  }

  openAlert(config) {
    const alert = Object.assign(this.state.alert, { 'visible': true }, config);
    this.setState({ 'alert': alert, 'modalBox':modal(alert)});
    this.forceUpdate();
  }
}

function mapStateToProps(state) {
  return {
    selectedNode: state.resources.selectedNode,
    folders: state.resources.folders,
    isLoading: state.resources.resTree.isLoading,
    resTreeData: state.resources.resTree.treeData,
    errorMsg: state.resources.resTree.error,
    checkedFolders: state.resources.resTree.checkedFolders,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onSelectFolder: (id) => dispatch(onSelectFolder_folder(id)),
    getResourceTreeData: (id) => dispatch(getResourceTreeData(id)),
    checkFolders_folder: (folders) => dispatch(checkFolders_folder(folders)),
    deleteFolder:(params) => deleteFolder(dispatch, params),
    mergeFolders:(params) => mergeFolders(dispatch, params),
    copyFolder:(params) => copyFolder(dispatch, params),
    moveFolder:(params) => moveFolder(dispatch, params),
    dispatch:(action) => dispatch(action),
    clearFolserBI: () => dispatch(clearFolserBI()),
    clearPerUsers: () => dispatch(clearPerUsers()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResTreeManage);
