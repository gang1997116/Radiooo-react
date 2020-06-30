import React, { Component } from "react";
//import auth from '../services/authService';
import Table from "./table";
import Like from "./like";
import PlayButton from './playControl/playButton';
import { Link } from 'react-router-dom';



class MoviesTable extends Component {
  columns = [
    { path: "n", label: "Title", content: radio=><Link to={`shop/${radio.i}`}>{radio.n}</Link> },
    { path: "g", label: "Genre" },
    { path: "c", label: "Country" },
    {
      key: "like",
      content: (radio) => (
        <Like likes={radio.liked} onClick={() => this.props.onLike(radio)} />
      ),
    },
    {
      key: "play",
      content: (radio) => (
        <PlayButton src={radio.u} playing={radio.playing} onClick={() => this.props.onPlay(radio)}/>
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
    const { radios, onSort, sortColumn} = this.props;
    return (
      <Table
        columns={this.columns}
        data={radios}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
