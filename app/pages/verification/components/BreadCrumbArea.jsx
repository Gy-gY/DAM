import React from 'react';
import { Breadcrumb } from 'antd';

export default class SearchArea extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
  }

  render() {
    return (
      <Breadcrumb style={this.props.style}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}
