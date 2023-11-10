import React from "react";
import instagram from "../../assets/Logo/instagram.svg";
import google from "../../assets/Logo/google.svg";
import facebook from "../../assets/Logo/facebook.svg";
import x from "../../assets/Logo/xLogo.svg";
import linkedin from "../../assets/Logo/linkedin.svg";
import "./Header.css";

const Header = () => {
  return (
    <header className="app-header-abc">
      <a href="https://www.facebook.com">
        <img src={facebook} className="app-logo-abc" alt="facebook-logo" />
      </a>
      <a href="https://www.twitter.com">
        <img src={x} className="app-logo-abc" alt="x-logo" />
      </a>
      <a href="https://www.instagram.com">
        <img src={instagram} className="app-logo-abc" alt="instagram-logo" />
      </a>
      <a href="https://www.gmail.com">
        <img src={google} className="app-logo-abc" alt="google-logo" />
      </a>
      <a href="https://www.linkedin.com">
        <img src={linkedin} className="app-logo-abc" alt="linkedin-logo" />
      </a>
    </header>
  );
};

export default Header;