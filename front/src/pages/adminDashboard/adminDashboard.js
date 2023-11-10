import React, { useState } from "react";
import "./adminDashboard.css";
import SideNavbar from "../../components/SideNavbar/sideNavbar";
import photo from "../../assets/images/adminWelcome.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTachometer } from "@fortawesome/free-solid-svg-icons";

// const element = <FontAwesomeIcon icon={faTachometer} />;

const AdminDashboard = () => {
  return (
    <div className="admindashboard">
        <SideNavbar
        dashboard={true}
        categories={false}
        products={false}
        blogs={false}
        contactus={false}
        admins={false}
      />
      <div className="main">
      <h1 className="adminWelcome">Admin Dashboard</h1>

        <div className="welcome">
          <h2>Hello, Admin!😊</h2>
          <h2>Your jorney as an admin starts here.</h2>
          <h2>Take control, make updates, and keep things running smoothly.</h2>
        </div>
        <img className="adminImage" src={photo} alt="Welcome to admin panel" />
      </div>
    </div>
  );
};

export default AdminDashboard;
