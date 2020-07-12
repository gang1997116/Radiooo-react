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
import "./App.css";
import auth from "./services/authService";
import SortByAge from "./components/sortByAge/sortByAge";
import AgeDetail from "./components/ageDetail";


class App extends Component {
  state = {
    currentPlay: {
      i: "12222",
      n: "welcome to Radiooo",
      l: "1-world-radio.jpg",
    },
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
                    <Route path="/shop/:id" exact component={Radios} />
                    <Route path="/shop/genre/:genre" component={AgeDetail} />
                    <Route path="/shop/country/:country" component={Radios} />
                    <Route path="/age" exact component={SortByAge} />
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
