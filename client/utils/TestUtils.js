import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

let shallowRenderer = ReactTestUtils.createRenderer();

export function isElementOfType(component, type) {
  return ReactTestUtils.isElementOfType(component, type);
}

export function renderComponent(component, props = {}) {
  shallowRenderer = ReactTestUtils.createRenderer();
  return rerenderComponent(component, props);
}

export function rerenderComponent(component, props = {}) {
  const element = React.createElement(component, props);
  shallowRenderer.render(element);
  return shallowRenderer.getRenderOutput();
}
