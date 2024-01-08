import React from "react";
import "./adminDashboard.css";
import photo from "../../assets/images/adminWelcome.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTachometer } from "@fortawesome/free-solid-svg-icons";

// const element = <FontAwesomeIcon icon={faTachometer} />;

const AdminDashboard = () => {
  return (
    <div className="admindashboard">
      <div className="main">
        <h1 className="adminWelcome">Admin Dashboard</h1>

        <div className="welcome">
          <h2>Hello, Admin!😊</h2>
          <h2>Your jorney as an admin starts here.</h2>
          <h2>Take control, make updates, and keep things running smoothly.</h2>
        </div>
        <img className="adminImage" src={photo} alt=""/>
      </div>
    </div>
  );
};

export default AdminDashboard;