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
import logo from './img/firstlogo.svg';

class App extends Component {
  state = {
    currentPlay: {
      id: "12222",
      name: "Welcome to Radiooo",
      logo: logo,
      u: "http://64.37.50.226:8030/stream/",
    },
    favorites:[],
  };
  componentDidMount() {
    const user = auth.getCurrentUser();
    if(user){
      this.setState({ user });
    db.collection("users")
    .doc(user.email)
    .onSnapshot((doc) => {
      this.setState({ favorites: doc.data().favorites||[] });
    });
    }
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
    if("isPlaying" in radio){
      radio.isPlaying = true;
    }
      var xhr = new XMLHttpRequest();
      xhr.open("GET", `https://secure-earth-03984.herokuapp.com/http://yp.shoutcast.com/sbin/tunein-station.m3u?id=${radio.id}`);
      xhr.overrideMimeType("audio/x-mpegurl"); // Needed, see below.
      xhr.onload = ()=>{
      var parsers = require("playlist-parser");
      var M3U = parsers.M3U;
      var playlist = M3U.parse(xhr.response);
      //radio.u=playlist[0].file;
      try{radio.u=playlist[0].file;}
      catch{radio.u="http://64.37.50.226:8030/stream/";}
      let currentPlay={...radio};
      currentPlay.isPlaying=true;
      this.setState({currentPlay});
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

  playNext=()=>{
    const radiolist = localStorage.getItem('radiolist');
    const list=JSON.parse(radiolist);
    for(var i=0;i<list.length-1;i++){
      if(list[i].id===this.state.currentPlay.id){
        this.handlePlay(list[i+1]);
        break;
      }
    }
    if(i===list.length-1){
      this.handlePlay(list[0]);
    }
  }
  playLast=()=>{
    const radiolist = localStorage.getItem('radiolist');
    const list=JSON.parse(radiolist);
    for(let i=1;i<list.length;i++){
      if(list[i].id===this.state.currentPlay.id){
        this.handlePlay(list[i-1]);
      }
    }
  }
  playAudio = () => {
    const audio = document.getElementById("audioplayer");
    var playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          audio.play();
        })
        .catch(() => {
          audio.play();
        });
    }
  };
  render() {
    const { user, currentPlay,favorites } = this.state;
    const data=currentPlay?currentPlay:this.state.currentPlay;
    return (
      <Router>
        <ToastContainer/>

        <Radios
          user={user}
          currentPlay={data}
          onPlay={this.handleSimplePlay}
          onListPlay={this.handlePlay}
          favorites={favorites}
          onLike={this.handleLike}
          playNext={this.playNext}
          playLast={this.playLast}
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
                          currentPlay={data}
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
                          currentPlay={data}
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
                          currentPlay={data}
                          favorites={favorites}
                        />
                      )} />
                      <Route path="/shop/genresearch/:keyword" render={(props) => (
                        <SearchDetail
                          {...props}
                          onPlay={this.handlePlay}
                          user={user}
                          currentPlay={data}
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
