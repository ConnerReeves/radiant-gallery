import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

const shallowRenderer = ReactTestUtils.createRenderer();

export function isElementOfType(component, type) {
  return ReactTestUtils.isElementOfType(component, type);
}

export function renderComponent(component, props = {}) {
  const element = React.createElement(component, props);
  shallowRenderer.render(element);
  return shallowRenderer.getRenderOutput();
}
