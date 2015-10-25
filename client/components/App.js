import React, { Component } from 'react';

import AssetController from './AssetController';
import PlaybackControls from './PlaybackControls';

export default class App extends Component {
  render() {
    return (
      <div>
        <PlaybackControls />
        <AssetController />
      </div>
    );
  }
}
