import React, { Component } from 'react';

import AssetControllerContainer from 'containers/AssetControllerContainer';
import PlaybackControlsContainer from 'containers/PlaybackControlsContainer';

require('styles/app.scss');

export default class App extends Component {
  render() {
    return (
      <div>
        <AssetControllerContainer />
        <PlaybackControlsContainer />
      </div>
    );
  }
}
