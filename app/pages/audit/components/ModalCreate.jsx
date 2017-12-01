import React from 'react';
import {Modal, Form, Tag, Input, Button, Tooltip} from 'antd';

const FormItem = Form.Item;
const ALBUM_TYPE = '05';
class ModalCreate extends React.Component {
  static propTypes = {
    form: React.PropTypes.object,
    fileModalInfo: React.PropTypes.object,
    hideFileModal_audit: React.PropTypes.func,
    changeAlbumInfo_audit: React.PropTypes.func,
    albumInfo: React.PropTypes.object,
    clearAlbumInfo_audit: React.PropTypes.func,
    selectedFolder: React.PropTypes.object,
    submitNewAlbum_audit: React.PropTypes.func,
    getAlbumInfo_audit: React.PropTypes.func,
    updateAlbum_audit: React.PropTypes.func,
  }

  state = {
    inputVisible: false,
    inputValue: '',
  }

  componentWillMount = () => {
    let { isNew } = this.props.fileModalInfo;
    if(!isNew) {
      //编辑
      /*向服务端请求该文件夹的 albumInfo */
      this.props.getAlbumInfo_audit();
    }
  }


  //分为‘新建’和‘更新’两情况
  saveUpdate = () => {
    let {
      albumInfo,
      fileModalInfo,
      form,
      selectedFolder,
      submitNewAlbum_audit,
      updateAlbum_audit,
    } = this.props;
    let isNew = fileModalInfo.isNew;
    form.validateFields(err => {
      if(!err) {
        let {
          assetType = ALBUM_TYPE, //默认值
          title,
          caption: description,  //重命名为descrption
          keywords,
        } = albumInfo;
        keywords = keywords.join(',');
        let folderId = parseInt(selectedFolder.id);
        if(isNew) {
          submitNewAlbum_audit(folderId, {assetType, title, description, keywords}).then(() => {
            this.hideFileModal();
          });
        } else {
          updateAlbum_audit({assetType, title, description, keywords}).then(() => {
            this.hideFileModal();
          });
        }
      }
    });
  }

  hideFileModal = () => {
    this.props.hideFileModal_audit();
    this.props.clearAlbumInfo_audit();
  }

  changeAlbumTitle = (e) => {
    this.props.changeAlbumInfo_audit('title', e.target.value);
  }

  changeAlbumCaption = (e) => {
    this.props.changeAlbumInfo_audit('caption', e.target.value);
  }

  handleClose = (removedTag) => {
    let tags = this.props.albumInfo.keywords.filter(tag => tag !== removedTag);
    this.props.changeAlbumInfo_audit('folderKeyWords', tags);
  }

  saveInputRef = input => {
    this.input = input;
  }

  showInput = () => {
    this.setState({ inputVisible: true}, () => this.input.focus());
  }

  //关键词input框内容发生变化时调用如下函数
  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  }

  handleInputConfirmEnter = () => {
    const { inputValue } = this.state;
    let kw = this.props.albumInfo.keywords;
    let aTmp = !kw.length ? [] : kw;
    let tags = aTmp[0] == '' ? [] : aTmp;
    //去重
    if(inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      inputVisible: true,
      inputValue: '',
    });
    this.props.changeAlbumInfo_audit('keywords', tags);
  }

  handleInputConfirmBlur = () => {
    const { inputValue } = this.state;
    let kw = this.props.albumInfo.keywords;
    let aTmp = !kw.length ? [] : kw;
    let tags = aTmp[0] == '' ? [] : aTmp;
    if(inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      inputVisible: false,
      inputValue: '',
    });
    this.props.changeAlbumInfo_audit('keywords', tags);
  }

  footBtns = (() => {
    return(
      <div style={{textAlign: 'center'}}>
        <Button type="primary" style={{margin: '0 10px'}} onClick={this.saveUpdate}>保存</Button>
        <Button onClick={this.hideFileModal}>取消</Button>
      </div>
    );
  })();

  render = () => {
    let { getFieldDecorator } = this.props.form;
    let { fileModalInfo, albumInfo } = this.props;
    let { inputValue, inputVisible } = this.state;
    let biKeyWords = albumInfo.keywords;
    console.log('render ==audit== fileModalInfo ====> ', fileModalInfo);
    console.log('render ==audit== albumInfo ========> ', albumInfo);
    return(
      <Modal
        footer={this.footBtns}
        width={600}
        visible={fileModalInfo.isOpen}
        onCancel={this.hideFileModal}
      >
        <Form style={{textAlign:'left', marginTop:'10px'}}>
          <FormItem
            label='文件夹名称'
            style={{height: '22px'}}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          >
            {
              getFieldDecorator('foldername',
                {initialValue: albumInfo.title,
                  rules: [{
                    required: true,
                    message: '文件夹名称不能为空',
                  }],
                })(<Input onBlur={this.changeAlbumTitle} />)
            }
          </FormItem>

          <FormItem
            label='文件夹说明'
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          >
            {
              getFieldDecorator('folderdescription',
                {initialValue: albumInfo.caption,
                })(<Input type='textarea' style={{ height: 80 }} onBlur={this.changeAlbumCaption} />)
            }
          </FormItem>


          <FormItem
            label='文件夹关键词'
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          >
            {
              getFieldDecorator('keywords',
                {initialValue: '',
                })(<div style={{width:'100%', height:'120px', border:'1px solid #eee', overflowY:'scroll'}}>
                  {biKeyWords.map(tag => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                      <Tag key={tag} closable afterClose={() => this.handleClose(tag)}>
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
                  })}
                  {inputVisible && (
                    <Input
                      ref={this.saveInputRef}
                      type="text"
                      size="small"
                      style={{ width: 78 }}
                      value={inputValue}
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputConfirmBlur}
                      onPressEnter={this.handleInputConfirmEnter}
                    />
                  )}
                  {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+新标签</Button>}
                </div>)
            }
          </FormItem>
        </Form>
      </Modal>
    );
  }
}


export default Form.create()(ModalCreate);
