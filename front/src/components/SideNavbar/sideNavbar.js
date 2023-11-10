import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./sideNavbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faTachometerAlt,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import dashboardIcon from "../../assets/icons/adminDashboardIcon.svg";
// const aa = <FontAwesomeIcon icon={faTachometerAlt} />;
const arrowdownaIcon = <FontAwesomeIcon icon={faCaretDown} />;
const SideNavbar = (props) => {
  const [dashboardDropDown, setDashboardDropDown] = useState(props.dashboard);
  const [adminDropDown, setAdminDropDown] = useState(props.admins);
  const [categoryDropDown, setCategoryDropDown] = useState(props.categories);
  const [productDropDown, setProductDropDown] = useState(props.products);
  const [blogDropDown, setBlogDropDown] = useState(props.blogs);
  const [contactUsDropDown, setContactUsDropDown] = useState(props.contactus);
  const [advertisementDropDown, setAdvertisementDropDown] = useState(
    props.adevertisements
  );
  const [carouselDropDown, setCarouselDropDown] = useState(props.carousels);

  const navigate = useNavigate();

  const logoutfunc = () => {
    localStorage.setItem("authToken", "");
    navigate("/home");
  };

  return (
    <div className="sidebar">
      <h1>TECHSPOT</h1>
      <br />
      <hr />
      <div className="dashboard">
        <span>
          <img src={dashboardIcon} alt="dashboardimage" width={37} />
        </span>
        <div>Dashboard</div>
      </div>
      <hr />
      <br />
      <br />

      <div className="navitems">
        <Link to="/admin">
          <div
            className={dashboardDropDown ? "whiteBackground" : "item"}
            onClick={() => {
              setDashboardDropDown(true);
              setCategoryDropDown(false);
              setContactUsDropDown(false);
              setBlogDropDown(false);
              setProductDropDown(false);
              setAdminDropDown(false);
              setCarouselDropDown(false);
              setAdvertisementDropDown(false);
            }}
          >
            <div>Welcome</div>
          </div>
        </Link>

        <hr />

        <Link to="/admin/admins">
          <div
            onClick={() => {
              setAdminDropDown(true);
              setContactUsDropDown(false);
              setBlogDropDown(false);
              setCategoryDropDown(false);
              setProductDropDown(false);
              setCarouselDropDown(false);
              setAdvertisementDropDown(false);
              setDashboardDropDown(false);
            }}
            className={adminDropDown ? "whiteBackground" : "item"}
          >
            <div>Admin</div>
          </div>
        </Link>
        <hr />
        <Link to="/admin/categories">
          <div
            className={categoryDropDown ? "whiteBackground" : "item"}
            onClick={() => {
              setCategoryDropDown(true);
              setContactUsDropDown(false);
              setBlogDropDown(false);
              setProductDropDown(false);
              setAdminDropDown(false);
              setCarouselDropDown(false);
              setAdvertisementDropDown(false);
              setDashboardDropDown(false);
            }}
          >
            <div>Category</div>
          </div>
        </Link>

        <hr />

        <div
          className={productDropDown ? "whiteBackground" : "item"}
          onClick={() => {
            setProductDropDown(!productDropDown);
            setContactUsDropDown(false);
            setBlogDropDown(false);
            setCategoryDropDown(false);
            setAdminDropDown(false);
            setCarouselDropDown(false);
            setAdvertisementDropDown(false);
            setDashboardDropDown(false);
          }}
        >
          <div>Products</div> <span> {arrowdownaIcon}</span>
        </div>
        <hr />
        {productDropDown && (
          <div className="ItemList">
            <Link to="/admin/products">
              <div>View Edit Delete</div>
            </Link>
            <hr />
            <Link to="/admin/products/add">
              <div>Add</div>
            </Link>
          </div>
        )}

        <Link to="/admin/blogs">
          <div
            className={blogDropDown ? "whiteBackground" : "item"}
            onClick={() => {
              setBlogDropDown(!blogDropDown);
              setContactUsDropDown(false);
              setCategoryDropDown(false);
              setProductDropDown(false);
              setAdminDropDown(false);
              setCarouselDropDown(false);
              setAdvertisementDropDown(false);
              setDashboardDropDown(false);
            }}
          >
            <div>Blogs</div>
          </div>
        </Link>
        <hr />

        <Link to="/admin/contactus">
          <div
            onClick={() => {
              setContactUsDropDown(true);
              setBlogDropDown(false);
              setCategoryDropDown(false);
              setProductDropDown(false);
              setAdminDropDown(false);
              setCarouselDropDown(false);
              setAdvertisementDropDown(false);
              setDashboardDropDown(false);
            }}
            className={contactUsDropDown ? "whiteBackground" : "item"}
          >
            Contact Us
          </div>
        </Link>
        <hr />

        <Link to="/admin/carousels">
          <div
            onClick={() => {
              setCarouselDropDown(true);
              setContactUsDropDown(false);
              setBlogDropDown(false);
              setCategoryDropDown(false);
              setProductDropDown(false);
              setAdminDropDown(false);
              setAdvertisementDropDown(false);
              setDashboardDropDown(false);
            }}
            className={carouselDropDown ? "whiteBackground" : "item"}
          >
            Carousels
          </div>
        </Link>
        <hr />

        <Link to="/admin/advertisements">
          <div
            onClick={() => {
              setAdvertisementDropDown(true);
              setContactUsDropDown(false);
              setBlogDropDown(false);
              setCategoryDropDown(false);
              setProductDropDown(false);
              setAdminDropDown(false);
              setCarouselDropDown(false);
              setDashboardDropDown(false);
            }}
            className={advertisementDropDown ? "whiteBackground" : "item"}
          >
            Advertisements
          </div>
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
