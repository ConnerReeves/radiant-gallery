import { PAUSED, PLAYING } from 'constants/PlaybackStatuses';
import {
  MOUSE_IDLE,
  MOUSE_MOVED,
  SET_FREQUENCY,
  SET_VIEWPORT_SIZE,
  PAUSE,
  PLAY
} from 'constants/ActionTypes';

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
    case SET_FREQUENCY:
      return action.frequency;

    default:
      return state;
  }
}

export function viewportSize(state = { height: window.innerHeight, width: window.innerWidth }, action) {
  switch (action.type) {
    case SET_VIEWPORT_SIZE:
      return { height: action.height, width: action.width };

    default:
      return state;
  }
}

export function showControls(state = false, action) {
  switch (action.type) {
    case MOUSE_IDLE:
      return false;

    case MOUSE_MOVED:
      return true;

    default:
      return state;
  }
}
