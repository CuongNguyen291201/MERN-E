import React from 'react';
import { Link } from 'react-router-dom';

import FeatureProduct from './FeatureProduct';
import SignatureProduct from './SignatureProduct';
import Letter from '../banner/img/newsletter.png';

const Home = () => {
  return (
    <>
      <div className="home-center">
        <FeatureProduct />
        <SignatureProduct />
        <div className="home-button">
          <button><Link to="/products">See More</Link></button>
        </div>
      </div>
      <div className="register-notification">
        <img src={Letter} alt=""/>
        <div className="infor-notifi">
          <h5>Sign up for the newsletter</h5>
          <p>Don't miss out on thousands of super cool products and programs</p>
        </div>
        <form>
          <input type="email" placeholder="Your email address"/>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  )
}

export default Home
