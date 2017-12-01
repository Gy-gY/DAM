import React from 'react';
import { Modal, Carousel } from 'antd';
import EditArea from './EditArea';
import VideoCell from './VideoCell';
import helper from '../../../common/helper';

const styles = {
  modal: {
    top: 0,
    marginTop: '24px',
    padding:0,
    backgroundColor:'rgb(64,64,64)',
  },
  imageArea: {
    float: 'left',
    padding: 15,
    backgroundColor:'rgb(64,64,64)',
    width:830,
    height:830,
  },
  video: {
    height:'100%',
    width:'100%',
  },
  image: {
    width: 800,
    height: 800,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    position: 'relative',
  },
  imageInfo: {
    float: 'right',
  },
  nextArrow: {
    zIndex: 5,
    color: 'rgba(0, 0, 0, 0.5)',
    height: '4rem',
    width: '4rem',
    left: '20px',
    background: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjUycHgiIGhlaWdodD0iNTJweCIgdmlld0JveD0iMCAwIDUyIDUyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjYgKDI2MzA0KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Hcm91cCAyPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IummlumhteWFqOWxjyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEzMTUuMDAwMDAwLCAtMzI3LjAwMDAwMCkiIHN0cm9rZT0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMzE2LjAwMDAwMCwgMzI4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTE3LjkzMDg5ODIsMjEuNTYzNzE5NiBMMjQuNTMwODk4MiwyOC4xNjM3MTk2IEwzMS4yODA4OTgyLDIxLjQxMzcxOTYiIGlkPSJQYWdlLTEtQ29weS0xMiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQuNjA1ODk4LCAyNC43ODg3MjApIHNjYWxlKC0xLCAtMSkgcm90YXRlKC0yNjguMDAwMDAwKSB0cmFuc2xhdGUoLTI0LjYwNTg5OCwgLTI0Ljc4ODcyMCkgIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTEwLUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1LjAwMDAwMCwgMjUuMDAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0yNS4wMDAwMDAsIC0yNS4wMDAwMDApICIgY3g9IjI1IiBjeT0iMjUiIHI9IjI1Ij48L2NpcmNsZT4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+) no-repeat scroll 0 0 transparent',
  },
  preArrow: {
    zIndex: 5,
    color: 'rgba(0, 0, 0, 0.5)',
    height: '4rem',
    width: '4rem',
    left: '20px',
    background: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjUycHgiIGhlaWdodD0iNTJweCIgdmlld0JveD0iMCAwIDUyIDUyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjYgKDI2MzA0KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Hcm91cDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLpppbpobXlhajlsY8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03OC4wMDAwMDAsIC0zMjcuMDAwMDAwKSIgc3Ryb2tlPSIjRkZGRkZGIj4KICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3OS4wMDAwMDAsIDMyOC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xOCwyMS4xNSBMMjQuNiwyNy43NSBMMzEuMzUsMjEiIGlkPSJQYWdlLTEtQ29weS0xMSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQuNjc1MDAwLCAyNC4zNzUwMDApIHNjYWxlKDEsIC0xKSByb3RhdGUoLTI2OC4wMDAwMDApIHRyYW5zbGF0ZSgtMjQuNjc1MDAwLCAtMjQuMzc1MDAwKSAiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMTAiIGN4PSIyNSIgY3k9IjI1IiByPSIyNSI+PC9jaXJjbGU+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==) no-repeat scroll 0 0 transparent',
  },
};

export default class EditModal extends React.Component {

  static propTypes = {
    files: React.PropTypes.array.isRequired,
    isOpen: React.PropTypes.bool.isRequired,
    updateFiles: React.PropTypes.func,
    deleteFiles: React.PropTypes.func,
    commitFiles: React.PropTypes.func,
    selectedFiles: React.PropTypes.array,
    selectedFolder: React.PropTypes.object,
    closeDetailModal: React.PropTypes.func.isRequired,
    toggleFileSelection: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      showFile: null,
    };
  }

  onChange = (index) => {
    let fileList = this.props.selectedFolder.list && this.props.selectedFolder.list.filter(file => file.assetType != helper.ASSET_TYPE.ALBUM);
    this.props.toggleFileSelection(fileList[index], {});
    this.setState({
      showFile: fileList[index],
    });
  }

  render() {
    let file = this.props.selectedFiles[0];
    if (!file) return false;
    let fileList = this.props.selectedFolder.list && this.props.selectedFolder.list.filter(file => file.assetType != helper.ASSET_TYPE.ALBUM);
    let index = fileList.findIndex(x => x.id == file.id);
    index = index == -1 ? 0 : index;
    return (
      <Modal
        footer={null}
        width={1200}
        height={830}
        style={styles.modal}
        visible={this.props.isOpen}
        wrapClassName="full-screen-modal"
        onCancel={() => {
          this.setState({ showFile: null });
          this.props.closeDetailModal();
        }}
      >
        <div style={styles.imageArea}>
          {this.props.isOpen && <Carousel
            key = {file.id}
            dots={false}
            arrows={true}
            afterChange={this.onChange}
            infinite={true}
            slidesToShow={1}
            slidesToScroll={1}
            initialSlide={index}
            className={['slick-slider']}
            nextArrow={<div style={styles.nextArrow}/>}
            prevArrow={<div style={styles.preArrow}/>}
                                >
            {
              fileList.map(file => {
                if (file.ossVideoPath) {
                  return(
                    <div key={file.id} style={{width:'100%', height:'600px'}}>
                      <VideoCell
                        key={file.id}
                        videoPath={file.ossVideoPath}
                        posterPath={file.ossImgPath}
                        videoId={file.id.toString()}
                        style={styles.video}
                      />;
                    </div>
                  );
                }

                let url = file.ossImgPath;
                if(url.startsWith('https:') || url.startsWith('http:')) {
                  url = file.ossImgPath;
                }else {
                  url = `//${url}`;
                }
                let ss = {
                  ...styles.image,
                  backgroundImage: `url(${url})`,
                };
                return <div key={file.id} style={ss}></div>;
              })
            }
          </Carousel>}
        </div>
        <div>
          <EditArea
            key={file.id}
            updateFiles={this.props.updateFiles}
            deleteFiles={this.props.deleteFiles}
            commitFiles={this.props.commitFiles}
            selectedFiles={[file]}
            currentUser={this.props.currentUser}
            selectedFolder={this.props.selectedFolder} />
        </div>

      </Modal>
    );
  }
}
