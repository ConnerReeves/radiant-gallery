import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { getAssetType } from 'utils/AppUtils';
import Image from './Image';
import VideoContainer from 'containers/VideoContainer';

require('styles/asset-controller.scss');

export default class AssetController extends Component {
  static propTypes = {
    currentAsset: PropTypes.object
  };

  render() {
    if (this.props.currentAsset) {
      const assetPath = this.props.currentAsset.path;
      const props = { key: assetPath, src: assetPath };

      const assetComponent = {
        image: <Image { ...props } />,
        video: <VideoContainer { ...props } />
      }[getAssetType(assetPath)] || null;

      const transitionGroupProps = {
        children: assetComponent,
        component: 'div',
        transitionEnterTimeout: 2000,
        transitionLeaveTimeout: 2000,
        transitionName: 'asset',
      };

      return (
        <ReactCSSTransitionGroup { ...transitionGroupProps } />
      );
    }

    return null;
  }
}
