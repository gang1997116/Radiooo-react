import React, { useState,useEffect } from "react";
import "./playControl.css";
import PlayButton from "./playButton";
import next from "../../img/next.svg";
import last from "../../img/last.svg";
import sound from "../../img/sound.svg";
import list from "../../img/list.svg";
import soundMute from "../../img/sound-mute.svg";
import Like from "../like";
import SoundControl from "./soundcontrol";
import RadioModel from "../radio-model";
import { useLocation, Link } from "react-router-dom";
import Playlist from "../playlist/playlist";
import {parse} from '../../services/parsem3u';
import { db } from "../../services/firebase";
import auth from "../../services/authService";
import {removeLike,updateLike} from "../../services/firebase";

function PlayControl({ data, onPlay,user,favorites,onLike}) {
  //const [like, setLike] = useState(false);
  const [mute, setMute] = useState(false);
  const [value, setValue] = useState(30);
  const [soundStyle, setSound] = useState(sound);
  const [display,setDisplay]=useState('none');
  let location = useLocation();

  
  const handleMute = () => {
    const audio = document.getElementById("audioplayer");
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
    localStorage.setItem("volume", newValue);
    const audio = document.getElementById("audioplayer");
    audio.volume = newValue / 100;
    if (newValue === 0) {
      setSound(soundMute);
    } else {
      setSound(sound);
    }
  };
 const handleHide = () => {
    if (display === "none") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  };
  return (
    <React.Fragment>
      {(location.pathname === "/" ||
        location.pathname === "/shop" ||
        location.pathname === "/shop/") && <RadioModel sound={value} />}
      <Playlist currentPlay={data} onPlay={onPlay}  display={display}/>
      <div className="bar">
        <Link to="/"><div className="radio-logo">
          <img src={data.logo} alt="" />
        </div></Link>
        <div className="radio-title">{data.name}</div>
        <div className="controls">
          <div className="like">
            <Like onClick={onLike} likes={data.liked} />
          </div>
          <img src={last} className="last" alt="" />
          <div className="play-button-circle">
            <PlayButton
              src={data.u}
              isPlaying={data.isPlaying}
              onClick={onPlay}
            />
          </div>
          <img src={next} className="next" alt="" />
          <img src={soundStyle} className="sound" onClick={handleMute} alt="" />
        </div>
        <SoundControl mute={mute} value={value} onChange={handleChange}/>
        <img src={list} className="list clickable" alt="" onClick={handleHide}/>
      </div>
    </React.Fragment>
  );
}

export default PlayControl;
