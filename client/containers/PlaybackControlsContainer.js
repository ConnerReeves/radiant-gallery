import React, { Component } from 'react';
import { connect } from 'react-redux';

import PlaybackControls from 'components/PlaybackControls';
import { nextAsset, togglePlayback, previousAsset } from 'actions/PlaybackActions';

export class PlaybackControlsContainer extends Component {
  render() {
    const props = {
      onBackButtonClick: this._onBackButtonClick.bind(this),
      onForwardButtonClick: this._onForwardButtonClick.bind(this),
      onTogglePlaybackButtonClick: this._onTogglePlaybackButtonClick.bind(this),
      ...this.props
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
  playbackStatus: state.playbackStatus,
  showControls: state.showControls
});

export default connect(mapStateToProps)(PlaybackControlsContainer);
