import React, { useState, useEffect } from "react";
import "./adminCarousels.css";
import SideNavbar from "../../components/SideNavbar/sideNavbar";

const AdminCarousels = () => {
    const[refreshCarousels,setRefreshCarousels]=useState("");
    const [isCarouselModalOpen, setIsCarouselModalOpen] = useState(false);
    const [carousels, setCarousels] = useState([]);
    const [newCarousel, setNewCarousel] = useState({
      title: "",
      image: null,
    });
  
    const [editedCarousel, setEditedCarousel] = useState({
      title: "",
      image: null,
    });
  
    useEffect(() => {
      const fetchCarousels = async () => {
        try {
          const response = await fetch("http://localhost:4000/api/carousels");
          if (response.ok) {
            const json = await response.json();
            setCarousels(json);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
  
      fetchCarousels();
    }, [refreshCarousels]);
  
    const handleAddCarousel = async (e) => {
      e.preventDefault();
  
      try {
        const formData = new FormData();
        formData.append("title", newCarousel.title);
        formData.append("image", newCarousel.image);
  
        const response = await fetch("http://localhost:4000/api/carousels", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          const newCarouselData = await response.json();
          setCarousels((prevCarousels) => [...prevCarousels, newCarouselData]);
          setNewCarousel({
            title: "",
            image: null,
          });
          console.log("Carousel added successfully");
        } else {
          console.error("Failed to add Carousel");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    const handleUpdateCarousel = async (e) => {
      const confirmUpdate = window.confirm(
        "Are you sure you want to update this Carousel?"
      );
      e.preventDefault();
  
      if (confirmUpdate) {
        try {
          const formData = new FormData();
          if (editedCarousel.title) {
            formData.append("title", editedCarousel.title);
          }
          if (editedCarousel.image) {
            formData.append("image", editedCarousel.image);
          }
  
          const response = await fetch(
            `http://localhost:4000/api/carousels/${editedCarousel._id}`,
            {
              method: "PUT",
              body: formData,
            }
          );
  
          if (response.ok) {
            const updatedCarousel = await response.json();
            setCarousels((prevCarousels) =>
              prevCarousels.map((Carousel) =>
                Carousel._id === updatedCarousel._id ? updatedCarousel : Carousel
              )
            );
  
            console.log("Carousel updated successfully");
          } else {
            console.error("Failed to update Carousel");
          }
        } catch (error) {
          console.error("Error:", error);
        }
        setIsCarouselModalOpen(false);
        setRefreshCarousels(refreshCarousels+"refresh");
      }
    };
  
    const handleDeleteCarousel = async (CarouselId) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Carousel?"
      );
      if (confirmDelete) {
        try {
          const response = await fetch(
            `http://localhost:4000/api/carousels/${CarouselId}`,
            {
              method: "DELETE",
            }
          );
  
          if (response.ok) {
            setCarousels((prevCarousels) =>
              prevCarousels.filter((Carousel) => Carousel._id !== CarouselId)
            );
            console.log("Carousel deleted successfully");
          } else {
            console.error("Failed to delete Carousel");
          }
        } catch (error) {
          console.error("Error:", error);
        }
  
      }
    };
  
    const handletitleChange = (e) => {
      setNewCarousel({
        ...newCarousel,
        title: e.target.value,
      });
    };
  
    const handleimageChange = (e) => {
      setNewCarousel({
        ...newCarousel,
        image: e.target.files[0],
      });
    };
  
    return (
      <div className="adminCarouselView">
        <SideNavbar
          carousels={true}
        />
  
        <div className="adminCarouselMain">
          <h1 className="adminCarousel">Admin Carousel</h1>
  
          <div className="add-Carousel">
            <div>
              <h2>Add New Carousel</h2>
            </div>
            <hr />
            <form className="addCarouselform" onSubmit={handleAddCarousel}>
              <div className="forminputs-add-Carousel">
                <label htmlFor="title">Carousel Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newCarousel.title}
                  onChange={handletitleChange}
                  required
                />
              </div>
              <br />
              <br />
  
              <div className="forminputs-add-Carousel">
                <label htmlFor="image">Carousel Image:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleimageChange}
                  required
                />
              </div>
  
              <br />
              <br />
  
              <button type="submit">Add Carousel</button>
            </form>
          </div>
  
          <div className="Carousel-list">
            {carousels.map((Carousel) => (
              <div className="Carousel" key={Carousel._id}>
                <img
                  src={`http://localhost:4000/${Carousel.image}`}
                  alt={Carousel.title}
                />
                <div className="Carousel-info">
                  <h2>{Carousel.title.toUpperCase()}</h2>
                  <div className="Carousel-actions">
                    <button
                      onClick={() => {
                        setEditedCarousel(Carousel);
                        setIsCarouselModalOpen(true);
                        console.log(editedCarousel);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteCarousel(Carousel._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Modal */}
          <div className="testModal">
            <div className={`modal ${isCarouselModalOpen ? "open" : ""}`}>
              <div className="modal-content">
                <span
                  className="close"
                  onClick={() => setIsCarouselModalOpen(false)}
                >
                  &times;
                </span>
                <h2>Edit</h2>
  
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Carousel Title:</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={editedCarousel.title}
                      onChange={(e) =>
                        setEditedCarousel({
                          ...editedCarousel,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Carousel Image:</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={(e) =>
                        setEditedCarousel({
                          ...editedCarousel,
                          image: e.target.files[0],
                        })
                      }
                    />
                  </div>
                  <div className="modalbuttons">
                    <button onClick={(e) => handleUpdateCarousel(e)}>Save</button>
                    <button onClick={() => setIsCarouselModalOpen(false)}>
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
  )
}

export default AdminCarousels;