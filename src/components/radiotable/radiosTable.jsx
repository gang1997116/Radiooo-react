import React, { Component } from "react";
//import auth from '../services/authService';
import Table from "./table";
import Like from "../like";
import AddPlayButton from './addPlayButton';
import { Link } from "react-router-dom";




class MoviesTable extends Component {
  columns = [
    { path: "name", label: "Title", content: radio=><span>{radio.name&&radio.name.length>30?radio.name.slice(0,40)+"...":radio.name}</span> },
    { path: "genre", label: "Genre",content: radio=><Link to={`/shop/genresearch/${radio.genre}`} >{radio.genre}</Link> },
    { path: "lc", label: "Listeners",content: radio=><span>{radio.lc}</span> },
    {
      key: "like",
      content: (radio) => (
        <Like likes={radio.liked} onClick={() => this.props.onLike(radio)} />
      ),
    },
    {
      key: "play",
      content: (radio) => (
        <AddPlayButton isPlaying={radio.isPlaying} isPlay={this.props.isPlaying}/>
      ),
    },
  ];


  render() {
    const { radios, onSort, sortColumn,onPlay,isList} = this.props;
    return (
      <Table
        columns={this.columns}
        data={radios}
        sortColumn={sortColumn}
        onSort={onSort}
        onPlay={onPlay}
        isList={isList}
      />
    );
  }
}

export default MoviesTable;
