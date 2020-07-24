import React from "react";
import "./age.scss";
import { Link } from "react-router-dom";

const Age = ({ label, id, match}) => {
  return (
    <Link to={`/shop/genre/${id}`}>
      <div className={match===id?"age active":"age"}>{label}</div>
    </Link>
  );
};

export default Age;
