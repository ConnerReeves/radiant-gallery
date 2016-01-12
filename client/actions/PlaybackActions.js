import { PAUSED, PLAYING } from 'constants/PlaybackStatuses';
import {
  NEXT_ASSET,
  PAUSE,
  PLAY,
  PREVIOUS_ASSET,
  SET_FREQUENCY
} from 'constants/ActionTypes';

export function setFrequency(frequency) {
  return { type: SET_FREQUENCY, frequency };
}

export function nextAsset() {
  return { type: NEXT_ASSET };
}

export function previousAsset() {
  return { type: PREVIOUS_ASSET };
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
