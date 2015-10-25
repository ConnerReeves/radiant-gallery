import { combineReducers } from 'redux';
import { currentAsset } from './AssetReducers';
import { playbackStatus } from './PlaybackReducers';

export default combineReducers({
  currentAsset,
  playbackStatus
});
