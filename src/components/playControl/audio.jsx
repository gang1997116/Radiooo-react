import React, { Component } from "react";

class Audio extends Component {
  state = {};
   componentDidMount() {
      const audio = this.audio;
      if (audio !== null) {
        audio.load();
      }
      
    };
    componentWillUnmount() {
      const audio = this.audio;
      audio.pause();
    };
    
  render() {
    const { src} = this.props;
    return (
      <audio
      
        id={"audioplayer"}
        src={src}
        type="audio/mpeg"
        ref={(el) => (this.audio = el)}
        style={{ visibility: "hidden" }}

      ></audio>
    );
  }
}

export default Audio;
