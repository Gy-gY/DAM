import React from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col, Button } from 'antd';
const { Content, Sider } = Layout;

import RoleArea from './components/RoleArea';
import FolderArea from './components/FolderArea';
import UserGroupArea from './components/UserGroupArea';

import {
  fetchFolders,
  selectFolders,
  selectRole,
  fetchUserGroups,
  fetchPrivilege,
  updatePrivilege,
} from 'actions';

const styles = {
  sider: {
    background: '#fff',
    marginRight: '1px',
  },
  content: {
    background: '#fff',
    padding: '16px 0',
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  lists: {
    flex: '1 1 100%',
  },
  button: {
    padding: '16px 0',
    flex: '1 0 auto',
    textAlign: 'center',
  },
};

class Privileges extends React.Component {

  static propTypes = {
    folders: React.PropTypes.array,
    userGroups: React.PropTypes.array,
    selectedGroup: React.PropTypes.object,
    selectRole: React.PropTypes.func.isRequired,
    fetchFolders: React.PropTypes.func.isRequired,
    selectFolders: React.PropTypes.func.isRequired,
    fetchPrivilege: React.PropTypes.func.isRequired,
    fetchUserGroups: React.PropTypes.func.isRequired,
    updatePrivilege: React.PropTypes.func.isRequired,
  }

  render() {

    let {
      folders,
      userGroups,
      selectedGroup,
      selectRole,
      fetchFolders,
      selectFolders,
      fetchPrivilege,
      fetchUserGroups,
      updatePrivilege,
    } = this.props;

    return (
      <Layout>
        <Sider style={styles.sider}>
          <UserGroupArea
            userGroups={userGroups}
            selectedGroup={selectedGroup}
            fetchUserGroups={fetchUserGroups}
            fetchPrivilege={fetchPrivilege} />
        </Sider>
        <Content style={styles.content}>
          <Row style={styles.lists}>
            <Col span={12}>
              <RoleArea
                selectedGroup={selectedGroup}
                selectRole={selectRole} />
            </Col>
            <Col span={12}>
              <FolderArea
                folders={folders}
                selectedGroup={selectedGroup}
                fetchFolders={fetchFolders}
                selectFolders={selectFolders}/>
            </Col>
          </Row>
          <Row style={styles.button}>
            <Button
              type="primary"
              onClick={updatePrivilege.bind(null, selectedGroup)}
              disabled={!selectedGroup.workgroupId}>
              保存
            </Button>
          </Row>
        </Content>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    folders: state.privileges.folders,
    userGroups: state.privileges.userGroups,
    selectedGroup: state.privileges.selectedGroup,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFolders: () => dispatch(fetchFolders()),
    fetchUserGroups: () => dispatch(fetchUserGroups()),
    fetchPrivilege: (id) => dispatch(fetchPrivilege(id)),
    selectFolders: (ids) => dispatch(selectFolders(ids)),
    updatePrivilege: (prvge) => dispatch(updatePrivilege(prvge)),
    selectRole: (event) => dispatch(selectRole(event.target.value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Privileges);
