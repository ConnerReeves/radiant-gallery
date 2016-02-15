import React, { Component } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import DirectoryNavigation from 'components/DirectoryNavigation';
import { getDirectory } from 'reducers/DirectoryReducer';

export class DirectoryNavigationContainer extends Component {
  state = {
    expandedPaths: Immutable.Set(['']),
    selectedPaths: Immutable.Set([]),
    visible: false
  }

  render() {
    const props = {
      directory: this.props.directory,
      expandedPaths: this.state.expandedPaths.toJS(),
      selectedPaths: this.state.selectedPaths.toJS(),
      onSelectionToggle: this._onSelectionToggle.bind(this),
      onToggleTriggerClick: this._onToggleTriggerClick.bind(this),
      onCloseDirectoryNavigationClick: this._setDirectoryNavigationVisibility.bind(this, false),
      onShowDirectoryNavigationClick: this._setDirectoryNavigationVisibility.bind(this, true),
      visible: this.state.visible
    };

    return (
      <DirectoryNavigation { ...props } />
    );
  }

  _onSelectionToggle(path) {
    const isSelected = this.state.selectedPaths.has(path);
    const selectedPaths = this.state.selectedPaths
                          .filterNot((selectedPath) => selectedPath.startsWith(path))
                          [isSelected ? 'delete' : 'add'](path);

    this.setState({ selectedPaths });
  }

  _onToggleTriggerClick(path) {
    const isExpanded = this.state.expandedPaths.has(path);
    const expandedPaths = this.state.expandedPaths[isExpanded ? 'delete': 'add'](path);
    this.setState({ expandedPaths });
  }

  _setDirectoryNavigationVisibility(visible) {
    this.setState({ visible });
  }
}

const mapStateToProps = (state) => ({
  directory: getDirectory(state)
});

export default connect(mapStateToProps)(DirectoryNavigationContainer);
