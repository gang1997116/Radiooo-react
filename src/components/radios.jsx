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
  handleSimplePlay = () => {
    let currentPlay = { ...this.state.currentPlay };
    currentPlay.isPlaying = !currentPlay.isPlaying;
    this.setState({ currentPlay });
    const audio = this.audio.current;
    if (currentPlay.isPlaying === true) {
      this.playAudio();
    } else {
      audio.pause();
    }
  };
  playAudio = () => {
    const audio = this.audio.current;
    var playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          audio.play();
        })
        .catch((error) => {
          audio.play();
        });
    }
  };

  render() {
    const currentPlay = this.state.currentPlay;

    return (
      <React.Fragment>
        <PlayControl data={currentPlay} onPlay={this.handleSimplePlay} />
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
