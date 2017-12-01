import React, {PropTypes} from 'react';
import { Icon, Layout, Button, Spin, Row, Pagination, Modal, Tabs, Collapse, Table } from 'antd';
import FavariteCard from './FavariteCard';
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;


class Favarite extends React.Component {

  static propTypes = {
    form: React.PropTypes.object,
    style: PropTypes.object,
    addFavarite: React.PropTypes.func.isRequired,
    favariteStatus: React.PropTypes.bool.isRequired,
    downloadVcgImgs: React.PropTypes.func.isRequired,
    downStatus: React.PropTypes.bool.isRequired,
    fetchFavarite: React.PropTypes.func.isRequired,
    favariteImgs: React.PropTypes.object.isRequired,
    filterFavarite: React.PropTypes.object.isRequired,
    selectFavarite: React.PropTypes.func.isRequired,
    selectedFavarite: React.PropTypes.array,
    deleteFavarite: React.PropTypes.func.isRequired,

  }
  state = {
    show:false,
    showRules: false,
  }
  style = {
    button: {
      backgroundColor: '#eb4f61',
      position: 'fixed',
      top: '42%',
      right: 30,
      zIndex: 2,
      width: 32,
      fontFamily: 'Microsoft YaHei',
      padding: '10px 0 0 10px',
      height: 90,
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    rules: {
      backgroundColor: '#108ee9',
      position: 'fixed',
      top: '55%',
      right: 30,
      zIndex: 2,
      width: 32,
      fontFamily: 'Microsoft YaHei',
      padding: '10px 0 0 10px',
      height: 106,
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    layoutHide: {
      width: 0,
      transition:'width 1s',
      height: '100%',
      backgroundColor: 'white',
      position: 'fixed',
      right: 0,
      zIndex: 3,
      boxShadow: '-10px 0px 20px #888',
    },
    layoutShow: {
      width: 625,
      height: '100%',
      transition:'width 1s',
      backgroundColor: 'white',
      position: 'fixed',
      right: 0,
      zIndex: 3,
      boxShadow: '-10px 0px 20px #888',
    },
    content: {
      background: '#fff',
      padding: '0 8px',
      flex: '1 1 auto',
      overflow: 'auto',
      alignContent: 'flex-start',
    },
    spinner: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    pagination: {
      background: '#fff',
      padding: '8px 16px',
      flex: '1 1 auto',
      textAlign: 'right',
    },
  }
  componentDidMount = () => {
    this.props.fetchFavarite();
  }
  hideFavarite = ()=>{
    this.setState({show:false});
  }
  ShowFavarite = ()=>{
    this.setState({show:true});
  }

  showModalRules = () => {
    this.setState({showRules:true});
  }
  closeModalRules = () => {
    this.setState({showRules:false});
  }

  download= ()=>{
    let ids = this.props.selectedFavarite.map(x=>x.id).join(',');
    this.props.downloadVcgImgs(ids, this.props.selectedFavarite[0].asset_family);
  }
  turnToPage = pageNum => this.props.fetchFavarite({pageNum});;

  render() {

    const ci1 = <p>是指包括但不限于电子、数字和/或其它格式的静态图片、电影胶片、视频胶片、音频产品、视觉图像等，包括底片、幻灯片、影印图像、原版数字资料和/或复制品，以及任何经本视觉中国授权许可使用的授权人受著作权、商标权、专利权及其他知识产权保护的产品。</p>;
    const ci2 = <p>是指购买授权的个人或者公司；若购买者与被授权者分离，是指购买过程中以及使用许可协议中指明为被授权人的个人或公司。</p>;
    const ci3 = <p>RF非限定版权类，不受使用时间、地域、用途、发布数量等条件限制RM限定版权类，受使用、受时间、地域、用途、发布数量等条件限制RF/RM一次性授权，一般刊登在报纸、杂志、广播电视、图书出版、网站、社交媒体（微博、微信）App等，仅用于编辑报道新闻事件或文字搭配，可以在刊登的载体上永久保留。</p>;
    const ci4 = <p>图像作品中牵涉到模特（或他人）的肖像时或建筑物时，网站图片信息中会注明有无肖像权/物权。<span style={{color:'red'}}>没有肖像权/物权的图片，
      如果需要商业使用，需取得相关授权。编辑类图片是记录拍摄有关新闻事实的图片，均无肖像权、物权。编辑类图片一般不作为商业用途使用，需取得相关授权。</span></p>;
    const ci5 = <p>微博，微信，头条号等平台一次性使用授权，图片仅用于文字搭配或报道新闻事件，但是客户可以在新媒体平台上永久保留。</p>;
    const ci6 = <p>图片被用于企业宣传推广或与产品介绍服务。 一般通过互联网站，app，社交媒体，电子邮件，电子杂志等新媒体方式传播推广；RF/RM一次性使用授权； <span style={{color:'red'}}>涉及肖像权及物权问题，需额外协商授权费。</span></p>;
    const ci7 = <p>图片被用于企业宣传推广或与产品服务相关的用途。如广告--平面，展示，电视广告，市场宣传及促销品，零售产品及包装等。</p>;
    const ci8 = <p>基于图片著作权授权的价格，不包含肖像权、物权、其他第三方权利人的权利授权。</p>;

    const pic1 = <p>图像版权，亦称图像著作权，是指作者对其创作的图像作品（包括摄影照片、影片等所享有的专有权利。著作权是公民、法人依法享有的一种民事权利，属于无形财产权。图像版权归属于图像作品的创作者，包括公民个人和法人或其他组织，一般都属于公民个人。公民个人利用自己物质技术条件创作的作品的版权均属于公民个人。公民个人利用法人或其他组织的物质技术条件，创作的作品版权属于法人组织。正版图像公司是图像创作者与用户之间的桥梁，帮助图像产品实现商业价值，同时规避用户的版权风险。正版图像公司与图像创作者之间通过协议方式拥有图像使用许可授权的权利。</p>;
    const pic2 = <p>编辑图片是指新闻时效图片，内容包括时政、社会、文教、财经、科技、环境、娱乐、体育、时尚、历史资料、名人肖像等分类，与创意图片相比，编辑图片是有一定时效性的，并且有严格的后期操作范围限制，用户不得对图片原意进行曲解、篡改，或未获得授权直接用于商业使用，以免造成侵犯人物肖像权、隐私权、名誉权的情况。创意图片主要是指生活方式、风光、建筑、美食、矢量图、商务等内容，创意图片要求画面精美，授权完善，被商业客户购买后多以素材的形式进行后期合成用于广告推广，创意图片亦可用于编辑类使用。</p>;
    const pic3 = <p>针对新媒体编辑用途，图片使用中不得包含以下任何宣传推广元素：<br />（1）企业品牌或产品Logo。<br />（2）产品服务相关文字或图片。<br />（3）跳转url链接（企业网站或者相关推广落地页)。<br />（4）其他任何含有宣传推广的元素。</p>;
    const pic4 = <p>请您参考《肖像权常见法律问题解答》文档。</p>;
    const pic5 = <p>对于创意图片素材，您可以进行任意修改，但不建议对素材进行恶意修改。对于编辑图片素材，您可以在不改变原意的情况下对图片进行加工。</p>;
    const pic6 = <p>当图片用于编辑类使用时，需按照双方协议来署名。署名的规范为：“xxx（摄影师姓名）”。</p>;


    const columns = [{
      title: '主题',
      dataIndex: 'zhuti',
      key: 'zhuti',
      width: '25%',
    }, {
      title: '描述',
      dataIndex: 'miaoshu',
      key: 'miaoshu',
      width: '60%',
    }, {
      title: '是否需要授权？',
      dataIndex: 'isneed',
      key: 'isneed',
      width: '15%',
    }];

    const dataSource = [{
      key: '1',
      zhuti: '可识别的人物',
      miaoshu: '从各角度都能识别为具体某一人物',
      isneed: '是',
    }, {
      key: '2',
      zhuti: '可识别的人物剪影',
      miaoshu: '可通过剪影识别为具体某一人物',
      isneed: '是',
    }, {
      key: '3',
      zhuti: '职业体育和运动队商标(可识别)',
      miaoshu: '可识别出具体运动员和/或球员编号，队服/头盔上的商标',
      isneed: '是',
    }, {
      key: '4',
      zhuti: '人群场面',
      miaoshu: '从人群中，各角度都能识别出具体某一人物',
      isneed: '是',
    }, {
      key: '5',
      zhuti: '公务员、制服与设备',
      miaoshu: '包括警察，消防员，医务人员，其他行政公务员',
      isneed: '是',
    }, {
      key: '6',
      zhuti: '名人或公众人物',
      miaoshu: '在预先安排或公开场合拍摄，在用于广告用途的情况下',
      isneed: '是',
    }, {
      key: '7',
      zhuti: '身体局部（如手部专业模特、纹身、特定发型）',
      miaoshu: '针对身体局部专业模特，即使面孔不是可看见，但通过局部可以辨识出某一具体人物',
      isneed: '是',
    }];

    const xx1 = <p>肖像权，是指人对自己的肖像享有再现、使用并排斥他人侵害的权利，就是人所享有的对自己的肖像上所体现的人格利益为内容的一种人格权。</p>;
    const xx2 = <p>（1）公民有权拥有自己的肖像，拥有对肖像的制作专有权和使用专有权。<br />（2）公民有权禁止他人非法使用自己的肖像权或对肖像权进行损害、玷污。</p>;
    const xx3 = <p>目前我国关于肖像权的立法和司法解释主要集中在以下三个法律条文中：<br />
      （1）《民法通则》第100条：“公民享有肖像权，未经本人同意，不得以营利为目的使用公民的肖像。”<br />
      （2）《民法通则》第120条：“公民的姓名权、肖像权、名誉权、荣誉权受到侵害的，有权要求停止侵害，恢复名誉，消除影响，赔礼道歉，并可以要求赔偿损失。”<br />
      （3）最高人民法院制定的《关于贯彻执行民法通则若干问题的意见（试行）》第139条：“以营利为目的，未经公民同意利用其肖像做广告、商标、装饰橱窗等，应当认定为侵犯公民肖像权的行为。”
    </p>;
    const xx4 = <p>根据以上法律规定和司法实践，构成侵害肖像权必须具备三个条件：<br />
      （1）行为人使用了肖像人的肖像；<br />
      （2）行为人使用肖像未经肖像人同意；<br />
      （3）行为人使用肖像是以营利为目的或给肖像人造成损害。
    </p>;
    const xx5 = <p>根据上述最高人民法院的意见，未经公民同意利用其肖像制作广告、商标、装饰橱窗等行为，是以营利为目的进行使用。上述规定以列举但非穷尽的方式定义了具体的使用行为，在司法实践中和法学理论上该范围有所扩大，如将他人的肖像直接作为商品、做书籍等的装潢、封面等，或用于企业、单位或个人的宣传册，微信公众号、网站、微博等，均应属于营利性目的。</p>;
    const xx6 = <p>以营利为目的的行为，侵犯了他人的肖像权，即使用者在主观上，希望通过对他人的肖像的使用，获得经济利益。但是，所谓的“营利”并不是我们通常理解上的要有获利事实，只要有营利的主观意图，有客观营利的行为，无论行为人是否实现营利目的，都构成“营利”事实。</p>;
    const xx7 = <p>在司法实践及法学理论上，主要包括以下几种：<br />
      （1）	为社会公共利益而使用肖像的行为，如公安机关发布通缉令而使用犯罪嫌疑人的肖像，司法人员为司法证据目的而对犯罪嫌疑人进行拍照;参加游行、示威和公开演讲的人，因其活动目的具有公共性，而不得反对他人对上述活动的拍照;<br />
      （2）	为公民本人利益而使用肖像的行为，如公民因亲人走失对外发布寻人启事而使用肖像; <br />
      （3）	为社会新闻报道而使用肖像的行为，有特殊新闻价值的人，不得反对记者的善意拍照，如为弘扬社会正气或揭露社会丑恶现象而使用公民肖像，还有特别幸运者或特别不幸者、重大事件的当事人或者在场人等，均属于这种情况;<br />
      （4）	善意使用政治家及社会明星肖像的行为，政治家、影视和体育明星以及其他公共人士，在公开露面时，不得反对他人拍照。
    </p>;
    const xx8 = <p>图片版权经营者在发布图片的时候，如果涉及到肖像权，必须注明已确定的获得授权的信息（有授权或无授权）。如无授权，需注意提醒客户将图片用于商业用途时，应依法先行取得肖像权授权，否则自行承担肖像权侵权风险。</p>;
    const xx9 = <p>图片根据其用途的不同主要可以分为编辑类和创意类两类。<br />
      （1）	编辑类又称新闻类图片，是记录新闻事件或媒体用于出版发行使用的图片。编辑类图片一般不作为商业用途使用，但特殊情况下可以使用，如品牌代言：赞助商可以使用其赞助的足球队比赛用图片做商业用途。<br />
      （2）	创意类又称商业类图片，是指用于商业广告等商业用途的图片。创意类图片又根据版权类型和使用方式的限制，分为免版税金类图片（RF）和限定版权类（RM）图片。前者按图片大小收费，不受使用时间、地域、用途、发布数量等条件限制，后者使用受时间、地域、用途、发布数量等条件限制。
    </p>;
    const xx10 = <div>
      <p>图片在用于新闻报道等编辑类用途时，一般是不需要明确的肖像权授权的。但如果某些肖像权人已明确声明保留权利，就不能使用这类图片，如果使用就会带来法律责任。</p>
      <p>创意图片类用途主要是商业广告等方式，因此选择创意图片分类上传的任何图片，只要出现可识别的人物，就必须与肖像权人签订授权协议，获得人物肖像权授权。</p>
    </div>;
    const xx11 = <Table dataSource={dataSource} columns={columns} pagination={false} bordered={true}/>;
    const xx12 = <p>否。取得肖像权授权的图片，必须按照授权人授权的地域、期限和类别使用，不可超出授权范围，如授权仅限在中国地域使用，授权期限一年，不得用于特殊商品如烟草、医药等。</p>;
    const xx13 = <div>
      <p>图片版权交易平台，是版权所有人和图片使用人的中介。</p>
      <p>首先，版权交易平台并非出售图片谋取商业利益，而是代理版权所有人授权最终用户使用图片。</p>
      <p>其次，下载用户支付的是版权所有人应得的稿酬，实质上是实现版权人著作权项下财产获益的权利，而非使用肖像的费用，不涉及肖像权人肖像权项下财产获益的权利。</p>
      <p>因此，图片版权交易实质上是图片版权授权使用，其交易的对象是版权，而非肖像权。</p>
    </div>;
    const xx14 = <div>
      <p>图片版权交易的编辑类图片，一般用作新闻用途，不需要明确的肖像权授权，用户支付的稿酬是基于著作权产生，并非基于肖像权谋利，不符合“以营利为目的使用他人的肖像”这一要件，不构成侵犯肖像权。</p>
      <p>图片版权交易的创意类图片，一般用作商业用途，需要明确的肖像权授权，用户下载使用不仅需要支付版权人基于著作权产生的稿酬，同时也要经过肖像权人的同意并支付肖像权许可使用费，否则将符合“以营利为目的使用他人的肖像”这一要件，构成侵犯他人肖像权。</p>
    </div>;
    const xx15 = <p>影视明星、体育明星、艺术家、政府官员、社会活动家等公众人物或者知名度超过常人，或者承担的职责涉及到公共利益，他们的行为关乎到国家、社会的利益或者公众的知情权，需要让渡部分包括肖像权在内的部分人格权利。在新闻报道中使用社会公众人物肖像的图片，可促使社会公众了解事实真相，符合社会公众利益的需要，如无恶意（侮辱、诽谤、诬告、陷害）使用，则属于对肖像的合理使用，无需获得肖像权人的授权。</p>;
    const xx16 = <p>《最高人民法院关于确定民事侵权精神损害赔偿责任的若干问题的解释》第3条，对死者的肖像权利作出了规定：“自然人死亡后，其近亲属因下列侵权行为遭受精神痛苦，向人民法院起诉请求赔偿精神损害的，人民法院应当依法予以受理：（一）以侮辱、诽谤、贬损、丑化或者违反社会公共利益、社会公德的其他方式，侵害死者姓名、肖像、名誉、荣誉；……”因此，死者的肖像权仍受法律保护。司法实践中，如将死者肖像用于营利目的，应获得其近亲属或后代的授权。</p>;

    let footBtn = <div style={{textAlign: 'center', marginTop:'8px'}}>
      <Button type="primary" onClick={this.closeModalRules}>关闭</Button>
    </div>;

    let isShowStyle = this.state.show?this.style.layoutShow:this.style.layoutHide;
    let arr = [];
    if(this.props.favariteImgs.list) {
      for(let i=0; i<21; i++) {
        arr.push(this.props.favariteImgs.list[0]);
      }
    }
    console.log(arr.length);
    let content = this.props.favariteImgs.list?<Row
      style={this.style.content}
      type="flex"
      justify="start"
                                               align="top">

      {this.props.favariteImgs.list&&this.props.favariteImgs.list.map(x => {
        let file = JSON.parse(x.detail.detailInfo);
        return (
          <FavariteCard
            key={file.id}
            file={file}
            downStatus={this.props.downStatus}
            downloadVcgImgs={this.props.downloadVcgImgs}
            selectedFiles={this.props.selectedFavarite}
            //showModal={this.props.showModal}
            selectImg_search={event => this.props.selectFavarite(file, event)}
          />
        );
      })}
    </Row>:<div>
      <Spin size='large' delay={1000} style={this.style.spinner} />
    </div>;
    let disable = this.props.selectedFavarite.length>0?false:true;
    let disable2 = this.props.selectedFavarite.length==1?false:true;
    return (
      <div>
        <div onClick={this.ShowFavarite} style={this.style.button}>
          <Icon style={{color:'#fff'}} type="heart" />
          收藏夹
        </div>
        <div onClick={this.showModalRules} style={this.style.rules}>
          <Icon style={{color:'#fff'}} type="info-circle-o" />
          版权说明
        </div>

        <Modal
          title="版权说明"
          visible={this.state.showRules}
          onOk={this.closeModalRules}
          onCancel={this.closeModalRules}
          closable={true}
          width={1000}
          footer={footBtn}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab={'名词定义'} key="1">
              <div>
                <Collapse defaultActiveKey={['1']}>
                  <Panel header="版权素材" key="1">
                    {ci1}
                  </Panel>
                  <Panel header="被授权人" key="2">
                    {ci2}
                  </Panel>
                  <Panel header="图片授权许可类型" key="3">
                    {ci3}
                  </Panel>
                  <Panel header="肖像权/物权" key="4">
                    {ci4}
                  </Panel>
                  <Panel header="新媒体编辑使用" key="5">
                    {ci5}
                  </Panel>
                  <Panel header="新媒体商业使用" key="6">
                    {ci6}
                  </Panel>
                  <Panel header="商业使用" key="7">
                    {ci7}
                  </Panel>
                  <Panel header="协议价格" key="8">
                    {ci8}
                  </Panel>
                </Collapse>
              </div>
            </TabPane>

            <TabPane tab={'资产中国图片使用规则'} key="2">
              <div>
                <Collapse defaultActiveKey={['1']}>
                  <Panel header="1、图像版权的定义是什么？为什么要用资产中国的图片？" key="1">
                    {pic1}
                  </Panel>
                  <Panel header="2、编辑图片和创意图片有什么不同？" key="2">
                    {pic2}
                  </Panel>
                  <Panel header="3、图片用于新媒体用途，应注意什么？" key="3">
                    {pic3}
                  </Panel>
                  <Panel header="4、图片画面里有人物，我使用会涉及肖像权问题吗？" key="4">
                    {pic4}
                  </Panel>
                  <Panel header="5、我能对下载的图片进行任意裁剪、修改和拼接吗？" key="5">
                    {pic5}
                  </Panel>
                  <Panel header="6、使用中国的图片需要署名吗？" key="6">
                    {pic6}
                  </Panel>
                </Collapse>
              </div>
            </TabPane>
            <TabPane tab={'肖像权常见法律问题解答'} key="3">
              <div>
                <Collapse defaultActiveKey={['1']}>
                  <Panel header="1、什么是肖像权？" key="1">
                    {xx1}
                  </Panel>
                  <Panel header="2、肖像权的具体内容是什么？" key="2">
                    {xx2}
                  </Panel>
                  <Panel header="3、我国法律对肖像权有哪些法律规定？" key="3">
                    {xx3}
                  </Panel>
                  <Panel header="4、认定侵犯肖像权的法律要件是什么？" key="4">
                    {xx4}
                  </Panel>
                  <Panel header="5、哪些行为可以被认定为“以营利为目的”？" key="5">
                    {xx5}
                  </Panel>
                  <Panel header="6、“以营利为目的”是否要求实际获利？" key="6">
                    {xx6}
                  </Panel>
                  <Panel header="7、肖像权侵权有哪些违法阻却事由？" key="7">
                    {xx7}
                  </Panel>
                  <Panel header="8、作为图片版权经营者，如果图片涉及他人肖像，则需要注意什么？" key="8">
                    {xx8}
                  </Panel>
                  <Panel header="9、图片有哪些分类？" key="9">
                    {xx9}
                  </Panel>
                  <Panel header="10、不同类型的图片对肖像权的要求有何不同？" key="10">
                    {xx10}
                  </Panel>
                  <Panel header="11、创意类图片在何种情形下需要肖像权授权？" key="11">
                    {xx11}
                  </Panel>
                  <Panel header="12、取得肖像权授权的创意类图片可以随意使用吗？" key="12">
                    {xx12}
                  </Panel>
                  <Panel header="13、如何完整、准确理解图片版权交易平台的性质？" key="13">
                    {xx13}
                  </Panel>
                  <Panel header="14、图片版权交易是否侵犯他人肖像权？" key="14">
                    {xx14}
                  </Panel>
                  <Panel header="15、公众人物的肖像权有何特殊性？" key="15">
                    {xx15}
                  </Panel>
                  <Panel header="16、使用已故公民的肖像需要授权吗？" key="16">
                    {xx16}
                  </Panel>
                </Collapse>
              </div>
            </TabPane>
          </Tabs>
        </Modal>


        <Layout style={isShowStyle}>
          <Layout.Header style={{backgroundColor: 'white', padding:10, height:50}}>
            <Button style={{float:'left'}} type="primary" icon="right-circle-o" onClick={this.hideFavarite}>
              收起
            </Button>
            <Button loading={this.props.downStatus} disabled={disable2} style={{position:'relative', left:450, top:-18}} type="primary" icon="download" onClick={this.download}>
              下载
            </Button>
            <Button loading={this.props.favariteStatus} disabled={disable} style={{position:'relative', left:245, top:-18}} type="primary" icon="star"
              onClick={()=>{
                let ids = this.props.selectedFavarite.map(x=>x.id).join(',');
                this.props.deleteFavarite(ids);
              }}>
              取消收藏
            </Button>
          </Layout.Header>
          <Layout.Content>
            {content}
          </Layout.Content>
          <Layout.Footer style={{flex:'0 0 auto', padding:0, height:105}}>
            <Pagination
              style={this.style.pagination}
              current={this.props.filterFavarite.pageNum}
              pageSize={this.props.filterFavarite.pageSize}
              total={this.props.favariteImgs.total}
              onChange={this.turnToPage} />
          </Layout.Footer>
        </Layout>
      </div>
    );
  }
}

export default Favarite;
