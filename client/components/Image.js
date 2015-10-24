import React from 'react';

const imgStyles = {
  minHeight: '100%',
  minWidth: '100%',
  maxHeight: '100%',
  maxWidth: '100%',
  height: 'auto',
  width: 'auto',
  position: 'absolute',
  top: '-50%',
  bottom: '-50%',
  left:'-50%',
  right: '-50%',
  margin: 'auto'
};

module.exports = React.createClass({
  propTypes: {
    src: React.PropTypes.string.isRequired
  },

  render() {
    return <img src={ this.props.src } style={ imgStyles } />;
  }
});
