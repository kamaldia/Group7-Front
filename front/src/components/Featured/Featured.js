import "./Featured.css";
import React, { useState, useEffect } from "react";

const Featured = () => {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchAds = async () => {
      const response = await fetch("http://localhost:4000/api/advertisements");
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setAds(json);
      }
      setIsLoading(false);
    };
    fetchAds();
  }, []);
  console.log("advertisements:" + ads);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setCurrentIndex1((prevIndex) => (prevIndex + 1) % ads.length);
    }, 3000);

    const interval2 = setInterval(() => {
      setCurrentIndex2((prevIndex) => (prevIndex + 1) % ads.length);
    }, 3000);
    console.log("indexes:" + currentIndex1, currentIndex2);
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [ads.length]);

  return (
    <div className="carousel-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="carousel-1">
            {[...ads, ...ads]
              .filter((ad, index) => index % 2 === 0)
              .map((ad, index) => (
                <div
                  key={index}
                  className={`carousel-slide-1 ${
                    index === currentIndex1 ? "active" : ""
                  }`}
                >
                  <img
                    src={`http://localhost:4000/${ad.image}`}
                    alt={`Image ${index + 1}`}
                    className="carousel-image-1"
                  />
                </div>
              ))}
          </div>
          <div className="carousel-1">
            {[...ads, ...ads]
              .filter((ad, index) => index % 2 === 1)
              .map((ad, index) => (
                <div
                  key={index}
                  className={`carousel-slide-1 ${
                    index === currentIndex1 ? "active" : ""
                  }`}
                >
                  <img
                    src={`http://localhost:4000/${ad.image}`}
                    alt={`Image ${index + 1}`}
                    className="carousel-image-1"
                  />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
