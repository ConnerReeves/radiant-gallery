import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { PAUSED, PLAYING } from '../constants/PlaybackStatuses';
import Icon from './Icon';

const controlButtonStyles = {
  color: 'white',
  fontSize: '18px',
  textAlign: 'center',
  textShadow: '3px 0 5px #000',
  WebkitUserSelect: 'none',
  width: '33px'
};

const enabledControlButtonStyles = { opacity: 0.6, cursor: 'pointer', ...controlButtonStyles };
const disabledControlButtonStyles = { opacity: 0.1, ...controlButtonStyles };

class ControlButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    icon: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  };

  render() {
    const iconProps = {
      disabled: this.props.disabled,
      name: this.props.icon,
      onClick: !this.props.disabled && bindActionCreators(this.props.action, this.props.dispatch) || () => {},
      style: this.props.disabled ? disabledControlButtonStyles : enabledControlButtonStyles
    };

    return (
      <Icon { ...iconProps } />
    );
  }
}

export default connect(state => state)(ControlButton);
