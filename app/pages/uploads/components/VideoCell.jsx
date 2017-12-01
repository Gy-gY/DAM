import React from 'react';
import videojs from 'video.js';

export default class VideoCell extends React.Component {
  static propTypes = {
    style: React.PropTypes.object.isRequired,
    videoPath: React.PropTypes.string.isRequired,
    posterPath: React.PropTypes.string.isRequired,
    videoId: React.PropTypes.string.isRequired,
  }
  state = {
    fullscreen: false,
  }
  componentDidMount = () => {
    //Init Video by videojs
    let video = videojs(this.refs[this.props.videoId], {});
    video.on('fullscreenchange', () =>{
      this.setState({fullscreen:!this.state.fullscreen});
    });
  }

  render() {
    const { videoPath, posterPath, videoId } = this.props;
    let syle = this.state.fullscreen?{with:'100%', height:'100%'}:this.props.style;
    //videoUpload.previewOssid
    return <video ref={ videoId } className='video-js vjs-default-skin vjs-big-play-centered' style={syle}
      controls preload='none' poster={ posterPath }>
      <source src={videoPath} type='video/mp4'/>
      <p className="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="http://videojs.com/html5-video-support/" target="_blank">
          supports HTML5 video
        </a>
      </p>
    </video>;
  }
}
