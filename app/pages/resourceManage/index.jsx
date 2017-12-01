import React from 'react';
import { Layout, Spin } from 'antd';
import { connect } from 'react-redux';
import FolderArea from './components/FolderArea';

//import Search from './components/Search';
import {fetchFolders} from './action';



class VisualChina extends React.Component {

  static propTypes = {
    folders: React.PropTypes.array,
    selectedFolder: React.PropTypes.number,
    fetchFolders: React.PropTypes.func.isRequired,
  }
  styles = {
   
  };
  renderCon = ()=>{
    let styleList = this.styles.lists;
    let spin=<div><div style={this.styles.loadingC}></div><div style={this.styles.loading}><Spin size='large'/></div></div>;
 

    return (<Layout>
        <Layout.Sider style={this.styles.sider}>
          <FolderArea
            folders={this.props.folders}
            selectedFolder={this.props.selectedFolder}
            fetchFolder={()=>{alert('ok');}}
            fetchFolders={this.props.fetchFolders}
          />
        </Layout.Sider>
        <Layout.Header style={{backgroundColor:'white', padding:0}}>
        </Layout.Header>
        <Layout.Content style={{backgroundColor:'white'}}>
        </Layout.Content>
        <Layout.Footer style={{padding:0}}>
        </Layout.Footer>
    </Layout>);
  }

  render() {
    return this.renderCon();
  }
}


function mapStateToProps(state) {
  return {
    folders: state.resourceManage.folders,
    selectedFolder: state.resourceManage.selectedFolder,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFolders: (params) => dispatch(fetchFolders(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisualChina);
