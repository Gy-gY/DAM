import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Row, Col, Input, Progress, Card, notification } from 'antd';
import {IntlProvider, FormattedMessage} from 'react-intl';
import SelectLanguage from '../locale/selectLanguage';
import {queryInstockMaterial, queryMonthMaterial, queryPendingMaterial} from '../../actions';
const Search = Input.Search;

const style = {
  page: {
    backgroundColor: '#fff',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 60px',
  },
  progress: {
    textAlign: 'center',
    margin: '4px',
  },
  searchOut:{
    borderRadius: '4px',
    backgroundColor:'#e9e9e9',
    width:'100%',
    height:'60px',
    padding:'14px 25px',
    marginBottom: '20px',
  },
  search:{
    width:'100%',
  },
  cont:{
    display:'flex',
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'space-around',
  },
  row: {
    display: 'flex',
    flex: '1 auto',
    marginTop: '20px',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    margin: '4px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  cardBody: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: '0px',
    cursor: 'pointer',
    color: 'white',
    textAlign: 'center',
    fontSize: '20px',
  },
  shade: {
    height: '100%',
  },
  label: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

class Home extends React.Component {

  static propTypes = {
    link1: React.PropTypes.func,
    link2: React.PropTypes.func,
    link3: React.PropTypes.func,
    link4: React.PropTypes.func,
    link5: React.PropTypes.func,
    link6: React.PropTypes.func,
    currentUser: React.PropTypes.object,
    locale:React.PropTypes.object,
    queryInstockMaterial:React.PropTypes.func.isRequired,
    queryMonthMaterial:React.PropTypes.func.isRequired,
    queryPendingMaterial:React.PropTypes.func.isRequired,
    homeData: React.PropTypes.object,
  }

  componentDidMount() {
    let { permissions } = this.props.currentUser;
    console.log('permissions============', permissions);
    if(permissions.length==1 && permissions[0] == 'user_assets_page') {//判断当前用户如果只有 用户图权限 则打开用户用图页面，否则，打开首页
      let library = document.getElementById('library');
      library.click();
    }
  }

  componentWillMount() {
    let { userId } = this.props.currentUser;
    //初始化素材入库量数据
    this.props.queryInstockMaterial({uploadStateType:'INSTOCK', reviewStateType:'PASSED', userId});
    //初始化本月入库素材量数据
    let monthFirst = this.getCurrentRecent30Days();
    this.props.queryMonthMaterial({onlineDate:monthFirst, uploadStateType:'INSTOCK', reviewStateType:'PASSED', userId});
    //初始化待审核素材量数据
    this.props.queryPendingMaterial({uploadStateType:'INSTOCK', reviewStateType:'PENDING', userId});
  }
  getCurrentRecent30Days() {
    var myDate = new Date();
    let lw = new Date(myDate - 1000 * 60 * 60 * 24 * 30);//最后一个数字30可改，30天的意思
    let lastY = lw.getFullYear();
    let lastM = lw.getMonth()+1;
    let lastD = lw.getDate();
    let startdate = lastY+'-'+(lastM<10 ? '0' + lastM : lastM)+'-'+(lastD<10 ? '0'+ lastD : lastD)+' '+'00:00:00';//三十天之前日期
    return startdate;
  }

  getCurrentMonthFirst() {
    let date=new Date();
    let year=date.getFullYear();
    year = year>10?year:'0'+year;
    let month=date.getMonth()+1;
    month = month>10?month:'0'+month;
    return year+'-'+month+'-01 00:00:00';
  }

  render() {
    let { permissions } = this.props.currentUser;
    const {language} = this.props.locale;
    let lg = SelectLanguage(language);
    let formatMsg = (id)=>{
      return (
        <FormattedMessage id={id}/>
      );
    };
    let {homeData} = this.props;
    let {stockMaterial, monthMaterial, pendingMaterial} = homeData;
    let stockMaterialTotleFn = (type)=>{
      let {IMG, VIDEO, AUDIO} = stockMaterial;
      let stockMaterialTotle = parseInt(IMG||0) + parseInt(VIDEO||0) + parseInt(AUDIO||0);
      if(type=='img') {
        if(!IMG) return 0;
        return (IMG/stockMaterialTotle).toFixed(2)*100;
      }else if(type=='video') {
        if(!VIDEO) return 0;
        return (VIDEO/stockMaterialTotle).toFixed(2)*100;
      }else if(type=='audio') {
        if(!AUDIO) return 0;
        return (AUDIO/stockMaterialTotle).toFixed(2)*100;
      }
    };

    let monthMaterialTotleFn = (type)=>{
      let {IMG, VIDEO, AUDIO} = monthMaterial;
      let monthMaterialTotle = parseInt(IMG||0) + parseInt(VIDEO||0) + parseInt(AUDIO||0);
      if(type=='img') {
        if(!IMG) return 0;
        return (IMG/monthMaterialTotle).toFixed(2)*100;
      }else if(type=='video') {
        if(!VIDEO) return 0;
        return (VIDEO/monthMaterialTotle).toFixed(2)*100;
      }else if(type=='audio') {
        if(!AUDIO) return 0;
        return (AUDIO/monthMaterialTotle).toFixed(2)*100;
      }
    };

    let pendingMaterialTotleFn = (type)=>{
      let {IMG, VIDEO, AUDIO} = pendingMaterial;
      let pendingMaterialTotle = parseInt(IMG||0) + parseInt(VIDEO||0) + parseInt(AUDIO||0);
      if(type=='img') {
        if(!IMG) return 0;
        return (IMG/pendingMaterialTotle).toFixed(2)*100;
      }else if(type=='video') {
        if(!VIDEO) return 0;
        return (VIDEO/pendingMaterialTotle).toFixed(2)*100;
      }else if(type=='audio') {
        if(!AUDIO) return 0;
        return (AUDIO/pendingMaterialTotle).toFixed(2)*100;
      }
    };

    return (
      <IntlProvider local='cn' messages={lg}>
        <div style={style.page}>

          <Row type="flex" justify="space-between" gutter={48}>
            <Col span={8}>
              <Card title={formatMsg('home_material')}>
                <Row style={style.progress}>
                  <Col span={4}>{formatMsg('home_img')}</Col>
                  <Col span={16}><Progress percent={stockMaterialTotleFn('img')} showInfo={false}/></Col>
                  <Col span={4}>{stockMaterial&&stockMaterial.IMG||0}</Col>
                </Row>
                <Row style={style.progress}>
                  <Col span={4}>{formatMsg('home_video')}</Col>
                  <Col span={16}><Progress percent={stockMaterialTotleFn('video')} showInfo={false} status="success"/></Col>
                  <Col span={4}>{stockMaterial&&stockMaterial.VIDEO||0}</Col>
                </Row>
                <Row style={style.progress}>
                  <Col span={4}>{formatMsg('home_audio')}</Col>
                  <Col span={16}><Progress percent={stockMaterialTotleFn('audio')} showInfo={false} status="exception"/></Col>
                  <Col span={4}>{stockMaterial&&stockMaterial.AUDIO||0}</Col>
                </Row>
              </Card>
            </Col>
            <Col span={8}>
              <Card title={formatMsg('home_month')}>
                <Row style={style.progress}>
                  <Col span={4}>{formatMsg('home_img')}</Col>
                  <Col span={16}><Progress percent={monthMaterialTotleFn('img')} showInfo={false}/></Col>
                  <Col span={4}>{monthMaterial&&monthMaterial.IMG||0}</Col>
                </Row>
                <Row style={style.progress}>
                  <Col span={4}>{formatMsg('home_video')}</Col>
                  <Col span={16}><Progress percent={monthMaterialTotleFn('video')} showInfo={false} status="success"/></Col>
                  <Col span={4}>{monthMaterial&&monthMaterial.VIDEO||0}</Col>
                </Row>
                <Row style={style.progress}>
                  <Col span={4}>{formatMsg('home_audio')}</Col>
                  <Col span={16}><Progress percent={monthMaterialTotleFn('audio')} showInfo={false} status="exception"/></Col>
                  <Col span={4}>{monthMaterial&&monthMaterial.AUDIO||0}</Col>
                </Row>
              </Card>
            </Col>
            <Col span={8}>
              <Card title={formatMsg('home_pending')}>
                <Row style={style.progress}>
                  <Col span={4}>{formatMsg('home_img')}</Col>
                  <Col span={16}><Progress percent={pendingMaterialTotleFn('img')} showInfo={false}/></Col>
                  <Col span={4}>{pendingMaterial&&pendingMaterial.IMG||0}</Col>
                </Row>
                <Row style={style.progress}>
                  <Col span={4}>{formatMsg('home_video')}</Col>
                  <Col span={16}><Progress percent={pendingMaterialTotleFn('video')} showInfo={false} status="success"/></Col>
                  <Col span={4}>{pendingMaterial&&pendingMaterial.VIDEO||0}</Col>
                </Row>
                <Row style={style.progress}>
                  <Col span={4}>{formatMsg('home_audio')}</Col>
                  <Col span={16}><Progress percent={pendingMaterialTotleFn('audio')} showInfo={false} status="exception"/></Col>
                  <Col span={4}>{pendingMaterial&&pendingMaterial.AUDIO||0}</Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <div style={style.row}>

            {
              (permissions.includes('user_assets_page') || permissions.includes('assets_upload_page') || permissions.includes('user_management_page')) &&
              <div style={{ flex: '2 auto', ...style.column }}>

                {
                  permissions.includes('user_assets_page') &&
                  <Card id='library' style={{ flex: '2 auto', backgroundImage: 'url("https://unsplash.it/400/300/?random&1")', ...style.card }}
                    bodyStyle={style.cardBody}
                    onClick={()=>this.props.link1()}>
                    <div style={{backgroundColor: 'rgba(139, 195, 74, 0.7)', ...style.shade}}>
                      <div style={style.label}>{formatMsg('home_library')}</div>
                    </div>
                  </Card>
                }

                {
                  permissions.includes('folder_management_page') &&
                  <Card style={{ flex: '1 auto', backgroundImage: 'url("https://unsplash.it/400/300/?random&2")', ...style.card }}
                    bodyStyle={style.cardBody}
                    onClick={()=>this.props.link2()}>
                    <div style={{backgroundColor: 'rgba(255, 193, 7, 0.7)', ...style.shade}}>
                      <div style={style.label}>{formatMsg('home_catalog')}</div>
                    </div>
                  </Card>
                }

              </div>
            }

            <div style={{ flex: '3 auto', ...style.column}}>

              {
                permissions.includes('assets_upload_page') &&
                <Card style={{ flex: '1 auto', backgroundImage: 'url("https://unsplash.it/400/300/?random&3")', ...style.card }}
                  bodyStyle={style.cardBody}
                  onClick={()=>this.props.link3()}>
                  <div style={{backgroundColor: 'rgba(244, 67, 54, 0.7)', ...style.shade}}>
                    <div style={style.label}>{formatMsg('home_upload')}</div>
                  </div>
                </Card>
              }

              {permissions.includes('assets_audit_page') &&
                <Card style={{ flex: '1 auto', backgroundImage: 'url("https://unsplash.it/400/300/?random&4")', ...style.card }}
                  bodyStyle={style.cardBody}
                  onClick={()=>this.props.link4()}>
                  <div style={{backgroundColor: 'rgba(103, 58, 183, 0.7)', ...style.shade}}>
                    <div style={style.label}>{formatMsg('home_audit')}</div>
                  </div>
                </Card>
              }
            </div>

            {
              permissions.includes('user_management_page') &&
              <div style={{ flex: '2 auto', ...style.column }}>

                <Card style={{ flex: '1 auto', backgroundImage: 'url("https://unsplash.it/400/300/?random&5")', ...style.card }}
                  bodyStyle={style.cardBody}
                  onClick={()=>this.props.link5()}>
                  <div style={{backgroundColor: 'rgba(205, 220, 57, 0.7)', ...style.shade}}>
                    <div style={style.label}>{formatMsg('home_user')}</div>
                  </div>
                </Card>

              </div>
            }

            <div style={{ flex: '2 auto', ...style.column }}>

              {
                permissions.includes('keyword_management_page') &&
                <Card style={{ flex: '1 auto', backgroundImage: 'url("https://unsplash.it/400/300/?random&6")', ...style.card }}
                  bodyStyle={style.cardBody}
                  onClick={()=>{
                    notification.error({message: '呵呵，此功能正在开发中...'});
                  }}
                >
                  <div style={{backgroundColor: 'rgba(33, 150, 243, 0.7)', ...style.shade}}>
                    <div style={style.label}>{formatMsg('home_keyword')}</div>
                  </div>
                </Card>
              }

              {
                permissions.includes('api_management_page') &&
                <Card style={{ flex: '2 auto', backgroundImage: 'url("https://unsplash.it/400/300/?random&7")', ...style.card }}
                  bodyStyle={style.cardBody}
                  onClick={()=>this.props.link6()}>
                  <div style={{backgroundColor: 'rgba(0, 150, 136, 0.7)', ...style.shade}}>
                    <div style={style.label}>{formatMsg('home_api')}</div>
                  </div>
                </Card>
              }

            </div>

          </div>

        </div>
      </IntlProvider>
    );
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.login.currentUser,
    homeData:state.home,
    locale:state.locale.changeLocale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    link1:() => dispatch(push('user_resources')),
    link2:() => dispatch(push('res_tree')),
    link3:() => dispatch(push('uploads')),
    link4:() => dispatch(push('audit')),
    link5:() => dispatch(push('user_manage')),
    link6:() => dispatch(push('api_manage')),
    queryInstockMaterial:(params)=>dispatch(queryInstockMaterial(params)),
    queryMonthMaterial:(params)=>dispatch(queryMonthMaterial(params)),
    queryPendingMaterial:(params)=>dispatch(queryPendingMaterial(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
