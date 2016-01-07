import React, { Component, PropTypes } from 'react';

export default class Video extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired
  };

  render() {
    const videoProps = {
      autoPlay: true,
      height: this.props.height,
      key: this.props.src,
      muted: true,
      onEnded: this.props.onEnded,
      onPlay: this.props.onPlay,
      width: this.props.width
    };

    return (
      <video { ...videoProps }>
        <source src={ this.props.src } type={ this._getVideoType() } />
      </video>
    );
  }

  _getVideoType() {
    const pathParts = this.props.src.split('.');
    return `video/${ pathParts[pathParts.length - 1] }`;
  }
}
