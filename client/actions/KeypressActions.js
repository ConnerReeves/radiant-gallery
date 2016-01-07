import {
  ENTER_KEY_PRESSED,
  DOWN_KEY_PRESSED,
  UP_KEY_PRESSED,
  UNUSED_KEY_PRESSED
} from 'constants/ActionTypes';

export function onKeyPress(keyCode) {
  switch (keyCode) {
    case 13:
      return { type: ENTER_KEY_PRESSED };

    case 38:
      return { type: UP_KEY_PRESSED };

    case 40:
      return { type: DOWN_KEY_PRESSED };

    default:
      return { type: UNUSED_KEY_PRESSED };
  }
}
