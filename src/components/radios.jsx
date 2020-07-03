import React, { Component } from "react";
import { getRadios } from "../services/radioService";
import { getGenres } from "../services/genreService";
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

class radios extends Component {
  state = {
    radios: [],
    genres: [],
    country: [],
    currentPlay: { i: "12222",n:"welcome to Radiooo",l:"1-world-radio.jpg" },
    isPlaying: false,
    pageSize: 5,
    searchQuery: "",
    selectedGenre: null,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };
constructor(props){
  super(props);
  this.audio = React.createRef();
}
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ i: "", c: "All Genres" }, ...data.results];
    const { data: radios } = await getRadios("ALL", "0", "ALL");
    const { data: country } = await getCountry();
    this.setState({ radios: radios.results, genres, country: country.results });
    this.replaceCountry();
  }
  replaceCountry = () => {
    const radios = [...this.state.radios];
    radios.map((radio) => {
      for (let item of this.state.country) {
        if (item.code === radio.c) {
          radio.c = item.name;
        }
      }
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
    radio.isPlaying=true;
    this.setState({ radios, currentPlay: radio });
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
  handleSimplePlay = () => {
    let currentPlay = { ...this.state.currentPlay };
    currentPlay.isPlaying = !currentPlay.isPlaying;
    this.setState({ currentPlay });
   
    const audio = this.audio.current;
    if (currentPlay.isPlaying === true) {
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
    } else {
      audio.pause();
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
    } = this.state;
    //const { user } = this.props;

    //if (count === 0) return <p>There are no radios in the database</p>;
    
    const { totalCount, radios } = this.getPagedData();

    return (
      <React.Fragment>
        <div
          style={{
            backgroundColor: "#FFFDF6",
            height: "90vh",
            width: "40vw",
            minHeight: "100%",
            paddingTop: "5vh",
            marginLeft: 0,
            marginRight: 0,
            zIndex: 10,
            position: "absolute",
          }}
        >
          {/* <div className="col-2" style={{marginLeft:"5vh"}}>
          <ListGroup
            items={this.state.genres.slice(0,8)}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div> */}
          <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
            {/* {user && (
            <Link to="/shop/new">
              <button className="btn btn-primary">New Radio</button>
            </Link>
          )} */}
            <p>Finding {totalCount} radios in the database.</p>
            <input
              className="form-control"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => this.handleSearch(e.currentTarget.value)}
            />
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
          <PlayControl data={currentPlay} onPlay={this.handleSimplePlay} />
          <Audio src={currentPlay.u} isPlaying={currentPlay.isPlaying} ref={this.audio}/>
        </div>
      </React.Fragment>
    );
  }
}

export default radios;
