import React, { useState, useEffect } from "react";
import "./adminAddProductPage.css";
import SideNavbar from "../../components/SideNavbar/sideNavbar";

const AdminAddProductPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [productCategory, setProductCategory] = useState([]);
  const [showExtraFields, setShowExtraFields] = useState(false);
  const [storage, setStorage] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [accessoriesColor, setAccessoriesColor] = useState("");
  const [camera, setCamera] = useState("");
  const [display, setDisplay] = useState("");
  const [battery, setBattery] = useState("");
  const [ram, setRam] = useState("");
  const [cpu, setCpu] = useState("");
  const [accessoriesType, setAccessoriesType] = useState("");
  const [accessoriesBrand, setAccessoriesBrand] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/categories");
        if (response.ok) {
          const json = await response.json();
          setProductCategory(json);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCategories();
  }, []);

  const allcategories = productCategory.map(
    (category) => category.categoryName
  );

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("featured", featured);

    images.forEach((image, index) => {
      formData.append("imagePath", image);
    });

    if (showExtraFields) {
      const attributes = {
        storage: storage,
        operatingSystem: operatingSystem,
        accessoriesColor: accessoriesColor,
        camera: camera,
        display: display,
        battery: battery,
        ram: ram,
        cpu: cpu,
        accessoriesType: accessoriesType,
        accessoriesBrand: accessoriesBrand,
      };
      formData.append("attributes", JSON.stringify(attributes));
    }

    for (const value of formData.values()) {
      console.log(value);
    }
    try {
      const response = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // Clear form fields after successful submission
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setImages([]);
        setStorage("");
        setOperatingSystem("");
        setAccessoriesColor("");
        setCamera("");
        setDisplay("");
        setBattery("");
        setRam("");
        setCpu("");
        setAccessoriesType("");
        setAccessoriesBrand("");
        setShowExtraFields(false);
      } else {
        console.error("Failed to create product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="adminProductsAddView">
<SideNavbar products={true}/>


      <div className="adminProductsAddMain">
        <h1 className="adminProductsAddMainHeader">Add Product</h1>
        <div className="add-Product">
          {/* added classname for buttons */}
          <div className="buttons-container-a">
            <button onClick={() => setShowExtraFields(false)}>
              Add Products
            </button>
            <button onClick={() => setShowExtraFields(true)}>
              Add Accessories
            </button>
          </div>
          <form className="addProductform" onSubmit={handleCreateProduct}>
            <div className="formUp">
              <div className="forminputs-add-Product">
                <label htmlFor="ProductName">Product Name:</label>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <br />
              <br />

              <div className="forminputs-add-Product">
                <label htmlFor="ProductName">Product Price:</label>
                <input
                  type="number"
                  placeholder="Product Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="forminputs-add-Product">
                <label htmlFor="ProductName">Category:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
              <div className="forminputs-add-Product">
                <label htmlFor="ProductName" className="ProductKousa">
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

              {!showExtraFields && (
                <>
                  <div className="forminputs-add-Product">
                    <label htmlFor="ProductName">Storage:</label>
                    <input
                      type="text"
                      placeholder="Storage"
                      value={storage}
                      onChange={(e) => setStorage(e.target.value)}
                    />
                  </div>
                  <div className="forminputs-add-Product">
                    <label htmlFor="ProductName">Operating System:</label>
                    <input
                      type="text"
                      placeholder="Operating System"
                      value={operatingSystem}
                      onChange={(e) => setOperatingSystem(e.target.value)}
                    />
                  </div>

                  <div className="forminputs-add-Product">
                    <label htmlFor="ProductName">Camera:</label>
                    <input
                      type="text"
                      placeholder="Camera Specification"
                      value={camera}
                      onChange={(e) => setCamera(e.target.value)}
                    />
                  </div>
                  <div className="forminputs-add-Product">
                    <label htmlFor="ProductName">Display:</label>
                    <input
                      type="text"
                      placeholder="Display Size"
                      value={display}
                      onChange={(e) => setDisplay(e.target.value)}
                    />
                  </div>
                  <div className="forminputs-add-Product">
                    <label htmlFor="ProductName">Battery:</label>
                    <input
                      type="text"
                      placeholder="Battery"
                      value={battery}
                      onChange={(e) => setBattery(e.target.value)}
                    />
                  </div>
                  <div className="forminputs-add-Product">
                    <label htmlFor="ProductName">Ram:</label>
                    <input
                      type="text"
                      placeholder="Ram Size"
                      value={ram}
                      onChange={(e) => setRam(e.target.value)}
                    />
                  </div>
                  <div className="forminputs-add-Product">
                    <label htmlFor="ProductName">Cpu:</label>
                    <input
                      type="text"
                      placeholder="Cpu Name"
                      value={cpu}
                      onChange={(e) => setCpu(e.target.value)}
                    />
                  </div>
                </>
              )}

              {showExtraFields && (
                <>
                  <div className="forminputs-add-Product">
                    <label htmlFor="ProductName">Accessories Color:</label>
                    <input
                      type="text"
                      placeholder="Accessories Color"
                      value={accessoriesColor}
                      onChange={(e) => setAccessoriesColor(e.target.value)}
                    />
                  </div>
                  <div className="forminputs-add-Product">
                    <label htmlFor="ProductName">Accessories Type:</label>
                    <input
                      type="text"
                      placeholder="Accessories Type"
                      value={accessoriesType}
                      onChange={(e) => setAccessoriesType(e.target.value)}
                    />
                  </div>
                  <div className="forminputs-add-Product">
                    <label htmlFor="ProductName">Accessories Brand:</label>
                    <input
                      type="text"
                      placeholder="Accessories Color"
                      value={accessoriesBrand}
                      onChange={(e) => setAccessoriesBrand(e.target.value)}
                    />
                  </div>
                </>
              )}
              <div className="forminputs-add-Product">
                <div className="featured-class">
                  <label htmlFor="ProductName" class="cyberpunk-checkbox-label">
                    Featured:
                  </label>
                  <input
                    class="cyberpunk-checkbox"
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                  />
                </div>
              </div>
            </div>

            <div className="formDownDescription">
              <div className="product-description-1">
                <div className="forminputs-add-Product">
                  <label htmlFor="ProductName">Product Description:</label>
                  <textarea
                    rows="4"
                    cols="100"
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="forminputs-add-Product">
              <button type="submit">Create Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProductPage;
