import React from 'react';
import { Link } from 'react-router-dom';

import Cash from '../banner/img/cash.svg';
import Ib from '../banner/img/internet-banking.svg';
import Jcb from '../banner/img/jcb.svg';
import Mastercard from '../banner/img/mastercard.svg';
import Visa from '../banner/img/visa.svg';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-infor">
        <div className="about-us">
          <h5>About Us</h5>
          <ul>
            <li><Link to="/">Introduce</Link></li>
            <li><Link to="/">Recruitment</Link></li>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">Payment Policy</Link></li>
          </ul>
        </div>
        <div className="customer-core">
          <h5>Customer Support</h5>
          <ul>
            <li><Link to="/">Questions</Link></li>
            <li><Link to="/">Support</Link></li>
            <li><Link to="/">Transport</Link></li>
          </ul>
        </div>
        <div className="contact-us">
          <h5>Contact Us</h5>
          <ul>
            <li><Link to="/">Operation Regulations</Link></li>
            <li><Link to="/">Sale Together</Link></li>
          </ul>
        </div>
        <div className="payment">
          <h5>Payment Method</h5>
          <img src={Cash} alt=""/>
          <img src={Visa} alt=""/>
          <img src={Jcb} alt=""/>
          <img src={Ib} alt=""/>
          <img src={Mastercard} alt=""/>
        </div>
      </div>

      <div className="footer-social">
        <i class="fab fa-facebook-f fb"></i>
        <i class="fab fa-youtube yt"></i>
        <i class="fab fa-linkedin-in ld"></i>
      </div>
    </div>
  )
}

export default Footer
