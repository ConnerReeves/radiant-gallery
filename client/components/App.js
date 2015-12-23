import React, { Component } from 'react';

import AssetControllerContainer from 'containers/AssetControllerContainer';
import PlaybackControlsContainer from 'containers/PlaybackControlsContainer';

export default class App extends Component {
  render() {
    return (
      <div>
        <PlaybackControlsContainer />
        <AssetControllerContainer />
      </div>
    );
  }
}
