import React from 'react';
import {Checkbox, Tree, Form, Row, InputNumber} from 'antd';
const CheckboxGroup = Checkbox.Group;
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const styles = {
  every: {
    float: 'left',
    marginLeft: '30px',
  },
  mid: {
    float: 'left',
    marginLeft: '30px',
    marginRight: '30px',
  },
  tag: {
    width: '80px',
    height: '36px',
    lineHeight: '36px',
    border: '1px solid #eee',
    backgroundColor: '#e9e9e9',
    textAlign: 'center',
  },
  leftContent: {
    width: '200px',
    height: '300px',
    border: '1px solid #ccc',
    textAlign: 'left',
    paddingLeft: '10px',
    overflowY: 'scroll',
  },
  content: {
    width: '200px',
    height: '300px',
    border: '1px solid #ccc',
    textAlign: 'left',
    overflowY: 'scroll',
  },
  noper: {
    fontSize: '16px',
    width: '200px',
    height: '300px',
    textAlign: 'center',
    lineHeight: '300px',
  },
};

class AddUserAuthorizeInfo extends React.Component {

  static propTypes = {
    form: React.PropTypes.object.isRequired,
    fetchRoleListInUser: React.PropTypes.func.isRequired,
    fetchedRoleInUser: React.PropTypes.object,

    fetchPermissionsByRoleIds: React.PropTypes.func.isRequired,
    fetchedPermissionsByRoleIds: React.PropTypes.object,

    changeValue: React.PropTypes.func.isRequired,

    fetchFolders: React.PropTypes.func,
    fetchedFolders: React.PropTypes.object,

    queryUserInfoById: React.PropTypes.func,
    queriedUserInfo: React.PropTypes.object,
    formData: React.PropTypes.object,

    userTableRecord: React.PropTypes.object,
    modalStatus: React.PropTypes.string,
    isShow: React.PropTypes.bool,
  }

  state = {
    renderTree: false,
    strRoleIds: [],
    folderIds: [],
    disabled: false,
    isDownCountSet: false,
    leftnull: false,
  }

  //左
  changeRole = (checkedValues) => {
    if (checkedValues.length == 0) {
      this.setState({leftnull: true});
    } else {
      this.setState({leftnull: false});
    }
    let rolesValue = checkedValues.map(value => {
      return {id: value};
    });
    this.props.changeValue('roles', rolesValue);
    this.props.fetchPermissionsByRoleIds(checkedValues);
  }


  //树(中间树)
  changePermission = (selectedKeys) => {
    switch (selectedKeys[0] && selectedKeys[0].split('.')[0]) {
    case 'view_assets':
      this.setState({isDownCountSet: false, leftnull: false});
      this.props.fetchFolders();
      this.props.changeValue('currentKey', selectedKeys[0]);
      break;
    case 'download_assets':
      this.setState({isDownCountSet: false, leftnull: false});
      this.props.fetchFolders();
      this.props.changeValue('currentKey', selectedKeys[0]);
      break;
    case 'upload_assets':
      this.setState({isDownCountSet: false, leftnull: false});
      this.props.fetchFolders();
      this.props.changeValue('currentKey', selectedKeys[0]);
      break;

    case 'vcg_download':
      this.setState({isDownCountSet: true, leftnull: false});
      break;
    case 'vcg_edit_download':
      this.setState({isDownCountSet: true, leftnull: false});
      break;
    default:
      this.setState({isDownCountSet: false, leftnull: true});
      break;
    }
  }


  //右 目录树的情况
  changeFolders = (selectedKeys) => {
    this.props.changeValue('curKeyToFolders', selectedKeys);
  }

