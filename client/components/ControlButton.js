import React, { Component, PropTypes } from 'react';

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

export default class ControlButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const iconProps = {
      disabled: this.props.disabled,
      name: this.props.icon,
      onClick: this.props.onClick,
      style: this.props.disabled ? disabledControlButtonStyles : enabledControlButtonStyles
    };

    return (
      <Icon { ...iconProps } />
    );
  }
}
