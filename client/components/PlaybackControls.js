import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

import ControlButton from './ControlButton';
import FrequencyControl from './FrequencyControl';
import { PAUSED, PLAYING } from '../constants/PlaybackStatuses';
import { nextAsset, togglePlayback, previousAsset } from '../actions/PlaybackActions';
import { isVideo } from '../utils/AppUtils';

const containerStyles = {
  position: 'fixed',
  transition: 'opacity 0.5s ease-in-out',
  top: '10px',
  zIndex: 1
};

const leftContainerSytles = Object.assign({}, containerStyles, { left: '10px' });
const rightContainerSytles = Object.assign({}, containerStyles, { right: '10px' });

class PlaybackControls extends Component {
  state = { focus: false, opacity: 0 };

  componentDidMount() {
    document.addEventListener('mousemove', this._onMouseMove.bind(this));

    const domNode = findDOMNode(this);
    domNode.addEventListener('mouseenter', () => { this.setState({ focus: true }); });
    domNode.addEventListener('mouseleave', () => { this.setState({ focus: false }); });
  }

  render() {
    return (
      <div>
        { this._getPlaybackControls() }
        { this._getFrequencyControls() }
      </div>
    );
  }

  _getPlaybackControls() {
    return (
      <div style={ Object.assign({}, leftContainerSytles, { opacity: this.state.opacity }) }>
        <ControlButton icon="backward" action= { () => previousAsset(this.props.maxAssetIndex) } />
        <ControlButton icon={ this._getPlaybackToggleIcon() } action={ togglePlayback } disabled={ isVideo(this.props.currentAssetPath) } />
        <ControlButton icon="forward" action= { () => nextAsset(this.props.maxAssetIndex) } />
      </div>
    );
  }

  _getFrequencyControls() {
    return isVideo(this.props.currentAssetPath) ? null : (
      <div style={ Object.assign({}, rightContainerSytles, { opacity: this.state.opacity }) }>
        <FrequencyControl />
      </div>
    );
  }

  _getPlaybackToggleIcon() {
    if (isVideo(this.props.currentAssetPath)) {
      return 'video-camera';
    } else if (this.props.playbackStatus === PLAYING) {
      return 'pause';
    } else {
      return 'play';
    }
  }

  _onMouseMove() {
    this.setState({ opacity: 1 }, () => {
      clearTimeout(this.opacityTimeout);
      this.opacityTimeout = setTimeout(() => {
        if (!this.state.focus) {
          this.setState({ opacity: 0 });
        }
      }, 3000);
    });
  }
}

function mapStateToProps(state) {
  const { currentAssetIndex, manifest, playbackStatus } = state;
  const currentAsset = manifest[currentAssetIndex];
  const currentAssetPath = currentAsset && currentAsset.path;

  return {
    currentAssetPath,
    maxAssetIndex: manifest.length - 1,
    playbackStatus
  };
}

export default connect(mapStateToProps)(PlaybackControls);
