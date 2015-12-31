import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import Icon from './Icon';
import FrequencyControlContainer from 'containers/FrequencyControlContainer';
import { PLAYING } from 'constants/PlaybackStatuses';
import { isVideo } from 'utils/AppUtils';

const containerStyles = { transition: 'opacity 0.5s ease-in-out' };
const leftStyles = { top: '10px', left: '10px', position: 'fixed', zIndex: 1 };
const rightStyles = { top: '10px', right: '10px', position: 'fixed', zIndex: 1 };

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
      <div style={{ opacity: this.state.opacity, ...containerStyles }}>
        { this._getPlaybackControls() }
        { this._getFrequencyControls() }
      </div>
    );
  }

  _getPlaybackControls() {
    const playbackToggleButtonProps = {
      disabled: isVideo(this.props.currentAssetPath),
      name: this._getPlaybackToggleIcon(),
      onClick: this.props.onTogglePlaybackButtonClick,
      style: { width: '40px' }
    };

    return (
      <div style={ leftStyles }>
        <Icon name="backward" onClick={ this.props.onBackButtonClick } />
        <Icon { ...playbackToggleButtonProps } />
        <Icon name="forward" onClick={ this.props.onForwardButtonClick } />
      </div>
    );
  }

  _getFrequencyControls() {
    return isVideo(this.props.currentAssetPath) ? null : (
      <div style={ rightStyles }>
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
