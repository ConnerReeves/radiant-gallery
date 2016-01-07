import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

require('styles/directory-navigation.scss');

export default class DirectoryNavigation extends Component {
  static previousPathOptionsScrollPosition = 0;

  static propTypes = {
    currentPath: PropTypes.string,
    currentPathChildren: PropTypes.array,
    onPathClick: PropTypes.func,
    selectedChildPathIndex: PropTypes.number
  };

  render() {
    return (
      <div className="directory-navigation">
        <div className="current-path">
          { this.props.currentPath }
        </div>
        <div className="path-options">
          { this._getPathChildren() }
        </div>
        <div className="fade-mask" />
      </div>
    );
  }

  _getPathChildren() {
    const pathChildren = this.props.currentPathChildren.map((child, index) => {
      const className = this.props.selectedChildPathIndex === index ? 'active' : '';
      return <div key={ child } className={ className }>{ this._truncateText(child) }</div>;
    });

    return pathChildren.slice(this.props.selectedChildPathIndex, pathChildren.length).concat(pathChildren.slice(0, this.props.selectedChildPathIndex));
  }

  _truncateText(text) {
    return text.length > 20 ? `${text.substring(0, 19)}...` : text;
  }
}
