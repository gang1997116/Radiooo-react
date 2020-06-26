import React, { Component } from "react";

class Like extends Component {
  state = {};
  render() {
    let classes = "fa fa-heart";
    if (!this.props.likes) classes += "-o";
    return (
      <i
        onClick={this.props.onClick}
        style={{ cursor: "pointer" }}
        className={classes}
      ></i>
    );
  }
}

export default Like;
