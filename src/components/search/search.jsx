import React, { Component } from "react";
import GenreLabel from "./genreLabel";
import { getGenres, getStations } from '../../services/genreService';
import {parsePlay} from '../../services/parsem3u';

class Search extends Component {
  state = {
    genre: [
      
    ],
    radio:{}
  };
 async componentDidMount() {
   const genre=await getGenres();
   console.log(genre);
  this.setState({genre});
  var xhr = new XMLHttpRequest();
xhr.open("GET", "https://secure-earth-03984.herokuapp.com/http://yp.shoutcast.com/sbin/tunein-station.m3u?id=99473570");
xhr.overrideMimeType("audio/x-mpegurl"); // Needed, see below.
xhr.onload = ()=>{
  var parsers = require("playlist-parser");
  var M3U = parsers.M3U;
  var playlist = M3U.parse(xhr.response);
  this.setState({radio:playlist[0]});
};
xhr.send();
  //const radio=parsePlay();
  //this.setState({radio:radio[0]});
  }
  
  render() {
    return (
      <div className="content">
        <form onSubmit={this.handleSubmit}>
        <input
          style={{
            position: "absolute",
            top: 0,
            bottom: "40vh",
            right: 0,
            left: 0,
            margin: "auto auto",
            height: "50px",
            width: "50vw",
            border: "none",
            borderBottom: "1.5px solid #83580b",
            backgroundColor: "transparent",
            outline: "none",
            fontSize: "3vh",
            paddingBottom:"5px"
          }}
          placeholder="Searching for name, genre and country.."
        />
         </form>
        <GenreLabel genre={this.state.genre} />
        <audio
        style={{marginLeft:"100px"}}
        controls
        src={this.state.radio.file}
      ></audio>
      </div>
     
    );
  }
}

export default Search;
