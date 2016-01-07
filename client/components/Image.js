import React, { Component, PropTypes } from 'react';

require('styles/image.scss');

export default class Image extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired
  };

  render() {
    const imgProps = {
      className: 'image',
      src: this.props.src
    };

    return (
      <img { ...imgProps } />
    );
  }
}
