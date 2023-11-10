import React from "react";
import "./Products.css";
import { useState, useEffect } from "react";
import Card from "../../components/card/card";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:4000/api/products");
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setProducts(json);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="site-wrapper1">
      <div className="header-titles">
        <p
          onClick={() => {
            setFeatured("phones");
          }}
        >
          <a>SMARTPHONES</a>
        </p>
        <p
          onClick={() => {
            setFeatured("phone accessories");
          }}
        >
          <a> SMARTPHONE ACCESSORIES</a>
        </p>
        <p
          onClick={() => {
            setFeatured("laptops");
          }}
        >
          <a>LAPTOPS</a>
        </p>
        <p
          onClick={() => {
            setFeatured("laptop accessories");
          }}
        >
          <a> LAPTOP ACCESSORIES</a>
        </p>
      </div>
      <div className="site-wrap">
        {!featured ? (
          <div className="pro-header1">
            {products.map((product, index) => (
              <div>
                {product.categoryId.categoryName == "phones" && (
                  <div className="card">
                    <div key={index} className="card-img">
                      <div className="img">
                        <img
                          src={`http://localhost:4000/${product.imagePath[0]}`}
                          alt={`Image ${index + 1}`}
                        />
                      </div>
                    </div>
                    <div className="card-title">iPhone 15</div>
                    <div className="card-subtitle">Description</div>
                    <hr className="card-divider" />
                    <div className="card-footer">
                      <div className="card-price">
                        <span>$</span> 123.45
                      </div>
                    </div>
                    <div className="button-container">
                      <button className="button2">View More</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="pro-header1">
            {products.map((product, index) => (
              <div>
                {product.categoryId.categoryName === featured && (
                  <div className="card">
                    <div key={index} className="card-img">
                      <div className="img">
                        <img
                          src={`http://localhost:4000/${product.imagePath[0]}`}
                          alt={`Image ${index + 1}`}
                        />
                      </div>
                    </div>
                    <div className="card-title">iPhone 15</div>
                    <div className="card-subtitle">Description</div>
                    <hr className="card-divider" />
                    <div className="card-footer">
                      <div className="card-price">
                        <span>$</span> 123.45
                      </div>
                    </div>
                    <div className="button-container">
                      <button className="button2">View More</button>
                    </div>
                  </div>
                )}
              </div>
            ))}{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
