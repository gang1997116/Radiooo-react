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
import PlayControl from "./playControl/playControl";
import Audio from "./playControl/audio";
import ControlButton from "./radiotable/control-button";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputBase from "@material-ui/core/InputBase";
import historyback from "../img/left.svg";
import historyforward from "../img/right.svg";

class radios extends Component {
  state = {
    radios: [],
    country: [],
    currentPlay: {
      i: "12222",
      n: "welcome to Radiooo",
      l: "1-world-radio.jpg",
    },
    isPlaying: false,
    pageSize: 5,
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
    const { data: radios } = await getRadios("ALL", "0", "ALL");
    this.setState({ radios: radios.results });
    if (this.props.match) {
      if (this.props.match.params.hasOwnProperty("genre")) {
        const { data: radios } = await getRadios(
          "ALL",
          "0",
          this.props.match.params.genre
        );
        this.setState({ radios: radios.results });
      } else if (this.props.match.params.hasOwnProperty("country")) {
        const { data: radios } = await getRadios(
          this.props.match.params.country,
          "0",
          "ALL"
        );
        this.setState({ radios: radios.results });
      }
    }

    const { data: country } = await getCountry();
    this.setState({ country: country.results });
    this.replaceCountry();
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
    //console.log('like clicked',radio);
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
    const audio = this.audio.current;
    if (currentPlay.isPlaying === true) {
      this.playAudio();
    } else {
      audio.pause();
    }
  };
  playAudio = () => {
    const audio = this.audio.current;
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
    } = this.state;
    //const { user } = this.props;

    //if (count === 0) return <p>There are no radios in the database</p>;

    const { totalCount, radios } = this.getPagedData();
    return (
      <React.Fragment>
        <div className="discover" style={position}>
          
            <div className="radio-header">
              <div className="history-control">
                <img src={historyback} alt="" onClick={()=>{this.props.history.go(-1);}}/>
                <img src={historyforward} alt="" onClick={()=>{this.props.history.go(1);}} />
              </div>
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
            <p>Finding {totalCount} radios.</p>
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
       
        <ControlButton position={position} onClick={this.handleHide} />
        <PlayControl data={currentPlay} onPlay={this.handleSimplePlay} />
        <Audio
          src={currentPlay.u}
          isPlaying={currentPlay.isPlaying}
          ref={this.audio}
        />
      </React.Fragment>
    );
  }
}

export default radios;
