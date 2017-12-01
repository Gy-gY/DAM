import React from 'react';
import { Tag, Input, Tooltip, Button } from 'antd';

export default class TagArea extends React.Component {

  constructor(props) {
    super(props),
    this.state = {
      tags: props.keywords ? props.keywords.split(',') : [],
      inputVisible: false,
      inputValue: '',
    };
  }

  static propTypes = {
    keywords: React.PropTypes.string,
    onChange: React.PropTypes.func,
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.props.onChange(tags.toString());
    this.setState({ tags });
  }

  handleInputConfirm = (e) => {

    e.preventDefault();

    let { tags, inputValue } = this.state;

    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }

    this.props.onChange(tags.toString());

    this.setState({
      tags,
      inputVisible: true,
      inputValue: '',
    });
  }

  handleInputBlur = () => {

    let { tags, inputValue } = this.state;

    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }

    this.props.onChange(tags.toString());

    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  render() {

    const { tags, inputVisible, inputValue } = this.state;

    return (
      <div style={{ height: '100px', border: '1px solid #d9d9d9', borderRadius: '4px', padding: '4px 8px' }}>
        {tags.map(tag => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={true} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={input => this.input = input}
            type="text" size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ 添加关键字</Button>}
      </div>
    );
  }
}
