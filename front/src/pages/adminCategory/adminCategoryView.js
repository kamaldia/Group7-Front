import React, { useState, useEffect } from "react";
import "./adminCategoryView.css";
import SideNavbar from "../../components/SideNavbar/sideNavbar";

const AdminCategoryView = () => {
  const[refreshCategories,setRefreshCategories]=useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    categoryImage: null,
  });

  const [editedCategory, setEditedCategory] = useState({
    categoryName: "",
    categoryImage: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/categories");
        if (response.ok) {
          const json = await response.json();
          setCategories(json);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCategories();
  }, [refreshCategories]);

  const handleAddCategory = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("categoryName", newCategory.categoryName);
      formData.append("categoryImage", newCategory.categoryImage);

      const response = await fetch("http://localhost:4000/api/categories", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const newCategoryData = await response.json();
        setCategories((prevCategories) => [...prevCategories, newCategoryData]);
        setNewCategory({
          categoryName: "",
          categoryImage: null,
        });
        console.log("Category added successfully");
      } else {
        console.error("Failed to add category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateCategory = async (e) => {
    const confirmUpdate = window.confirm(
      "Are you sure you want to update this Category?"
    );
    e.preventDefault();

    if (confirmUpdate) {
      try {
        const formData = new FormData();
        if (editedCategory.categoryName) {
          formData.append("categoryName", editedCategory.categoryName);
        }
        if (editedCategory.categoryImage) {
          formData.append("categoryImage", editedCategory.categoryImage);
        }

        const response = await fetch(
          `http://localhost:4000/api/categories/${editedCategory._id}`,
          {
            method: "PUT",
            body: formData,
          }
        );

        if (response.ok) {
          const updatedCategory = await response.json();
          setCategories((prevCategories) =>
            prevCategories.map((category) =>
              category._id === updatedCategory._id ? updatedCategory : category
            )
          );

          console.log("Category updated successfully");
        } else {
          console.error("Failed to update category");
        }
      } catch (error) {
        console.error("Error:", error);
      }
      setIsCategoryModalOpen(false);
      setRefreshCategories(refreshCategories+"refresh");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Category?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/categories/${categoryId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setCategories((prevCategories) =>
            prevCategories.filter((category) => category._id !== categoryId)
          );
          console.log("Category deleted successfully");
        } else {
          console.error("Failed to delete category");
        }
      } catch (error) {
        console.error("Error:", error);
      }

    }
  };

  const handleCategoryNameChange = (e) => {
    setNewCategory({
      ...newCategory,
      categoryName: e.target.value,
    });
  };

  const handleCategoryImageChange = (e) => {
    setNewCategory({
      ...newCategory,
      categoryImage: e.target.files[0],
    });
  };

  return (
    <div className="adminCategoryView">
      <SideNavbar
        categories={true}
        products={false}
        blogs={false}
        contactus={false}
        admins={false}
      />

      <div className="adminCategoryMain">
        <h1 className="adminCategory">Admin Category</h1>

        <div className="add-Category">
          <div>
            <h2>Add New Category</h2>
          </div>
          <hr />
          <form className="addCategoryform" onSubmit={handleAddCategory}>
            <div className="forminputs-add-Category">
              <label htmlFor="categoryName">Category Name:</label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                value={newCategory.categoryName}
                onChange={handleCategoryNameChange}
                required
              />
            </div>
            <br />
            <br />

            <div className="forminputs-add-Category">
              <label htmlFor="categoryImage">Category Image:</label>
              <input
                type="file"
                id="categoryImage"
                name="categoryImage"
                onChange={handleCategoryImageChange}
                required
              />
            </div>

            <br />
            <br />

            <button type="submit">Add Category</button>
          </form>
        </div>

        <div className="category-list">
          {categories.map((category) => (
            <div className="category" key={category._id}>
              <img
                src={`http://localhost:4000/${category.categoryImage}`}
                alt={category.categoryName}
              />
              <div className="category-info">
                <h2>{category.categoryName.toUpperCase()}</h2>
                <div className="category-actions">
                  <button
                    onClick={() => {
                      setEditedCategory(category);
                      setIsCategoryModalOpen(true);
                      console.log(editedCategory);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteCategory(category._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <div className="testModal">
          <div className={`modal ${isCategoryModalOpen ? "open" : ""}`}>
            <div className="modal-content">
              <span
                className="close"
                onClick={() => setIsCategoryModalOpen(false)}
              >
                &times;
              </span>
              <h2>Edit</h2>

              <form>
                <div className="form-group">
                  <label htmlFor="categoryName">Category Name:</label>
                  <input
                    type="text"
                    id="categoryName"
                    name="categoryName"
                    value={editedCategory.categoryName}
                    onChange={(e) =>
                      setEditedCategory({
                        ...editedCategory,
                        categoryName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="categoryImage">Category Image:</label>
                  <input
                    type="file"
                    id="categoryImage"
                    name="categoryImage"
                    onChange={(e) =>
                      setEditedCategory({
                        ...editedCategory,
                        categoryImage: e.target.files[0],
                      })
                    }
                  />
                </div>
                <div className="modalbuttons">
                  <button onClick={(e) => handleUpdateCategory(e)}>Save</button>
                  <button onClick={() => setIsCategoryModalOpen(false)}>
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

export default AdminCategoryView;
