import React, { Component, PropTypes } from 'react';

const HEAVY_ASTERISK = '✱';

require('styles/directory-navigation.scss');

export default class DirectoryNavigation extends Component {
  static propTypes = {
    currentPath: PropTypes.string,
    currentPathChildren: PropTypes.array,
    onPathClick: PropTypes.func,
    selectedChildPathIndex: PropTypes.number
  };

  render() {
    return (
      <div className="directory-navigation">
        <div className="current-path">{ `${this.props.currentPath}/` }</div>
        <div className="path-options">
          { this._getAsterisk() }
          { this._getPathChildren() }
        </div>
      </div>
    );
  }

  _getAsterisk() {
    const className = this.props.selectedChildPathIndex === null ? 'active' : '';
    return <div className={ className }>{ HEAVY_ASTERISK }</div>;
  }

  _getPathChildren() {
    return this.props.currentPathChildren.map((child, index) => {
      const className = this.props.selectedChildPathIndex === index ? 'active' : '';
      return <div key={ child } className={ className }>{ child }</div>;
    });
  }
}
