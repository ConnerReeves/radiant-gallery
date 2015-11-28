import React, { Component } from 'react';
import path from 'path';
import { connect } from 'react-redux';

import Image from './Image';
import Video from './Video';

class AssetController extends Component {
  render() {
    console.log(this.props.currentAsset);
    switch (this._getCurrentAssetType()) {
      case 'image':
        return <Image src={ this.props.currentAsset } />;

      case 'video':
        return <Video src={ this.props.currentAsset } />;
    }

    return null;
  }

  _getCurrentAssetType() {
    switch (path.extname(this.props.currentAsset)) {
      case '.jpg':
        return 'image';
      case '.mp4':
        return 'video';
    }
  }
}

export default connect(state => ({
  currentAsset: state.currentAsset
}))(AssetController);
