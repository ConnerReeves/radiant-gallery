import React, { Component, PropTypes } from 'react';

export default class Icon extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    style: PropTypes.object
  };

  render() {
    const iconProps = Object.assign({}, this.props, {
      className: `fa fa-${this.props.name}`,
    });

    const iconStyle = {
      color: 'white',
      cursor: this.props.onClick ? 'pointer' : 'default',
      fontSize: '18px',
      opacity: this.props.disabled ? 0.1 : 0.6,
      textAlign: 'center',
      textShadow: '3px 0 5px #000',
      WebkitUserSelect: 'none',
      ...this.props.style
    };

    return (
      <i { ...iconProps } style={ iconStyle }></i>
    );
  }
}
