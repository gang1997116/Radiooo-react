import React, { Component } from "react";

class About extends Component {
  state = {};
  render() {
    return (
      <div className="content" style={{ display: "block", overflow:"scroll" }}>
        <h1
          style={{
            fontFamily: "Bungee Shade",
            fontSize: "15vh",
            textAlign: "center",
            color: "black",
            marginTop: "15vh",
          }}
        >
          Keep radio on!
        </h1>
        <div style={{ padding: "8vh 12vw", fontSize: "3vh" }}>
          <p style={{fontStyle:"italic"}}>Forever 1964. Forever Pirate Radio.</p>
          <p>
            In 1964, those huge yachts floating on the British high seas Hidden
            secret base of pirate radio, and a group of deviant radio DJs
            Pirates radio station, broadcasts radio waves 24 hours a day,
            sending rock music to British land.
          </p>{" "}
          <p>
            {" "}
            The soul of Rock'n' Roll that burned 25 million young people Free
            music, boiling the blood of the whole land.
          </p>{" "}
          <p><b>RADIOOO</b>-Tribute to the fun and free soul of Pirate Radio.</p>
        </div>
      </div>
    );
  }
}

export default About;
