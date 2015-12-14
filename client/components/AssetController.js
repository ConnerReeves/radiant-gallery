import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PAUSED, PLAYING } from '../constants/PlaybackStatuses';
import { nextAsset, setAssetIndex } from '../actions/PlaybackActions';
import { getAssetType } from '../utils/AppUtils';
import Image from './Image';
import Video from './Video';

class AssetController extends Component {
  playbackTimeout;

  componentWillReceiveProps(nextProps) {
    const playbackStatusChanged = this.props.playbackStatus !== nextProps.playbackStatus;
    const frequencyChanged = this.props.frequency !== nextProps.frequency;

    if (playbackStatusChanged || frequencyChanged) {
      this._stopPlayback();

      if (nextProps.playbackStatus === PLAYING || frequencyChanged) {
        this.props.dispatch(nextAsset(this.props.maxIndex));
        this._startPlayback(nextProps.frequency);
      }
    }
  }

  render() {
    if (this.props.currentAsset) {
      const assetPath = this.props.currentAsset.path;
      const props = { src: assetPath };

      return {
        image: <Image { ...props } />,
        video: <Video { ...props } />
      }[getAssetType(assetPath)] || null;
    }

    return null;
  }

  _startPlayback(frequency) {
    this.playbackTimeout = setTimeout(() => {
      this._changeAsset();
      this._startPlayback(frequency);
    }, frequency);
  }

  _stopPlayback() {
    clearTimeout(this.playbackTimeout);
  }

  _changeAsset() {
    const { currentAssetIndex, manifest } = this.props;
    const newAssetIndex = currentAssetIndex >= manifest.length - 1 ? 0 : currentAssetIndex + 1;
    const setAssetIndexAction = setAssetIndex(newAssetIndex);
    this.props.dispatch(setAssetIndexAction);
  }
}

function mapStateToProps(state) {
  const { currentAssetIndex, frequency, manifest, playbackStatus } = state;
  const currentAsset = manifest[currentAssetIndex];

  return {
    currentAsset,
    currentAssetIndex,
    frequency,
    manifest,
    maxIndex: manifest && manifest.length - 1 || 0,
    playbackStatus
  };
}

export default connect(mapStateToProps)(AssetController);
