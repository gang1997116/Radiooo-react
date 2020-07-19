import React, { Component } from "react";
import PlayControl from "./playControl/playControl";
import Audio from "./playControl/audio";

class Radios extends Component {
  state = {
    currentPlay: {
      i: "12222",
      n: "welcome to Radiooo",
      l: "1-world-radio.jpg",
      u: "http://64.37.50.226:8030/stream/",
    },
  };
  constructor(props) {
    super(props);
    this.audio = React.createRef();
  }
  

  render() {
    const currentPlay = this.props.currentPlay;

    return (
      <React.Fragment>
        <PlayControl data={currentPlay} onPlay={this.props.onPlay}/>
        <Audio
          src={currentPlay.u}
          isPlaying={currentPlay.isPlaying}
          ref={this.audio}
        />
        <div className="scoll-title">
          <span>{currentPlay.n}</span>
        </div>
      </React.Fragment>
    );
  }
}

export default Radios;
