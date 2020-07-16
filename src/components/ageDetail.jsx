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
import AgeWheel from "./sortByAge/ageWheel";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import { updateLike } from "../services/firebase";
import Loader from 'react-loader-spinner'
import { Controls, PlayState, Tween } from 'react-gsap';

class AgeDetail extends Component {
  state = {
    radios: [],
    country: [],
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
    isLoaded:false,
    showLoader:false,
  };
  constructor(props) {
    super(props);
    this.audio = React.createRef();
  }
  async componentDidMount() {
    setTimeout(() => this.setState({ showLoader: true }), 200);
    setTimeout(() => this.setState({ isLoaded: true }), 2000);
    const { data: radios } = await getRadios("ALL", "0", "ALL");
    this.setState({ radios: radios.results });

    if (this.props.match.params.hasOwnProperty("genre")) {
      const { data: radios } = await getRadios(
        "ALL",
        "0",
        this.props.match.params.genre
      );
      this.setState({
        radios: radios.results,
        match: this.props.match.params.genre,
      });
    }
    const { data: country } = await getCountry();
    this.setState({ country: country.results });
    this.replaceCountry();
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
  replaceCountry = () => {
    const radios = [...this.state.radios];
    radios.map((radio) => {
      for (let item of this.state.country) {
        if (item.code === radio.c) {
          radio.cl = item.name;
        }
      }
      return null;
    });
    this.setState({ radios });
  };
  handleLike = (radio) => {
    const radios = [...this.state.radios];
    const index = radios.indexOf(radio);
    radios[index] = { ...radios[index] };
    radios[index].liked = !radios[index].liked;
    this.setState({ radios });
    const user = auth.getCurrentUser();
    updateLike(user, radio);
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
      isLoaded,
      showLoader
    } = this.state;
    const { currentPlay } = this.props;

    //if (count === 0) return <p>There are no radios in the database</p>;

    const { totalCount, radios } = this.getPagedData();
    const { genre } = this.props.match.params;
    return (
      <React.Fragment>
       <Loader
            type="Puff"
            color="#ddc49f"
            height={100}
            width={100}
            timeout={2000} //1 secs
            style={{
              position: "absolute",
              top: "calc(45vh - 50px)",
              bottom: "0",
              left: "calc(50vw - 55px)",
            }}
            visible={showLoader}
          />
        {isLoaded&&
         <Tween from={{opacity:"0"}} to={{ opacity:"1" }} duration={1} ease="back.out(1.7)">
        <div className="discover">
          <div className="radio-header">
            <Link to="/shop/genre">
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
          <AgeWheel id={genre} />
          <div className="radio-body">
            <h1>{genre === "1" ? "00s" : (2 + Number(genre)) * 10 + "s"}</h1>
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
        }
        {/* <Radios currentPlay={currentPlay} /> */}
      </React.Fragment>
    );
  }
}

export default AgeDetail;
