import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Video from 'components/Video';
import { getViewportHeight, getViewportWidth } from 'reducers/ViewportReducer';
import { getPlaybackStatus } from 'reducers/PlaybackReducer';
import { nextAsset, togglePlayback } from 'actions/PlaybackActions';
import { PLAYING } from 'constants/PlaybackStatuses';

export class VideoContainer extends Component {
  static propTypes = {
    src: React.PropTypes.string.isRequired
  };

  state = { shouldResumePlayback: false };

  componentWillUnmount() {
    this._resumePlayback();
  }

  render() {
    const props = {
      height: this.props.viewportHeight,
      src: this.props.src,
      onEnded: this._resumePlayback.bind(this),
      onPlay: this._onVideoStart.bind(this),
      width: this.props.viewportWidth
    };

    return (
      <Video { ...props } />
    );
  }

  _getVideoType() {
    const pathParts = this.props.src.split('.');
    return `video/${ pathParts[pathParts.length - 1] }`;
  }

  _onVideoStart() {
    if (this.props.playbackStatus === PLAYING) {
      this.setState({ shouldResumePlayback: true });
      this.props.togglePlayback();
    }
  }

  _resumePlayback() {
    if (this.state.shouldResumePlayback) {
      this.setState({ shouldResumePlayback: false });
      this.props.nextAsset();
      this.props.togglePlayback();
    }
  }
}

const mapStateToProps = (state) => ({
  playbackStatus: getPlaybackStatus(state),
  viewportHeight: getViewportHeight(state),
  viewportWidth: getViewportWidth(state)
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    nextAsset,
    togglePlayback,
    togglePlayback
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer);
