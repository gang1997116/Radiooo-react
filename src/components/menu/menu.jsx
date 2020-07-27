import React, { useEffect, useState } from "react";
import Menulist from "./menulist";
import { PlayState, Tween } from "react-gsap";

const style = {
  open: {
    left: "0",
    transition: "left 0.3s ease-in",
  },
  close: {
    left: "-40%",
    transition: "left 0.3s ease-out",
  },
  unvisible: {
    opacity: "0",
    zIndex: -1,
  },
};
const route = [
  { label: "Home", link: "" },
  { label: "Ages", link: "age" },
  { label: "Countries", link: "country" },
  { label: "Search", link: "search" },
];
const smallRoute = [
  { label: "About", link: "about", style: { fontSize: "1.9vw" } },
  { label: "Contact", link: "", style: { fontSize: "1.9vw" } },
];
const Menu = ({ isOpen, onClick }) => {
  const [playState, setState] = useState(PlayState.play);
  useEffect(() => {
    if (playState === PlayState.stop) {
      setState(PlayState.play);
    } else {
      setState(PlayState.stop);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  return (
    <React.Fragment>
      <div className="menu-panel" style={isOpen ? style.open : style.close}>
        <ul className="menu-content">
          <Tween
            from={{ opacity: "0", y: "30" }}
            to={{ opacity: "1", y: "0" }}
            stagger={0.1}
            duration={0.35}
            ease="sine.out"
            playState={playState}
          >
            {route.map((item, index) => (
              <div key={index}>
                <Menulist
                  label={item.label}
                  link={item.link}
                  onClick={onClick}
                />
              </div>
            ))}
            <div className="h_div"></div>
            {smallRoute.map((item, index) => (
              <div key={4 + index}>
                <Menulist
                  label={item.label}
                  link={item.link}
                  style={item.style}
                  onClick={onClick}
                />
              </div>
            ))}
          </Tween>
        </ul>
      </div>
      <div className="menu-bg" style={!isOpen ? style.unvisible : null} onClick={onClick}></div>
    </React.Fragment>
  );
};

export default Menu;
