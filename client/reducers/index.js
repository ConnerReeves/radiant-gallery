import { combineReducers } from 'redux';
import { currentAsset } from './AssetReducers';
import { frequency, playbackStatus } from './PlaybackReducers';

export default combineReducers({
  currentAsset,
  frequency,
  playbackStatus
});
