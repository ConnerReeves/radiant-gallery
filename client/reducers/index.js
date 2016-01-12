import { combineReducers } from 'redux';
import AssetReducer from 'AssetReducer';
import MouseReducer from 'MouseReducer';
import PlaybackReducer from 'PlaybackReducer';
import ViewportReducer from 'ViewportReducer';

export default combineReducers({
  AssetReducer,
  MouseReducer,
  PlaybackReducer,
  ViewportReducer
});
