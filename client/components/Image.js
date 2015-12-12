import React, { Component } from 'react';

const imgStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  maxWidth: '100%',
  maxHeight: '100%',
  transform: 'translate(-50%, -50%)',
  transition: 'opacity 1s ease-in-out'
};

export default class Image extends Component {
  static propTypes = {
    src: React.PropTypes.string.isRequired
  };

  state = { opacityToggle: true };

  componentWillReceiveProps(newProps) {
    if (this.props.src !== newProps.src) {
      this.setState({
        opacityToggle: false,
        staleSrc: this.props.src
      }, () => {
        setImmediate(() => {
          this.setState({ opacityToggle: true });
        });
      });
    }
  }

  render() {
    const introStyle = Object.assign({}, imgStyles, { opacity: this.state.opacityToggle ? 1 : 0 });
    const outroStyle = Object.assign({}, imgStyles, { opacity: this.state.opacityToggle ? 0 : 1 });

    return (
      <div>
        { this._getImg(this.props.src, introStyle) }
        { this._getImg(this.state.staleSrc, outroStyle) }
      </div>
    );
  }

  _getImg(src, style) {
    const imgProps = { key: src, src, style };
    return src ? <img { ...imgProps } /> : null;
  }
}
