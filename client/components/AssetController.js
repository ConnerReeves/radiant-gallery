import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { nextAsset } from '../actions/NavigationActions'; //TODO: Move into navigation controls

import Image from './Image';

class AssetController extends Component {
  componentDidMount() {
    setInterval(bindActionCreators(nextAsset, this.props.dispatch), 5000);
  }

  render() {
    return <Image src={ this.props.currentAsset } />;
  }
}

export default connect(state => ({
  currentAsset: state.currentAsset
}))(AssetController);
