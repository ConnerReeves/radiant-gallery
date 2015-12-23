import React, { PropTypes } from 'react';
import { isElementOfType, renderComponent } from 'utils/TestUtils';

import Icon from 'Icon';

const mockIconName = 'gear';
const mockOnClick = () => {};
const mockStyle = { color: 'blue', marginTop: '10px' };

describe('components/Icon', () => {
  it('has the correct propTypes', () => {
    expect(Icon.propTypes).toEqual({
      disabled: PropTypes.bool,
      name: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      style: PropTypes.object
    });
  });

  describe('#render', () => {
    let renderedIcon;

    beforeEach(() => {
      renderedIcon = renderComponent(Icon, { name: mockIconName });
    });

    it('is an i', () => {
      expect(renderedIcon.type).toBe('i');
    });

    it('has the "fa" class', () => {
      expect(renderedIcon.props.className).toContain('fa');
    });

    it('has the fa-<name> class', () => {
      expect(renderedIcon.props.className).toContain(`fa-${mockIconName}`);
    });

    it('has the correct default styles', () => {
      expect(renderedIcon.props.style).toEqual({
        color: 'white',
        cursor: 'default',
        fontSize: '18px',
        opacity: 0.6,
        textAlign: 'center',
        textShadow: '3px 0 5px #000',
        WebkitUserSelect: 'none'
      });
    });

    describe('when extra styles are defined', () => {
      beforeEach(() => {
        renderedIcon = renderComponent(Icon, { name: mockIconName, style: mockStyle });
      });

      it('adds styles which do not exist in the default Icon styles', () => {
        expect(renderedIcon.props.style.marginTop).toBe('10px');
      });

      it('overrides default Icon styles', () => {
        expect(renderedIcon.props.style.color).toBe('blue');
      });
    });

    describe('when the icon is disabled', () => {
      beforeEach(() => {
        renderedIcon = renderComponent(Icon, { name: mockIconName, disabled: true });
      });

      it('sets the opacity to 0.1', () => {
        expect(renderedIcon.props.style.opacity).toBe(0.1);
      });
    });

    describe('when the icon has an onClick callback', () => {
      beforeEach(() => {
        renderedIcon = renderComponent(Icon, { name: mockIconName, onClick: mockOnClick });
      });

      it('passes the onClick callback', () => {
        expect(renderedIcon.props.onClick).toBe(mockOnClick);
      });

      it('sets the cursor to "pointer"', () => {
        expect(renderedIcon.props.style.cursor).toBe('pointer');
      });
    });
  });
});
