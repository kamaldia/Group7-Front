import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminAdmins.css";
import SideNavbar from "../../components/SideNavbar/sideNavbar";
import deleteIcon from "../../assets/icons/delete.svg";
import updateIcon from "../../assets/icons/update.svg";

const AdminAdmins = () => {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Admin state
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [editedAdmin, setEditedAdmin] = useState({
    role: "",
  });

  useEffect(() => {
    // Fetch admins on component mount
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/admin");
        if (response.status === 200) {
          const data = response.data;
          setAdmins(data);
          console.log("this is admins in adminadmins", data);
        } else {
          console.error("Failed to fetch admins");
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user");
        if (response.status === 200) {
          const data = response.data;
          setUsers(data);
          console.log("this is users in adminusers", data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteAdmin = async (adminId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?"
    );

    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/admin/${adminId}`
        );
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
      console.log("this is edited admin:", editedAdmin)
      if (!editedAdmin.role || (editedAdmin.role.toString() !== "user" && editedAdmin.role.toString() !== "admin")) {
        return alert("Please enter a valid role admin or user");
      }

      try {
        const response = await axios.put(
          `http://localhost:8000/api/user/${editedAdmin.id}`,
          JSON.stringify(editedAdmin),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status == 200) {
          setAdmins((prevAdmins) => {
            const updatedAdmins = [...prevAdmins];
            const updatedAdminIndex = updatedAdmins.findIndex(
              (admin) => admin.id === editedAdmin.id
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
            <div>
              {" "}
              <h2>To Add New Admin, Change the user role to admin</h2>
            </div>
          </div>

          <div className="admin-list">
            <table>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th className=".AdminAdminsActionTable" colSpan="2">
                    User Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (user.role === "user" &&
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>
                      <img
                        onClick={() => {
                          setEditedAdmin(user);
                          setIsModalOpen(true);
                        }}
                        className="trycatch"
                        src={updateIcon}
                        alt="edit icon"
                        width={40}
                      />

                      <img
                        onClick={() => handleDeleteAdmin(user.id)}
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
          <div className="admin-list">
            <table>
              <thead>
                <tr>
                  <th>Admin Name</th>
                  <th className=".AdminAdminsActionTable" colSpan="2">
                    Admin Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id}>
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
                        onClick={() => handleDeleteAdmin(admin.id)}
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
                  <label htmlFor="role">Role:</label>
                  <input
                    type="role"
                    id="edited-role"
                    value={editedAdmin.role}
                    onChange={(e) => {
                      setEditedAdmin({
                        ...editedAdmin,
                        role: e.target.value,
                      });
                    }}
                    required
                  />
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
