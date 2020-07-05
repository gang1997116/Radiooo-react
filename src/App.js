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
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
//import ProtectedRoute from './components/protectedRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import auth from "./services/authService";
import RadioImg from "./img/radio.svg";

class App extends Component {
  state = {
    currentPlay: "",
  };
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <Router>
        <ToastContainer />

        <img className="home-img" src={RadioImg} alt="" />
        <main>
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={450}
                  classNames="fade"
                >
       <Switch location={location}>
            <Route path="/" exact component={Radios} />
            <Route
              path="/shop"
              exact
              //render={(props) => <Radios {...props} user={user} />}
              render={() => <Radios user={user} />}
            />
            <Route path="/shop/:id" component={Radios} />

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
