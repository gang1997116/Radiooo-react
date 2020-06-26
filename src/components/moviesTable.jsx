import React, { Component } from "react";
import auth from '../services/authService';
import Table from "./table";
import Like from "./like";
import { Link } from 'react-router-dom';

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title", content: movie=><Link to={`shop/${movie._id}`}>{movie.title}</Link> },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like likes={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
  ];

  deleteColunmn={
    
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
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
    const { movies, onSort, sortColumn} = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
