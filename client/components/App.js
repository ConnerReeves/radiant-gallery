import React, { Component } from 'react';

import AssetControllerContainer from 'containers/AssetControllerContainer';
import FadingControlsContainer from 'containers/FadingControlsContainer';

require('styles/app.scss');

export default class App extends Component {
  render() {
    return (
      <div>
        <AssetControllerContainer />
        <FadingControlsContainer />
      </div>
    );
  }
}
