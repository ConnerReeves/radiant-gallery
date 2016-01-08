import React, { Component } from 'react';
import { connect } from 'react-redux';

import App from 'components/App';
import { fetchDirectory, fetchManifest } from 'actions/FetchActions';
import { onKeyPress } from 'actions/KeypressActions';
import { onMouseIdle, onMouseMove } from 'actions/MouseActions';
import { setViewportSize } from 'actions/ViewportActions';

let mouseIdleTimeout;

export class AppContainer extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this._onKeyDown.bind(this));
    document.addEventListener('mousemove', this._onMouseMove.bind(this));
    window.addEventListener('resize', this._onWindowResize.bind(this));
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
    document.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('resize', this._onWindowResize);
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

  _onMouseMove() {
    this.props.dispatch(onMouseMove());
    clearTimeout(mouseIdleTimeout);
    mouseIdleTimeout = setTimeout(() => {
      this.props.dispatch(onMouseIdle());
    }, 3000);
  }

  _onWindowResize() {
    this.props.dispatch(setViewportSize({
      height: window.innerHeight,
      width: window.innerWidth
    }));
  }
}

export const mapStateToProps = (state) => ({ directory: state.directory });

export default connect(mapStateToProps)(AppContainer);
