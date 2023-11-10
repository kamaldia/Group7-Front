import React from "react";
import "./Loading.css";
import ReactLoading from "react-loading";

export default function Loading({ backgroundColor, textColor }) {
  return (
    <div>
      <div
        className="loading_container-abc"
        style={{ backgroundColor, color: textColor }}
      >
        <ReactLoading type="spinningBubbles" color={textColor} />
      </div>
    </div>
  );
}