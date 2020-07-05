import React, { Component } from "react";
//import auth from '../services/authService';
import Table from "./table";
import Like from "../like";
import AddPlayButton from './addPlayButton';
import { Link } from "react-router-dom";




class MoviesTable extends Component {
  columns = [
    { path: "n", label: "Title", content: radio=><span>{radio.n}</span> },
    { path: "g", label: "Genre",content: radio=><Link to={`/shop/genre/${radio.d}`} >{radio.g}</Link> },
    { path: "c", label: "Country",content: radio=><Link to={`/shop/country/${radio.c}`}>{radio.cl}</Link> },
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

  // deleteColunmn={
    
  //     key: "delete",
  //     content: (radio) => (
  //       <button
  //         onClick={() => this.props.onDelete(radio)}
  //         className="btn btn-danger btn-sm"
  //       >
  //         Delete
  //       </button>
  //     )
    
  // }

  // constructor(){
  //   super();
  //   const user=auth.getCurrentUser();
  //   if(user&&user.isAdmin){
  //     this.columns.push(this.deleteColunmn);
  //   }
  // }
  render() {
    const { radios, onSort, sortColumn,onPlay} = this.props;
    return (
      <Table
        columns={this.columns}
        data={radios}
        sortColumn={sortColumn}
        onSort={onSort}
        onPlay={onPlay}
      />
    );
  }
}

export default MoviesTable;
