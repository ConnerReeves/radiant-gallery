import { createReducer } from 'utils/ReducerUtils';
import { RECEIVE_DIRECTORY } from 'constants/ActionTypes';

const initialState = {};

export default createReducer(initialState, {
  [ RECEIVE_DIRECTORY ]: (state, { directory }) => directory
});

export const getDirectory = (state) => state.DirectoryReducer;
