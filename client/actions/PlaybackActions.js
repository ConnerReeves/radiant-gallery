import { CHANGE_FREQUENCY, NEXT_ASSET, PAUSE, PLAY, PREVIOUS_ASSET } from '../constants/ActionTypes';
import { PAUSED, PLAYING } from '../constants/PlaybackStatuses';

let playbackInterval;

const restartPlayback = (dispatch, frequency) => {
  stopPlayback();
  playbackInterval = setInterval(dispatch.bind(this, nextAsset()), frequency);
};

const stopPlayback = () => {
  clearInterval(playbackInterval);
};

export function changeFrequency(frequency) {
  return (dispatch, getState) => {
    dispatch({ type: CHANGE_FREQUENCY, frequency });
    restartPlayback(dispatch, frequency);
  };
}

export function nextAsset() {
  return { type: NEXT_ASSET };
}

export function previousAsset() {
  return { type: PREVIOUS_ASSET };
}

export function togglePlayback() {
  return (dispatch, getState) => {
    const { frequency, playbackStatus } = getState();

    switch (playbackStatus) {
      case PLAYING:
        stopPlayback();
        dispatch({ type: PAUSE });
        break;

      case PAUSED:
        restartPlayback(dispatch, frequency);
        dispatch({ type: PLAY });
        break;
      }
  };
}
