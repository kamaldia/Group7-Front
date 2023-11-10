import React, { useState, useEffect } from "react";
import "./adminAdmins.css";
import SideNavbar from "../../components/SideNavbar/sideNavbar";
import deleteIcon from "../../assets/icons/delete.svg";
import updateIcon from "../../assets/icons/update.svg";

const AdminAdmins = () => {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Admin state
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });
  const [editedAdmin, setEditedAdmin] = useState({
    username: "",
    password: "",
  });
  const [minLength] = useState(4);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    // Fetch admins on component mount
    const fetchAdmins = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/admins");
        if (response.ok) {
          const data = await response.json();
          setAdmins(data);
          console.log(data);
        } else {
          console.error("Failed to fetch admins");
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, []);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (newAdmin.password.length < 4) {
      return alert("Please enter your password more than 4 characters");
    }
    try {
      const response = await fetch("http://localhost:4000/api/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdmin),
      });
      e.target.reset();

      if (response.ok) {
        const data = await response.json();
        setAdmins([...admins, data]);
        setNewAdmin({ username: "", password: "" });
        setPasswordError("");
      } else {
        alert("Error, Admin already exists");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDeleteAdmin = async (adminId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/admins/${adminId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          setAdmins(admins.filter((admin) => admin._id !== adminId));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleUpdateAdmin = async (e) => {

    e.preventDefault();
    const confirmUpdate = window.confirm(
      "Are you sure you want to update this admin?"
    );
 
    if (confirmUpdate) {
      if (!editedAdmin.password || (editedAdmin.password.toString().length < 4)) {
        return alert("Please enter a password with at least 4 characters");
      }
      if (!editedAdmin.username) {
        alert("Please fill in all fields before updating.");
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:4000/api/admins/${editedAdmin._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedAdmin),
          }
        );

        if (response.ok) {
          setAdmins((prevAdmins) => {
            const updatedAdmins = [...prevAdmins];
            const updatedAdminIndex = updatedAdmins.findIndex(
              (admin) => admin._id === editedAdmin._id
            );
            updatedAdmins[updatedAdminIndex] = {
              ...updatedAdmins[updatedAdminIndex],
              ...editedAdmin,
            };
            return updatedAdmins;
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    setIsModalOpen(false);
  };

  const validatePassword = (password) => {
    if (password.length < minLength) {
      setPasswordError(`Password must be at least ${minLength} characters`);
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="adminAdminsView">
      <SideNavbar
        categories={false}
        products={false}
        blogs={false}
        contactus={false}
        admins={true}
      />

      <div className="mainAdminAdmins">
        <h1 className="adminAdd">Admins Page</h1>
        <div className="adminCRUDS">
          <div className="add-admin">
           <div> <h2>Add New Admin</h2></div>
            <hr />
            <form className="addadminform" onSubmit={handleAddAdmin}>
              <div className="forminputs">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, username: e.target.value })
                  }
                  required
                />
              </div>
              <br />
              <br />

              <div className="forminputs">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => {
                    setNewAdmin({ ...newAdmin, password: e.target.value });
                    validatePassword(e.target.value);
                  }}
                  required
                />
              </div>
              {passwordError && (
                <div style={{ color: "red" }}>{passwordError}</div>
              )}
              <br />
              <br />

              <button type="submit">Add Admin</button>
            </form>
          </div>

          <div className="admin-list">
            <table>
              <thead>
                <tr>
                  <th>Admin Name</th>
                  <th className=".AdminAdminsActionTable" colSpan="2">Admin Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin._id}>
                    <td>{admin.username}</td>
                    <td>
                      <img
                        onClick={() => {
                          setEditedAdmin(admin);
                          setIsModalOpen(true);
                        }}
                        className="trycatch"
                        src={updateIcon}
                        alt="edit icon"
                        width={40}
                      />

                      <img
                        onClick={() => handleDeleteAdmin(admin._id)}
                        className="trycatch"
                        src={deleteIcon}
                        alt="delete icon"
                        width={40}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="testModal">
          <div className={`modal ${isModalOpen ? "open" : ""}`}>
            <div className="modal-content">
              <span className="close" onClick={() => setIsModalOpen(false)}>
                &times;
              </span>
              <h2>Edit</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="edited-username"
                    value={editedAdmin.username}
                    onChange={(e) =>
                      setEditedAdmin({
                        ...editedAdmin,
                        username: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="edited-password"
                    value={editedAdmin.password}
                    onChange={(e) => {
                      setEditedAdmin({
                        ...editedAdmin,
                        password: e.target.value,
                      });
                      validatePassword(e.target.value);
                    }}
                    required
                  />
                  {passwordError && (
                    <div style={{ color: "red" }}>{passwordError}</div>
                  )}
                </div>
                <div className="modalbuttons">
                  <button onClick={(e) => handleUpdateAdmin(e)}>Save</button>
                  <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAdmins;
