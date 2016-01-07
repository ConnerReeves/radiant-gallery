import React, { Component } from 'react';

import AssetControllerContainer from 'containers/AssetControllerContainer';
import PlaybackControlsContainer from 'containers/PlaybackControlsContainer';
import DirectoryNavigationContainer from 'containers/DirectoryNavigationContainer';

require('styles/app.scss');

export default class App extends Component {
  render() {
    if (this.props.finalPathChosen) {
      return (
        <div>
          <PlaybackControlsContainer />
          <AssetControllerContainer />
        </div>
      );
    } else {
      return (
        <div>
          <DirectoryNavigationContainer />
        </div>
      );
    }
  }
}
