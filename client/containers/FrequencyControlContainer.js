import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FrequencyControl from 'components/FrequencyControl';
import Focusable from 'components/Focusable';
import { getFrequency } from 'reducers/PlaybackReducer';
import { setFrequency } from 'actions/PlaybackActions';

class FrequencyControlContainer extends Component {
  static propTypes = {
    frequency: PropTypes.number.isRequired
  };

  render() {
    const props = {
      frequency: this.props.frequency,
      onChange: this._onFrequencyChange.bind(this)
    };

    return (
      <FrequencyControl { ...props } />
    );
  }

  _onFrequencyChange(event) {
    const newFrequency = +event.target.value;
    this.props.setFrequency(newFrequency);
  }
}

const mapStateToProps = (state) => ({
  frequency: getFrequency(state)
});

const mapDispatchToProps = {
  setFrequency
};

const FocusableFrequencyControlContainer = Focusable(FrequencyControlContainer);
export default connect(mapStateToProps, mapDispatchToProps)(FocusableFrequencyControlContainer);
