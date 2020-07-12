import React, { Component } from "react";
import randomColor from "randomcolor";
import TagCloud from "react-tag-cloud";
import { getCountry } from "../services/countryService";


class CountryCloud extends Component {
  state = {
    country: [],
  };
  async componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 10000);
    const { data: country } = await getCountry();
    this.setState({ country: country.results.slice(0,25) });
  }
  render() {
    const { country } = this.state;
    return (
      <div className="app-outer">
        <div className="app-inner">
          <TagCloud
            className="tag-cloud"
            style={{
              fontFamily: "sans-serif",
              //fontSize: () => Math.round(Math.random() * 20) + 16,
              fontSize:30,
              color: () =>
                randomColor({
                  hue: "orange",
                }),
              width: "100%",
              height: "100%",
              padding: 5,
            }}
          >
            {country.map((c) => (
              <div key={c.code}>{c.name}</div>
            ))}
          </TagCloud>
        </div>
      </div>
    );
  }
}

export default CountryCloud;
