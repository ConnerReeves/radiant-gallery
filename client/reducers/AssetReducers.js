import { NEXT_ASSET, PAUSE, PLAY, PREVIOUS_ASSET } from '../constants/ActionTypes';

const assets = window.assets || [];
let currentAssetIndex = 0;
let playbackInterval;

export function currentAsset(state = '', action) {
  switch (action.type) {
    case NEXT_ASSET:
      clearInterval(playbackInterval);
      currentAssetIndex = currentAssetIndex === assets.length - 1 ? 0 : currentAssetIndex + 1;
      break;

    case PAUSE:
      clearInterval(playbackInterval);
      break;

    case PLAY:
      //TODO: Need to use a thunk here...
      // playbackInterval = setInterval(() => {
      //   debugger;
      // }, 4000);
      break;

    case PREVIOUS_ASSET:
      clearInterval(playbackInterval);
      currentAssetIndex = currentAssetIndex === 0 ? assets.length - 1 : currentAssetIndex - 1;
      break;
  }

  return assets[currentAssetIndex] || state;
}
