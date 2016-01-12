import React, { Component } from 'react';
import { connect } from 'react-redux';

import FadingControls from 'components/FadingControls';
import { isMouseIdle } from 'reducers/MouseReducer';

export default class FadingControlsContainer extends Component {
  render() {
    return (
      <FadingControls show={ this.props.show } />
    );
  }
}

const mapStateToProps = (state) => ({
  show: !isMouseIdle(state)
});

export default connect(mapStateToProps)(FadingControlsContainer);
