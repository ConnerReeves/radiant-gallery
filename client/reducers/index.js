import { combineReducers } from 'redux';
import { currentAssetIndex, manifest } from './AssetReducers';
import { frequency, playbackStatus, viewportSize } from './PlaybackReducers';

export default combineReducers({
  currentAssetIndex,
  frequency,
  manifest,
  playbackStatus,
  viewportSize
});
