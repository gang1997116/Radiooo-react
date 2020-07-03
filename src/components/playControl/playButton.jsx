import React, { Component } from "react";

class PlayButton extends Component {
  state = {
  };

  

  render() {
    let iconType="fa fa-pause";
    if(this.props.isPlaying===true){
      iconType="fa fa-pause";
    }
    else{
      iconType="fa fa-play";
    }
    return (
      <React.Fragment>
        <i
          onClick={this.props.onClick}
          className={iconType}
          style={{ cursor: "pointer" }}
        ></i>
        
      </React.Fragment>
    );
  }
}

export default PlayButton;
