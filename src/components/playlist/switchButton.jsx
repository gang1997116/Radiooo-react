import React from "react";
import styled from "styled-components";

const Roll = styled.div`
  width: fit-content;
  height: 5vh;
  border: 1px solid #ddc49f;
  border-radius: 2.5vw;
  position: absolute;
  margin: -9vh auto;
  left: 0;
  right: 0;
`;

const Span = styled.span`
  line-height: 5vh;
  text-align: center;
`;
const SwitchButton = ({ state, onClick }) => {
  let position = { left: "1px" };
  if (state) {
    position = { left: "1px" };
  } else {
    position = { left: "calc(50% + 2px)" };
  }

  return (
    <Roll className="row" onClick={onClick}>
      <div className="sidebutton" style={position}></div>
      <Span
        className="col-6 align-middle"
        style={{ paddingLeft: "14px", paddingRight: "16px" }}
      >
        favorites
      </Span>
      <Span className="col-6 align-middle">history</Span>
    </Roll>
  );
};

export default SwitchButton;
