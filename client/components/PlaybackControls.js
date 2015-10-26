import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

import ControlButton from './ControlButton';
import FrequencyControl from './FrequencyControl';

import { PAUSED, PLAYING } from '../constants/PlaybackStatuses';
import { nextAsset, togglePlayback, previousAsset } from '../actions/PlaybackActions';

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
        <div style={ Object.assign({}, leftContainerSytles, { opacity: this.state.opacity }) }>
          <ControlButton icon="backward" action= { previousAsset } />
          <ControlButton icon={ this._getPlaybackToggleIcon() } action={ togglePlayback } />
          <ControlButton icon="forward" action= { nextAsset } />
        </div>
        <div style={ Object.assign({}, rightContainerSytles, { opacity: this.state.opacity }) }>
          <FrequencyControl />
        </div>
      </div>
    );
  }

  _getPlaybackToggleIcon() {
    switch (this.props.playbackStatus) {
      case PAUSED:
        return 'play';

      case PLAYING:
        return 'pause';
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

export default connect(state => ({
  playbackStatus: state.playbackStatus
}))(PlaybackControls);
