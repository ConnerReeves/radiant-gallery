import React, { Component, PropTypes } from 'react';

import Icon from './Icon';

const containerStyles = {
  display: 'flex',
  alignItems: 'center',
  opacity: 0.6
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

export default class FrequencyControl extends Component {
  static propTypes = {
    frequency: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const selectProps = {
      onChange: this.props.onChange,
      style: selectStyles,
      value: this.props.frequency
    };

    return (
      <div style={ containerStyles }>
        <Icon name="clock-o" />
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
}
