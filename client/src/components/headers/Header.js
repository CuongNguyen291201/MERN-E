import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './header.css';
import { GlobalState } from '../../GlobalState';
import Menu from './icon/menu.svg';
import Close from './icon/close.svg';
import Logo from './icon/camera.png';

const Header = () => {
  const state = useContext(GlobalState);
  const [categories] = state.categoryAPI.categories;
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [search, setSearch] = state.productsAPI.search;
  const [infor] = state.userAPI.infor;

  const [handleSearch, setHandleSearch] = useState('');
  const [flag, setFlag] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearch(handleSearch)
    setHandleSearch('')
  }

  const logoutUser = async () => {
    await axios.get('/user/logout')
    localStorage.removeItem('Login'); 
    window.location.href = '/';
  }

  const loggedRouter = () => {
    return (
      <>
        <li><Link to="/">User</Link></li>
        <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
      </>
    )
  }

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
            { isAdmin 
              ? <li><Link to="/admin">My Admin</Link></li> 
              : <li><Link to="/">My wishlist</Link></li>
            }
            {
              isLogged 
              ? loggedRouter()
              : 
              <>
                <li><Link to="/login">Sign in</Link></li>
                <li><Link to="/register">Register</Link></li> 
              </>
            }
            <li>
              <img src={Close} alt="" width="30" className="menu" />
            </li>
          </ul>
        </div>
      </div>

      <div className="center_header">
        <div className="header-responsive">
          <img src={Logo} alt="" className="logo"/>
          <label htmlFor="nav_mobile-input"><i className="fas fa-bars"></i></label>

          <input type="checkbox" name="" id="nav_mobile-input" className="nav_input" />      
          <label htmlFor="nav_mobile-input" className="nav__overlay"></label> 

          <nav className="nav_mobile">
            <div className="nav_mobile-close">
              <span><i className="far fa-user"></i> {infor[0]}</span>
              <label htmlFor="nav_mobile-input"><i className="fas fa-times"></i></label>
            </div>
            <ul className="nav_mobile-list">
              <li className="nav_mobile-item"><Link to="/">Store Location</Link></li>
              <li className="nav_mobile-item"><Link to="/">Blog</Link></li>
              { isAdmin 
                ? <li className="nav_mobile-item"><Link to="/admin">My Admin</Link></li> 
                : <li className="nav_mobile-item"><Link to="/">My wishlist</Link></li>
              }
              {
                isLogged 
                ? loggedRouter()
                : 
                <>
                  <li className="nav_mobile-item"><Link to="/login">Sign in</Link></li>
                  <li className="nav_mobile-item"><Link to="/register">Register</Link></li> 
                </>
              }
            </ul>
          </nav>
        </div>

        <div className="header__search-responsive">
          <div className="search">
            <form onSubmit={handleSubmit}>
              <input type="text" name="search" placeholder="Search for products" value={handleSearch} onChange={(e) => setHandleSearch(e.target.value.toLowerCase())}/>
              <button type="submit">Search</button>
            </form>
          </div>
        </div>

        <div className="header">
          <img src={Logo} alt="" className="logo"/>

          <div className="menu_bars">
            <span onClick={() => setFlag(!flag)}><i className="fas fa-bars"></i> All Categories</span>
            {
              flag ?
              <nav className="nav">
                <ul className="nav__list">
                  {
                    categories.map(category => (
                      <Link to="/products" key={category._id}><li className="nav__item" onClick={() => setFlag(!flag)}>{category.name}</li></Link>
                    ))
                  }
                </ul>
              </nav>
              : <></>
            }
          </div>

          <div className="search">
            <form onSubmit={handleSubmit}>
              <input type="text" name="search" id="search" placeholder="Search for products" value={handleSearch} onChange={(e) => setHandleSearch(e.target.value.toLowerCase())}/>
              <button type="submit">Search</button>
            </form>
          </div>

          <div className="user">
            <span><i className="far fa-user"></i> {infor[0]}</span>
          </div>

          <div className="user-cart">
            <Link to="/cart">
              <i className="fas fa-shopping-cart cart-number"></i>
            </Link>
            <span>{cart.length}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
