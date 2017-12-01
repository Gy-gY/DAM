import React from 'react';
import { Card, Col, Row, Icon, Pagination } from 'antd';

const styles = {
  title: {
    textAlign:'center',
    padding: '10px 16px',
    wordWrap: 'break-word',
    borderTop: '1px solid #e9e9e9',
  },
  placeHolder: {
    margin: 'auto',
    fontWeight: 'bold',
    color: 'rgba(0,0,0,.25)',
    fontSize: '24px',
  },
};

export default class FolderView extends React.Component {
  state = {
    currentPage: 1,
    pageSize: 60,
  };

  style = {
    'folderCardCheckbox': {
      // marginTop: '-50px',
      // marginLeft: '-16px',
    },
    card: {
      backgroundImage: 'url(/assets/images/icons/folder.png)',
      width: '88px',
      height: '70px',
    },
  };

  static propTypes = {
    style: React.PropTypes.object,
    folders: React.PropTypes.array,
    onCheckPic: React.PropTypes.func,
    onTextBlur: React.PropTypes.func,
    checkedFolders: React.PropTypes.array,
    selectedNode: React.PropTypes.object,
  }

  onChange = (current) => {
    this.setState({currentPage: current});
  };

  getPagedFolders = (allFolders, current, pageSize) => {
    const pagedFolders = allFolders.slice((current-1) * pageSize, current * pageSize);
    return pagedFolders;
  }

  render() {
    let allFolders=this.props.folders;
    const folders = this.getPagedFolders(allFolders, this.state.currentPage, this.state.pageSize);
    let {style, selectedNode} = this.props;
    console.log('folders == ', folders);
    if(folders.length>0) {
      return (
        <div style={style}>
          <Row type="flex"
            justify="start"
          align="top">
            { folders.map((folder) => {
              let bg = '';
              if(this.props.checkedFolders.indexOf(folder.id) >= 0) {
                bg = 'rgba(16, 142, 233, 0.498039)';
              }
              return (
                <Col key={folder.id}>
                  <Card

                    style={{width:160, margin:8, textAlign:'center', paddingTop:15, cursor:'pointer', backgroundColor:bg}}
                    bodyStyle={{ padding: 0 }}
                    onClick={this.props.onCheckPic.bind(this, folder.id)}
                  >
                    <Icon style={{fontSize:80, textAlign:'center', color:'#999'}} type="folder" />
                    <div style={styles.title}>
                      {/* <h3>
                        //   <Input style={{borderWidth: '0px'}} defaultValue={folder.name}
                        //   onBlur={this.props.onTextBlur.bind(this, folder.name, folder.id)}/>
                        // </h3>
                      */}
                      <h3 style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{folder.name}</h3>
                    </div>
                  </Card>
                </Col>);
            })
            }
          </Row>
          <div style={{position: 'absolute', bottom:8, right: 16}} >
            <Pagination
              current={this.state.currentPage}
              pageSize={this.state.pageSize}
              total={allFolders.length}
              onChange={this.onChange} />
          </div>
        </div>);
    }else if(!selectedNode) {
      return(
        <Row
          style={style}
        type="flex">
          <div style={styles.placeHolder}>
            请选择您要浏览的目录！
          </div>
        </Row>
      );
    }else {
      return(
        <Row
          style={style}
        type="flex">
          <div style={styles.placeHolder}>
            您还没有在此目录下创建子目录！
          </div>
        </Row>
      );
    }

  }
}
