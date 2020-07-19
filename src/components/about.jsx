import React, { Component } from "react";
import { Tween, SplitWords } from "react-gsap";






class About extends Component {
   
  state = {};
  render() {
    return (
      <div className="content">
        <div
          style={{
            display: "block",
            height: "80vh",
            overflowY: "scroll",
            marginTop: "10vh",
            position: "relative",
          }}
        >
         <div style={{position:"absolute",margin:"0 auto",left:0,right:0,width:"fit-content"}}>
            <Tween
              delay={1.5}
              from={{ opacity: "0", rotate: "3deg", y: "20" }}
              to={{ opacity: "1", rotate: "0", y: "0" }}
              stagger={0.5}
              ease="elastic.out(0.1, 0.15)"
            >
              <div
                style={{
                  fontFamily: "Bungee Shade",
                  fontSize: "7.5vw",
                  textAlign: "center",
                  color: "#332E25",
                  marginTop: "5vh",
                  display: "inline-block",
                }}
              >
                Keep radio on!
              </div>
            </Tween>
            </div>
          <div style={{ padding: "0 13vw",paddingTop:"calc(16vw + 5vh)", fontSize: "3vh" }}>
            <Tween
              from={{ y: "150px", opacity: "0" }}
              to={{ y: "0px", opacity: "1" }}
              ease="sine.out"
              duration={1}
            >
              <p style={{ fontStyle: "italic" }}>
                Forever 1964. Forever Pirate Radio.
              </p>
              <p>
                In 1964, those huge yachts floating on the British high seas
                Hidden secret base of pirate radio, and a group of deviant radio
                DJs Pirates radio station, broadcasts radio waves 24 hours a
                day, sending rock music to British land.
              </p>
              <p>
                The soul of Rock'n' Roll that burned 25 million young people
                Free music, boiling the blood of the whole land.
              </p>
              <p>
                <b>RADIOOO</b>-Tribute to the fun and free soul of Pirate Radio.
              </p>
            </Tween>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
