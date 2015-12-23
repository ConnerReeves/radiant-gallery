import React, { PropTypes } from 'react';
import { isElementOfType, renderComponent } from 'utils/TestUtils';

import FrequencyControl from 'FrequencyControl';
import Icon from 'Icon';

describe('components/FrequencyControl', () => {
  it('has the correct propTypes', () => {
    expect(FrequencyControl.propTypes).toEqual({
      frequency: PropTypes.number,
      onChange: PropTypes.func.isRequired
    });
  });

  describe('#render', () => {
    const mockFrequency = 60000;
    const mockOnChange = () => {};
    let renderedFrequencyControl;

    beforeEach(() => {
      renderedFrequencyControl = renderComponent(FrequencyControl, {
        frequency: mockFrequency,
        onChange: mockOnChange
      });
    });

    it('is a div', () => {
      expect(renderedFrequencyControl.type).toBe('div');
    });

    it('has the correct styles', () => {
      expect(renderedFrequencyControl.props.style).toEqual({
        display: 'flex',
        alignItems: 'center',
        opacity: 0.6
      });
    });

    describe('Icon', () => {
      let icon;

      beforeEach(() => {
        icon = renderedFrequencyControl.props.children[0];
      });

      it('is the first child of the div', () => {
        expect(isElementOfType(icon, Icon)).toBe(true);
      });

      it('has the correct name prop', () => {
        expect(icon.props.name).toBe('clock-o');
      });
    });

    describe('select', () => {
      let select;

      beforeEach(() => {
        select = renderedFrequencyControl.props.children[1];
      });

      it('is the second child of the div', () => {
        expect(select.type).toBe('select');
      });

      it('is passed the onChange prop', () => {
        expect(select.props.onChange).toBe(mockOnChange);
      });

      it('has the correct styles', () => {
        expect(select.props.style).toEqual({
          background: '#FFF',
          border: 'none',
          borderRadius: '3px',
          boxShadow: '0 0 10px 1px #000',
          height: '20px',
          marginLeft: '10px',
          padding: '0 5px',
          width: '90px'
        });
      });

      it('is passed the frequency prop as its value prop', () => {
        expect(select.props.value).toBe(mockFrequency);
      });

      describe('options', () => {
        const expectedOptions = [
          { value: 5000, text: '5 Seconds' },
          { value: 10000, text: '10 Seconds' },
          { value: 30000, text: '30 Seconds' },
          { value: 60000, text: '1 Minute' },
          { value: 300000, text: '5 Minutes' },
          { value: 600000, text: '10 Minutes' }
        ];

        let option;
        expectedOptions.forEach((expectedOption, index) => {
          describe(`"${expectedOption.text}" option`, () => {
            beforeEach(() => {
              option = select.props.children[index];
            });

            it('is an option', () => {
              expect(option.type).toBe('option');
            });

            it('has the correct value', () => {
              expect(option.props.value).toBe(expectedOption.value);
            });

            it('has the correct text', () => {
              expect(option.props.children).toBe(expectedOption.text);
            });
          });
        });
      });
    });
  });
});
