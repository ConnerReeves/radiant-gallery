import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Icon from 'components/Icon';

require('styles/directory-navigation.scss');

export default class DirectoryNavigation extends Component {
  static propTypes = {
    directory: PropTypes.object.isRequired,
    expandedPaths: PropTypes.array.isRequired,
    onCloseDirectoryNavigationClick: PropTypes.func.isRequired,
    onShowDirectoryNavigationClick: PropTypes.func.isRequired,
    onSelectionToggle: PropTypes.func.isRequired,
    onToggleTriggerClick: PropTypes.func.isRequired,
    selectedPaths: PropTypes.array.isRequired,
    visible: PropTypes.bool.isRequired
  };

  render() {
    const className = classNames({
      'directory-navigation': true,
      'visible': this.props.visible
    });

    return (
      <div className={ className }>
        { this.props.visible ? null : <Icon name="bars" onClick={ this.props.onShowDirectoryNavigationClick } /> }
        <div className="header">
          <span>Filter Media Directories</span>
          <Icon name="close" onClick={ this.props.onCloseDirectoryNavigationClick } />
        </div>
        <div className="directory">
          { this._getDirectory() }
        </div>
      </div>
    );

  }

  _getDirectory(path = '') {
    const pathChildren = this.props.directory[path];
    const isExpandable = pathChildren && pathChildren.length > 0;
    const isExpanded = this.props.expandedPaths.indexOf(path) > -1;

    const pathParts = path.split('/');
    const depth = pathParts.length - 2;
    const nodeName = pathParts[pathParts.length - 1];

    const directoryItem = path ? (
      <div className="directory-item">
        { this._getToggleIcon({ depth, isExpandable, isExpanded, path }) }
        { this._getCheckbox({ path }) }
        { nodeName }
      </div>
    ) : null;

    const childContainerStyles = Object.assign({
      transition: 'max-height 0.25s, opacity 0.25s ease-in',
      overflow: 'visible',
      opacity: 1
    }, !isExpanded ? {
      maxHeight: 0,
      overflow: 'hidden',
      opacity: 0
    } : {
      maxHeight: pathChildren && pathChildren.length * 20 || 0
    });

    return (
      <div key={ path }>
        { directoryItem }
        <div style={ childContainerStyles }>
          { this._getChildDirectory(path, pathChildren) }
        </div>
      </div>
    );
  }

  _getCheckbox({ path }) {
    const isSelected = this.props.selectedPaths.indexOf(path) > -1;

    const pathParts = path.split('/');
    const props = pathParts.reduce((props, pathPart, pathPartIndex) => {
      const subPath = pathParts.slice(0, pathPartIndex).join('/');

      if (this.props.selectedPaths.indexOf(subPath) > -1) {
        props.checked = true;
        props.disabled = true;
      }

      return props;
    }, {
      type: 'checkbox',
      checked: this.props.selectedPaths.indexOf(path) > -1,
      onChange: this.props.onSelectionToggle.bind(this, path)
    });

    return (
      <input { ...props } />
    );
  }

  _getToggleIcon({ depth, isExpandable, isExpanded, path }) {
    const props = {
      name: isExpandable ? (isExpanded ? 'minus-square-o' : 'plus-square-o' ) : 'blank',
      onClick: isExpandable ? this.props.onToggleTriggerClick.bind(this, path) : undefined,
      style: {
        fontSize: 15,
        marginLeft: depth * 20,
        opacity: 1
      }
    };

    return (
      <Icon { ...props } />
    );
  }

  _getChildDirectory(path, children) {
    return children && children.map((child) => {
      const childPath = `${path}/${child}`;
      return this._getDirectory(childPath);
    }) || null;
  }
}
