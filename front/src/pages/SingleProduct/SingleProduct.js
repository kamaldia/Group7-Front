import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SingleProduct.css";
import leftArrow from "../../assets/Logo/leftArrow.svg";
import rightArrow from "../../assets/Logo/rightArrow.svg";
import Slider from "react-slick";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/footer";
import GoBack from "../../components/GoBack/GoBack";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

export default function SingleProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
        console.log(data)
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
        setLoading(false); 
      }
    };

    fetchProduct();
  }, [productId]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <img className="arrow1-abc" src={leftArrow} alt="Left Arrow" />,
    nextArrow: (
      <img className="arrow1-abc" src={rightArrow} alt="Right Arrow" />
    ),
    style: {
      width: "20vw",
      height: "70vh",
      borderRadius: "30px",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      background:
        "linear-gradient(154deg, #105AB2 38%, rgba(255, 255, 255, 0.00) 128.25%)",
    },
  };

  return (
    <>
      <Header />
      <Navbar />
      {loading ? (
        <Loading backgroundColor="white" textColor="#105ab2" />
      ) : (
        <>
          <div className="SingleProduct_name-abc">
            {product !== null && (
              <span className="product_name-abc">{product.description}</span>
            )}
            <GoBack />
          </div>
          <div className="SingleProduct-abc">
            <div className="carousel_container-abc">
              {product !== null && (
                <Slider {...settings}>
                  {product.imagePath.map((image, index) => (
                    <div key={index}>
                      <img
                        className="cimage-abc"
                        src={"http://localhost:4000/" + image}
                        alt={`${index}`}
                      />
                    </div>
                  ))}
                </Slider>
              )}
            </div>
            <div className="SingleProduct_desc-abc">
              {product !== null && (
                <h3>
                  $ <span>{product.price}</span>
                </h3>
              )}
              <form className="SingleProduct_form-abc">
                <ul>
                  {product !== null && (
                    <li>
                      <span className="label-abc">Brand: </span>
                      {product.name}
                    </li>
                  )}
                  {product !== null && (
                    <li>
                      <span className="label-abc">Description: </span>{" "}
                      {product.description}
                    </li>
                  )}

                  {/* Laptop/Phone attributes */}
                  {product !== null && product.attributes.operatingSystem && (
                    <li>
                      <span className="label-abc">Operating System (OS): </span>
                      {product.attributes.operatingSystem}
                    </li>
                  )}
                  {product !== null && product.attributes.camera && (
                    <li>
                      <span className="label-abc">Camera: </span>
                      {product.attributes.camera}
                    </li>
                  )}
                  {product !== null && product.attributes.display && (
                    <li>
                      <span className="label-abc">Display: </span>{" "}
                      {product.attributes.display}
                    </li>
                  )}
                  {product !== null && product.attributes.battery && (
                    <li>
                      <span className="label-abc">Battery: </span>
                      {product.attributes.battery}
                    </li>
                  )}
                  {product !== null && product.attributes.ram && (
                    <li>
                      <span className="label-abc">RAM: </span>
                      {product.attributes.ram}
                    </li>
                  )}
                  {product !== null && product.attributes.cpu && (
                    <li>
                      <span className="label-abc">CPU: </span>
                      {product.attributes.cpu}
                    </li>
                  )}
                  {product !== null && product.attributes.storage && (
                    <li>
                      <span className="label-abc">Storage: </span>
                      {product.attributes.storage}
                    </li>
                  )}
                  {/* Accessories attributes */}
                  
                  {product !== null && product.attributes.accessoriesType && (
                    <li>
                      <span className="label-abc">Type: </span>
                      {product.attributes.accessoriesType}
                    </li>
                  )}
                  {product !== null && product.attributes.accessoriesColor && (
                    <li>
                      <span className="label-abc">Color: </span>
                      {product.attributes.accessoriesColor}
                    </li>
                  )}
                </ul>
              </form>
            </div>
          </div>
        </>
      )}
      {!loading && <Footer />}
    </>
  );
}