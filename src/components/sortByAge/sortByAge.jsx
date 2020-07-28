import React, { Component } from "react";
import HorizontalScroll from "react-scroll-horizontal";
import Age from "./age";
import "./age.scss";

class SortByAge extends Component {
  state = {
    age: [],
  };
  async componentDidMount() {

  }

  render() {
    const parent = { width: `100%`, height: `35vh`, marginTop: "0vh"};
    return (
      <div className="content">
        <div style={{ width: "100%", position: "relative" }}>
          <div className="age-header">
            <span className="number left">00s</span>
            <div className="slash"></div>
            <h1>Ages</h1>
            <div className="slash"></div>
            <span className="number right">30s</span>
          </div>

          <HorizontalScroll style={parent} >
            <Age label="00s" id="303" />
            <Age label="90s" id="219" />
            <Age label="80s" id="218" />
            <Age label="70s" id="217" />
            <Age label="60s" id="216" />
            <Age label="50s" id="215" />
            <Age label="40s" id="214" />
            <Age label="30s" id="213" />
          </HorizontalScroll>
        </div>
      </div>
    );
  }
}

export default SortByAge;
