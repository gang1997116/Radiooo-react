import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Nav from "./nav";
import About from "./about";
import Radios from "./components/radios";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import NewForm from "./components/newForm";
import Logout from "./components/logout";
import ProtectedRoute from './components/protectedRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import auth from "./services/authService";


class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <Router>
        <ToastContainer />
        <Nav user={user} />
        <main className="container">
          <Switch>
            <Route path="/" exact component={Radios} />
            <Route path="/about" component={About} />
            <Route
              path="/shop"
              exact
              //render={(props) => <Radios {...props} user={user} />}
              render={()=><Radios user={user} />}
            />
            <ProtectedRoute
              path="/shop/:id"
              component={NewForm}
            />
            <Route path="/shop/new" component={NewForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;
