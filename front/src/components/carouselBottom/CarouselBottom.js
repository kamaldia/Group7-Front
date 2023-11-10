import React from "react";
import "./CarouselBottom.css";
import Discover from "../../assets/images/Discover Icon.svg";
import Gift from "../../assets/images/Gift icon.svg";
import Ribbon from "../../assets/images/Ribbon Logo.svg";

const CarouselBottom = () => {
  return (
    <div className="main11">
      <div className="logo-images1">
        <div className="image-container">
          <img src={Discover} alt="Discover-logo" />
          <p>Discover</p>
        </div>
        <div className="image-container">
          <img src={Ribbon} alt="Ribbon-logo" />
          <p>Guarantee</p>
        </div>
        <div className="image-container">
          <img src={Gift} alt="Gift-logo" />
          <p>Gift Ideas</p>
        </div>
      </div>
    </div>
  );
};

export default CarouselBottom;
