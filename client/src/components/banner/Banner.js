import React from 'react'

import Women from './img/banner-women.png';
import Sale from './img/banner-sales.jpg';
import Home from '../home/Home';
import BannerSale from './img/banner-sale.jpg';
import BlackFriday from './img/black-friday.jpg';

const Banner = () => {
  return (
    <>
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
              <img src={BlackFriday} alt=""/>
            </div>
            <div className="slide">
              <img src={BannerSale} alt=""/>
            </div>
          </div>

          <div className="navigation-banner">
            <label htmlFor="image-first" className="bar"></label>
            <label htmlFor="image-second" className="bar"></label>
            <label htmlFor="image-third" className="bar"></label>
          </div>
        </div>

        <div className="banner-content">
          <img src={Sale} alt=""/>
        </div>
      </div>

      <Home />
    </>
  )
}

export default Banner
