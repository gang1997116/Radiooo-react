import React, { Component } from "react";
import HorizontalScroll from "react-scroll-horizontal";
import Age from "./age";
import "./age.scss";

class SortByAge extends Component {
  state = {};
  render() {
    const parent = { width: `100%`, height: `35vh`, marginTop: "24vh" };
    return (
      <div className="content">
        <div className="age-header">
            <span className="number left">00s</span>
          <div className="pre slash"></div>
          <h1>Ages</h1>
          <div className="next slash"></div>
          <span className="number right">40s</span>
        </div>

        <HorizontalScroll style={parent}>
          <Age label="00" id="1" />
          <Age label="90" id="7"/>
          <Age label="80" id="6"/>
          <Age label="70" id="5"/>
          <Age label="60" id="4"/>
          <Age label="50" id="3"/>
          <Age label="40" id="2"/>
        </HorizontalScroll>
      </div>
    );
  }
}

export default SortByAge;
