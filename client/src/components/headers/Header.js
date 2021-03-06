import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import { GlobalState } from '../../GlobalState';
import Logo from './icon/camera.png';

const Header = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [search, setSearch] = state.productsAPI.search;
  const [infor] = state.userAPI.infor;

  const [handleSearch, setHandleSearch] = useState('');

  const history = useHistory();

  const handleSubmit = (e) => {
    setSearch(handleSearch)
    setHandleSearch('')
    history.push('/products')
    e.preventDefault()
  }

  const logoutUser = async () => {
    await axios.get('/user/logout')
    localStorage.removeItem('Login'); 
    window.location.href = '/';
  }

  useEffect(() => {
  }, [search])

  return (
    <header>
      <div className="option_header">
        <div className="option_header-content">
          <div className="languages">
            <p id="language">Vi-VN | En-US</p>
          </div>

          <ul>
            <li><Link to="/">Blog</Link></li>
            { isAdmin 
              ? <li><Link to="/admin">My Admin</Link></li> 
              : <li><Link to="/history">History</Link></li>
            }
            {
              isLogged 
              ? 
              <>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
              </> 
              :
              <>
                <li><Link to="/login">Sign in</Link></li>
                <li><Link to="/register">Register</Link></li> 
              </>
            }
          </ul>
        </div>
      </div>

      <div className="center_header">
        <div className="header-responsive">
          <Link to="/"><img src={Logo} alt="" className="logo"/></Link>
          <label htmlFor="nav_mobile-input"><i className="fas fa-bars"></i></label>

          <input type="checkbox" name="" id="nav_mobile-input" className="nav_input" />      
          <label htmlFor="nav_mobile-input" className="nav__overlay"></label> 

          <nav className="nav_mobile">
            <div className="nav_mobile-close">
              <span><i className="far fa-user user-icon"></i> {infor[0]}</span>
              <label htmlFor="nav_mobile-input"><i className="fas fa-times"></i></label>
            </div>
            <ul className="nav_mobile-list">
              <li className="nav_mobile-item"><Link to="/">Blog</Link></li>
              { isAdmin 
                ? <li className="nav_mobile-item"><Link to="/admin">My Admin</Link></li> 
                : <li className="nav_mobile-item"><Link to="/">My wishlist</Link></li>
              }
              {
                isLogged 
                ? 
                <>
                  <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
                </>
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
          <Link to="/"><img src={Logo} alt="" className="logo" /></Link>

          <div className="menu_bars">
            <label htmlFor="nav_mobile-category" className="menu_bars-category"><i className="fas fa-bars"></i> Category</label>
            <input type="checkbox" name="" id="nav_mobile-category" className="nav_category" />      
            <label htmlFor="nav_mobile-category" className="nav__overlay-cate"></label> 

            <nav className="nav_categories">
              <div className="nav_category-close">  
                <span><i className="far fa-user user-icon"></i> {infor[0]}</span>
                <label htmlFor="nav_mobile-category"><i className="fas fa-times"></i></label>
              </div>
              <div className="nav_categories-item">
                <h5><Link to="/products"><i className="fas fa-th-large"></i> Products</Link></h5>
                <h5><Link to="/"><i className="fas fa-th-large"></i> Location Store</Link></h5>
                <h5><Link to="/"><i className="fas fa-th-large"></i> Company</Link></h5>
              </div>
            </nav>
          </div>

          <div className="search">
            <form onSubmit={handleSubmit}>
              <input type="text" name="search" id="search" placeholder="Search for products" value={handleSearch} onChange={(e) => setHandleSearch(e.target.value.toLowerCase())}/>
              {handleSearch ? <button type="submit">Search</button> : <button type="submit" disabled>Search</button>}
            </form>
          </div>

          <div className="user">
            <span><i className="far fa-user user-icon user-animation"></i> {infor[0]}</span>
          </div>

          <div className="user-cart">
            <Link to="/cart">
              <i className="fas fa-shopping-cart"></i>
            </Link>
            <span>{cart.length}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
