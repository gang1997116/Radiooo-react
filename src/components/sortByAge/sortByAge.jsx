import React, { Component } from "react";
import HorizontalScroll from "react-scroll-horizontal";
import Age from "./age";
import "./age.scss";
import { getAgeGenres } from "../../services/genreService";

class SortByAge extends Component {
  state = {
    age:[],
  };
  async componentDidMount() {
    const AgeGenres=await getAgeGenres();
    this.setState({age:AgeGenres.slice(1)});
  }
  
  render() {
    const parent = { width: `100%`, height: `35vh`, marginTop: "0vh" };
    return (
      <div className="content">
        <div style={{width:"100%", position:"relative"}}>
        <div className="age-header">
          <span className="number left">00s</span>
          <div className="slash"></div>
          <h1>Ages</h1>
          <div className="slash"></div>
          <span className="number right">30s</span>
        </div>

        <HorizontalScroll style={parent}>
          <Age label="00s" id="303" />
          {this.state.age.reverse().map((age)=><Age key={age.id} label={age.name} id={age.id}/>)}
        </HorizontalScroll>
      </div>
      </div>
    );
  }
}

export default SortByAge;
