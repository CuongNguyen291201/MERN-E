import React from 'react'

import './banner.css';
import Women from './img/banner-women.png';
import Men from './img/banner-men.jpg';
import Vehicle from './img/banner-vehicle.jpg';

const Banner = () => {
  return (
    <div className="banner">
      <div className="slidershow middle">
        <div className="slides">
          <input type="radio" name="image" id="image-first"/>
          <input type="radio" name="image" id="image-second"/>
          <input type="radio" name="image" id="image-third"/>

          <div className="slide first">
            <img src={Women} alt=""/>
          </div>
          <div className="slide">
            <img src={Men} alt=""/>
          </div>
          <div className="slide">
            <img src={Vehicle} alt=""/>
          </div>
        </div>

        <div className="navigation-banner">
          <label htmlFor="image-first" className="bar"></label>
          <label htmlFor="image-second" className="bar"></label>
          <label htmlFor="image-third" className="bar"></label>
        </div>
      </div>

      <div className="banner-content">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est magnam ut maxime, ad ex quasi. Quam, expedita velit sapiente dicta quae laudantium ea officiis magni dolore itaque eaque fuga nisi.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est magnam ut maxime, ad ex quasi. Quam, expedita velit sapiente dicta quae laudantium ea officiis magni dolore itaque eaque fuga nisi.</p>
      </div>
    </div>
  )
}

export default Banner
