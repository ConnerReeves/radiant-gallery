import React, { Component } from 'react';

import Icon from './Icon';
import { PLAYING } from 'constants/PlaybackStatuses';
import { isVideo } from 'utils/AppUtils';

require('styles/playback-controls.scss');

export default class PlaybackControls extends Component {
  render() {
    const playbackToggleButtonProps = {
      disabled: isVideo(this.props.currentAsset.path),
      name: this._getPlaybackToggleIcon(),
      onClick: this.props.onTogglePlaybackButtonClick,
      style: { width: '40px' }
    };

    return (
      <div className="playback-controls">
        <Icon name="backward" onClick={ this.props.onBackButtonClick } />
        <Icon { ...playbackToggleButtonProps } />
        <Icon name="forward" onClick={ this.props.onForwardButtonClick } />
      </div>
    );
  }

  _getPlaybackToggleIcon() {
    if (isVideo(this.props.currentAsset.path)) {
      return 'video-camera';
    } else if (this.props.playbackStatus === PLAYING) {
      return 'pause';
    } else {
      return 'play';
    }
  }
}
