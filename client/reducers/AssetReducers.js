import { NEXT_ASSET, PAUSE, PLAY, PREVIOUS_ASSET } from '../constants/ActionTypes';

const assets = window.assets || [];
let currentAssetIndex = 0;

export function currentAsset(state = '', action) {
  switch (action.type) {
    case NEXT_ASSET:
      currentAssetIndex = currentAssetIndex === assets.length - 1 ? 0 : currentAssetIndex + 1;
      break;

    case PREVIOUS_ASSET:
      currentAssetIndex = currentAssetIndex === 0 ? assets.length - 1 : currentAssetIndex - 1;
      break;
  }

  return assets[currentAssetIndex] || state;
}
