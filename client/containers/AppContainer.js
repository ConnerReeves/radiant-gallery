import React, { Component } from 'react';
import { connect } from 'react-redux';

import App from 'components/App';
import { fetchManifest } from 'actions/FetchActions';
import { fetchDirectory } from 'actions/FetchActions';
import { onKeyPress } from 'actions/KeypressActions';
import { onMouseIdle, onMouseMove } from 'actions/MouseActions';
import { setViewportSize } from 'actions/ViewportActions';

let mouseIdleTimeout;

export class AppContainer extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this._onKeyDown.bind(this));
    document.addEventListener('mousemove', this._onMouseMove.bind(this));
    window.addEventListener('resize', this._onWindowResize.bind(this));
    this.props.fetchDirectory();
    this.props.fetchManifest();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._onKeyDown);
    document.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('resize', this._onWindowResize);
  }

  render() {
    return (
      <App />
    );
  }

  _onKeyDown({ keyCode }) {
    this.props.onKeyPress(keyCode);
  }

  _onMouseMove() {
    this.props.onMouseMove();
    clearTimeout(mouseIdleTimeout);
    mouseIdleTimeout = setTimeout(() => {
      this.props.onMouseIdle();
    }, 3000);
  }

  _onWindowResize() {
    this.props.setViewportSize({
      height: window.innerHeight,
      width: window.innerWidth
    });
  }
}

const mapDispatchToProps = {
  fetchDirectory,
  fetchManifest,
  onKeyPress,
  onMouseIdle,
  onMouseMove,
  setViewportSize
};

export default connect(() => ({}), mapDispatchToProps)(AppContainer);
