import React from "react";

const GenerateButton = ({ onClick }) => (
  <div className="generate-wrap">
    <button className="generate-btn" onClick={onClick} type="button">
      Generate My Interview Strategy
    </button>
  </div>
);

export default GenerateButton;
