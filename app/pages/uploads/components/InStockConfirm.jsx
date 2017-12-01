import React from 'react';
import {Modal, Select, Button, Radio} from 'antd';
import './uploads.css';

const RadioGroup = Radio.Group;
const styles = {
  title: {
    textAlign: 'center',
  },
};

export default class InStockConfirm extends React.Component {
  static propTypes = {
    albums: React.PropTypes.array,
    selectedFiles: React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
    toggleInstockConfirm: React.PropTypes.func,
    isShowInstockConfirm: React.PropTypes.bool,
    showFileModal: React.PropTypes.func,
    inStockFiles: React.PropTypes.func.isRequired,
  }

  state = {
    radioV: 'no',
    selectV: [],
    selectDisable: true,
    createDisable: true,
  }

  resetState = () => {
    this.setState({
      radioV: 'no',
      selectV: [],
      selectDisable: true,
      createDisable: true,
    });
  }

  handleOk = () => {
    if(this.state.selectV.toString()) {
      this.props.inStockFiles(false, false, this.state.selectV);
    } else {
      this.props.inStockFiles(false, false);
    }
    this.props.toggleInstockConfirm(0);
    this.resetState();
  }

  handleCancel = () => {
    this.props.toggleInstockConfirm(0);
    this.resetState();
  }

  radioChange = (e) => {
    this.setState({
      radioV: e.target.value,
    });
    if(e.target.value == 'no') {
      this.setState({
        selectDisable: true,
        selectV: [],
        createDisable: true,
      });
    } else {
      this.setState({
        selectDisable: false,
        createDisable: false,
      });
    }
  }

  selectAlbum = (value) => {
    this.setState({
      selectV: value,
    });
  }

  getFileNames = () => {
    let {
      selectedFiles,
      selectedFolder,
    } = this.props;
    let titles = selectedFolder.list.filter(file => selectedFiles.find(x => x.id == file.id)).map(file => <p key={file.id}>{file.title}</p>);
    return(
      <div style={{textAlign: 'left'}}>
        {titles}
      </div>
    );
  }

  renderRadio = () => {
    return(
      <RadioGroup onChange={this.radioChange} value={this.state.radioV} style={{margin: '15px 2px'}}>
        <Radio value="yes">是</Radio>
        <Radio value="no">否</Radio>
      </RadioGroup>
    );
  }

  showCreateModal = () => {
    this.props.showFileModal(true);
  }

  renderSelect = () => {
    let children = this.props.albums && this.props.albums.map(kid => {
      return (<Select.Option key={kid.id} value={kid.id}>{kid.title}</Select.Option>);
    });
    return (
      <div style={{height: 52}}>
        <div style={{width: '68%', float: 'left'}}>
          <Select
            showSearch
            disabled={this.state.selectDisable}
            placeholder="请选择一个文件夹（组照）"
            style={{width: '100%'}}
            onChange={this.selectAlbum}
            value={this.state.selectV}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {children}
          </Select>
        </div>
        <div style={{float: 'right'}}>
          <Button type="primary" onClick={this.showCreateModal} disabled={this.state.createDisable}>创建文件夹</Button>
        </div>
      </div>
    );
  }

  render = () => {
    let { isShowInstockConfirm } = this.props;
    return(
      <Modal
        title={<div className="tip">{'以下资源是否合并提交到文件夹（组照）？'}</div>}
        visible={isShowInstockConfirm}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width={400}
        okText="确定"
        cancelText="取消"
      >
        <div style={{height: 360, overflow: 'auto', textAlign: 'center'}}>
          {this.renderRadio()}
          {this.renderSelect()}
          {<div style={{color: 'rgb(223, 135, 208)', textAlign: 'left'}}>{'资源列表：'}</div>}
          {this.getFileNames()}
        </div>
      </Modal>
    );
  }
}
