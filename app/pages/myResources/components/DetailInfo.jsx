import React, {PropTypes} from 'react';
import { Button, Tabs, Row } from 'antd';

class DetailInfo extends React.Component {

  static propTypes = {
    file: React.PropTypes.object.isRequired,
    form: React.PropTypes.object,
    style: PropTypes.object,
    favorite: PropTypes.func,
    download: PropTypes.func, 
  }

  render() {
    let { file} = this.props;
    const baseStyle = {display: 'flex', flexDirection: 'column', 
      alignContent: 'space-between',
    };
    const style = Object.assign(baseStyle, this.props.style || {});
    return (
      <div style={style}>
        <Tabs defaultActiveKey="1" justify="start">

          <Tabs.TabPane tab="基本信息" key="1" style={{padding: '16px 16px', paddingLeft: '20px'}}>
            图片名称: {file.title} <br/>
            图片说明: {file.description} <br/>
            地点: {file.title} <br/>
            署名： {file.title} <br/>
          </Tabs.TabPane>
        </Tabs>

        <Row justify="end" style={{flex: '0 0 auto', padding: '16px 16px'}}>
          <Button type="primary" htmlType="submit" size="large" style={{margin: '16px'}} 
            onClick={this.props.favorite.bind()} >收藏</Button>
          <Button type="primary" htmlType="submit" size="large" style={{margin: '16px'}} 
            onClick={this.props.download.bind()} >下载</Button>
        </Row>
      </div>
    );
  }
}

export default DetailInfo;
