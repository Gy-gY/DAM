import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {changeLocale} from '../../actions';
import {resetVcgSearch} from '../visualChina/action';

import { Menu, Icon } from 'antd';
import {IntlProvider, FormattedMessage} from 'react-intl';
import SelectLanguage from '../locale/selectLanguage';

  //{
 // key: '/',
 // name: <FormattedMessage id='menu_home'/>,
  //icon: 'home',
 // wtf: 'admin_login',
//},{
const menus = [{
  key: 'visualChina',
  name: '资产中国库',
  //style: {fontSize: 16},
  icon: 'like',
  wtf: 'vcg_view',
}, {
  key: 'resourceManage',
  name: '整合资源库',
  //style: {fontSize: 16},
  icon: 'idcard',
  wtf: 'newResource',
}, {
  key: 'user_resources',
  name: '企业资源库',
  icon: 'idcard',
  wtf: 'view_assets',
}, {
  key: 'res_tree',
  name: <FormattedMessage id='menu_catalog'/>,
  icon: 'folder',
  wtf: 'folder_management_page',
}, {
  key: 'uploads',
  name: <FormattedMessage id='menu_upload'/>,
  icon: 'upload',
  wtf: 'upload_assets',
}, {
  key: 'audit',
  name: <FormattedMessage id='menu_audit'/>,
  icon: 'edit',
  wtf: 'assets_audit_page',
}, {
  key: '/weixin',
  name: '微信矩阵',
  icon: 'notification',
  wtf: 'weixin_matrix',
}, {
  key: 'user_manage',
  name: '用户及权限管理',
  icon: 'setting',
  wtf: 'user_management',
}, {
  key: 'api_manage',
  name: <FormattedMessage id='menu_api'/>,
  icon: 'api',
  wtf: 'api_management_page',
}, {
  key: 'contract',
  name: '设置',
  icon: 'file',
  wtf: 'system_manager',
} ];




class SideMenu extends React.Component {

  static propTypes = {
    navigateTo: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object,
    location: React.PropTypes.object,
    changeLocale: React.PropTypes.func.isRequired,
    locale:React.PropTypes.object,
    resetVcgSearch: React.PropTypes.func.isRequired,
  }

  state = {}

  render() {
    let home = (this.props.currentUser.permissions.length==1&&this.props.currentUser.can('user_assets_page'))?'':
    <Menu.Item key={menus[0].key}>
      <span><Icon type={'home'} /></span>
      <span className="nav-text">{menus[0].name}</span>
    </Menu.Item>;

    const {language} = this.props.locale;
    let lg = SelectLanguage(language);
    return (
        <IntlProvider local='cn' messages={lg}>
          <div>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: '64px', zIndex: 1000 }}
              onClick={this.handleClick}
              selectedKeys={[this.props.location.pathname.slice(1)]}
              onSelect={this.props.navigateTo}
            >
              {/*home*/}
              {this.renderMenu(menus)}

            </Menu>

          </div>
        </IntlProvider>
    );
  }



  renderMenu = menus => {
    return menus
      .filter(menu => !menu.wtf || this.props.currentUser.can(menu.wtf))
      .map(menu => {
        if (menu.subMenus)
          return (
            <Menu.SubMenu key={menu.key} title={
              <span>
                {menu.icon ? <Icon type={menu.icon} /> : ''}
                <span className="nav-text">{menu.name}</span>
              </span>
            }>
              {this.renderMenu(menu.subMenus)}
            </Menu.SubMenu>
          );
        else
          return (
            <Menu.Item key={menu.key}>
              {menu.icon ? <span><Icon style={menu.style} type={menu.icon} /></span> : ''}
              <span style={menu.style} className="nav-text">{menu.name}</span>
            </Menu.Item>
          );
      });
  }

  handleClick = (e) => {
    if(e.key=='visualChina') {
      this.props.resetVcgSearch();
    }
    this.setState({
      current: e.key,
    });
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.login.currentUser,
    location: state.router.location,
    locale:state.locale.changeLocale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigateTo: (e) => dispatch(push(e.key)),
    changeLocale:(locale) => dispatch(changeLocale(locale)),
    resetVcgSearch: () => dispatch(resetVcgSearch()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
