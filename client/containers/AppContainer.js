import React, { Component } from 'react';
import { connect } from 'react-redux';

import App from 'components/App';
import { fetchDirectory, fetchManifest } from 'actions/FetchActions';
import { onKeyPress } from 'actions/KeypressActions';

export class AppContainer extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this._onKeyDown.bind(this));
    this.props.dispatch(fetchDirectory());
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.directory.finalPath) {
      if (this.props.directory.currentPath !== newProps.directory.currentPath) {
        this.props.dispatch(fetchDirectory(newProps.directory.currentPath));
      }

      if (newProps.directory.finalPath) {
        this.props.dispatch(fetchManifest(newProps.directory.finalPath));
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._onKeyDown);
  }

  render() {
    const props = { finalPathChosen: this.props.directory.finalPath };

    return (
      <App { ...props } />
    );
  }

  _onKeyDown({ keyCode }) {
    this.props.dispatch(onKeyPress(keyCode));
  }
}

export const mapStateToProps = (state) => ({ directory: state.directory });

export default connect(mapStateToProps)(AppContainer);
