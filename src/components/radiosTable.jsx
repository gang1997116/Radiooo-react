import React, { Component } from "react";
import auth from '../services/authService';
import Table from "./table";
import Like from "./like";
import { Link } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title", content: radio=><Link to={`shop/${radio._id}`}>{radio.title}</Link> },
    { path: "genre.name", label: "Genre" },
    // { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (radio) => (
        <Like likes={radio.liked} onClick={() => this.props.onLike(radio)} />
      ),
    },
    {
      key: "play",
      content: (radio) => (
        <div>
        <i class="fa fa-play" aria-hidden="true"></i>
        <ReactAudioPlayer src={radio.path} type="audio/mpeg" />
        </div>
      ),
    },
  ];

  deleteColunmn={
    
      key: "delete",
      content: (radio) => (
        <button
          onClick={() => this.props.onDelete(radio)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    
  }

  constructor(){
    super();
    const user=auth.getCurrentUser();
    if(user&&user.isAdmin){
      this.columns.push(this.deleteColunmn);
    }
  }
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
