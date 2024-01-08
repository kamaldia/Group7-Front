import React from "react";
import "./Products.css";
import { useState, useEffect } from "react";
import Card from "../../components/card/card";
// import { faE } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState("phones");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/product");
        const json = response.data;
        console.log(response);
        if (response.status === 200) {
          setProducts(json);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="site-wrapper1">
      <div className="site-wrap">
        <div className="pro-header1">
          {products.map((product, index) => (
            <div>
              {product.categoryName === featured &&
                product.featured && (
                  <Card
                    key={product._id}
                    image={`http://localhost:8000/${product.imagePath[0]}`}
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
