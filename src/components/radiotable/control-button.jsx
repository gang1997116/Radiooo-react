import React, { Component } from "react";
import leftButton from "../../img/control-button.svg";
import rightButton from "../../img/control-button-r.svg";

class ControlButton extends Component {

  render() {
    let buttonPosition = { left: "35vw" };
    let buttonsrc=leftButton;
    const { position } = this.props;
    if (position.left === 0) {
      buttonPosition = { left: "35vw" };
      buttonsrc=leftButton;
    } else {
      buttonPosition = { left: 0 };
      buttonsrc=rightButton;
    }
    return (
      <div
        className="control-button"
        style={buttonPosition}
        onClick={this.props.onClick}
      >
        <img src={buttonsrc} alt="" />
      </div>
    );
  }
}

export default ControlButton;
