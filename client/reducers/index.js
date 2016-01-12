import { combineReducers } from 'redux';
import AssetReducer from 'AssetReducer';
import { frequency, playbackStatus, showControls, viewportSize } from './PlaybackReducers';

export default combineReducers({
  AssetReducer,
  frequency,
  playbackStatus,
  showControls,
  viewportSize
});
