import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

import { getNewIndex } from 'utils/AppUtils';
import { createReducer } from 'utils/ReducerUtils';
import {
  FETCH_MANIFEST_SUCCEEDED,
  LEFT_KEY_PRESSED,
  NEXT_ASSET,
  PREVIOUS_ASSET,
  RIGHT_KEY_PRESSED
} from 'constants/ActionTypes';

const initialState = fromJS({
  manifest: [],
  currentAssetIndex: 0
});

const nextAsset = (state) => {
  const assetCount = state.get('manifest').size;
  const currentAssetIndex = state.get('currentAssetIndex');
  const newAssetIndex = getNewIndex(0, Math.max(assetCount - 1, 0), currentAssetIndex + 1);
  return state.set('currentAssetIndex', newAssetIndex);
};

const previousAsset = (state) => {
  const assetCount = state.get('manifest').size;
  const currentAssetIndex = state.get('currentAssetIndex');
  const newAssetIndex = getNewIndex(0, Math.max(assetCount - 1, 0), currentAssetIndex - 1);
  return state.set('currentAssetIndex', newAssetIndex);
};

export default createReducer(initialState, {
  [ FETCH_MANIFEST_SUCCEEDED ]: (state, { manifest }) => {
    return state
      .set('currentAssetIndex', 0)
      .set('manifest', fromJS(manifest));
  },
  [ LEFT_KEY_PRESSED ]: previousAsset,
  [ NEXT_ASSET ]: nextAsset,
  [ PREVIOUS_ASSET ]: previousAsset,
  [ RIGHT_KEY_PRESSED ]: nextAsset
});

const stateSelector = (state) => state.AssetReducer;

export const getCurrentAsset = createSelector(
  stateSelector,
  (state) => {
    const manifest = state.get('manifest');
    const currentAssetIndex = state.get('currentAssetIndex');
    const currentAsset = manifest.get(currentAssetIndex);

    return currentAsset && currentAsset.toJS();
  }
);
