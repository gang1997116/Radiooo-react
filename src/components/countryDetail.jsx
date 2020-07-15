import React, { Component } from "react";
import { getRadios } from "../services/radioService";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
//import ListGroup from "./listGroup";
import RadiosTable from "./radiotable/radiosTable";
import _ from "lodash";
//import { Link } from "react-router-dom";
//import { toast } from "react-toastify";
import { getCountry } from "../services/countryService";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputBase from "@material-ui/core/InputBase";
import CountryCloud from "./tagCloud";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import { updateLike } from "../services/firebase";

class CountryDetail extends Component {
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
    isPlaying: false,
    pageSize: 6,
    searchQuery: "",
    selectedGenre: null,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    position: { left: 0 },
  };
  constructor(props) {
    super(props);
    this.audio = React.createRef();
  }
  async componentDidMount() {
    const { data: radios } = await getRadios(
      this.props.match.params.country,
      "0",
      "ALL"
    );
    this.setState({
      radios: radios.results,
      match: this.props.match.params.country,
    });

    const { data: country } = await getCountry();
    this.setState({ country: country.results });
    this.replaceCountry();
  }
  replaceCountry = () => {
    const radios = [...this.state.radios];
    const currentCountry = this.state.country.filter(item=> item.code===radios[0].c)[0];
    radios.map((radio) => {
        if (currentCountry.code === radio.c) {
          radio.cl = currentCountry.name;
        }
      return null;
    });
    this.setState({ radios, currentCountry: currentCountry.name });
  };
  handleLike = (radio) => {
    const radios = [...this.state.radios];
    const index = radios.indexOf(radio);
    radios[index] = { ...radios[index] };
    radios[index].liked = !radios[index].liked;
    this.setState({ radios });
    const user=auth.getCurrentUser();
    updateLike(user,radio);
  };
  handlePlay = (radio) => {
    const radios = [...this.state.radios];
    for (let item of radios) {
      if (item.i === radio.i) {
        item.isPlaying = radio.isPlaying;
      } else {
        item.isPlaying = false;
      }
    }
    radio.isPlaying = true;
    this.setState({ radios, currentPlay: radio });
    this.playAudio();
  };
  handleSimplePlay = () => {
    let currentPlay = { ...this.state.currentPlay };
    currentPlay.isPlaying = !currentPlay.isPlaying;
    this.setState({ currentPlay });
    const audio = document.getElementById("audioplayer");
    if (currentPlay.isPlaying === true) {
      this.playAudio();
    } else {
      audio.pause();
    }
  };
  playAudio = () => {
    const audio = document.getElementById("audioplayer");
    var playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          audio.play();
        })
        .catch((error) => {
          audio.play();
        });
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
  handleHide = () => {
    if (this.state.position.left === 0) {
      this.setState({ position: { left: "-35vw" } });
    } else {
      this.setState({ position: { left: 0 } });
    }
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
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      currentPlay,
      position,
      currentCountry,
      country,
    } = this.state;
    //const { user } = this.props;

    //if (count === 0) return <p>There are no radios in the database</p>;

    const { totalCount, radios } = this.getPagedData();
    return (
      <React.Fragment>
        <div className="discover" style={position}>
          <div className="radio-header">
            <Link to="/shop/country">
              <div className="history-control clickable">
                <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
                <span> Back</span>
              </div>
            </Link>
            <InputBase
              className="form-search"
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
          <CountryCloud country={country} />
          <div className="radio-body">
            <h1>{currentCountry ? currentCountry : "Country"}</h1>
            <p>We got {totalCount} radios for you.</p>
            <RadiosTable
              radios={radios}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              onPlay={this.handlePlay}
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
        {/* <Radios currentPlay={currentPlay} onPlay={this.handleSimplePlay}/> */}
      </React.Fragment>
    );
  }
}

export default CountryDetail;
