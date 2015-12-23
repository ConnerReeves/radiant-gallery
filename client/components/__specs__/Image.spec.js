import React, { PropTypes } from 'react';
import { renderComponent, rerenderComponent } from 'utils/TestUtils';

import Image from 'Image';

const mockSrc = '/images/img1.jpg';
const mockNewSrc = '/images/img2.jpg';

describe('components/Image', () => {
  it('has the correct propTypes', () => {
    expect(Image.propTypes).toEqual({
      src: PropTypes.string.isRequired
    });
  });

  describe('#render', () => {
    let renderedImage;

    beforeEach(() => {
      renderedImage = renderComponent(Image, { src: mockSrc });
    });

    it('is a div', () => {
      expect(renderedImage.type).toBe('div');
    });

    describe('newly rendered image', () => {
      let img, oldImg;

      beforeEach(() => {
        img = renderedImage.props.children[0];
        oldImg = renderedImage.props.children[1];
      });

      it('is the first child of the div', () => {
        expect(img.type).toBe('img');
      });

      it('has the correct src prop', () => {
        expect(img.props.src).toBe(mockSrc);
      });

      it('has the correct styles', () => {
        expect(img.props.style).toEqual({
          left: '50%',
          maxHeight: '100%',
          maxWidth: '100%',
          opacity: 1,
          position: 'fixed',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 1.5s ease-in-out'
        });
      });

      it('does not render the fading out image', () => {
        expect(oldImg).toBeNull();
      });

      describe('rendering another image', () => {
        beforeEach(() => {
          renderedImage = rerenderComponent(Image, { src: mockNewSrc });
          img = renderedImage.props.children[0];
          oldImg = renderedImage.props.children[1];
        });

        it('has the correct src prop', () => {
          expect(img.props.src).toBe(mockNewSrc);
        });

        it('has the correct old image src prop', () => {
          expect(oldImg.props.src).toBe(mockSrc);
        });
      });
    });
  });
});
