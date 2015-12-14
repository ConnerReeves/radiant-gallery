import {
  FETCH_MANIFEST_SUCCEEDED,
  NEXT_ASSET,
  PAUSE,
  PLAY,
  PREVIOUS_ASSET,
  SET_ASSET_INDEX
} from '../constants/ActionTypes';

export function manifest(state = [], action) {
  switch (action.type) {
    case FETCH_MANIFEST_SUCCEEDED:
      return action.payload.manifest;
  }

  return state;
}

export function currentAssetIndex(state = 0, action) {
  switch (action.type) {
    case SET_ASSET_INDEX:
      return action.index;

    case NEXT_ASSET:
      return state + 1;

    case PREVIOUS_ASSET:
      return state - 1;
  }

  return state;
}
