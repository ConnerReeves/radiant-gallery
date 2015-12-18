import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

import ControlButtonContainer from '../containers/ControlButtonContainer';
import FrequencyControlContainer from '../containers/FrequencyControlContainer';
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

export default class PlaybackControls extends Component {
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
    const backButtonProps = {
      action: () => previousAsset(this.props.maxAssetIndex),
      disabled: false,
      icon: 'backward'
    };

    const playbackToggleButtonProps = {
      action: () => togglePlayback(),
      icon: this._getPlaybackToggleIcon(),
      disabled: isVideo(this.props.currentAssetPath)
    };

    const forwardButtonProps = {
      action: () => nextAsset(this.props.maxAssetIndex),
      disabled: false,
      icon: 'forward'
    };

    return (
      <div style={ Object.assign({}, leftContainerSytles, { opacity: this.state.opacity }) }>
        <ControlButtonContainer { ...backButtonProps } />
        <ControlButtonContainer { ...playbackToggleButtonProps } />
        <ControlButtonContainer { ...forwardButtonProps } />
      </div>
    );
  }

  _getFrequencyControls() {
    return isVideo(this.props.currentAssetPath) ? null : (
      <div style={ Object.assign({}, rightContainerSytles, { opacity: this.state.opacity }) }>
        <FrequencyControlContainer />
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
