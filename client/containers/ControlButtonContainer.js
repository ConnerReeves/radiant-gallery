import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ControlButton from '../components/ControlButton';

class ControlButtonContainer extends Component {
  static propTypes = {
    action: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    icon: PropTypes.string.isRequired
  };

  render() {
    const props = {
      disabled: this.props.disabled,
      icon: this.props.icon,
      onClick: this._onClick.bind(this)
    };

    return (
      <ControlButton { ...props } />
    );
  }

  _onClick() {
    if (!this.props.disabled) {
      this.props.dispatch(this.props.action());
    }
  }
}

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(ControlButtonContainer);
