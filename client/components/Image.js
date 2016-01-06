import React, { Component, PropTypes } from 'react';

const imgStyles = {
  left: '50%',
  maxHeight: '100%',
  maxWidth: '100%',
  position: 'fixed',
  top: '50%',
  transform: 'translate(-50%, -50%)'
};

export default class Image extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired
  };

  render() {
    const imgProps = {
      src: this.props.src,
      style: imgStyles
    };

    return (
      <img { ...imgProps } />
    );
  }
}
