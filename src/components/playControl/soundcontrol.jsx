import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const PrettoSlider = withStyles({
  root: {
    width: 100,
    height: "fit-content",
    position: "absolute",
    top: "0vh",
    bottom: 0,
    left: "57vh",
    right: 0,
    margin: "auto auto",
    color: "#F9EED7",
  },
  thumb: {
    height: "1.5vh",
    width: "1.5vh",
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -4,
    marginLeft: 0,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
})(Slider);
export default function SoundControl({ mute,value,onChange }) {
  //const classes = useStyles();
  
  return (
    <div>
     
      {!mute && (
        <PrettoSlider
          value={value}
          onChange={onChange}
          aria-labelledby="continuous-slider"
        />
      )}
      {mute && (
        <PrettoSlider
          value={0}
          onChange={onChange}
          aria-labelledby="disabled-slider"
        />
      )}
    </div>
  );
}
