import React, { Component, PropTypes } from 'react';

const imgStyles = {
  left: '50%',
  maxHeight: '100%',
  maxWidth: '100%',
  position: 'fixed',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  transition: 'opacity 1.5s ease-in-out'
};

export default class Image extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired
  };

  state = { opacityToggle: true };

  componentWillReceiveProps(newProps) {
    if (this.props.src !== newProps.src) {
      this._transitionImages();
    }
  }

  render() {
    const introStyle = { opacity: this.state.opacityToggle ? 1 : 0, ...imgStyles };
    const outroStyle = { opacity: this.state.opacityToggle ? 0 : 1, ...imgStyles };

    return (
      <div>
        { this._getImg(this.props.src, introStyle) }
        { this._getImg(this.state.staleSrc, outroStyle) }
      </div>
    );
  }

  _transitionImages() {
    this.setState({
      opacityToggle: false,
      staleSrc: this.props.src
    }, () => {
      setImmediate(() => {
        this.setState({ opacityToggle: true });
      });
    });
  }

  _getImg(src, style) {
    const imgProps = { key: src, src, style };
    return src ? <img { ...imgProps } /> : null;
  }
}
