import React, { Component, PropTypes } from 'react';

import Icon from './Icon';

require('styles/frequency-control.scss');

export default class FrequencyControl extends Component {
  static propTypes = {
    frequency: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="frequency-control">
        <Icon name="clock-o" />
        <select onChange={ this.props.onChange } value={ this.props.frequency }>
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
