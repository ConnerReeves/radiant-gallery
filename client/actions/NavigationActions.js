import { NEXT_ASSET, PREVIOUS_ASSET } from '../constants/ActionTypes';

export function nextAsset() {
  return { type: NEXT_ASSET };
}

export function previousAsset() {
  return { type: PREVIOUS_ASSET };
}
