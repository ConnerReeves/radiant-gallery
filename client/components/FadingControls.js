import React, { Component } from 'react';

import Focusable from 'Focusable';
import PlaybackControlsContainer from 'containers/PlaybackControlsContainer';
import FrequencyControlContainer from 'containers/FrequencyControlContainer';

require('styles/fading-controls.scss');

export default class FadingControls extends Component {
  state = { focus: false };

  render() {
    return (
      <div className="fading-controls" style={{ opacity: this.props.show || this.state.focus ? 1 : 0 }}>
        { this._getFocusable(<PlaybackControlsContainer />) }
        { this._getFocusable(<FrequencyControlContainer />) }
      </div>
    );
  }

  _getFocusable(element) {
    return (
      <Focusable onBlur={ this._onBlur.bind(this) } onFocus={ this._onFocus.bind(this) }>
        { element }
      </Focusable>
    );
  }

  _onFocus() {
    this.setState({ focus: true });
  }

  _onBlur() {
    this.setState({ focus: false });
  }
}
