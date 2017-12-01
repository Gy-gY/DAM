import React from 'react';
import { Row, Button, Select, Input } from 'antd';

export default class SearchArea extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
  }

  render() {
    return (
      <Row style={this.props.style} type="flex" justify="space-between">
        <div>
          <Input placeholder="ID / 名称 / 关键字 / 上传人" />
        </div>
        <div>
          <Select defaultValue="0" style={{ width: 120, margin: '0 8px'}} >
            <Select.Option value="0">全部</Select.Option>
            <Select.Option value="1">已编辑</Select.Option>
            <Select.Option value="2">未编辑</Select.Option>
          </Select>
          <Select defaultValue="0" style={{ width: 120, margin: '0 8px' }} >
            <Select.Option value="0">全部</Select.Option>
            <Select.Option value="1">分类1</Select.Option>
            <Select.Option value="2">分类2</Select.Option>
          </Select>
          <Button type="primary" style={{ marginLeft: '8px' }}>
            搜索
          </Button>
        </div>
      </Row>
    );
  }
}
