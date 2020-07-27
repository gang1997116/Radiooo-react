import React, { Component } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import RadiosTable from "./radiotable/radiosTable";
import _ from "lodash";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputBase from "@material-ui/core/InputBase";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import { updateLike, removeLike } from "../services/firebase";
import { Tween } from "react-gsap";
import LogoLoader from "./logoLoader";
import { toast } from "react-toastify";

class SearchDetail extends Component {
  state = {
    radios: [],
    country: [],
    currentPlay: {
      i: "12222",
      n: "welcome to Radiooo",
      l: "1-world-radio.jpg",
      u: "http://64.37.50.226:8030/stream/",
    },
    isPlaying: false,
    pageSize: 6,
    searchQuery: "",
    selectedGenre: null,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    isLoaded: false,
  };

  async componentDidMount() {
    setTimeout(() => this.setState({ isLoaded: true }), 2300);
    this.getData(this.props.match.params.keyword);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPlay.id !== this.props.currentPlay.id) {
      const radios = [...this.state.radios];
      const radio = this.props.currentPlay;
      for (let item of radios) {
        if (item.id === radio.id) {
          item.isPlaying = radio.isPlaying;
        } else {
          item.isPlaying = false;
        }
      }
      this.setState({ radios });
    }
  }
  getData = (keyword) => {
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest();
    const baseUrl = "http://api.shoutcast.com/legacy/";
    const proxyUrl = "https://secure-earth-03984.herokuapp.com/";
    const genreSearchtUrl = "genresearch?k=eaCawoEg1P6qI2eb&genre=";
    const normalSearchUrl = "stationsearch?k=eaCawoEg1P6qI2eb&search=";
    const targetUrl =
      window.location.pathname.indexOf("genre") > -1
        ? genreSearchtUrl
        : normalSearchUrl;
    // get a callback when the server responds
    xhr.addEventListener("load", () => {
      var convert = require("xml-js");
      var result = convert.xml2json(xhr.responseText, {
        compact: true,
        spaces: 4,
      });
      try{var stations = JSON.parse(result).stationlist.station;
      var radios = [];
      stations.forEach((station) => radios.push(station._attributes));
      this.setState({ radios });
      localStorage.setItem('radiolist', JSON.stringify(radios));
    }
      catch{
        toast("Sorry, we didn't found anything.");
      } 
    });
    // open the request with the verb and the url
    xhr.open("GET", proxyUrl + baseUrl + targetUrl + keyword);
    // send the request
    xhr.send();
  };

  handleLike = (radio) => {
    const user = auth.getCurrentUser();
    radio.liked = !radio.liked;
    const favorites = [...this.props.favorites];
    if (radio.liked === true) {
      updateLike(user, radio);
    } else {
      removeLike(user, favorites, radio);
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
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  replaceFavorite = (radios) => {
    radios.map((radio) => {
      radio.liked = false;
      if (this.props.favorites.some((item) => item.id === radio.id)) {
        radio.liked = true;
      }
      return null;
    });
  };
  getPagedData = () => {
    const {
      radios: allradios,
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

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const radios = paginate(sorted, currentPage, pageSize);

    this.replaceFavorite(radios);

    return { totalCount: filtered.length, radios: radios };
  };

  render() {
    //const { length: count } = this.state.radios;
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      isLoaded,
    } = this.state;
    const { currentPlay } = this.props;

    //if (count === 0) return <p>There are no radios in the database</p>;

    const { totalCount, radios } = this.getPagedData();
    const { keyword } = this.props.match.params;
    return (
      <React.Fragment>
        <LogoLoader />
        {isLoaded && (
          <Tween
            from={{ opacity: "0" }}
            to={{ opacity: "1" }}
            duration={1}
            ease="back.out(1.7)"
          >
            <div className="discover">
              <div className="radio-header">
                <Link to="/shop/search">
                  <div className="history-control clickable">
                    <i
                      className="fa fa-chevron-circle-left"
                      aria-hidden="true"
                    ></i>
                    <span> Back</span>
                  </div>
                </Link>
                <InputBase
                  className="form-search"
                  style={{ right: "13vw" }}
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => this.handleSearch(e.currentTarget.value)}
                  startAdornment={
                    <InputAdornment position="start" style={{ color: "grey" }}>
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </InputAdornment>
                  }
                />
              </div>
              <div
                className="radio-body"
                style={{ right: "15vw", width: "70vw" }}
              >
                <h1>{keyword[0].toUpperCase() + keyword.slice(1)}</h1>
                <p>We got {totalCount} radios for you.</p>
                <RadiosTable
                  radios={radios}
                  sortColumn={sortColumn}
                  onLike={this.handleLike}
                  onDelete={this.handleDelete}
                  onSort={this.handleSort}
                  onPlay={this.props.onPlay}
                  isPlaying={currentPlay.isPlaying}
                />
                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePagechange}
                />
              </div>
            </div>
          </Tween>
        )}
        {/* <Radios currentPlay={currentPlay} /> */}
      </React.Fragment>
    );
  }
}

export default SearchDetail;
