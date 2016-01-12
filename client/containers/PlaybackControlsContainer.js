import React, { Component } from 'react';
import { connect } from 'react-redux';

import PlaybackControls from 'components/PlaybackControls';
import { getPlaybackStatus } from 'reducers/PlaybackReducer';
import { getCurrentAsset } from 'reducers/AssetReducer';
import { nextAsset, togglePlayback, previousAsset } from 'actions/PlaybackActions';

export class PlaybackControlsContainer extends Component {
  render() {
    const props = {
      currentAsset: this.props.currentAsset,
      onBackButtonClick: this._onBackButtonClick.bind(this),
      onForwardButtonClick: this._onForwardButtonClick.bind(this),
      onTogglePlaybackButtonClick: this._onTogglePlaybackButtonClick.bind(this),
      playbackStatus: this.props.playbackStatus
    };

    return (
      <PlaybackControls { ...props } />
    );
  }

  _onBackButtonClick() {
    this.props.dispatch(previousAsset());
  }

  _onTogglePlaybackButtonClick() {
    this.props.dispatch(togglePlayback());
  }

  _onForwardButtonClick() {
    this.props.dispatch(nextAsset());
  }
}

export const mapStateToProps = (state) => ({
  currentAsset: getCurrentAsset(state),
  playbackStatus: getPlaybackStatus(state)
});

export default connect(mapStateToProps)(PlaybackControlsContainer);
