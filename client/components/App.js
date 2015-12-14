import React, { Component } from 'react';

import AssetController from './AssetController';
import PlaybackControlsContainer from '../containers/PlaybackControlsContainer';

export default class App extends Component {
  render() {
    return (
      <div>
        <PlaybackControlsContainer />
        <AssetController />
      </div>
    );
  }
}
