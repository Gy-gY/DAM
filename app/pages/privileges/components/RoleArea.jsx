import React from 'react';
import { Layout } from 'antd';
import { Radio } from 'antd';
const Content = Layout.Content;
const RadioGroup = Radio.Group;

const styles = {
  content: {
    padding: '0 24px',
  },
  title: {
    textAlign: 'center',
    paddingBottom: '8px',
  },
  radio: {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  },
};

export default class RoleArea extends React.Component {

  static propTypes = {
    selectedGroup: React.PropTypes.object,
    selectRole: React.PropTypes.func.isRequired,
  }

  render() {

    let {
      selectRole,
      selectedGroup,
    } = this.props;

    return (
      <Content style={styles.content}>
        <h2 style={styles.title}>角色</h2>
        <RadioGroup
          onChange={selectRole}
          disabled={!selectedGroup.workgroupId}
          value={selectedGroup.roleId}>
          <Radio style={styles.radio} value={null}>无角色</Radio>
          <Radio style={styles.radio} value={1}>编辑</Radio>
          <Radio style={styles.radio} value={2}>普通用户</Radio>
        </RadioGroup>
      </Content>
    );
  }
}
