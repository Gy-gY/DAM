import React from 'react';
import { connect } from 'react-redux';

class VisualChina extends React.Component {
  static propTypes = {
    currentUser: React.PropTypes.object.isRequired,
  }

  render() {
    let currentUser = this.props.currentUser;
    let url = `https://demo.jintongsoft.cn/cloud/weixinv2/index.do?customerId=${currentUser.customerId}&accessKey=pre.dam.vcg.com&userId=${currentUser.userId}&userType=${currentUser.userType}`;
    return <iframe src={url} width='100%' height='100%'></iframe>;
  }
}

function mapStateToProps(state) {
  return {
    currentUser:state.login.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(VisualChina);
