import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { PAUSED, PLAYING } from '../constants/PlaybackStatuses';
import Icon from './Icon';
import { nextAsset, pause, play, previousAsset } from '../actions/NavigationActions';

const containerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  position: 'fixed',
  top: '10px',
  left: '10px',
  width: '100px',
  zIndex: 1
};

const controlButtonStyles = {
  color: 'white',
  cursor: 'pointer',
  fontSize: '20px',
  marginRight: '10px',
  opacity: 0.5,
  textShadow: '3px 0 5px #000',
  WebkitUserSelect: 'none',
};

class PlaybackControls extends Component {
  render() {
    return (
      <div style={ containerStyles }>
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
        return this._getControlButton('pause', pause);

      case PAUSED:
        return this._getControlButton('play', play);

      default:
        return null;
    }
  }
}

export default connect(state => ({
  playbackStatus: state.playbackStatus
}))(PlaybackControls);
