import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { nextAsset, togglePlayback } from '../actions/PlaybackActions';
import { PLAYING } from '../constants/PlaybackStatuses';

export class Video extends Component {
  static propTypes = {
    src: React.PropTypes.string.isRequired
  };

  state = Object.assign(this._getPlayerSize(), { shouldResumePlayback: false })

  componentDidMount() {
    document.addEventListener('resize', this._onWindowResize.bind(this));
  }

  componentWillUnmount() {
    this._resumePlayback();
    document.removeEventListener('resize', this._onWindowResize);
  }

  render() {
    const videoProps = {
      autoPlay: true,
      height: this.state.height,
      key: this.props.src,
      onEnded: this._resumePlayback.bind(this),
      onPlay: this._onVideoStart.bind(this),
      width: this.state.width
    };

    return (
      <video { ...videoProps }>
        <source src={ this.props.src } type={ this._getVideoType() } />
      </video>
    );
  }

  _getVideoType() {
    const pathParts = this.props.src.split('.');
    return `video/${ pathParts[pathParts.length - 1] }`;
  }

  _getPlayerSize() {
    return {
      height: window.innerHeight,
      width: window.innerWidth
    };
  }

  _onWindowResize() {
    this.setState(this._getPlayerSize());
  }

  _onVideoStart() {
    if (this.props.playbackStatus === PLAYING) {
      this.setState({ shouldResumePlayback: true });
      this.props.dispatch(togglePlayback());
    }
  }

  _resumePlayback() {
    if (this.state.shouldResumePlayback) {
      this.setState({ shouldResumePlayback: false });
      this.props.dispatch(togglePlayback());
    }
  }
}

export default connect(state => ({
  playbackStatus: state.playbackStatus
}))(Video);
