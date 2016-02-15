import React, { Component } from 'react';
import { connect } from 'react-redux';

import AssetController from 'components/AssetController';
import { togglePlayback } from 'actions/PlaybackActions';
import { getCurrentAsset } from 'reducers/AssetReducer';
import { getFrequency, getPlaybackStatus } from 'reducers/PlaybackReducer';
import { PLAYING } from 'constants/PlaybackStatuses';
import { nextAsset } from 'actions/PlaybackActions';

let playbackTimeout;

class AssetControllerContainer extends Component {
  componentDidMount() {
    this.props.togglePlayback();
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
    this.props.nextAsset();
  }
}

const mapStateToProps = (state) => ({
  currentAsset: getCurrentAsset(state),
  frequency: getFrequency(state),
  playbackStatus: getPlaybackStatus(state)
});

const mapDispatchToProps = {
  nextAsset,
  togglePlayback
};

export default connect(mapStateToProps, mapDispatchToProps)(AssetControllerContainer);
