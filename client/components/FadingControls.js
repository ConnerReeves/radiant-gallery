import React, { Component } from 'react';

import PlaybackControlsContainer from 'containers/PlaybackControlsContainer';
import FrequencyControlContainer from 'containers/FrequencyControlContainer';

require('styles/fading-controls.scss');

export default class FadingControls extends Component {
  state = { focus: false };

  render() {
    const focusProps = {
      onBlur: this._onControlBlur.bind(this),
      onFocus: this._onControlFocus.bind(this)
    };

    return (
      <div className="fading-controls" style={{ opacity: this.props.show || this.state.focus ? 1 : 0 }}>
        <PlaybackControlsContainer { ...focusProps } />
        <FrequencyControlContainer { ...focusProps } />
      </div>
    );
  }

  _onControlFocus() {
    this.setState({ focus: true });
  }

  _onControlBlur() {
    this.setState({ focus: false });
  }
}
