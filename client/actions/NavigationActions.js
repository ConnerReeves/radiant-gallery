import { NEXT_ASSET, PAUSE, PLAY, PREVIOUS_ASSET } from '../constants/ActionTypes';

export function nextAsset() {
  return { type: NEXT_ASSET };
}

export function pause() {
  return { type: PAUSE };
}

export function play() {
  return { type: PLAY };
}

export function previousAsset() {
  return { type: PREVIOUS_ASSET };
}
