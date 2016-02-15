import qs from 'query-string';
import request from 'superagent';

import {
  RECEIVE_DIRECTORY,
  RECEIVE_MANIFEST
} from 'constants/ActionTypes';

export function fetchDirectory() {
  return (dispatch) => {
    request.get('/directory').end((err, res) => {
      dispatch({ type: RECEIVE_DIRECTORY, directory: res.body });
    });
  };
}

export function fetchManifest(path) {
  return (dispatch) => {
    request.get(`/manifest?${qs.stringify({ path })}`).end((err, res) => {
      dispatch({ type: RECEIVE_MANIFEST, manifest: res.body });
    });
  };
}
