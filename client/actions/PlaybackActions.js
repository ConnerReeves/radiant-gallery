import { PAUSED, PLAYING } from 'constants/PlaybackStatuses';
import {
  NEXT_ASSET,
  PAUSE,
  PLAY,
  PREVIOUS_ASSET,
  SET_ASSET_INDEX,
  SET_FREQUENCY
} from 'constants/ActionTypes';

export function setFrequency(frequency) {
  return { type: SET_FREQUENCY, frequency };
}

export function nextAsset(maxIndex) {
  return { type: NEXT_ASSET, maxIndex };
}

export function previousAsset(maxIndex) {
  return { type: PREVIOUS_ASSET, maxIndex };
}

export function setAssetIndex(index) {
  return { type: SET_ASSET_INDEX, index };
}

export function togglePlayback() {
  return (dispatch, getState) => {
    const { playbackStatus } = getState();

    switch (playbackStatus) {
      case PLAYING:
        dispatch({ type: PAUSE });
        break;

      case PAUSED:
        dispatch({ type: PLAY });
        break;
    }
  };
}
