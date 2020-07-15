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


class App extends Component {
state={
  
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
       
        <Radios user={user}/>
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
                    <Route path="/shop/genre/:genre" component={AgeDetail} />
                    <Route path="/shop/country" exact component={SortByCountry} />
                    <Route path="/shop/country/:country" component={CountryDetail} />
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
