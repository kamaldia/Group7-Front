import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminContactus.css";
import SideNavbar from "../../components/SideNavbar/sideNavbar";

const AdminContactUs = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchContactUs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/contactus"
        );
        if (response.status == 200) {
          const jsonData = response.data;
          setMessages(jsonData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchContactUs();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/contactus/${messageId}`
      );
      if (response.status == 200) {
        // Remove the deleted message from the state
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message._id !== messageId)
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="adminContactUsView">
      <SideNavbar contactus={true} />
      <div className="adminContactUsMain">
        <h1 className="adminContactUsMainHeader">Contact Us Messages</h1>

        <div className="admin-Contactus">
          <table>
            <thead>
              <tr>
                <th className="admin-ContactusUserName">UserName</th>
                <th className="admin-ContactusEmail">Email</th>
                <th className="admin-ContactusMessage">Message</th>
                <th className="admin-ContactusDate">Date</th>
                <th className="admin-ContactusAction">Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr className="admin-ContactusRows" key={message._id}>
                  <td>{message.contactName}</td>
                  <td>{message.contactEmail}</td>
                  <td>{message.contactMessage}</td>
                  <td>{formatDate(message.createdAt)}</td>
                  <td>
                    <button
                      className="admin-ContactusDeleteButton"
                      onClick={() => handleDeleteMessage(message._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminContactUs;
