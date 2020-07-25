import React from "react";
import notFound from "../img/404.svg"
const NotFound = () => {
  return (
    <img
      style={{
        width: "35vw",
        height:"100%",
        top: "0",
        left: "0",
        bottom:"0vh",
        right:0,
        position: "absolute",
        margin:"auto auto"
      }}
      src={notFound}
      alt="not found"
   />

  );
};

export default NotFound;
