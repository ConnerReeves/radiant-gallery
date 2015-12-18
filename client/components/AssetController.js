import React, { Component } from 'react';

import { getAssetType } from '../utils/AppUtils';
import Image from './Image';
import VideoContainer from '../containers/VideoContainer';

export default class AssetController extends Component {
  render() {
    if (this.props.currentAsset) {
      const assetPath = this.props.currentAsset.path;
      const props = { src: assetPath };

      return {
        image: <Image { ...props } />,
        video: <VideoContainer { ...props } />
      }[getAssetType(assetPath)] || null;
    }

    return null;
  }
}
