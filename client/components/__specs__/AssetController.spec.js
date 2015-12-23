import { PropTypes } from 'react';
import { isElementOfType, renderComponent } from 'utils/TestUtils';

import AssetController from 'AssetController';
import Image from 'Image';
import VideoContainer from 'containers/VideoContainer';
import * as AppUtils from 'utils/AppUtils';

describe('components/AssetController', () => {
  it('has the correct propTypes', () => {
    expect(AssetController.propTypes).toEqual({
      currentAsset: PropTypes.object
    });
  });

  describe('#render', () => {
    let renderedAssetController;

    describe('when the currentAsset prop is defined', () => {
      describe('when the asset is a video', () => {
        const mockCurrentAsset = { path: 'foo.mp4' };

        beforeEach(() => {
          spyOn(AppUtils, 'getAssetType').and.returnValue('video');
          renderedAssetController = renderComponent(AssetController, { currentAsset: mockCurrentAsset });
        });

        it('renders a VideoContainer', () => {
          expect(isElementOfType(renderedAssetController, VideoContainer)).toBe(true);
        });

        it('gives the VideoContainer the correct src prop', () => {
          expect(renderedAssetController.props.src).toBe(mockCurrentAsset.path);
        });
      });

      describe('when the asset is an image', () => {
        const mockCurrentAsset = { path: 'foo.jpg' };

        beforeEach(() => {
          spyOn(AppUtils, 'getAssetType').and.returnValue('image');
          renderedAssetController = renderComponent(AssetController, { currentAsset: mockCurrentAsset });
        });

        beforeEach(() => {
          renderedAssetController = renderComponent(AssetController, { currentAsset: mockCurrentAsset });
        });

        it('renders a Image', () => {
          expect(isElementOfType(renderedAssetController, Image)).toBe(true);
        });

        it('gives the Image the correct src prop', () => {
          expect(renderedAssetController.props.src).toBe(mockCurrentAsset.path);
        });
      });
    });

    describe('when the currentAsset prop is undefined', () => {
      it('renders null', () => {
        renderedAssetController = renderComponent(AssetController);

        expect(renderedAssetController).toBeNull();
      });
    });
  });
});
