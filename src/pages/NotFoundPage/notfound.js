import React from "react";
import "./notfound.css";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/footer";
import AlertLogo from "../../assets/Logo/alertLogo.svg"

const Notfound = () => {
  return (
    <div className="notfound_container-abc">
      <Header />
      <Navbar />
      <div className="pnf-abc">
        <img className="pnf-logo-abc" src={AlertLogo} alt="alert-logo"/>
        <h1 className="pnf-title-abc">404</h1>
        <h2 className="pnf-desc-abc">Page Not Found</h2>
        <Link to="/home" className="pnf-btn-abc">
          Go Back
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Notfound;