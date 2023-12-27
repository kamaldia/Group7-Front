import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/footer";
import Card from "../../components/card/card";
import "./ProductsByCategory.css";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const ProductsByCategory = (props) => {
  const { categoryName } = useParams();
  const normalizedCategoryName =
    categoryName.toLowerCase(); /*.replace(/\s/g, "") */
  const upperCategoryName = categoryName.toUpperCase();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/product/${normalizedCategoryName}`
        );
        if (response.status != 200) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };
    fetchProductsByCategory();
  }, [normalizedCategoryName]);
  console.log("this is products: ", products)
  return (
    <>
      <Header />
      <Navbar />
      <div className="products-by-category-abc">
        <div className="category-name-filter-abc">{upperCategoryName}</div>
        <div className="card-container-abc2">
          {products.length > 0 ? (
            products.map((product) => (
              <Card
                key={product.id}
                image={`http://localhost:8000/${product.imagePath[0]}`}
                name={product.name}
                price={product.price}
                description={product.description}
                productId={product._id}
              />
            ))
          ) : (
            <Loading backgroundColor="#2f5a8e" textColor="white" />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ProductsByCategory;
