import React, { Component } from 'react';

import DirectoryNavigationContainer from 'containers/DirectoryNavigationContainer';
import AssetControllerContainer from 'containers/AssetControllerContainer';
import FadingControlsContainer from 'containers/FadingControlsContainer';

require('styles/app.scss');

export default class App extends Component {
  //<FadingControlsContainer />
  //<AssetControllerContainer />
  render() {
    return (
      <div>
        <DirectoryNavigationContainer />
      </div>
    );
  }
}
