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
import { db } from "./services/firebase";
import SortByAge from "./components/sortByAge/sortByAge";
import AgeDetail from "./components/ageDetail";
import SortByCountry from "./components/sortByCountry";
import "./App.css";
import CountryDetail from "./components/countryDetail";

class App extends Component {
  state = {
    currentPlay: {
      i: "12222",
      n: "welcome to Radiooo",
      l: "1-world-radio.jpg",
      u: "http://64.37.50.226:8030/stream/",
    },
  };
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
    db.collection("users")
      .doc("gang@163.com")
      .onSnapshot((doc) => {
        this.setState({ likeList: doc.data().favorites });
        console.log(this.state.likeList);
      });
  }
  handlePlay = (radio) => {
    radio.isPlaying = true;
    this.setState({ currentPlay: radio });
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
  render() {
    const { user, currentPlay, likeList } = this.state;

    return (
      <Router>
        <ToastContainer />

        <Radios
          user={user}
          currentPlay={currentPlay}
          onPlay={this.handleSimplePlay}
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
                        />
                      )}
                    />
                    <Route path="/shop/age" exact component={SortByAge} />
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
