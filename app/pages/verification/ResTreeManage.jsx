import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Store } from 'react-redux';
import ResTree from './components/ResTree';
import FolderView from './components/FolderView';
import Operations from './components/Operations';
// import OrgInfo from './components/org-info';
import {getResourceTreeData, addNewFolder, deleteFolder,
  copyFolder, moveFolder, mergeFolders, renameFolder } from '../../actions';
import {modal} from '../components/modal';
import { Button, Layout, Breadcrumb, Modal, Input } from 'antd';
const { Sider, Content, Header } = Layout;
import TreeHelper from '../../common/tree_helper';

class ResTreeManage extends React.Component {
  state = {
    checkedFolders: [], //当前页面上被勾选的文件夹
    loading: false,
    visible: false,
    selectedNode: {}, //当前目录树上被选中的节点
  }

  static propTypes = {
    resTreeData: React.PropTypes.object,
    loadResTreeData: React.PropTypes.func,
    dispatch: React.PropTypes.func,
    errorMsg: React.PropTypes.string,
  }
  constructor(props) {
    super(props);
    getResourceTreeData(this.props.dispatch);
  }

  findSubTreeById = (id)=>{
    return TreeHelper.findSubTreeById(this.props.resTreeData, id);
  }

  render() {
    const onSelect = (selectedKeys) => {
      const selectedId = selectedKeys[0];
      if(!selectedId || selectedId === this.state.selectedNode.id) return;
      const subTree = this.findSubTreeById(parseInt(selectedId));
      if (subTree) this.setState({ selectedNode: subTree});
    };

    const onCheckPic = (id, e)=>{
      let folders = this.state.checkedFolders;
      if (e.target.checked) {
        folders.push(id);
      } else {
        folders = this.state.checkedFolders.filter((checkedId)=>{
          return checkedId != id;
        });
      }
      // console.log('newFolders', folders);
      this.setState({checkedFolders: folders});
    };

    const onTextBlur = (oldName, id, evt) => {
      const newName = evt.target.value;
      if (oldName == newName) return;
      renameFolder(this.props.dispatch, {tree: this.props.resTreeData, id: id, newName: newName});
    };

    const treeData = this.props.resTreeData.children;
    const selectedNode = this.findSubTreeById(this.state.selectedNode.id);

    return (
      <Layout ref="ResTreeManage">
        <Sider
          style={{ background: 'rgb(255, 255, 255)', 'borderRadius': '5px', 'marginRight': '3px', padding: '20px', width: '180px'}}
        >
          <ResTree onSelect={ onSelect } resTreeData={treeData}/>
        </Sider>
        <Content style={{ background: 'rgb(255, 255, 255)', 'borderRadius': '5px', padding: '20px'}}>
          <div style={{ height: '40px'}}>
            <Operations onClick={this.onClick} selectedNode={selectedNode}
              checkedFolders={ this.state.checkedFolders} dispatch={this.props.dispatch}
              resTreeData= {this.props.resTreeData }/>
          </div>
          <Breadcrumb separator='>' style={{marginTop: '10px', marginBottom: '20px'}}>
            {
              TreeHelper.getPathNames(this.props.resTreeData, selectedNode).map((name)=>{
                return (<Breadcrumb.Item key={Math.random()}>{name}</Breadcrumb.Item>);
              })
            }
          </Breadcrumb>
          <FolderView style={{width: '90%', height: '80%'}} onCheckPic={ onCheckPic } treeData={ selectedNode }
          onTextBlur={ onTextBlur }/>
        </Content>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    resTreeData: state.resources.resTree.treeData,
    errorMsg: state.resources.resTree.error,
  };
}

export default connect(mapStateToProps)(ResTreeManage);
