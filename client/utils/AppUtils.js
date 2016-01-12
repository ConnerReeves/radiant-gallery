import path from 'path';

export const getNewIndex = (lowerBound, upperBound, targetIndex) => {
  return (lowerBound === upperBound || targetIndex > upperBound) ? lowerBound
    : targetIndex < lowerBound ? upperBound
    : targetIndex;
};

export const isImage = (assetPath) => ['.jpg'].indexOf(path.extname(assetPath)) > -1;
export const isVideo = (assetPath) => ['.mp4'].indexOf(path.extname(assetPath)) > -1;
export const getAssetType = (assetPath) => isImage(assetPath) ? 'image' : (isVideo(assetPath) ? 'video' : undefined);
