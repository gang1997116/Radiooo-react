import React, { Component } from "react";
import GenreLabel from "./genreLabel";
import { getGenres } from '../../services/genreService';
import { Redirect } from "react-router-dom";

class Search extends Component {
  state = {
    genre: [
      
    ],

  };
 async componentDidMount() {
   const genre=await getGenres();
  this.setState({genre});
  }
  handleSubmit=()=>{
    this.setState({value:this.searchText.value})
    this.setState({redirect:true});
  }
  render() {
    if (this.state.redirect) {
      return <Redirect push to={`/shop/search/${this.state.value}`} />;
    }
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
          placeholder="Searching a station or genre.."
          ref={el => {this.searchText = el}} 
        />
         </form>
        <GenreLabel genre={this.state.genre} />
      </div>
     
    );
  }
}

export default Search;
