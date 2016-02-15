import React, { Component } from 'react';
import { connect } from 'react-redux';

import PlaybackControls from 'components/PlaybackControls';
import Focusable from 'components/Focusable';
import { getPlaybackStatus } from 'reducers/PlaybackReducer';
import { getCurrentAsset } from 'reducers/AssetReducer';
import { nextAsset, togglePlayback, previousAsset } from 'actions/PlaybackActions';

export class PlaybackControlsContainer extends Component {
  render() {
    const props = {
      currentAsset: this.props.currentAsset,
      onBackButtonClick: this.props.previousAsset,
      onForwardButtonClick: this.props.nextAsset,
      onTogglePlaybackButtonClick: this.props.togglePlayback,
      playbackStatus: this.props.playbackStatus
    };

    return (
      <PlaybackControls { ...props } />
    );
  }
}

export const mapStateToProps = (state) => ({
  currentAsset: getCurrentAsset(state),
  playbackStatus: getPlaybackStatus(state)
});

const mapDispatchToProps = {
  nextAsset,
  previousAsset,
  togglePlayback
};

const FocusablePlaybackControlsContainer = Focusable(PlaybackControlsContainer);
export default connect(mapStateToProps, mapDispatchToProps)(FocusablePlaybackControlsContainer);
