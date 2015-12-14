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
  const { currentAssetIndex, manifest } = state;
  const currentAsset = manifest[currentAssetIndex];
  const currentAssetPath = currentAsset && currentAsset.path;

  return {
    disableSkipForward: currentAssetIndex >= manifest.length - 1,
    disableSkipBackward: currentAssetIndex <= 0
  };
};

export default connect(mapStateToProps)(PlaybackControlsContainer);
