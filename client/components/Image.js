import React, { Component } from 'react';

const imgStyle = {
  bottom: '-50%',
  height: 'auto',
  left:'-50%',
  margin: 'auto',
  maxHeight: '100%',
  maxWidth: '100%',
  minHeight: '100%',
  minWidth: '100%',
  position: 'absolute',
  right: '-50%',
  top: '-50%',
  transition: 'opacity 2.5s ease-in-out',
  width: 'auto'
};

export default class Image extends Component {
  constructor() {
    super();
    this.state = { opacityToggle: true };
  }

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
    const introStyle = Object.assign({}, imgStyle, { opacity: this.state.opacityToggle ? 1 : 0 });
    const outroStyle = Object.assign({}, imgStyle, { opacity: this.state.opacityToggle ? 0 : 1 });

    return (
      <div>
        { this._getImgTag(this.props.src, introStyle) }
        { this._getImgTag(this.state.staleSrc, outroStyle) }
      </div>
    );
  }

  _getImgTag(src, style) {
    return src ? <img key={ src } src={ src } style={ style } /> : null;
  }
};

Image.propTypes = {
  src: React.PropTypes.string.isRequired
};
