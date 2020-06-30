import React, { Component } from "react";

class PlayButton extends Component {
  state = {
    iconType: "fa fa-play",
  };

  componentDidMount() {
    const audio = this.audio;
    if (audio !== null) {
      audio.load();
    }
  }
  componentWillUnmount() {
    const audio = this.audio;
    audio.pause();
  }

  playAudio = () => {
    const audio = this.audio;
    audio.addEventListener("timeupdate", this.updateProgress, false);
    audio.addEventListener("ended", this.audioEnded, false);
    if (this.state.iconType === "fa fa-play") {
      audio.play();
      this.setState({ iconType: "fa fa-pause" });
    } else {
      audio.pause();
      this.setState({ iconType: "fa fa-play" });
    }
  };

  render() {
    const { id } = this.props;
    return (
      <React.Fragment>
        <i
          onClick={this.playAudio}
          className={this.state.iconType}
          style={{ cursor: "pointer" }}
        ></i>
        <audio
         id={`audio${id}`}
          src={this.props.src}
          type="audio/mpeg"
          ref={(el) => (this.audio = el)}
          style={{ visibility: "hidden" }}
        ></audio>
      </React.Fragment>
    );
  }
}

export default PlayButton;
