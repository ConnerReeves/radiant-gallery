import path from 'path';

export const isImage = (assetPath) => ['.jpg'].indexOf(path.extname(assetPath)) > -1;
export const isVideo = (assetPath) => ['.mp4'].indexOf(path.extname(assetPath)) > -1;
