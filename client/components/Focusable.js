import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default (ComposedComponent) => class extends Component {
  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this);

    domNode.addEventListener('mouseenter', this.props.onFocus);
    domNode.addEventListener('mouseleave', this.props.onBlur);
  }

  render() {
    return (
      <ComposedComponent { ...this.props } />
    );
  }
}
