import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Logo from "./img/Radiooo-logo.svg";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: "white",
    backgroundColor: "#FACF87",
  },
}));
const Nav = ({ user }) => {
  const classes = useStyles();

  return (
    <nav className="navbar navbar-expand-lg">

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav navbar-nav-right">
          <NavLink className="nav-item nav-link" to="/shop">
            Radios
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
            <Avatar>{user}</Avatar>
           
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
            <Avatar className={classes.orange}>
              {user.name.slice(0, 1).toUpperCase()}
            </Avatar>
            
          </React.Fragment>
        )}
        <NavLink to="/">
          <img className="logo" src={Logo} alt="" />
        </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
