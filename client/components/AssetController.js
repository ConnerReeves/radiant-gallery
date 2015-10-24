import React from 'react';
import Image from './Image';

module.exports = React.createClass({
  getInitialState() {
    return {
      currentAssetIndex: 0
    };
  },

  componentDidMount() {
    setInterval(() => {
      this.setState({
        currentAssetIndex: this.state.currentAssetIndex === assets.length - 1 ? 0 : this.state.currentAssetIndex + 1
      });
    }, 3000);
  },

  render() {
    return <Image src={ assets[this.state.currentAssetIndex] } />;
  }
});
