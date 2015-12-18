import React, { Component } from 'react';
import { connect } from 'react-redux';

import PlaybackControls from '../components/PlaybackControls';

export class PlaybackControlsContainer extends Component {
  render() {
    return (
      <PlaybackControls { ...this.props } />
    );
  }
}

export const mapStateToProps = (state) => {
  const { currentAssetIndex, manifest, playbackStatus } = state;
  const currentAsset = manifest[currentAssetIndex];
  const currentAssetPath = currentAsset && currentAsset.path;

  return {
    currentAssetPath: currentAsset && currentAsset.path,
    disableSkipForward: currentAssetIndex >= manifest.length - 1,
    disableSkipBackward: currentAssetIndex <= 0,
    maxAssetIndex: manifest.length,
    playbackStatus
  };
};

export default connect(mapStateToProps)(PlaybackControlsContainer);
