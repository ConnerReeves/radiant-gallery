import React, { Component } from 'react';
import { connect } from 'react-redux';

import AssetController from './AssetController';

export default class App extends Component {
  render() {
    return (
      <AssetController />
    )
  }
};
