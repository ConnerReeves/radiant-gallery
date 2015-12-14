import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PAUSED, PLAYING } from '../constants/PlaybackStatuses';
import { setAssetIndex } from '../actions/PlaybackActions';
import { isImage, isVideo } from '../utils/AppUtils';
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
        this._startPlayback(nextProps.frequency);
      }
    }
  }

  render() {
    if (this.props.currentAsset) {
      const assetPath = this.props.currentAsset.path;
      const props = { src: this.props.currentAsset.path };

      return isImage(assetPath) ? <Image { ...props } /> :
             isVideo(assetPath) ? <Video { ...props } /> : null;
    }

    return null;
  }

  _startPlayback(frequency) {
    this._changeAsset();
    this.playbackTimeout = setTimeout(this._startPlayback.bind(this, frequency), frequency);
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
  return { currentAsset, currentAssetIndex, frequency, manifest, playbackStatus };
}

export default connect(mapStateToProps)(AssetController);
