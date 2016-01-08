import { SET_VIEWPORT_SIZE } from 'constants/ActionTypes';

export function setViewportSize({ height, width }) {
  return { type: SET_VIEWPORT_SIZE, height, width };
}
