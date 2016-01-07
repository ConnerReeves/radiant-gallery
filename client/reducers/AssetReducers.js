import {
  FETCH_MANIFEST_SUCCEEDED,
  NEXT_ASSET,
  PREVIOUS_ASSET,
  SET_ASSET_INDEX
} from 'constants/ActionTypes';

export function manifest(state = [], action) {
  switch (action.type) {
    case FETCH_MANIFEST_SUCCEEDED:
      return action.manifest;
  }

  return state;
}

export function currentAssetIndex(state = 0, action) {
  switch (action.type) {
    case SET_ASSET_INDEX:
      return action.index;

    case NEXT_ASSET:
      return state >= action.maxIndex ? 0 : state + 1;

    case PREVIOUS_ASSET:
      return state > 0 ? state - 1 : action.maxIndex;
  }

  return state;
}
