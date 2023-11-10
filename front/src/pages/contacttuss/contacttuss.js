import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import "./contactuss.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import emailpic from "../../assets/icons/email.svg";
import phonepic from "../../assets/icons/phone.svg";
import locpic from "../../assets/icons/location.svg";

const Contacttuss = () => {
  const [newMessage, setNewMessage] = useState({
    contactName: "",
    contactEmail: "",
    contactMessage: "",
  });

  const form = useRef();

  const handleaddtodatabase = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });
      e.target.reset();

      if (response.ok) {
        const data = await response.json();
        sendEmail()
        console.log(data);
      } else {
        alert("Error, Admin already exists");
      }
    } catch (error) {
      console.error("Error:", error);
    }

  };

  
  const sendEmail = () => {

    emailjs
      .sendForm(
        "service_50xsf8d",
        "template_39j1pk6",
        form.current,
        "SxdeFlZArqjSkFMpF"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="ContactUs1">
      <div className="LeftSide">
        <h1>For more Details Contact Us</h1>
        <Link to="/home">
          {" "}
          <button className="homebtn">
            <FontAwesomeIcon icon={faHome} />
          </button>
        </Link>
        <div className="LeftEmails">
          <div className="Email">
            <img src={emailpic} />
            <a href="#">TechSpot</a>
          </div>
          <div className="Email">
            <img src={locpic} />
            <a href="https://www.google.com/maps/place/Codi/@33.8943159,35.5048126,15z/data=!4m6!3m5!1s0x151f16fb24fc5583:0xa37552bc126dfe51!8m2!3d33.8943159!4d35.5048126!16s%2Fg%2F11c6_vcgzf?entry=ttu">
              Beirut-Downtown
            </a>
          </div>
          <div className="Email">
            <img src={phonepic} />
            <h2>+12345678</h2>
          </div>
        </div>
      </div>
      <div className="RightSide">
        <form ref={form} className="form-Contactus" onSubmit={handleaddtodatabase}>
          <input
            class="input-name"
            type="text"
            placeholder="Your name"
            name="from_name"
             onChange={(e) =>
                setNewMessage({ ...newMessage, contactName: e.target.value })
              }
            required
          />
          <span class="underline_name"></span>
          <input
            type="text"
            class="input-email"
            placeholder="Your email"
            name="from_email"
            onChange={(e) =>
                setNewMessage({ ...newMessage, contactEmail: e.target.value })
              }
            required
          />
          <label for="Email" class="underline_email"></label>
          <textarea
            className="textarea"
            placeholder="Write a message"
            name="message"
            onChange={(e) =>
                setNewMessage({ ...newMessage, contactMessage: e.target.value })
              }
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
export default Contacttuss;
