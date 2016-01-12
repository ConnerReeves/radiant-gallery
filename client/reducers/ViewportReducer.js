import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

import { createReducer } from 'utils/ReducerUtils';
import { SET_VIEWPORT_SIZE } from 'constants/ActionTypes';

const initialState = fromJS({
  height: window.innerHeight,
  width: window.innerWidth
});

export default createReducer(initialState, {
  [ SET_VIEWPORT_SIZE ]: (state, { height, width }) => {
    return state
      .set('height', height)
      .set('width', width);
  }
});

const stateSelector = (state) => state.ViewportReducer;

export const getViewportHeight = createSelector(stateSelector, (state) => state.get('height'));
export const getViewportWidth = createSelector(stateSelector, (state) => state.get('width'));
