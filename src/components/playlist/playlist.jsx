import React, { Component } from "react";
import Pagination from "../pagination";
import { paginate } from "../../utils/paginate";
import RadiosTable from "../radiotable/radiosTable";
import _ from "lodash";
import auth from "../../services/authService";
import { updateLike, removeLike } from "../../services/firebase";
import { db } from "../../services/firebase";
import SwitchButton from "./switchButton";


class Playlist extends Component {
  state = {
    radios: [],
    pageSize: 6,
    searchQuery: "",
    selectedGenre: null,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    buttonState:true,
    history:[],
  };

  componentDidMount() {
    const user=auth.getCurrentUser();
    if(user){
      db.collection("users")
      .doc(user.email)
      .onSnapshot((doc) => {
        this.setState({ radios: doc.data().favorites ||[]});
      });
      db.collection("users")
      .doc(user.email)
      .onSnapshot((doc) => {
        this.setState({ history: doc.data().history ||[]});
      });
    }
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.currentPlay.id !== this.props.currentPlay.id) {
  //     const radios = [...this.state.radios];
  //     const radio = this.props.currentPlay;
  //     for (let item of radios) {
  //       if (item.id === radio.id) {
  //         item.isPlaying = radio.isPlaying;
  //       } else {
  //         item.isPlaying = false;
  //       }
  //     }
  //     this.setState({ radios });
  //   }

  // }

  handleLike = (radio) => {
    const radios = [...this.state.radios];
    const user = auth.getCurrentUser();
    radio.liked=!radio.liked;
    if(radio.liked===true){
        updateLike(user, radio);
    }
    else{
        removeLike(user,radios,radio);
    }
  };
handleSwitch=()=>{
  const {buttonState}=this.state;
  this.setState({buttonState:!buttonState});
  this.forceUpdate();
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
  replaceFavorite = (radios) => {
    radios.map((radio) => {
      radio.liked = false;
      if (this.state.radios.some((item) => item.id === radio.id)) {
        radio.liked = true;
      }
      return null;
    });
  };
  getPagedData = () => {
    const {
      radios: allradios,
      selectedGenre,
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      history,
      buttonState,
    } = this.state;
    let filtered = buttonState?allradios:history;
    if (searchQuery)
      filtered = allradios.filter(
        (m) => m.n.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
      );
    else if (selectedGenre && selectedGenre.i)
      filtered = allradios.filter((m) => m.d === selectedGenre.i);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const radios = paginate(sorted, currentPage, pageSize);
    if(!buttonState){
      this.replaceFavorite(radios);
    }
    return { totalCount: filtered.length, radios: radios };
  };

  render() {
    //const { length: count } = this.state.radios;
    const { pageSize, currentPage, sortColumn,buttonState} = this.state;

    const { currentPlay,display } = this.props;

    const { totalCount, radios } = this.getPagedData();


    return (
      <React.Fragment>
        <div className="playlist" style={{display:`${display}`}}>
        <SwitchButton state={buttonState} onClick={this.handleSwitch}/>
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
        
      </React.Fragment>
    );
  }
}

export default Playlist;
