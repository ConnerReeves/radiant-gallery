import React, { Component } from 'react';
import { connect } from 'react-redux';

import AssetController from 'components/AssetController';
import { getCurrentAsset } from 'reducers/AssetReducer';
import { PLAYING } from 'constants/PlaybackStatuses';
import { nextAsset } from 'actions/PlaybackActions';

let playbackTimeout;

class AssetControllerContainer extends Component {
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
    this.props.dispatch(nextAsset());
  }
}

const mapStateToProps = (state) => ({
  currentAsset: getCurrentAsset(state),
  frequency: state.frequency,
  playbackStatus: state.playbackStatus
});

export default connect(mapStateToProps)(AssetControllerContainer);
