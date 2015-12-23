import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FrequencyControl from 'components/FrequencyControl';
import { setFrequency } from 'actions/PlaybackActions';

class FrequencyControlContainer extends Component {
  static propTypes = {
    frequency: PropTypes.number.isRequired
  };

  render() {
    const props = {
      onChange: this._onFrequencyChange.bind(this)
    };

    return (
      <FrequencyControl { ...props } />
    );
  }

  _onFrequencyChange(event) {
    const newFrequency = +event.target.value;
    this.props.dispatch(setFrequency(newFrequency));
  }
}

const mapStateToProps = (state) => ({ frequency: state.frequency });
export default connect(mapStateToProps)(FrequencyControlContainer);
