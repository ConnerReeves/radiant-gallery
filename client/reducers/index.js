import { combineReducers } from 'redux';
import { currentAssetIndex, manifest } from './AssetReducers';
import { frequency, playbackStatus, showControls, viewportSize } from './PlaybackReducers';
import { directory } from './DirectoryReducers';

export default combineReducers({
  directory,
  currentAssetIndex,
  frequency,
  manifest,
  playbackStatus,
  showControls,
  viewportSize
});
