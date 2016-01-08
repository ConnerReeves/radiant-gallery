import { MOUSE_IDLE, MOUSE_MOVED } from 'constants/ActionTypes';

export function onMouseIdle() {
  return { type: MOUSE_IDLE };
}

export function onMouseMove() {
  return { type: MOUSE_MOVED };
}
