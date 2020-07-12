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
    <React.Fragment>
      {/* <ul className="nav">
        <NavLink className="nav-item nav-link" to="/shop">
          Radios
        </NavLink>

        <NavLink className="nav-item nav-link" to="/about">
          About
        </NavLink>
      </ul> */}
      <ul className="nav justify-content-end">
        {!user && (
          <React.Fragment>
            {/* <NavLink className="nav-item nav-link " to="/register">
              Register
            </NavLink> */}
            <NavLink className="nav-item nav-link " to="/login">
              <Avatar>{user}</Avatar>
            </NavLink>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <NavLink className="nav-item nav-link" to="/logout">
              Logout
            </NavLink>
            <Avatar className={classes.orange}>
              {user.name.slice(0, 1).toUpperCase()}
            </Avatar>
          </React.Fragment>
        )}
        </ul>
        <NavLink to="/">
          <img className="logo" src={Logo} alt="" />
        </NavLink>
      
    </React.Fragment>
  );
};

export default Nav;
