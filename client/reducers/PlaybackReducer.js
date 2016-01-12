import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

import { createReducer } from 'utils/ReducerUtils';
import { PAUSED, PLAYING } from 'constants/PlaybackStatuses';
import { PAUSE, PLAY, SET_FREQUENCY } from 'constants/ActionTypes';

const initialState = fromJS({
  frequency: 5000,
  playbackStatus: PAUSED
});

export default createReducer(initialState, {
  [ PAUSE ]: (state) => state.set('playbackStatus', PAUSED),
  [ PLAY ]: (state) => state.set('playbackStatus', PLAYING),
  [ SET_FREQUENCY ]: (state, { frequency }) => state.set('frequency', frequency)
});

const stateSelector = (state) => state.PlaybackReducer;

export const getFrequency = createSelector(stateSelector, (state) => state.get('frequency'));
export const getPlaybackStatus = createSelector(stateSelector, (state) => state.get('playbackStatus'));
