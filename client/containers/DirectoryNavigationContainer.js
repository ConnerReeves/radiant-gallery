import React, { Component } from 'react';
import { connect } from 'react-redux';

import DirectoryNavigation from 'components/DirectoryNavigation';
import { getDirectory } from 'reducers/DirectoryReducer';

export class DirectoryNavigationContainer extends Component {
  render() {
    return (
      <DirectoryNavigation directory={ this.props.directory } />
    );
  }
}

const mapStateToProps = (state) => ({
  directory: getDirectory(state)
});

export default connect(mapStateToProps)(DirectoryNavigationContainer);
