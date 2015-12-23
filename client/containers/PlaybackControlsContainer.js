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
    this.props.dispatch(previousAsset(this.props.maxAssetIndex));
  }

  _onTogglePlaybackButtonClick() {
    this.props.dispatch(togglePlayback());
  }

  _onForwardButtonClick() {
    this.props.dispatch(nextAsset(this.props.maxAssetIndex));
  }
}

export const mapStateToProps = (state) => {
  const { currentAssetIndex, manifest, playbackStatus } = state;
  const currentAsset = manifest[currentAssetIndex];

  return {
    currentAssetPath: currentAsset && currentAsset.path,
    disableSkipForward: currentAssetIndex >= manifest.length - 1,
    disableSkipBackward: currentAssetIndex <= 0,
    maxAssetIndex: manifest.length - 1,
    playbackStatus
  };
};

export default connect(mapStateToProps)(PlaybackControlsContainer);
