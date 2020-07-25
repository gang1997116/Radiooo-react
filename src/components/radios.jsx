import React, { Component } from "react";
import PlayControl from "./playControl/playControl";
import Audio from "./playControl/audio";

class Radios extends Component {
  state = {
    currentPlay: {
      id: "12222",
      name: "Welcome to Radiooo",
      logo: "1-world-radio.jpg",
      u: "http://64.37.50.226:8030/stream/",
    },
  };
  constructor(props) {
    super(props);
    this.audio = React.createRef();
  }

  render() {
    const {
      currentPlay,
      onPlay,
      onListPlay,
      user,
      favorites,
      playNext,
      playLast,
    } = this.props;
    //let location = window.location;
    return (
      <React.Fragment>
        <PlayControl
          data={currentPlay}
          onPlay={onPlay}
          onListPlay={onListPlay}
          onLike={this.props.onLike}
          user={user}
          favorites={favorites}
          playNext={playNext}
          playLast={playLast}
        />
        <Audio
          src={currentPlay.u}
          isPlaying={currentPlay.isPlaying}
          ref={this.audio}
        />
        <div className="scoll-title">
          <span>
            {currentPlay.name ? currentPlay.name : this.state.currentPlay.name}
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default Radios;
