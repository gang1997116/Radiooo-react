import React, { Component } from "react";
import { Link } from "react-router-dom";
import AnimatedNumber from "animated-number-react";
import { getGenres, getSecondGenres } from "../services/genreService";
import { Tween } from "react-gsap";

class SortByCountry extends Component {
  state = {
    country: [],
    countryGroup: [],
    value: 0,
  };
  componentDidMount() {
    this.sortCountry();
  }

  sortCountry = async () => {
    const country = await getGenres();
    this.setState({ country });
    this.setState({ value: 275 });
    let countryGroup = [];
    for (let i = 0; i < 25; i++) {
      countryGroup[i] = {
        parent: country[i].name,
        children: [],
      };
    }
    const datas = country.map((c) => getSecondGenres(c.id));
    const foo = await Promise.all(datas);
    foo.forEach((data, i) => {
      countryGroup[i].children = data;
    });
    this.setState({ countryGroup });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  formatValue = (value) => value.toFixed(0);
  render() {
    const { countryGroup, value } = this.state;
    return (
      <div className="content">
        <AnimatedNumber
          value={value}
          duration={2000}
          formatValue={this.formatValue}
          className="dynamic-number"
        />
        <div className="country-bg">Genres</div>
        <div className="central-content">
          <Tween
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            duration={1}
            ease="back.out(1.7)"
          >
            {countryGroup.map((group, index) => (
              <div
                className="row"
                key={index}
                style={{
                  paddingLeft: "10vw",
                  paddingBottom: "3vh",
                  alignItems: "center",
                }}
              >
                <div className="col-3">
                  <h1
                    style={{
                      color: "#83580b",
                      fontSize: "6vh",
                      textAlign: "right",
                      paddingTop: "1vh",
                    }}
                  >
                    {group.parent}
                  </h1>
                </div>
                <div className="col-7">
                  {group.children != null &&
                    group.children.map((c) => (
                      <Link to={`/shop/country/${c.id}`} key={c.id}>
                        <span> </span>
                        <span
                          style={{
                            fontSize: "3vh",
                            width: "fit-content",
                            display: "inline-block",
                            fontFamily: "PT Sans",
                          }}
                        >
                          {c.name}
                          <div className="line"></div>
                        </span>

                        <span style={{ fontSize: "3.2vh" }}> / </span>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </Tween>
        </div>
      </div>
    );
  }
}

export default SortByCountry;
