import React, { Component } from 'react'
import { connect } from 'react-redux';

import Image from './Image';

class AssetController extends Component {
  render() {
    return (
      <Image src={ this.props.currentAsset } />
    );
  }
}

export default connect(state => ({
  currentAsset: state.currentAsset
}))(AssetController);
