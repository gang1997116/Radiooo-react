import React, { Component } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import RadiosTable from "./radiotable/radiosTable";
import _ from "lodash";
import auth from "../services/authService";
import { updateLike, removeLike } from "../services/firebase";
import styled from "styled-components";
import { db } from "../services/firebase";


class Playlist extends Component {
  state = {
    radios: [],
    country: [],
    currentCountry: "",
    currentPlay: {
      i: "12222",
      n: "welcome to Radiooo",
      l: "1-world-radio.jpg",
      u: "http://64.37.50.226:8030/stream/",
    },
    match: "",
    pageSize: 8,
    searchQuery: "",
    selectedGenre: null,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    db.collection("users")
      .doc("gang@163.com")
      .onSnapshot((doc) => {
        this.setState({ radios: doc.data().favorites });
      });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.currentPlay.i !== this.props.currentPlay.i) {
      const radios = [...this.state.radios];
      const radio = this.props.currentPlay;
      for (let item of radios) {
        if (item.i === radio.i) {
          item.isPlaying = radio.isPlaying;
        } else {
          item.isPlaying = false;
        }
      }
      this.setState({ radios });
    }
  }

  handleLike = (radio) => {
    const radios = [...this.state.radios];
    const index = radios.indexOf(radio);
    radios[index] = { ...radios[index] };
    radios.splice(index,1);
    this.setState({ radios });
    const user = auth.getCurrentUser();
    radio.liked=!radio.liked;
    if(radio.liked===true){
        updateLike(user, radio);
    }
    else{
        removeLike(user,radios);
    }
  };

  handlePagechange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  
  getPagedData = () => {
    const {
      radios: allradios,
      selectedGenre,
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
    } = this.state;
    let filtered = allradios;
    if (searchQuery)
      filtered = allradios.filter(
        (m) => m.n.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
      );
    else if (selectedGenre && selectedGenre.i)
      filtered = allradios.filter((m) => m.d === selectedGenre.i);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const radios = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, radios: radios };
  };

  render() {
    //const { length: count } = this.state.radios;
    const { pageSize, currentPage, sortColumn } = this.state;

    const { currentPlay } = this.props;

    const { totalCount, radios } = this.getPagedData();
    const Playlist = styled.div`
      width: 32vw;
      height: 90vh;
      position: absolute;
      background-color: #fffdf6;
      z-index: 100;
      right: 0;
      bottom: 10vh;
      padding: 0 10px;
      padding-top: 10vh;
      box-shadow: -1px -1px 10px grey;
      display: ${(props) => props.display};
    `;

    return (
      <React.Fragment>
        <Playlist display={this.props.display}>
          <RadiosTable
            radios={radios}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            onPlay={this.props.onPlay}
            isPlaying={currentPlay.isPlaying}
            isPlaylist={true}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePagechange}
          />
        </Playlist>
        
      </React.Fragment>
    );
  }
}

export default Playlist;
