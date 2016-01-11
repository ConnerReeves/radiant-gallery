import { combineReducers } from 'redux';
import { currentAssetIndex, manifest } from './AssetReducers';
import { frequency, playbackStatus, showControls, viewportSize } from './PlaybackReducers';

export default combineReducers({
  currentAssetIndex,
  frequency,
  manifest,
  playbackStatus,
  showControls,
  viewportSize
});
