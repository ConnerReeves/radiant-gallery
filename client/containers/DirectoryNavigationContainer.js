import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DirectoryNavigation from 'components/DirectoryNavigation';
import { previousDirectory } from 'actions/KeypressActions';

class DirectoryNavigationContainer extends Component {
  static propTypes = { currentPath: PropTypes.string };

  render() {
    const { directory } = this.props;

    const props = {
      currentPath: directory.currentPath,
      currentPathChildren: directory.currentPathChildren,
      selectedChildPathIndex: directory.selectedChildPathIndex
    };

    return <DirectoryNavigation { ...props } />;
  }
}

const mapStateToProps = (state) => ({ directory: state.directory });

export default connect(mapStateToProps)(DirectoryNavigationContainer);
