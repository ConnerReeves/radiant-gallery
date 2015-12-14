import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setFrequency } from '../actions/PlaybackActions';
import Icon from './Icon';

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

class FrequencyControl extends Component {
  render() {
    const iconProps = {
      name: 'clock-o',
      style: iconStyles
    };

    const selectProps = {
      onChange: this._setFrequency.bind(this),
      style: selectStyles,
      value: this.props.frequency
    };

    return (
      <div style={ containerStyles }>
        <Icon { ...iconProps } />
        <select { ...selectProps }>
          <option value={ 5000 }>5 Seconds</option>
          <option value={ 10000 }>10 Seconds</option>
          <option value={ 30000 }>30 Seconds</option>
          <option value={ 60000 }>1 Minute</option>
          <option value={ 300000 }>5 Minutes</option>
          <option value={ 600000 }>10 Minutes</option>
        </select>
      </div>
    );
  }

  _setFrequency(event) {
    const boundAction = bindActionCreators(setFrequency, this.props.dispatch);
    boundAction(+event.target.value);
  }
}

export default connect(state => ({
  frequency: state.frequency
}))(FrequencyControl);
