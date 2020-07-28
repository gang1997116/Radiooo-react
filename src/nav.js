import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Logo from "./img/logo.svg";
import { Avatar } from "@material-ui/core";
import Lottie from "lottie-react-web";
import MenuAni from "./menu.json";
import Menu from "./components/menu/menu";

const useStyles = makeStyles((theme) => ({
  orange: {
    color: "white",
    backgroundColor: "#FACF87",
  },
}));

function Nav({ user }) {
  // const[direction,setDirection]=useState(1);
  const [isToggled, setToggle] = useState(false);
  const classes = useStyles();
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <div>
        <div
          className="menu-button clickable"
          onClick={() => {
            setToggle(!isToggled);
          }}
        >
          <Lottie
            direction={isToggled ? 1 : -1}
            options={{
              animationData: MenuAni,
              loop: false,
            }}
            width="50px"
          />
        </div>
      </div>
      <Menu isOpen={isToggled}  onClick={() => {
            setToggle(!isToggled);
          }}/>
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
}

export default Nav;
