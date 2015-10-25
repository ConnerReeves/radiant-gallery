import { NEXT_ASSET, PREVIOUS_ASSET } from '../constants/ActionTypes';

const assets = window.assets || [];
let currentAssetIndex = 0;

export function currentAsset(state = '', action) {
  currentAssetIndex = {
    NEXT_ASSET: currentAssetIndex === assets.length - 1 ? 0 : currentAssetIndex + 1,
    PREVIOUS_ASSET: currentAssetIndex === 0 ? assets.length - 1 : currentAssetIndex - 1,
  }[action.type] || currentAssetIndex;

  return assets[currentAssetIndex] || state;
}
