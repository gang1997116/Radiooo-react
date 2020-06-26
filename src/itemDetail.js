import React, { useState, useEffect } from "react";
import "./App.css";
import ReactAudioPlayer from "react-audio-player";
import ProcessBar from "./components/process";


function Item({ match }) {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const fetchItem = await fetch(
      `https://30-000-radio-stations-and-music-charts.p.rapidapi.com/rapidapi?id=${match.params.id}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "30-000-radio-stations-and-music-charts.p.rapidapi.com",
          "x-rapidapi-key":
            "4c4c703187msh7ceb377e6edd80fp1e8baajsn13dbcb0375ac",
        },
      }
    );
    const item = await fetchItem.json();
    setItems(item.results[0]);
    console.log(item.results[0]);
  };
  
  return (
    <div>
      <h1>{items.n}</h1>
      <ReactAudioPlayer src={items.u} controls type="audio/mpeg" />
      <ProcessBar></ProcessBar>
    </div>
  );
}

export default Item;
