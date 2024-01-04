import React, { useState } from "react";
import axios from "axios";
import "./adminLogin.css";
import loginLogo from "../../assets/icons/loginLogo.svg";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => { // use oauth here
    e.preventDefault();

    console.log(username, password);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin",
        JSON.stringify({
            username,
            password,
          })
      );

      const data = response.data;

      console.log(data, "data");

      if (data.status == 200) {
        alert("successfull login");
        localStorage.setItem("authToken", data.data.username); // Replace "yourAuthTokenValue" with the actual authentication token or flag.

        navigate("/admin");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="login-form">
        <h1 className="login-formbuttonh1">
          <img src={loginLogo} alt="Admin" />
          <br />
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              type="text"
              className="login-formusername"
              onChange={handleUsernameChange}
            />
            <br />
            <br />
            <input
              placeholder="PASSWORD"
              type="password"
              className="login-formpassword"
              onChange={handlePasswordChange}
            />
            <br />
            <br />
            <button className="login-formbutton" type="submit">
              Login
            </button>
          </form>
        </h1>
      </div>
    </div>
  );
};

export default AdminLogin;