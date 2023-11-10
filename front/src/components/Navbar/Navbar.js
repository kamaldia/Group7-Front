import React, { useState } from "react";
import arrow from "../../assets/Logo/arrowLogo.svg";
import TechSpot from "../../assets/images/TechSpot-logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  return (
    <nav className="App-navbar-abc">
      <img className="techspot-logo-abc" src={TechSpot} alt="website-logo" />
      <ul className="nav-list-abc">
        <li className="nav-item-abc">
          <Link to="/home">Home</Link>
        </li>
        <li className="nav-item-abc">
          <div className="shop-link-abc" onMouseEnter={toggleDropdown}>
            <span className="shop-text-abc">Shop</span>
            <img src={arrow} alt="arrow" className="arrow-logo-abc" />
          </div>
          {isDropdownVisible && (
            <ul className="dropdown-menu-abc" onMouseLeave={closeDropdown}>
              <li className="menu-item-abc">
                <Link to="/products/phones">Phones</Link>
              </li>
              <li className="menu-item-abc">
                <Link to="/products/laptops">Laptops</Link>
              </li>
              <li className="menu-item-abc">
                <Link to="/products/phone accessories">Phone Accessories</Link>
              </li>
              <li className="menu-item-abc">
                <Link to="/products/laptop accessories">
                  Laptop Accessories
                </Link>
              </li>
              <li className="menu-item-abc">
                <Link to="/products">View All Products</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="nav-item-abc">
          <Link to="/blogs">Blog</Link>
        </li>
        <li className="nav-item-abc">
          <Link to="/contacttuss">Contact Us</Link>
        </li>
        <li className="nav-item-abc">
          <Link to="/aboutus">About Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
