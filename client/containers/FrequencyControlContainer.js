import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FrequencyControl from '../components/FrequencyControl';
import { setFrequency } from '../actions/PlaybackActions';

const containerStyles = {
  opacity: 0.6
};

const iconStyles = {
  color: 'white',
  fontSize: '18px',
  textShadow: '3px 0 5px #000',
  verticalAlign: 'middle',
  WebkitUserSelect: 'none'
};

const selectStyles = {
  background: '#FFF',
  border: 'none',
  borderRadius: '3px',
  boxShadow: '0 0 10px 1px #000',
  height: '20px',
  marginLeft: '10px',
  padding: '0 5px',
  width: '90px'
};

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
