import qs from 'query-string';
import request from 'superagent';

import {
  FETCH_DIRECTORY_SUCCEEDED,
  FETCH_DIRECTORY_FAILED,
  FETCH_DIRECTORY_REQUESTED,
  FETCH_MANIFEST_SUCCEEDED,
  FETCH_MANIFEST_FAILED,
  FETCH_MANIFEST_REQUESTED,
  SET_ASSET_INDEX
} from 'constants/ActionTypes';

export function fetchDirectory(path) {
  return (dispatch) => {
    dispatch({ type: FETCH_DIRECTORY_REQUESTED });
    request.get(`/directory?${qs.stringify({ path })}`)
      .end((err, res) => {
        if (err) {
          const payload = { error: err };
          dispatch({ type: FETCH_DIRECTORY_FAILED, payload });
        } else {
          dispatch({ type: FETCH_DIRECTORY_SUCCEEDED, ...res.body });
        }
      });
  };
}

export function fetchManifest(path) {
  return (dispatch) => {
    dispatch({ type: FETCH_MANIFEST_REQUESTED });
    request.get(`/manifest?${qs.stringify({ path })}`)
      .end((err, res) => {
        if (err) {
          const payload = { error: err };
          dispatch({ type: FETCH_MANIFEST_FAILED, payload });
        } else {
          dispatch({ type: FETCH_MANIFEST_SUCCEEDED, manifest: res.body });
          dispatch({ type: SET_ASSET_INDEX, index: 0 });
        }
      });
  };
}
