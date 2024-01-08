import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./sideNavbar.css";
import dashboardIcon from "../../assets/icons/adminDashboardIcon.svg";

const SideNavbar = () => {
  const navigate = useNavigate();
  const [selectedLink, setSelectedLink] = useState(null);
  const handleLinkClick = (index) => {
    setSelectedLink(index);
  };
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const logoutfunc = () => {
    localStorage.setItem("token", null);
    navigate("/");
  };
  return (
    <div className="sidebar">
      <h1>TECHSPOT</h1>
      <br />
      <hr />
      <div className="dashboard">
        <span>
          <img src={dashboardIcon} alt="dashboardimage" width={47} />
        </span>
          </div> <hr /> 
          <br /> <br />

      <div className="navitems">
        <Link to={"/admin"}
          onClick={() => handleLinkClick(0)}
            className={selectedLink === 0 ? 'selected' : ''}
        >
            <div>Welcome</div>
        </Link>
        <hr />
        <Link to={"/admin/admins"}
          onClick={() => handleLinkClick(1)}
            className={selectedLink === 1 ? 'selected' : ''}
        >
            <div>Admins</div>
        </Link>
        <hr />
        <Link to={"/admin/categories"}
          onClick={() => handleLinkClick(2)}
            className={selectedLink === 2? 'selected' : ''}
        >            <div>Category</div>
        </Link>
        <hr />
        <Link className="dropdown-btn" onClick={toggleDropdown}>
        Products
       </Link>
        <hr />
        {isDropdownOpen && (
          <div className="ItemList">
            <Link to="/admin/products"
            onClick={() => handleLinkClick(3)}
            className={selectedLink === 3 ? 'selected' : ''}>
              <div>View Edit Delete</div>
            </Link>
            <hr />
            <Link to="/admin/products/add"
            onClick={() => handleLinkClick(4)}
            className={selectedLink === 4 ? 'selected' : ''}>
              <div>Add</div>
            </Link>
          </div>
        )}
        <Link to={"/admin/blogs"}
          onClick={() => handleLinkClick(5)}
            className={selectedLink === 5 ? 'selected' : ''}
        >
            <div>Blogs</div>
        </Link>
        <hr />
        <Link to={"/admin/contactUs"}
          onClick={() => handleLinkClick(6)}
            className={selectedLink === 6 ? 'selected' : ''}
        >
            <div>Contact Us</div>
        </Link>
        <hr />
        <Link to={"/admin/carousel"}
          onClick={() => handleLinkClick(7)}
            className={selectedLink === 7 ? 'selected' : ''}
        >
            <div>Carousel</div>
        </Link>
        <hr />
        <Link to={"/admin/advertisement"}
          onClick={() => handleLinkClick(8)}
            className={selectedLink === 8 ? 'selected' : ''}
        >
            <div>Advertisement</div>
        </Link>
        <hr />
        <div className="logoutbuttondiv">
          <button className="button-logout" onClick={() => logoutfunc()}>
            <span className="button-logout-content">log out </span>
          </button>
        </div>
       </div>
      </div>
  );
};
export default SideNavbar;