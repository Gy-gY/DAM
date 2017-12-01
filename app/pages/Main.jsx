import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Spin, Select } from 'antd';

import MainMenu from 'components/MainMenu';
import UserMenu from 'components/UserMenu';
import Uploads from './uploads';
import MyDownload from './myResources/downloadIndex';
import MyCollections from './myResources/collectionIndex';
import Audit from './audit';
import Home from './home/Home';
import ResTreeManage from './folder-management/ResTreeManage';
import UserGroupManage from './user-management';
import OnlineImgs from './user-center/OnlineImgs';
import APIManage from './api-management';
import VisualChina from './visualChina';
import resourceManage from './resourceManage';
import Weixin from './weixin';

import Contract from './contract';
//import logo from './components/snowLogo.png';

import {getMeAlive, changeLocale, getLogo} from '../actions';

const routes = [{
  path: '/resourceManage',
  component: resourceManage,
  wtf: 'newResource',
}, {
  path: '/contract',
  component: Contract,
  wtf: 'system_manager',
}, {
  path: '/visualChina',
  component: VisualChina,
  wtf: 'vcg_view',
}, {
  path: '/user_resources',
  component: OnlineImgs,
  wtf: 'view_assets',
}, {
  path: '/weixin',
  component: Weixin,
  wtf: 'weixin_matrix',
}, {
  path: '/res_tree',
  component: ResTreeManage,
  wtf: 'folder_management_page',
}, {
  path: '/uploads',
  component: Uploads,
  wtf: 'upload_assets',
}, {
  path: '/audit',
  component: Audit,
  wtf: 'assets_audit_page',
}, {
  path: '/user_manage',
  component: UserGroupManage,
  wtf: 'user_management',
}, {
  path: '/myDownload',
  component: MyDownload,
  wtf: 'myDownload_page',
}, {
  path: '/myCollections',
  component: MyCollections,
  wtf: 'myCollections',
}, {
  path: '/api_manage',
  component: APIManage,
  wtf: 'user_management_page',
}];

const menus = [{
  Com: VisualChina,
  wtf: 'vcg_view',
}, {
  Com: resourceManage,
  wtf: 'newResource',
}, {
  Com: OnlineImgs,
  wtf: 'view_assets',
}, {
  Com: ResTreeManage,
  wtf: 'folder_management_page',
}, {
  Com: Uploads,
  wtf: 'upload_assets',
}, {
  Com: Audit,
  wtf: 'assets_audit_page',
}, {
  Com: Weixin,
  wtf: 'weixin_matrix',
}, {
  Com: UserGroupManage,
  wtf: 'user_management',
}, {
  Com: APIManage,
  wtf: 'api_management_page',
}, {
  Com: Contract,
  wtf: 'system_manager',
} ];



const styles = {
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 1px',
  },
  logoWrap: {
    float: 'left',
    width: '170px',
    height: '64px',
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    //backgroundImage: `url(${logo})`,
  },
};

class Main extends React.Component {

  static propTypes = {
    currentUser: React.PropTypes.object.isRequired,
    getMeAlive: React.PropTypes.func.isRequired,
    changeLocale: React.PropTypes.func.isRequired,
    getLogo: React.PropTypes.func.isRequired,
    GotLogoUrl: React.PropTypes.string.isRequired,
  }

  componentWillMount = () => {
    this.changeLocale(window.localStorage.language);//刷新时使用上次选择的语言
    //if(!this.props.isVcgLogin.data) {
    //this.props.getLoginType();
    this.props.getMeAlive();
    this.props.getLogo();
        //}
  };

  changeLocale(value) {
    this.props.changeLocale(value);
    window.localStorage.language= value;
  }

  render() {
    const {
      currentUser,
    } = this.props;

    if (currentUser.loading||!currentUser.done) {
      return (
        <div>
          <Spin size='large' spinning={currentUser.loading} style={styles.spinner} />
        </div>
      );
    } else {
      let languageValue = localStorage.language=='undefined'?'zh':localStorage.language;
      let mm = menus.filter(x=> currentUser.permissions.includes(x.wtf));
      let home = mm[0].Com;
      return (
          <Layout>
            <Layout.Header className="header" style={styles.header}>
              <div style={{backgroundImage: `url(${this.props.GotLogoUrl})`, ...styles.logoWrap}}></div>
              <MainMenu />
              <UserMenu />
              <div style={{position:'absolute', right:'12%', 'display':'none'}}>
                <Select
                  onChange={this.changeLocale.bind(this)}
                  defaultValue={languageValue}
                  size='small'
                >
                  <Option value="en">English</Option>
                  <Option value='zh'>中文</Option>
                </Select>
              </div>
            </Layout.Header>
            {/*<Route exact path='/' component={ Home } />*/}
            <Route exact path='/' component={ home } />
            <Route path='/myDownload' component={ MyDownload } />
            <Route path='/myCollections' component={ MyCollections } />
            {
              routes
              .filter(route => currentUser.permissions.includes(route.wtf))
              .map(route => <Route key={route.path} path={route.path} component={route.component} />)
            }
          </Layout>
      );
    }
    //return <div />;
  }

}

function mapDispatchToProps(dispatch) {
  return {
    getMeAlive: ()=>dispatch(getMeAlive()),
    changeLocale:(locale) => dispatch(changeLocale(locale)),
    getLogo: () => dispatch(getLogo()),
  };
}

function mapStateToProps(state) {
  return {
    currentUser: state.login.currentUser,
    GotLogoUrl: state.login.GotLogoUrl,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
