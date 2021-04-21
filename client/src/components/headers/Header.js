import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { GlobalState } from '../../GlobalState';
import Menu from './icon/menu.svg';
import Close from './icon/close.svg';
import Cart from './icon/cart.svg';
import Logo from './icon/camera.png';

const Header = () => {
  const state = useContext(GlobalState);

  return (
    <header>
      <div className="option_header">
        <div className="option_header-content">
          <div className="menu">
            <img src={Menu} alt="" width="30"/>
          </div>
          <div className="languages">
            <p>Vi-VN | En-US</p>
          </div>

          <ul>
            <li><Link to="/">Store Location</Link></li>
            <li><Link to="/">Blog</Link></li>
            <li><Link to="/">My wishlist</Link></li>
            <li><Link to="/login">Sign in</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li>
              <img src={Close} alt="" width="30" className="menu" />
            </li>
          </ul>
        </div>
      </div>

      <div className="center_header">
        <img src={Logo} alt="" className="logo"/>
        <div className="search">
          <input type="text" name="search" id="search" placeholder="Search for products"/>
          <button>Search</button>
        </div>
        <div className="user">
          <h2>Call 0987654321</h2>
          <Link to="/cart">
            <img src={Cart} alt="" width="20"/>
          </Link>
          <span>1</span>
        </div>
      </div>

      <div className="navigation_header">
        <ul>
          <li><Link to="/">New arrivals</Link></li>
          <li><Link to="/">Brands</Link></li>
          <li><Link to="/">Women</Link></li>
          <li><Link to="/">Men</Link></li>
          <li><Link to="/">Other</Link></li>
          <li><Link to="/">Sale</Link></li>
        </ul>
      </div>
    </header>
  )
}

export default Header
