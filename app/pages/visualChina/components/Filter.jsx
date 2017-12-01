import React from 'react';
import { Button, Select, Input } from 'antd';
let InputGroup = Input.Group;
let Option = Select.Option;
export default class Filter extends React.Component {

  static propTypes = {
    filter: React.PropTypes.object,
  }
  style = {


  }

  render() {

    return (
      <InputGroup style={this.style.searchContain} compact size={'large'}>
        <Select onChange={this.onChange} style={this.style.select} defaultValue={this.state.searchType} size={'large'}>
          <Option value="Creative">创意图片</Option>
          <Option value="Edit">编辑图片</Option>
        </Select>
        <Input onChange={this.inputOnChange} value={this.state.inputValue} ref="myInput" onPressEnter={this.onSearch} style={this.style.input} placeholder="请输入ID或关键字查询" />
        <Button onClick={this.onButton} style={this.style.search} size={'large'} type="primary" icon="search">搜索</Button>

      </InputGroup>
    );
  }
}
