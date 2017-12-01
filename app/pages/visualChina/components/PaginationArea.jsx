import React from 'react';
import { Pagination } from 'antd';

export default class PaginationArea extends React.Component {
  static propTypes = {
    vcgImages: React.PropTypes.object.isRequired,
    vcgSearch: React.PropTypes.func.isRequired,
    style: React.PropTypes.object.isRequired,
    filter: React.PropTypes.object.isRequired,
  }

  render() {
    if (!this.props.vcgImages.list) return false;
    let current = this.props.vcgImages.cur_page?parseInt(this.props.vcgImages.cur_page):1;
    return (
      <Pagination
        style={this.props.style}
        current={current}
        pageSize={this.props.filter.nums}
        total={this.props.vcgImages.total_count}
        onChange={this.turnToPage} />
    );
  }
  turnToPage = page => this.props.vcgSearch({page});
}
