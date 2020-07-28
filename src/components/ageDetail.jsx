import React, { Component } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
//import ListGroup from "./listGroup";
import RadiosTable from "./radiotable/radiosTable";
import _ from "lodash";
//import { Link } from "react-router-dom";
//import { toast } from "react-toastify";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputBase from "@material-ui/core/InputBase";
import AgeWheel from "./sortByAge/ageWheel";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import { updateLike, removeLike } from "../services/firebase";
import { Tween } from "react-gsap";
import LogoLoader from "./logoLoader";
import { getStations } from "../services/genreService";

class AgeDetail extends Component {
  state = {
    radios: [],
    isPlaying: false,
    pageSize: 6,
    searchQuery: "",
    selectedGenre: null,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    isLoaded: false,
  };

  async componentDidMount() {
    setTimeout(() => this.setState({ isLoaded: true }), 2000);
    const radios = await getStations(this.props.match.params.genre);
    this.setState({ radios });
    localStorage.setItem("radiolist", JSON.stringify(radios));
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
      isLoaded,
    } = this.state;
    const { currentPlay } = this.props;

    //if (count === 0) return <p>There are no radios in the database</p>;

    const { totalCount, radios } = this.getPagedData();
    const { genre } = this.props.match.params;
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
                <Link to="/shop/genre">
                  <div className="history-control clickable">
                    <i
                      className="fa fa-chevron-circle-left"
                      aria-hidden="true"
                    ></i>
                    <span> Back</span>
                  </div>
                </Link>
                
              </div>
              <AgeWheel id={genre} />
              <div className="radio-body">
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
                <h1>
                  {genre === "303" ? "00s" : (Number(genre) - 210) * 10 + "s"}
                </h1>
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

export default AgeDetail;
