import React, { Component } from "react";
import { Tween } from "react-gsap";

class LogoLoader extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          position: "absolute",
          top: "calc(45vh - 30px)",
          bottom: "0",
          left: "calc(50vw - 200px)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 39.29 39.64"
          width="300"
          height="60"
        >
          <Tween
            from={{
              svgDraw: 0,
            }}
            to={{
              svgDraw: 1,
            }}
            duration={2}
            delay={0.5}
          >
            <path
              fill="none"
              stroke="#FFC76C"
              strokeWidth="1.7"
              d="M30.55,32.13a14.49,14.49,0,0,1-3.61,2.38,16.05,16.05,0,0,1-5,1.55,20.16,20.16,0,0,1-5.32,0,16.94,16.94,0,0,1-5.37-1.83,20.33,20.33,0,0,1-4.93-3.71,19.61,19.61,0,0,1-4.75-8,17,17,0,0,1-.21-9A15.3,15.3,0,0,1,5.78,5.83a16.92,16.92,0,0,1,7.88-4.48,16,16,0,0,1,9,.33A19.52,19.52,0,0,1,31,6.92l3.89,4,0,0,13,13.33a8.37,8.37,0,0,0,6.3,3.05,8.57,8.57,0,0,0,6.17-2.68"
            />
            <path
              fill="none"
              stroke="#FFC76C"
              strokeWidth="1.7"
              d="M27.82,29.47a12.28,12.28,0,0,1-3.74,2.3A14.43,14.43,0,0,1,19,32.85a12.19,12.19,0,0,1-5.37-1.16,15.74,15.74,0,0,1-5.08-3.57,15.6,15.6,0,0,1-3.75-6.39,13.35,13.35,0,0,1-.17-7.09A12.6,12.6,0,0,1,8.17,8.49,14.4,14.4,0,0,1,14.49,4.8,12.27,12.27,0,0,1,21.63,5a16.41,16.41,0,0,1,6.68,4.21l4,4.13,0,0,13,13.33a13.58,13.58,0,0,0,5.88,3.72,10.75,10.75,0,0,0,6.2.15,12.2,12.2,0,0,0,5.5-3.22"
            />
            <path class="cls-2" d="M65.5,30.06,64.17,28.7" />
            <path
              fill="none"
              stroke="#FFC76C"
              strokeWidth="1.7"
              d="M25.3,26.94a8.66,8.66,0,0,1-2.52,1.51,10.1,10.1,0,0,1-3.72.89,9.91,9.91,0,0,1-4-.8,12.76,12.76,0,0,1-3.94-2.82,10.73,10.73,0,0,1-3.2-7.32,9,9,0,0,1,2.93-7.11,10.12,10.12,0,0,1,7.4-3.13,10.43,10.43,0,0,1,7.56,3.61l13,13.33.07-.06,4,4.1a17.7,17.7,0,0,0,7.48,4.76,14.38,14.38,0,0,0,8.08.24,15.84,15.84,0,0,0,7.14-4.08"
            />
            <path
              fill="none"
              stroke="#FFC76C"
              strokeWidth="1.7"
              d="M22.84,24.41a4.88,4.88,0,0,1-.82.52,9.8,9.8,0,0,1-1.89.79,5.46,5.46,0,0,1-2.1.1,6.36,6.36,0,0,1-2.21-.77,10.22,10.22,0,0,1-2.27-1.79,6.83,6.83,0,0,1-2-4.74,6,6,0,0,1,1.88-4.63,6.75,6.75,0,0,1,4.89-2.15,6.8,6.8,0,0,1,4.95,2.43l13,13.33,0,0s8.35,7.91,10.83,9a18.47,18.47,0,0,0,7.32,1.79A19,19,0,0,0,68,32.8"
            />
            <path
              fill="none"
              stroke="#FFC76C"
              strokeWidth="1.7"
              d="M78.2,7a14.68,14.68,0,0,1,3.61-2.38,16.05,16.05,0,0,1,5-1.55,20.24,20.24,0,0,1,5.33,0A16.89,16.89,0,0,1,97.51,4.9a20.19,20.19,0,0,1,4.94,3.71,19.48,19.48,0,0,1,4.74,8,16.89,16.89,0,0,1,.21,9A15.28,15.28,0,0,1,103,33.29a17,17,0,0,1-7.88,4.48,15.83,15.83,0,0,1-9-.33,19.61,19.61,0,0,1-8.29-5.24l-3.89-4,0,0L61,14.84c-1.93-2.05-4-3.1-6.29-3.06a8.59,8.59,0,0,0-6.18,2.68"
            />
            <path
              fill="none"
              stroke="#FFC76C"
              strokeWidth="1.7"
              d="M80.93,9.66a12.43,12.43,0,0,1,3.74-2.31,14.75,14.75,0,0,1,5.07-1.08,12.23,12.23,0,0,1,5.38,1.16A15.74,15.74,0,0,1,100.19,11a15.26,15.26,0,0,1,3.75,6.39,13.21,13.21,0,0,1,.17,7.08,12.58,12.58,0,0,1-3.52,6.15,14.36,14.36,0,0,1-6.32,3.69,12.3,12.3,0,0,1-7.15-.24,16.56,16.56,0,0,1-6.68-4.2l-4-4.14,0,0-13-13.33a13.52,13.52,0,0,0-5.88-3.73,10.84,10.84,0,0,0-6.2-.15,12.23,12.23,0,0,0-5.51,3.22"
            />
            <path
              fill="none"
              stroke="#FFC76C"
              strokeWidth="1.7"
              d="M83.46,12.19A8.43,8.43,0,0,1,86,10.67a10.15,10.15,0,0,1,3.72-.89,10,10,0,0,1,4,.8,12.72,12.72,0,0,1,3.93,2.82,10.7,10.7,0,0,1,3.2,7.32,9,9,0,0,1-2.93,7.11A10.06,10.06,0,0,1,90.54,31,10.45,10.45,0,0,1,83,27.35L70,14l-.07.07L66,10a17.57,17.57,0,0,0-7.48-4.75A14.33,14.33,0,0,0,50.39,5a15.93,15.93,0,0,0-7.14,4.08"
            />
            <path
              fill="none"
              stroke="#FFC76C"
              strokeWidth="1.7"
              d="M85.92,14.71a6.12,6.12,0,0,1,.81-.52,9.63,9.63,0,0,1,1.9-.79,5.4,5.4,0,0,1,2.09-.1,6.8,6.8,0,0,1,2.21.77,10.52,10.52,0,0,1,2.27,1.79,6.86,6.86,0,0,1,2,4.74,6,6,0,0,1-1.89,4.63,6.78,6.78,0,0,1-4.88,2.16,6.85,6.85,0,0,1-5-2.43l-13-13.33,0,0s-8.35-7.91-10.83-9A18.56,18.56,0,0,0,54.29.85,19.09,19.09,0,0,0,40.73,6.32"
            />
          </Tween>
        </svg>
      </div>
    );
  }
}

export default LogoLoader;