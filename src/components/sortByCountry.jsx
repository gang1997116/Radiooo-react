import React, { Component } from "react";
import { getCountry } from "../services/countryService";
import { Link } from "react-router-dom";
import AnimatedNumber from "animated-number-react";

class SortByCountry extends Component {
  state = {
    country: [],
    countryGroup: [],
    value:0,
  };
  componentDidMount() {
    this.sortCountry();
  }

  sortCountry=async()=>{
    const { data: country } = await getCountry();
    let sortedCountry = [...country.results];
    sortedCountry.sort((a, b) => a.name.localeCompare(b.name));
    this.setState({ country: sortedCountry,value:sortedCountry.length });
    let countryGroup = [];
    for (let i = 0; i < 26; i++) {
      countryGroup[i] = [];
    }
    let group = 0;
    for (let i = 0; i < sortedCountry.length - 1; i++) {
      if (sortedCountry[i + 1].name[0] !== sortedCountry[i].name[0]) {
        countryGroup[group].push(sortedCountry[i]);
        group++;
      } else {
        countryGroup[group].push(sortedCountry[i]);
      }
    }
    this.setState({ countryGroup });
  }
  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  formatValue = (value) => value.toFixed(0);
  render() {
    const { countryGroup,value } = this.state;
    return (
        <div className="content">
        <AnimatedNumber
          value={value}
          duration={1000}
          formatValue={this.formatValue}
          className="dynamic-number"
        />
        <div className="country-bg">Countries</div>
      <div className="central-content">
        {countryGroup.map((group, index) => (
          <div
            className="row"
            key={index}
            style={{ paddingLeft: "10vw", paddingBottom: "3vh",alignItems:"center"}}
          >
            
            <div className="col-1">
              {group.map((c, i) => {
                if (i === 0) {
                  return <h1 style={{ color: "#83580b",fontSize:"9vh",fontFamily:"Monoton",textAlign:"center",paddingTop:"1vh"}}> {c.name[0]} </h1>;
                }
                return null;
              })}
            </div>
            <div className="col-8">
              {group.map((c) => (
                <Link to={`/shop/country/${c.code}`} key={c.code}>
                  <span> </span>
                  <span style={{ fontSize: "3vh",width:"fit-content",display:"inline-block",fontFamily:"PT Sans" }} >
                    {c.name}
                    {/* <div className="line"></div> */}
                  </span>
                  
                  <span style={{ fontSize: "3.2vh" }}> / </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    );
  }
}

export default SortByCountry;
