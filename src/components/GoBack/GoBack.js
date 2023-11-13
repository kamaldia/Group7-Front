import React from "react";
import "./GoBack.css";

const GoBack = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div onClick={handleGoBack}>
      <button className="gb_button" >
        <span className="gb_text">Go Back</span>
      </button>
    </div>
  );
};

export default GoBack;