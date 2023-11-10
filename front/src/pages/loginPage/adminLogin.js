import React, { useState } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(username, password);

    try {
      const response = await fetch("http://localhost:4000/api/admin", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      console.log(data, "data");

      if (data.status === "ok") {
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
