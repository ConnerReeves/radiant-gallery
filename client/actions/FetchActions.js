import request from 'superagent';

import {
  FETCH_MANIFEST_SUCCEEDED,
  FETCH_MANIFEST_FAILED,
  FETCH_MANIFEST_REQUESTED,
  SET_ASSET_INDEX
} from 'constants/ActionTypes';

export function fetchManifest() {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_MANIFEST_REQUESTED });
    request.get('/manifest')
      .end((err, res) => {
        if (err) {
          const payload = { error: err };
          dispatch({ type: FETCH_MANIFEST_FAILED, payload });
        } else {
          const payload = { manifest: res.body };
          dispatch({ type: FETCH_MANIFEST_SUCCEEDED, payload });
          dispatch({ type: SET_ASSET_INDEX, index: 0 });
        }
      });
  };
}
