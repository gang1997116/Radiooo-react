import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";


const useStyles = makeStyles({
  root: {
    width: 150,
  },
});

export default function ContinuousSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  function handlemute(){
      setValue(0);
  };
  
  const PrettoSlider = withStyles({
    root: {
      color: '#52af77',
      height: 120,
      
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 12,
      borderRadius: 4,
    },
    rail: {
      height: 12,
      borderRadius: 4,
    },
  })(Slider);
 
  
  return (
    <div className={classes.root} id='slider'>
          <PrettoSlider
            //orientation="vertical"
            defaultValue={value}
            aria-label="slider"
          />
        <VolumeDown 
           onClick={handlemute}
        />
       
    </div>
  );
}
