import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { PAUSED, PLAYING } from '../constants/PlaybackStatuses';
import Icon from './Icon';

const controlButtonStyles = {
  color: 'white',
  cursor: 'pointer',
  fontSize: '18px',
  opacity: 0.6,
  textAlign: 'center',
  textShadow: '3px 0 5px #000',
  WebkitUserSelect: 'none',
  width: '33px'
};

class ControlButton extends Component {
  static propTypes = {
    icon: React.PropTypes.string.isRequired,
    action: React.PropTypes.func.isRequired
  };

  render() {
    const iconProps = {
      name: this.props.icon,
      onClick: bindActionCreators(this.props.action, this.props.dispatch),
      style: controlButtonStyles
    };

    return (
      <Icon { ...iconProps } />
    );
  }
}

export default connect(state => state)(ControlButton);