  renderDD = () => {
    let wtfDisabled = false;
    if(this.props.modalStatus == 'view') {
      wtfDisabled = true;
    }
    let {getFieldDecorator} = this.props.form;

    //最大下载次数设置
    let inputMAX = <Form>
      <FormItem
        style={{marginTop:'80px'}}
        label='限制总下载次数'
        labelCol={{span: 14}}
        wrapperCol={{span: 10}}>
        {getFieldDecorator('maxdowncounts', {
          initialValue: this.props.formData.userExtend.maxDownCount,
          //rules: [{required: true}],
        })(<InputNumber onChange={this.changeMaxCount.bind(this)} disabled={wtfDisabled}/>)}
      </FormItem>

      <FormItem
        style={{marginTop:'10px'}}
        label='限制总购买金额'
        labelCol={{span: 14}}
        wrapperCol={{span: 10}}>
        {getFieldDecorator('maxdownamount', {
          initialValue: this.props.formData.userExtend.maxDownAmount,
          //rules: [{required: true}],
        })(<InputNumber onChange={this.changeMaxAmount.bind(this)} disabled={wtfDisabled}/>)}
      </FormItem>
    </Form>;

    let tree = '';
    //树目录（右）
    let loopFolders = data => data.map(item => {
      if (item.children) {
        return <TreeNode disabled={wtfDisabled} title={item.name} key={item.id}>{loopFolders(item.children)}</TreeNode>;
      }
      return <TreeNode disabled={wtfDisabled} title={item.name} key={item.id} isLeaf={true}/>;
    });
    if (this.props.fetchedFolders.folders.length > 0) {
      let curKey = this.props.formData.currentKey.split('.')[0];
      let storeArr = [];
      if(curKey == 'view_assets') {
        storeArr = this.props.formData.storeView;
      } else if(curKey == 'download_assets') {
        storeArr = this.props.formData.storeDownload;
      } else if(curKey == 'upload_assets') {
        storeArr = this.props.formData.storeUpload;
      }
      let checkedKeys = storeArr.map(x => {
        if (typeof x == 'object') {
          return x.folderId.toString();
        } else {
          return x.toString();
        }
      });

      tree = <Tree
        checkable
        defaultExpandAll={true}
        checkedKeys={checkedKeys}
        onCheck={this.changeFolders}
             >
        {loopFolders(this.props.fetchedFolders.folders)}
      </Tree>;
    }
    if (this.state.leftnull) {
      return <div style={styles.noper}>无对应权限属性</div>;
    }
    if (this.props.isShow) {
      return this.state.isDownCountSet ? inputMAX : tree;
    } else {
      return <div style={styles.noper}>无对应权限属性</div>;
    }
  }
  //右 最大设置的情况
  changeMaxCount = (value) => {

    this.props.changeValue('userExtend', parseInt(value));
  }

  changeMaxAmount = (value) => {
    this.props.changeValue('moneyAmount', parseFloat(parseFloat(value).toFixed(2)));
  }

  render = () => {
    let wtfDisabled = false;
    if(this.props.modalStatus == 'view') {
      wtfDisabled = true;
    }

    let checkbox_items = this.props.fetchedRoleInUser.roleDataInUser.map(item => {
      return(
        <div>
          <Checkbox value={item.id}>{item.name}</Checkbox>
        </div>
      );
    });


    let box = () => {
      let vv = this.props.formData.roles.map(x => {
        if (typeof x == 'object') {
          return x.id;
        } else {
          return x;
        }
      });
      return (
        <CheckboxGroup
          disabled={wtfDisabled}
          //options={options}
          onChange={this.changeRole.bind(this)}
          value={vv}
        >
          <Row>
            {checkbox_items}
          </Row>
          </CheckboxGroup>);
    };

    //权限树（中）
    const loop = data => data.map(item => {
      if (item.children) {
        return <TreeNode title={item.displayName} key={`${item.keyName}.${item.id}`}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode title={item.displayName} key={`${item.keyName}.${item.id}`} isLeaf={true}/>;
    });
    let treeNodes = [];
    if (this.props.fetchedPermissionsByRoleIds.perDataByRoleIds.results) {
      treeNodes = loop(this.props.fetchedPermissionsByRoleIds.perDataByRoleIds.results);
    }

    return (
      <div>
        <div style={styles.every}>
          <div style={styles.tag}>拥有角色</div>
          <div style={styles.leftContent}>
            {box()}
          </div>
        </div>

        <div style={styles.every}>
          <div style={styles.tag}>拥有权限</div>
          <div style={styles.content}>
            <Tree defaultExpandAll={true} onSelect={this.changePermission.bind(this)}>
              {treeNodes}
            </Tree>
          </div>
        </div>

        <div style={styles.every}>
          <div style={styles.tag}>权限属性</div>
          <div style={styles.content}>
            {this.renderDD()}
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(AddUserAuthorizeInfo);
