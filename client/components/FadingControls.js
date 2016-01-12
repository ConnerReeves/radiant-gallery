import React, { Component } from 'react';

import PlaybackControlsContainer from 'containers/PlaybackControlsContainer';
import FrequencyControlContainer from 'containers/FrequencyControlContainer';

require('styles/fading-controls.scss');

export default class FadingControls extends Component {
  render() {
    return (
      <div className="fading-controls" style={{ opacity: this.props.show ? 1 : 0 }}>
        <PlaybackControlsContainer />
        <FrequencyControlContainer />
      </div>
    );
  }
}
