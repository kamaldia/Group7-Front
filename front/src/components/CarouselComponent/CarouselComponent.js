import React from "react";
import "./CarouselComponent.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState, useEffect } from "react";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const CarouselComponent = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("http://localhost:4000/api/blogs");
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setBlogs(json);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px custom-height"
    >
      {blogs.map((blog, index) => {
        console.log(JSON.stringify(blog, null, 2));
        console.log(blog.image);
        return (
          <div key={index}>
            <div className="blogs-container">
              <img
                height="500"
                src={`http://localhost:4000/${blog.image}`}
                alt={blog.alt}
                className="w-100"
              />
              <div className="blogs-titles">
                <p className="blog-title">{blog.title}</p>
              </div>
              <div className="blog-date">
                <p>{blog.date}</p>
              </div>
              <div className="blog-content">
                <p>{blog.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default CarouselComponent;
