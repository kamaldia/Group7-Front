import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/footer";
import Card from "../../components/card/card";
import "./AllProducts.css";
import Loading from "../../components/Loading/Loading";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/products/`);
        if (!response.ok) {
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
  }, []);

  return (
    <>
      <Header />
      <Navbar />
      <div className="allproduct-container-abc">
        <div className="allproduct-name-abc">ALL PRODUCTS</div>
        <div className="card-container-abc1">
          {products.length > 0 ? (
            products.map((product) => (
              <Card
                key={product.id}
                image={`http://localhost:4000/${product.imagePath[0]}`}
                name={product.name}
                price={product.price}
                description={product.description}
                productId={product._id}
              />
            ))
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
