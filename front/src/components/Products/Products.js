import React from "react";
import "./Products.css";
import { useState, useEffect } from "react";
import Card from "../../components/card/card";
// import { faE } from "@fortawesome/free-solid-svg-icons";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState("phones");

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
          <p>SMARTPHONES</p>
        </p>
        <p
          onClick={() => {
            setFeatured("phone accessories");
          }}
        >
          <p> SMARTPHONE ACCESSORIES</p>
        </p>
        <p
          onClick={() => {
            setFeatured("laptops");
          }}
        >
          <p>LAPTOPS</p>
        </p>
        <p
          onClick={() => {
            setFeatured("laptop accessories");
          }}
        >
          <p> LAPTOP ACCESSORIES</p>
        </p>
      </div>
      <div className="site-wrap">
        <div className="pro-header1">
          {products.map((product, index) => (
            <div>
              {product.categoryId.categoryName === featured &&
                product.featured && (
                  <Card
                    key={product._id}
                    image={`http://localhost:4000/${product.imagePath[0]}`}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    productId={product._id}
                  />
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
