import React,{useState} from "react";
import RadioImg from "../img/radio-base.svg";
import Antenna from "../img/antenna.svg";
import Volume from "../img/volume.svg";

const RadioModel = ({sound}) => {
  let degree=sound/100*360;
  const[isOpen,setOpen]=useState(true);
  const[astyle,setAstyle]=useState({transform:"rotate(0deg)"});
  const handleAntenna=()=>{
    if(isOpen){
        setOpen(false);
        setAstyle({transform:"rotate(9deg)"});
    }
    else{
        setOpen(true);
        setAstyle({transform:"rotate(0deg)"});
    }
  }
  return (
    <div>
      <img className="antenna clickable" src={Antenna} alt="Antenna" onClick={handleAntenna} style={astyle}/>
      <img className="home-img" src={RadioImg} alt="radio" />
      <img className="volume" src={Volume} alt="volume" style={{transform:`rotate(${degree}deg)`}}/>
    </div>
  );
};

export default RadioModel;
