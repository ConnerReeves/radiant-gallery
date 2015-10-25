import React, { Component } from 'react';

export default class Icon extends Component {
  render() {
    const iconProps = Object.assign({}, this.props, {
      className: `fa fa-${this.props.name}`
    });

    return (
      <i { ...iconProps }></i>
    );
  }
}

Icon.propTypes = {
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func
};
