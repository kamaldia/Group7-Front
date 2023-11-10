import "./Carousel.css";
import React, { useState, useEffect } from "react";
import left from "../../assets/images/left-arrow.svg";
import right from "../../assets/images/right-arrow.svg";

const Carousel = () => {
  const [carousels, setCarousels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarousels = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/api/carousels");
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setCarousels(json);
      }
      setIsLoading(false);
    };
    fetchCarousels();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carousels.length);
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, carousels.length]);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carousels.length) % carousels.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carousels.length);
  };

  return (
    <div className="carousel">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="button-container">
            <button onClick={goToPrevSlide} className="previous-button">
              <img src={left} />
            </button>
          </div>
          {carousels.map((carousel, index) => (
            <div
              key={index}
              className={`carousel-slide ${
                index === currentIndex ? "active" : ""
              }`}
            >
              <img
                src={`http://localhost:4000/${carousel.image}`}
                alt={`Image ${index + 1}`}
                className="carousel-image"
              />
            </div>
          ))}
          <div className="button-container">
            <button onClick={goToNextSlide} className="next-button">
              <img src={right} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
