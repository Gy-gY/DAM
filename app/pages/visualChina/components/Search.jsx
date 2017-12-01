import React from 'react';
import { Input, notification, Select, Button, Form } from 'antd';
let InputGroup = Input.Group;
let Option = Select.Option;
import bg from './bg.jpg';
import svg from './logo.svg';
export default class Search extends React.Component {

  static propTypes = {
    vcgSearch: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object.isRequired,

  }

  state = {
    searchType:'Creative',
    inputValue:'',
  }
  style = {
    container:{
      backgroundColor:'white',
      height:'100%',
      width: '100%',
      paddingTop:100,
      minHeight: '180px',
      backgroundSize: '100% auto',
      backgroundImage: `url(${bg})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      position: 'relative',
    },
    logo:{
      width:350,
      height:150,
      borderRadius:5,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${svg})`,
      backgroundPosition: 'center center',
      textAlign:'center',
      color:'white',
      margin:'0 auto 50px',
      lineHeight:'100px',
      fontSize:25,
    },
    inputBg:{
      borderRadius: 4,
      backgroundColor: 'rgb(233, 233, 233)',
      width: '90%',
      height: 72,
      padding: '20px 25px',
      margin:'0 auto',
    },
    searchContain:{
      textAlign:'center',
    },
    select:{
      width:'8%',
    },
    input:{
      width:'80%',
    },
    search:{
      width:'8%',
    },
  }
  onSearch = (e)=>{
    this.props.vcgSearch({keyword:e.target.value, type:this.state.searchType});
  }
  onChange = (v)=>{
    this.setState({searchType:v});
  }
  onButton = ()=>{
    this.props.vcgSearch({keyword:this.state.inputValue, type:this.state.searchType});
  }
  inputOnChange = (e)=>{
    this.setState({inputValue:e.target.value});
  }
  render() {
    let currentUser = this.props.currentUser;
    let select = <Select onChange={this.onChange} style={this.style.select} defaultValue={this.state.searchType} size={'large'}>
      <Option value="Creative">创意图片</Option>
      <Option value="Edit">编辑图片</Option>
    </Select>;
    if(currentUser.permissions.includes('vcg_view')&&currentUser.permissions.includes('vcg_edit_view')) {
      select = <Select onChange={this.onChange} style={this.style.select} defaultValue={this.state.searchType} size={'large'}>
        <Option value="Creative">创意图片</Option>
        <Option value="Edit">编辑图片</Option>
      </Select>;
    }else if(currentUser.permissions.includes('vcg_view')) {
      select = <Select onChange={this.onChange} style={this.style.select} defaultValue={this.state.searchType} size={'large'}>
        <Option value="Creative">创意图片</Option>
      </Select>;
    }else if (currentUser.permissions.includes('vcg_edit_view')) {
      select = <Select onChange={this.onChange} style={this.style.select} defaultValue={this.state.searchType} size={'large'}>
        <Option value="Edit">编辑图片</Option>
      </Select>;
    }
    return (
      <div style={this.style.container}>
        <div style={this.style.logo}></div>
        <div style={this.style.inputBg}>

          <InputGroup style={this.style.searchContain} compact size={'large'}>
            {select}
            <Input onChange={this.inputOnChange} value={this.state.inputValue} ref="myInput" onPressEnter={this.onSearch} style={this.style.input} placeholder="请输入ID或关键字查询" />
            <Button onClick={this.onButton} style={this.style.search} size={'large'} type="primary" icon="search">搜索</Button>

          </InputGroup>
        </div>
      </div>
    );
  }
}
