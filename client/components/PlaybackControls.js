import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { PAUSED, PLAYING } from '../constants/PlaybackStatuses';
import Icon from './Icon';
import { nextAsset, togglePlayback, previousAsset } from '../actions/PlaybackActions';

const containerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  position: 'fixed',
  top: '10px',
  left: '10px',
  transition: 'opacity 0.5s ease-in-out',
  width: '100px',
  zIndex: 1
};

const controlButtonStyles = {
  color: 'white',
  cursor: 'pointer',
  fontSize: '18px',
  marginRight: '10px',
  opacity: 0.5,
  textShadow: '3px 0 5px #000',
  WebkitUserSelect: 'none',
};

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
      <div style={ Object.assign({}, containerStyles, { opacity: this.state.opacity }) }>
        { this._getControlButton('backward', previousAsset) }
        { this._getPlayPauseControl() }
        { this._getControlButton('forward', nextAsset) }
      </div>
    );
  }

  _getControlButton(name, action) {
    const iconProps = {
      name,
      onClick: bindActionCreators(action, this.props.dispatch),
      style: controlButtonStyles
    };

    return (
      <Icon { ...iconProps } />
    );
  }

  _getPlayPauseControl() {
    switch (this.props.playbackStatus) {
      case PLAYING:
        return this._getControlButton('pause', togglePlayback);

      case PAUSED:
        return this._getControlButton('play', togglePlayback);

      default:
        return null;
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
