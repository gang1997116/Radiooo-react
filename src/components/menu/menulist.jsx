import React from "react";
import { Link } from "react-router-dom";

const Menulist = ({label,style,link,onClick}) => {
  
return (
    <li style={style} onClick={onClick}>
      <div className="line" style={style?{marginBottom:"0.8vw"}:null}></div>
      <Link to={`/shop/${link}`}>{label}</Link>
    </li>
  );
};

export default Menulist;
