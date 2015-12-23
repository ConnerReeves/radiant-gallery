import React, { Component } from 'react';
import { connect } from 'react-redux';

import App from 'components/App';
import { fetchManifest } from 'actions/FetchActions';

export class AppContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchManifest());
  }

  render() {
    return (
      <App />
    );
  }
}

export const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(AppContainer);
