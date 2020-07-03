import React, { useState, useEffect } from "react";
import "./playControl.css";
import { getRadio } from "../../services/radioService";
import PlayButton from "./playButton";
import next from "../../img/next.svg";
import last from "../../img/last.svg";
import sound from "../../img/sound.svg";
import list from "../../img/list.svg";
import soundMute from "../../img/sound-mute.svg";
import Like from "../like";
import SoundControl from "./soundcontrol";
import { Link } from "react-router-dom";

function PlayControl({ data,onPlay }) {
  
  const [like, setLike] = useState(false);
  const [mute, setMute] = useState(false);
  const [value, setValue] = useState(30);
  const [soundStyle, setSound] = useState(sound);

  const imgUrl = "https://www.radioair.info/images_radios/";
  const handleLike = () => {
    setLike(!like);
  };
  const handleMute = () => {
    const audio = document.getElementById(`audio${data.i}`);
    if (soundStyle === sound) {
      setSound(soundMute);
      audio.volume = 0;
    } else {
      setSound(sound);
      audio.volume = value / 100;
    }
    setMute(!mute);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const audio = document.getElementById("audioplayer");
    audio.volume = newValue / 100;
    if (newValue === 0) {
      setSound(soundMute);
    } else {
      setSound(sound);
    }
  };
  
  return (
    <div className="bar">
      <Link to="/shop">
        <div className="radio-logo">
          <img src={imgUrl + data.l} alt="" />
        </div>
      </Link>
      <div className="radio-title">{data.n}</div>
      <div className="controls">
        <div className="like">
          <Like onClick={handleLike} likes={like} />
        </div>
        <img src={last} className="last" alt="" />
        <div className="play-button-circle">
          <PlayButton  src={data.u} isPlaying={data.isPlaying} onClick={onPlay}/>
        </div>
        <img src={next} className="next" alt="" />
        <img src={soundStyle} className="sound" onClick={handleMute} alt="" />
      </div>
      <SoundControl mute={mute} value={value} onChange={handleChange} />
      <img src={list} className="list" alt="" />
    </div>
  );
}

export default PlayControl;
