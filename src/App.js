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

class App extends Component {
  state = {
    currentPlay: "",
    xPos: "0px",
    yPos: "0px",
  };
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  handleMouseOver = (e) => {
    const xmouse = e.clientX || e.pageX;
    const ymouse = e.clientY || e.pageY;
    var x = 0,
      y = 0;
    var dx = 0,
      dy = 0;
    if (!x || !y) {
      x = xmouse;
      y = ymouse;
    } else {
      dx = (xmouse - x) * 0.025;
      dy = (ymouse - y) * 0.025;
      if (Math.abs(dx) + Math.abs(dy) < 0.1) {
        x = xmouse;
        y = ymouse;
      } else {
        x += dx;
        y += dy;
      }
    }
    this.setState({
      xPos: x + "px",
      yPos: y + "px",
    });
  };

  render() {
    const { user } = this.state;
    const { xPos, yPos} = this.state;
    const moveStyle = {
      left: `${xPos}`,
      top: `${yPos}`,
    };
    return (
      <div onMouseMove={this.handleMouseOver}>
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
                      <Route path="/shop/genre/:genre" component={Radios} />
                      <Route path="/shop/country/:country" component={Radios} />
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
          <div className="mouse" style={moveStyle}></div>
          <Nav user={user} />
        </Router>
      </div>
    );
  }
}

export default App;
