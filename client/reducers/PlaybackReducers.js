import { NEXT_ASSET, PAUSE, PLAY, PREVIOUS_ASSET } from '../constants/ActionTypes';
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
