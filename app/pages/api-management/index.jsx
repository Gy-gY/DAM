import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, Row } from 'antd';
import APIForm from './components/APIForm';

import {
  createAPIClient,
  deleteAPIClient,
  editAPIClient,
  listAPIClient,
} from '../../actions/apiClient';

import {
  getGroupTreeData,
} from '../../actions/user';

const styles = {
  content: {
    padding: '40px',
    background: 'rgb(255, 255, 255)',
    height: '100%',
    overFlow: 'scroll',
    // display: 'flex',
  },
  button: {
    marginBottom: '16px',
  },
};
class APIManageComponent extends Component {
  state = {
    'showModal': false,
    'columns': [{
      title: 'API用户名称',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'API用户描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'CLIENT_ID',
      dataIndex: 'clientId',
      key: 'clientId',
    }, {
      title: 'CLIENT_SECRET',
      dataIndex: 'clientSecret',
      key: 'clientSecret',
    }, {
      'title': '操作',
      'dataIndex': 'actions',
      'key': 'actions',
      'width': 200,
      render: (text, record) => {
        return (<div>
          {
            <a onClick={this.onDelete.bind(null, record.id)} className="ant-dropdown-link">
            取消授权API</a>
          }
        </div>);
      },
    }],
  }

  onDelete = (id)=>{
    Modal.confirm({
      title: '确定是否取消授权',
      content: '一旦取消授权，API用户将无法使用开放API',
      onOk: (()=> this.props.deleteAPIClient(id)),
    });
  }

  componentDidMount() {
    this.props.listAPIClient();
  }

  showModal = () => {
    this.setState({ showModal: true });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  confirmModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    const clients = this.props.clients.map((client, index) => {
      client.key = index;
      return client;
    });
    return (<div style={styles.content}>
      <Row style={{display: 'flex'}}>
        <Button type='primary' style={styles.button}
          onClick={ this.showModal }>
          添加API用户
        </Button>
      </Row>
      <Modal
        visible={this.state.showModal}
        title={'创建API用户'}
        footer={null}
        closable={false}
      >
        <APIForm
          onSubmit={ this.confirmModal }
          onCancel={this.closeModal}>
        </APIForm>
      </Modal>
      <Row>
        <Table
          bordered={true}
          // rowSelection={rowSelection}
          size='large' columns={this.state.columns}
          dataSource={clients}
          pagination={false} />
      </Row>
    </div>);
  }
}

APIManageComponent.propTypes = {
  groups: PropTypes.array,
  clients: PropTypes.array,
  createAPIClient: PropTypes.func.isRequired,
  deleteAPIClient: PropTypes.func.isRequired,
  editAPIClient: PropTypes.func.isRequired,
  listAPIClient: PropTypes.func.isRequired,
  getGroupTreeData: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    createAPIClient: (record) => dispatch(createAPIClient(record)),
    deleteAPIClient: (record) => dispatch(deleteAPIClient(record)),
    editAPIClient: () => dispatch(editAPIClient()),
    listAPIClient: () => dispatch(listAPIClient()),
    getGroupTreeData: () => getGroupTreeData(dispatch),
  };
}

function mapStateToProps(state) {
  return {
    clients: state.apiClient.clients,
    groups: state.apiClient.groups,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(APIManageComponent);
