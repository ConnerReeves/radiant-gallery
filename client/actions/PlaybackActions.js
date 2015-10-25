import { NEXT_ASSET, PAUSE, PLAY, PREVIOUS_ASSET } from '../constants/ActionTypes';
import { PAUSED, PLAYING } from '../constants/PlaybackStatuses';

let playbackInterval;

export function nextAsset() {
  return { type: NEXT_ASSET };
}

export function pause() {
  clearInterval(playbackInterval);
  return { type: PAUSE };
}

export function play() {
  return { type: PLAY };
}

export function togglePlayback() {
  return (dispatch, getState) => {
    const { playbackStatus } = getState();

    switch (playbackStatus) {
      case PLAYING:
        dispatch(pause());
        break;

      case PAUSED:
        dispatch(play());
        dispatch(nextAsset());
        playbackInterval = setInterval(dispatch.bind(this, nextAsset()), 5000);
        break;
      }
  };
}

export function previousAsset() {
  return { type: PREVIOUS_ASSET };
}
