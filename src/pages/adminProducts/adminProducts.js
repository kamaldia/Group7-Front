import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminProducts.css";
import SideNavbar from "../../components/SideNavbar/sideNavbar";

const AdminProducts = () => {
  const [productCategory, setProductCategory] = useState([]);
  const [images, setImages] = useState([]);

  const [refreshProducts, setRefreshProducts] = useState("");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    imagePath: null,
    attributes: {},
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/product/"
        );
        if (response.status == 200) {
          console.log("this is response in adminProducts: ", response)
          const json = response.data;
          setProducts(json);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/product/"
        );
        if (response.status == 200) {
          const json = response.data;
          setProductCategory(json);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, [refreshProducts]);

  const allcategories = productCategory.map(
    (category) => category.categoryName
  );

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const confirmUpdate = window.confirm(
      "Are you sure you want to update this Product?"
    );
    if (confirmUpdate) {
      try {
        const formData = new FormData();
        formData.append("name", editedProduct.name);
        formData.append("price", editedProduct.price);
        formData.append("category", editedProduct.category);
        formData.append("description", editedProduct.description);
        formData.append("featured", editedProduct.featured);

        if (images.length > 0) {
          images.forEach((image, index) => {
            formData.append(`imagePath`, image);
          });
        }
        formData.append("attributes", JSON.stringify(editedProduct.attributes));

        for (const value of formData.values()) {
          console.log(value);
        }

        const response = await axios.put(
          `http://localhost:8000/api/product/${editedProduct._id}`,
          formData
        );

        if (response.status == 200) {
          const updatedProduct = response.data;
          setProducts((prevProducts) =>
            prevProducts.map((Product) =>
              Product._id === updatedProduct._id ? updatedProduct : Product
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
        const response = await axios.delete(
          `http://localhost:8000/api/Product/${ProductId}`
        );

        if (response.status == 200) {
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
                src={`http://localhost:8000/${Product.imagePath[0]}`}
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
                  <label htmlFor="ProductName">Product Price:</label>
                  <input
                    type="number"
                    placeholder="Product Price"
                    value={editedProduct.price}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        price: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ProductCategory">Category:</label>
                  <select
                    value={editedProduct.categoryId?.categoryName}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        category: e.target.value,
                      })
                    }
                    required
                    className="option-category"
                  >
                    <option value="">Select a category</option>
                    {allcategories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="ProductImages" className="ProductKousa">
                    Product Images:
                  </label>
                  <input
                    className="ProductKousa-input"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    required
                  />
                </div>

                {(editedProduct.categoryId?.categoryName === "laptops" ||
                  editedProduct.categoryId?.categoryName === "phones") && (
                  <>
                    <div className="form-group">
                      <label htmlFor="ProductName">Storage:</label>
                      <input
                        type="text"
                        placeholder="Storage"
                        value={editedProduct.attributes.storage}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            attributes: { storage: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ProductName">Operating System:</label>
                      <input
                        type="text"
                        placeholder="Operating System"
                        value={editedProduct.attributes.operatingSystem}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            attributes: { operatingSystem: e.target.value },
                          })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="ProductName">Camera:</label>
                      <input
                        type="text"
                        placeholder="Camera Specification"
                        value={editedProduct.attributes.camera}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            attributes: { camera: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ProductName">Display:</label>
                      <input
                        type="text"
                        placeholder="Display Size"
                        value={editedProduct.attributes.display}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            attributes: { display: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ProductName">Battery:</label>
                      <input
                        type="text"
                        placeholder="Battery"
                        value={editedProduct.attributes.battery}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            attributes: { battery: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ProductName">Ram:</label>
                      <input
                        type="text"
                        placeholder="Ram Size"
                        value={editedProduct.attributes.ram}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            attributes: { ram: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ProductName">Cpu:</label>
                      <input
                        type="text"
                        placeholder="Cpu Name"
                        value={editedProduct.attributes.cpu}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            attributes: { cpu: e.target.value },
                          })
                        }
                      />
                    </div>
                  </>
                )}

                {editedProduct.categoryId?.categoryName !== "laptops" &&
                  editedProduct.categoryId?.categoryName !== "phones" && (
                    <>
                      <div className="form-group">
                        <label htmlFor="ProductName">Accessories Color:</label>
                        <input
                          type="text"
                          placeholder="Accessories Color"
                          value={editedProduct.attributes?.accessoriesColor}
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              attributes: { accessoriesColor: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="ProductName">Accessories Type:</label>
                        <input
                          type="text"
                          placeholder="Accessories Type"
                          value={editedProduct.attributes?.accessoriesType}
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              attributes: { accessoriesType: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="ProductName">Accessories Brand:</label>
                        <input
                          type="text"
                          placeholder="Accessories Brand"
                          value={editedProduct.attributes?.accessoriesBrand}
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              attributes: { accessoriesBrand: e.target.value },
                            })
                          }
                        />
                      </div>
                    </>
                  )}
                <div className="form-group">
                  <div className="featured-class">
                    <label
                      htmlFor="ProductName"
                      class="cyberpunk-checkbox-label"
                    >
                      Featured:
                    </label>
                    <input
                      class="cyberpunk-checkbox"
                      type="checkbox"
                      checked={editedProduct.featured}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          featured: e.target.checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="ProductName">Product Description:</label>
                  <textarea
                    rows="4"
                    cols="100"
                    placeholder="Product Description"
                    value={editedProduct.description}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        description: e.target.value,
                      })
                    }
                    required
                  ></textarea>
                </div>

                <div className="modalbuttons">
                  <button onClick={(e) => handleUpdateProduct(e)}>Save</button>
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
