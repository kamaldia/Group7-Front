import React from 'react';
import './Bottom.css';
import bottomlogo from '/home/alialahmad/Documents/GitHub/Group7-Front/front/src/assets/images/bottom-logo.png';
import emaillogo from '/home/alialahmad/Documents/GitHub/Group7-Front/front/src/assets/images/Email logo.svg';
import fb from '/home/alialahmad/Documents/GitHub/Group7-Front/front/src/assets/images/Facebook logo1.svg';
import google from '/home/alialahmad/Documents/GitHub/Group7-Front/front/src/assets/images/Google logo1.svg';
import instagram from '/home/alialahmad/Documents/GitHub/Group7-Front/front/src/assets/images/Instagram logo1.svg';
import linkedin from '/home/alialahmad/Documents/GitHub/Group7-Front/front/src/assets/images/Linkedin logo1.svg';
import twitter from '../../../assets/images/X logo.svg';

const Bottom = () => {
    return (
        <>
        <div className="bottom-container">
            <div className="bottom-logo">
                <img src={bottomlogo} />
            </div>
            <div className="newsletter-container">
                <div className="newsletter">
                    <h1>NEWSLETTER</h1>
                    <p>Subscribe now and receive weekly</p>
                    <p>newsletter !</p>
                </div>
                <div className="email-form">
                    <input type="text" className='e-class' placeholder='Email Address' />
                    <img src={emaillogo} />
                </div>
            </div>

            <div className="follow-us">
                <h1>Follow Us</h1>
                <img src={fb} alt="Facebook-logo" />
                <img src={google} alt="Google-logo" />
                <img src={instagram} alt="Instagram-logo" />
                <img src={linkedin} alt="Linkedin-logo" />
                <img src={twitter} alt="Twitter-logo" />
            </div>
            </div>
            <div className="footer">
                <footer><p>© 2023, Digital World 3 Powered by Shopify</p></footer>
            </div>
            </>
    )
}

export default Bottom;