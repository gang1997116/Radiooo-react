import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Nav from "./nav";
import Radios from "./components/radios";
import NotFound from "./components/notFound";
import LoginForm from "./components/authpage/loginForm";
import RegisterForm from "./components/authpage/registerForm";
import Logout from "./components/logout";
//import ProtectedRoute from './components/protectedRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "./services/authService";
import SortByAge from "./components/sortByAge/sortByAge";
import AgeDetail from "./components/ageDetail";
import SortByCountry from "./components/sortByCountry";
import "./App.css";
import CountryDetail from "./components/countryDetail";
import { db,updateHistory,removeLike,updateLike } from "./services/firebase";
import About from './components/about';
import Search from "./components/search/search";
import SearchDetail from './components/searchDetail';


class App extends Component {
  state = {
    currentPlay: {
      i: "12222",
      n: "welcome to Radiooo",
      l: "1-world-radio.jpg",
      u: "http://64.37.50.226:8030/stream/",
    },
    favorites:[],
  };
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
    db.collection("users")
    .doc(user.email)
    .onSnapshot((doc) => {
      this.setState({ favorites: doc.data().favorites||[] });
    });
  }
  handleLike = () => {
    const {user,favorites,currentPlay}=this.state;
    const data={...this.state.currentPlay};
    data.liked=!data.liked;
    if(currentPlay.liked){
      removeLike(user,favorites,data);
    }
    else{
      updateLike(user,data);
    }

    this.setState({currentPlay:data})
  };
  handlePlay = (radio) => {
    radio.isPlaying = true;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", `https://secure-earth-03984.herokuapp.com/http://yp.shoutcast.com/sbin/tunein-station.m3u?id=${radio.id}`);
      xhr.overrideMimeType("audio/x-mpegurl"); // Needed, see below.
      xhr.onload = ()=>{
  var parsers = require("playlist-parser");
  var M3U = parsers.M3U;
  var playlist = M3U.parse(xhr.response);
  radio.u=playlist[0].file;
  this.setState({currentPlay:radio});
  this.playAudio();
};
    xhr.send();

    updateHistory(this.state.user,radio);
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
  render() {
    const { user, currentPlay,favorites } = this.state;

    return (
      <Router>
        <ToastContainer />

        <Radios
          user={user}
          currentPlay={currentPlay}
          onPlay={this.handleSimplePlay}
          favorites={favorites}
          onLike={this.handleLike}
        />
        <main>
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={1000}
                  classNames="fade"
                >
                  <Switch location={location}>
                    <Route path="/" exact render={() => null} />
                    <Route
                      path="/shop"
                      exact
                      //render={(props) => <Radios {...props} user={user} />}
                      render={() => null}
                    />
                    <Route path="/shop/genre" exact component={SortByAge} />
                    <Route
                      path="/shop/genre/:genre"
                      render={(props) => (
                        <AgeDetail
                          {...props}
                          onPlay={this.handlePlay}
                          user={user}
                          currentPlay={currentPlay}
                          favorites={favorites}
                        />
                      )}
                    />
                    <Route
                      path="/shop/country"
                      exact
                      component={SortByCountry}
                    />
                    <Route
                      path="/shop/country/:country"
                      render={(props) => (
                        <CountryDetail
                          {...props}
                          onPlay={this.handlePlay}
                          user={user}
                          currentPlay={currentPlay}
                          favorites={favorites}
                        />
                      )}
                    />
                    <Route path="/shop/age" exact component={SortByAge} />
                    <Route path="/shop/about" exact component={About} />
                    <Route path="/shop/search" exact component={Search} />
                    <Route path="/shop/search/:keyword" render={(props) => (
                        <SearchDetail
                          {...props}
                          onPlay={this.handlePlay}
                          user={user}
                          currentPlay={currentPlay}
                          favorites={favorites}
                        />
                      )} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/register" component={RegisterForm} />
                    <Route path="/not-found" component={NotFound} />
                    <Redirect to="/not-found" />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        </main>

        <Nav user={user} />
      </Router>
    );
  }
}

export default App;
