import React, { useState, useEffect } from "react";
import "./playControl.css";
import { getRadio } from "../../services/radioService";
import PlayButton from "./playButton";

function PlayControl({ id }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getdata() {
      const { data } = await getRadio(id);
      setData(data.results[0]);
    }
    getdata();
  });
  const imgUrl = "https://www.radioair.info/images_radios/";
  return (
    <div className="bar">
      <div className="radio-logo">
        <img src={imgUrl+data.l} alt="" />
      </div>
    <div className="controls">
      <PlayButton src={data.u} />
      </div>
    </div>
  );
}

export default PlayControl;
