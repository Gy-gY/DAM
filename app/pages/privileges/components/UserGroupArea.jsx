import React from 'react';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

export default class UserGroupArea extends React.Component {

  static propTypes = {
    userGroups: React.PropTypes.array,
    selectedGroup: React.PropTypes.object,
    fetchUserGroups: React.PropTypes.func.isRequired,
    fetchPrivilege: React.PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchUserGroups();
  }

  render() {

    let {
      fetchPrivilege,
      selectedGroup,
      userGroups,
    } = this.props;

    return (
      <Tree
        onSelect={fetchPrivilege}
        defaultSelectedKeys={[selectedGroup.workgroupId + '']}>
        {this.renderTree(null, userGroups)}
      </Tree>
    );
  }

  renderTree = (parentId, nodes) => {

    let rest = nodes.filter(item => item.parentid != parentId);

    return nodes.filter(item => item.parentid == parentId).map(item => {
      if (rest.length)
        return (
          <TreeNode key={item.id} title={item.name}>
            {this.renderTree(item.id, rest)}
          </TreeNode>
        );
      else
        return <TreeNode key={item.id} title={item.name}/>;
    });
  }
}
