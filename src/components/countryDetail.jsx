import React, { Component } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import RadiosTable from "./radiotable/radiosTable";
import _ from "lodash";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputBase from "@material-ui/core/InputBase";
import CountryCloud from "./tagCloud";
import { Link } from "react-router-dom";
import { Tween } from "react-gsap";
import { getStations,getGenres, getGenreById } from "../services/genreService";
import LogoLoader from './logoLoader';


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
    isLoaded: false,
  };
  constructor(props) {
    super(props);
    this.audio = React.createRef();
  }
  async componentDidMount() {
    setTimeout(() => this.setState({ isLoaded: true }), 2000);
    
    const genre=await getGenreById(this.props.match.params.country);
    this.setState({currentCountry:genre});

    const radios=await getStations(this.props.match.params.country);
    radios.forEach((radio)=>radio.genre=genre);
    this.setState({radios});
    localStorage.setItem('radiolist', JSON.stringify(radios));
    const country  = await getGenres();
    this.setState({ country });
    //this.setState({ isLoaded: true });
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
        (m) => m.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
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
      currentCountry,
      country,
      isLoaded,
    } = this.state;

    const { currentPlay } = this.props;

    const { totalCount, radios } = this.getPagedData();
    return (
      <React.Fragment>
        <div>
        <LogoLoader />
          {isLoaded && (
            <Tween
              from={{ opacity: "0" }}
              to={{ opacity: "1" }}
              duration={0.35}
              ease="sine.out"
            >
              <div className="discover">
                <div className="radio-header">
                  <Link to="/shop/country">
                    <div className="history-control clickable">
                      <i
                        className="fa fa-chevron-circle-left"
                        aria-hidden="true"
                      ></i>
                      <span> Back</span>
                    </div>
                  </Link>
                  
                </div>
                <CountryCloud country={country} />
                <div className="radio-body">
                <InputBase
                    className="form-search"
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => this.handleSearch(e.currentTarget.value)}
                    startAdornment={
                      <InputAdornment
                        position="start"
                        style={{ color: "grey" }}
                      >
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </InputAdornment>
                    }
                  />
                  <h1>{currentCountry ? currentCountry : "Country"}</h1>
                  <p>We got {totalCount} radios for you.</p>
                  <RadiosTable
                    radios={radios}
                    sortColumn={sortColumn}
                    onLike={this.props.onLike}
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
        </div>
        {/* <Radios currentPlay={currentPlay} onPlay={this.handleSimplePlay}/> */}
      </React.Fragment>
    );
  }
}

export default CountryDetail;
