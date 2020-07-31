import React, { Component } from "react";
import Pagination from "../pagination";
import { paginate } from "../../utils/paginate";
import RadiosTable from "../radiotable/radiosTable";
import _ from "lodash";
import auth from "../../services/authService";
import { updateLike, removeLike } from "../../services/firebase";
import { db } from "../../services/firebase";
import SwitchButton from "./switchButton";
import { PlayState, Tween } from "react-gsap";

class Playlist extends Component {
  state = {
    radios: [],
    pageSize: 6,
    searchQuery: "",
    selectedGenre: null,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    buttonState: true,
    history: [],
    right: 0,
    playState: PlayState.stop,
    user: {},
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
    if (user) {
      db.collection("users")
        .doc(user.email)
        .onSnapshot((doc) => {
          this.setState({ radios: doc.data().favorites || [] });
        });

      db.collection("users")
        .doc(user.email)
        .onSnapshot((doc) => {
          this.setState({ history: doc.data().history || [] });
        });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.display !== this.props.display) {
      if (this.state.playState === PlayState.stop) {
        this.setState({ playState: PlayState.play });
      } else {
        this.setState({ playState: PlayState.stop });
      }
    }
  }
  handleLike = (radio) => {
    const radios = [...this.state.radios];
    const user = auth.getCurrentUser();
    radio.liked = !radio.liked;
    if (radio.liked === true) {
      updateLike(user, radio);
    } else {
      removeLike(user, radios, radio);
    }
  };
  handleSwitch = () => {
    const { buttonState } = this.state;
    this.setState({ buttonState: !buttonState });
    this.forceUpdate();
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
      pageSize,
      currentPage,
      sortColumn,
      buttonState,
      history,
    } = this.state;

    let filtered = buttonState ? allradios : history;
    // let reverse=_.cloneDeep(filtered);
    // reverse.reverse();
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const radios = paginate(sorted, currentPage, pageSize);
    if (!buttonState) {
      this.replaceFavorite(radios);
    }

    return { totalCount: filtered.length, radios: radios };
  };

  render() {
    //const { length: count } = this.state.radios;
    const {
      pageSize,
      currentPage,
      sortColumn,
      buttonState,
      playState,
    } = this.state;

    const { currentPlay, display } = this.props;

    const { totalCount, radios } = this.getPagedData();
    const style = {
      open: {
        right: "0",
        transition: "all 0.15s cubic-bezier(0.07, 0.67, 0.54, 0.91)",
      },
      close: {
        right: "-33vw",
        transition: "right 0.1s ease-out",
        boxShadow: "none",
      },
    };

    return (
      <React.Fragment>
        <div
          className="playlist"
          style={display === "block" ? style.open : style.close}
        >
          <SwitchButton state={buttonState} onClick={this.handleSwitch} />
          <Tween
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            duration={0.25}
            playState={playState}
          >
            <div className="playlist-table hidescrollbar">
              <RadiosTable
                radios={radios}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                onPlay={this.props.onPlay}
                isPlaying={currentPlay.isPlaying}
                isList={true}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePagechange}
              />
            </div>
          </Tween>
        </div>
      </React.Fragment>
    );
  }
}

export default Playlist;
