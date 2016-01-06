import React, { Component } from 'react';
import { connect } from 'react-redux';

import AssetController from 'components/AssetController';
import { PLAYING } from 'constants/PlaybackStatuses';
import { setAssetIndex, setViewportSize } from 'actions/PlaybackActions';

let playbackTimeout;

class AssetControllerContainer extends Component {
  componentDidMount() {
    window.addEventListener('resize', this._onWindowResize.bind(this));
  }

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
    const props = { currentAsset: this.props.currentAsset };
    return <AssetController { ...props } />;
  }

  _startPlayback(frequency) {
    playbackTimeout = setTimeout(() => {
      this._changeAsset();
      this._startPlayback(frequency);
    }, frequency);
  }

  _stopPlayback() {
    clearTimeout(playbackTimeout);
  }

  _changeAsset() {
    const { currentAssetIndex, manifest } = this.props;
    const newAssetIndex = currentAssetIndex >= manifest.length - 1 ? 0 : currentAssetIndex + 1;
    this.props.dispatch(setAssetIndex(newAssetIndex));
  }

  _onWindowResize() {
    this.props.dispatch(setViewportSize({
      height: window.innerHeight,
      width: window.innerWidth
    }));
  }
}

function mapStateToProps(state) {
  const { currentAssetIndex, frequency, manifest, playbackStatus } = state;
  const currentAsset = manifest[currentAssetIndex];
  const maxAssetIndex = manifest && manifest.length - 1 || 0;

  return { currentAsset, currentAssetIndex, frequency, manifest, maxAssetIndex, playbackStatus };
}

export default connect(mapStateToProps)(AssetControllerContainer);
