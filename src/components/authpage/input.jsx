import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} style={{fontFamily:"'Balsamiq Sans', cursive"}}>{label}</label>
      <input
        autoFocus
        {...rest}
        name={name}
        id={name}
        className="form-control"
        style={{
          border: "1px solid grey",
          borderRadius: "3vh",
          backgroundColor: "transparent",
          height:"5.6vh"
        }}
      />
      {error && <div className="danger">{error}</div>}
    </div>
  );
};

export default Input;
