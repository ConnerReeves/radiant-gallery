import { combineReducers } from 'redux';
import AssetReducer from 'AssetReducer';
import DirectoryReducer from 'DirectoryReducer';
import MouseReducer from 'MouseReducer';
import PlaybackReducer from 'PlaybackReducer';
import ViewportReducer from 'ViewportReducer';

export default combineReducers({
  AssetReducer,
  DirectoryReducer,
  MouseReducer,
  PlaybackReducer,
  ViewportReducer
});
