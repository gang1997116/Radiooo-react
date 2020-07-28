import React, { useRef, useState } from "react";
import { Tween } from "react-gsap";

const Contact = () => {
  const titleContainer = useRef(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const handleMouseMove = (e) => {
    const width = titleContainer.current.clientWidth;
    const height = titleContainer.current.clientHeight;
    const marginHeight = window.innerHeight / 5;
    const oX = (e.nativeEvent.offsetX / width) * 100;
    const oY = ((e.nativeEvent.clientY - marginHeight) / height) * 100;
    setX(oX);
    setY(oY);
  };
  const handleMouseOUt = () => {
    setX(0);
    setY(0);
  };
  const maskStyle = {
    "--maskX": x,
    "--maskY": y,
  };
  return (
    <div className="content">
      <div
        className="titleContainer"
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOUt}
        ref={titleContainer}
        style={maskStyle}
      >
        <div className="titleWrapper">
          <h1 className="c-headline__headline c-word-reveal">
            <span>
              <Tween
                from={{ y: "100%", opacity: 0 }}
                delay={1}
                to={{ y: 0, opacity: 1 }}
                duration={0.5}
                ease="cubic-bezier(0.215, 0.61, 0.355, 1)"
              >
                <span>Contact</span>
              </Tween>
            </span>
          </h1>
        </div>
        <div className="titleWrapper cloneWrapper">
          <h1 className="c-headline__headline c-word-reveal">
            <span>
              <Tween
                from={{ y: "100%", opacity: 0 }}
                delay={1}
                to={{ y: 0, opacity: 1 }}
                duration={0.5}
                ease="cubic-bezier(0.215, 0.61, 0.355, 1)"
              >
                <span>Contact</span>
              </Tween>
            </span>
          </h1>
        </div>
      </div>

      <div className="contact-content">
        <div
          className="text-container"
        >
          <Tween
            from={{ opacity: 0,y:"100%" }}
            to={{ opacity: 1,y:0 }}
            duration={0.5}
            delay={1}
            ease="cubic-bezier(0.215, 0.61, 0.355, 1)"
          >
            <p>Kelly Zhong</p>
          </Tween>
        </div>
        <div
          className="text-container"
        >
          <Tween
            from={{ opacity: 0,y:"100%" }}
            to={{ opacity: 1,y:0 }}
            duration={0.5}
            delay={1}
            ease="cubic-bezier(0.215, 0.61, 0.355, 1)"
          >
             <p>+86 15542482022</p>
          </Tween>
        </div>
        <div
          className="text-container"
        >
          <Tween
            from={{ opacity: 0,y:"100%" }}
            to={{ opacity: 1,y:0 }}
            duration={0.5}
            delay={1}
            ease="cubic-bezier(0.215, 0.61, 0.355, 1)"
          >
            <p>gang1997116@163.com</p>
          </Tween>
        </div>
      </div>
    </div>
  );
};

export default Contact;
