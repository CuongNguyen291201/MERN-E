import React from 'react';
import { Link } from 'react-router-dom';

import FeatureProduct from './FeatureProduct';
import SignatureProduct from './SignatureProduct';


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
      
    </>
  )
}

export default Home
