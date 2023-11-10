import React, { useState, useEffect } from "react";
import "./adminProducts.css";
import SideNavbar from "../../components/SideNavbar/sideNavbar";

const AdminProducts = () => {
    const [refreshProducts, setRefreshProducts] = useState("");
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [editedProduct, setEditedProduct] = useState({
      name: "",
      imagePath: null,
    });

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch("http://localhost:4000/api/products");
          if (response.ok) {
            const json = await response.json();
            setProducts(json);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchProducts();
    }, [refreshProducts]);


    const handleUpdateProduct = async (e) => {
      const confirmUpdate = window.confirm(
        "Are you sure you want to update this Product?"
      );
      e.preventDefault();

      if (confirmUpdate) {
        try {
          const formData = new FormData();
          if (editedProduct.name) {
            formData.append("name", editedProduct.name);
          }
          if (editedProduct.imagePath) {
            formData.append("imagePath", editedProduct.imagePath);
          }

          const response = await fetch(
            `http://localhost:4000/api/products/${editedProduct._id}`,
            {
              method: "PUT",
              body: formData,
            }
          );

          if (response.ok) {
            const updatedProduct = await response.json();
            setProducts((prevProducts) =>
              prevProducts.map((Product) =>
                Product._id === updatedProduct._id
                  ? updatedProduct
                  : Product
              )
            );

            console.log("Product updated successfully");
          } else {
            console.error("Failed to update Product");
          }
        } catch (error) {
          console.error("Error:", error);
        }
        setIsProductModalOpen(false);
        setRefreshProducts(refreshProducts + "refresh");
      }
    };

    const handleDeleteProduct = async (ProductId) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Product?"
      );
      if (confirmDelete) {
        try {
          const response = await fetch(
            `http://localhost:4000/api/Products/${ProductId}`,
            {
              method: "DELETE",
            }
          );

          if (response.ok) {
            setProducts((prevProducts) =>
              prevProducts.filter((Product) => Product._id !== ProductId)
            );
            console.log("Product deleted successfully");
          } else {
            console.error("Failed to delete Product");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    return (
      <div className="adminProductsView">
        <SideNavbar
          categories={false}
          products={true}
          blogs={false}
          contactus={false}
          admins={false}
        />
        <div className="adminProductsMain">
          <h1 className="adminProductsMainHeader">Admin Products Page</h1>
 

          <div className="Product-list">
            {products.map((Product) => (
              <div className="Product" key={Product._id}>
                <img
                  src={`http://localhost:4000/${Product.imagePath[0]}`}
                  alt={Product.name}
                />
                <div className="Product-info">
                  <h2>{Product.name.toUpperCase()}</h2>
                  <div className="Product-actions">
                    <button
                      onClick={() => {
                        setEditedProduct(Product);
                        setIsProductModalOpen(true);
                        console.log(editedProduct);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteProduct(Product._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          <div className="testModal">
            <div className={`modal ${isProductModalOpen ? "open" : ""}`}>
              <div className="modal-content">
                <span
                  className="close"
                  onClick={() => setIsProductModalOpen(false)}
                >
                  &times;
                </span>
                <h2>Edit</h2>

                <form>
                  <div className="form-group">
                    <label htmlFor="name">Product Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={editedProduct.name}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="imagePath">Product Image:</label>
                    <input
                      type="file"
                      id="imagePath"
                      name="imagePath"
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          imagePath: e.target.files[0],
                        })
                      }
                    />
                  </div>
                  <div className="modalbuttons">
                    <button onClick={(e) => handleUpdateProduct(e)}>
                      Save
                    </button>
                    <button onClick={() => setIsProductModalOpen(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* modal end */}
        </div>
      </div>
    );
  };


export default AdminProducts;
