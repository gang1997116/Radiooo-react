import React, { Component } from "react";
import randomColor from "randomcolor";
import TagCloud from "react-tag-cloud";


class CountryCloud extends Component {
  state = {
    country: [],
  };
  async componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 10000);
  }
  render() {
    const { country } = this.props;
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
              <div key={c.id}>{c.name}</div>
            ))}
          </TagCloud>
        </div>
      </div>
    );
  }
}

export default CountryCloud;
