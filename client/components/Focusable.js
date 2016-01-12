import React, { Component } from 'react';
import ReactDOM from 'react-dom';

require('styles/fading-controls.scss');

export default class Fucusable extends Component {
  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this);

    domNode.addEventListener('mouseenter', this.props.onFocus);
    domNode.addEventListener('mouseleave', this.props.onBlur);
  }

  render() {
    return (
      <div>{ this.props.children }</div>
    );
  }
}
