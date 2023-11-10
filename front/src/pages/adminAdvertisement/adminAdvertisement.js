import React, { useState, useEffect } from "react";
import "./adminAdvertisement.css";
import SideNavbar from "../../components/SideNavbar/sideNavbar";

const AdminAdvertisement = () => {
  const [refreshAdvertisements, setRefreshAdvertisements] = useState("");
  const [isAdvertisementModalOpen, setIsAdvertisementModalOpen] = useState(
    false
  );
  const [advertisements, setAdvertisements] = useState([]);
  const [newAdvertisement, setNewAdvertisement] = useState({
    title: "",
    image: null,
  });

  const [editedAdvertisement, setEditedAdvertisement] = useState({
    title: "",
    image: null,
  });

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/advertisements"
        );
        if (response.ok) {
          const json = await response.json();
          setAdvertisements(json);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAdvertisements();
  }, [refreshAdvertisements]);

  const handleAddAdvertisement = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", newAdvertisement.title);
      formData.append("image", newAdvertisement.image);

      const response = await fetch("http://localhost:4000/api/advertisements", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const newAdvertisementData = await response.json();
        setAdvertisements((prevAdvertisements) => [
          ...prevAdvertisements,
          newAdvertisementData,
        ]);
        setNewAdvertisement({
          title: "",
          image: null,
        });
        console.log("Advertisement added successfully");
      } else {
        console.error("Failed to add Advertisement");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateAdvertisement = async (e) => {
    const confirmUpdate = window.confirm(
      "Are you sure you want to update this Advertisement?"
    );
    e.preventDefault();

    if (confirmUpdate) {
      try {
        const formData = new FormData();
        if (editedAdvertisement.title) {
          formData.append("title", editedAdvertisement.title);
        }
        if (editedAdvertisement.image) {
          formData.append("image", editedAdvertisement.image);
        }

        const response = await fetch(
          `http://localhost:4000/api/advertisements/${editedAdvertisement._id}`,
          {
            method: "PUT",
            body: formData,
          }
        );

        if (response.ok) {
          const updatedAdvertisement = await response.json();
          setAdvertisements((prevAdvertisements) =>
            prevAdvertisements.map((Advertisement) =>
              Advertisement._id === updatedAdvertisement._id
                ? updatedAdvertisement
                : Advertisement
            )
          );

          console.log("Advertisement updated successfully");
        } else {
          console.error("Failed to update Advertisement");
        }
      } catch (error) {
        console.error("Error:", error);
      }
      setIsAdvertisementModalOpen(false);
      setRefreshAdvertisements(refreshAdvertisements + "refresh");
    }
  };

  const handleDeleteAdvertisement = async (AdvertisementId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Advertisement?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/advertisements/${AdvertisementId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setAdvertisements((prevAdvertisements) =>
            prevAdvertisements.filter(
              (Advertisement) => Advertisement._id !== AdvertisementId
            )
          );
          console.log("Advertisement deleted successfully");
        } else {
          console.error("Failed to delete Advertisement");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handletitleChange = (e) => {
    setNewAdvertisement({
      ...newAdvertisement,
      title: e.target.value,
    });
  };

  const handleAdvertisementImageChange = (e) => {
    setNewAdvertisement({
      ...newAdvertisement,
      image: e.target.files[0],
    });
  };

  return (
    <div className="adminAdvertisementView">
      <SideNavbar advertisements={true} />

      <div className="adminAdvertisementMain">
        <h1 className="adminAdvertisement">Admin Advertisement</h1>

        <div className="add-Advertisement">
          <div>
            <h2>Add New Advertisement</h2>
          </div>
          <hr />
          <form
            className="addAdvertisementform"
            onSubmit={handleAddAdvertisement}
          >
            <div className="forminputs-add-Advertisement">
              <label htmlFor="title">Advertisement Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newAdvertisement.title}
                onChange={handletitleChange}
                required
              />
            </div>
            <br />
            <br />

            <div className="forminputs-add-Advertisement">
              <label htmlFor="image">Advertisement Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleAdvertisementImageChange}
                required
              />
            </div>

            <br />
            <br />

            <button type="submit">Add Advertisement</button>
          </form>
        </div>

        <div className="Advertisement-list">
          {advertisements.map((Advertisement) => (
            <div className="Advertisement" key={Advertisement._id}>
              <img
                src={`http://localhost:4000/${Advertisement.image}`}
                alt={Advertisement.title}
              />
              <div className="Advertisement-info">
                <h2>{Advertisement.title.toUpperCase()}</h2>
                <div className="Advertisement-actions">
                  <button
                    onClick={() => {
                      setEditedAdvertisement(Advertisement);
                      setIsAdvertisementModalOpen(true);
                      console.log(editedAdvertisement);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAdvertisement(Advertisement._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testModal">
          <div className={`modal ${isAdvertisementModalOpen ? "open" : ""}`}>
            <div className="modal-content">
              <span
                className="close"
                onClick={() => setIsAdvertisementModalOpen(false)}
              >
                &times;
              </span>
              <h2>Edit</h2>

              <form>
                <div className="form-group">
                  <label htmlFor="title">Advertisement Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editedAdvertisement.title}
                    onChange={(e) =>
                      setEditedAdvertisement({
                        ...editedAdvertisement,
                        title: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image">Advertisement Image:</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={(e) =>
                      setEditedAdvertisement({
                        ...editedAdvertisement,
                        image: e.target.files[0],
                      })
                    }
                  />
                </div>
                <div className="modalbuttons">
                  <button onClick={(e) => handleUpdateAdvertisement(e)}>
                    Save
                  </button>
                  <button onClick={() => setIsAdvertisementModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAdvertisement;
