import "./Featured.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';

const Featured = () => {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchAds = async () => {
      try{
        const response = await axios.get(
          "http://localhost:8000/api/advertisement"
        );
        const json = response.data;
        console.log(json);
        if (response.status === 200) {
          setAds(json);
        }
      } catch(error){
        console.error(error)
      } finally {
        setIsLoading(false);
      }
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
                    src={`http://localhost:8000/${ad.image}`}
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
                    src={`http://localhost:8000/${ad.image}`}
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
