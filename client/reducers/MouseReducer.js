import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

import { createReducer } from 'utils/ReducerUtils';
import { MOUSE_IDLE, MOUSE_MOVED } from 'constants/ActionTypes';

const initialState = fromJS({
  idle: true
});

export default createReducer(initialState, {
  [ MOUSE_MOVED ]: (state) => state.set('idle', false),
  [ MOUSE_IDLE ]: (state) => state.set('idle', true)
});

const stateSelector = (state) => state.MouseReducer;

export const isMouseIdle = createSelector(stateSelector, (state) => state.get('idle'));
