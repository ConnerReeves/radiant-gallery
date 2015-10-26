import { CHANGE_FREQUENCY, PAUSE, PLAY } from '../constants/ActionTypes';
import { PAUSED, PLAYING } from '../constants/PlaybackStatuses';

export function playbackStatus(state = PAUSED, action) {
  switch (action.type) {
    case PAUSE:
      return PAUSED;

    case PLAY:
      return PLAYING;

    default:
      return state;
  }
}

export function frequency(state = 5000, action) {
  switch (action.type) {
    case CHANGE_FREQUENCY:
      return action.frequency;

    default:
      return state;
  }
}
