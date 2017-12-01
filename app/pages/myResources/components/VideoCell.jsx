import React from 'react';
import videojs from 'video.js';

export default class VideoCell extends React.Component {
  static propTypes = {
    style: React.PropTypes.object.isRequired,
    videoPath: React.PropTypes.string.isRequired,
    posterPath: React.PropTypes.string.isRequired,
    videoId: React.PropTypes.string.isRequired,
  }

  componentDidMount = () => {
    //Init Video by videojs
    videojs(this.refs[this.props.videoId], {});
  }

  render() {
    const { videoPath, posterPath, videoId } = this.props;
    //videoUpload.previewOssid
    return <video ref={ videoId } className='video-js vjs-default-skin vjs-big-play-centered' style={ this.props.style }
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

