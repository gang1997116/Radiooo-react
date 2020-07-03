import React, { Component } from "react";

class AddPlayButton extends Component {
  state = {};

  render() {
    let iconType = "fa fa-volume-up";
    if (this.props.isPlay === true) {
      iconType = "fa fa-volume-up";
    } else {
      iconType = "fa fa-volume-off";
    }
    return (
      <React.Fragment>
        {this.props.isPlaying&&<i
          onClick={this.props.onClick}
          className={iconType}
          style={{ cursor: "pointer",width:"20px" }}
        ></i>}
      </React.Fragment>
    );
  }
}

export default AddPlayButton;
