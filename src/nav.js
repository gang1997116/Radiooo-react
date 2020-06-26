import React from "react";
import "./App.css";
import { Link, NavLink } from "react-router-dom";

const Nav = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Radiooo
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/shop">
            Movies
          </NavLink>

          <NavLink className="nav-item nav-link" to="/about">
            About
          </NavLink>

          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link " to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link " to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link " to="/profile">
                {user.name}
              </NavLink>
              <NavLink className="nav-item nav-link " to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
