import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { GlobalState } from '../../../../GlobalState';

const initialState = {
  product_id: '',
  title: '',
  price: 0,
  description: '',
  content: '',
  category: ''
};

const CreateProduct = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoryAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const styleUpload = {
    display: images ? "block" : "none"
  }

  return (
    <div>
      <input type="checkbox" id="sidebar-toggle" />
      <div className="sidebar">
        <div className="sidebar-header">
          <h3 className="brand">
            <span className="ti-unlink"></span> 
            <span>ADMIN</span>
          </h3> 
          <label htmlFor="sidebar-toggle" className="ti-menu-alt"></label>
        </div>
          
        <div className="sidebar-menu">
          <ul>
            <li>
              <Link to="/admin">
                <span className="ti-home"></span>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/create-product">
                <span className="ti-face-smile"></span>
                <span>Create Product</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/create-category">
                <span className="ti-agenda"></span>
                <span>Create Category</span>
              </Link>
            </li>
            <li>
              <Link to="!#">
                <span className="ti-clipboard"></span>
                <span>Leaves</span>
              </Link>
            </li>
            <li>
              <Link to="!#">
                <span className="ti-folder"></span>
                <span>Projects</span>
              </Link>
            </li>
            <li>
              <Link to="!#">
                <span className="ti-time"></span>
                <span>Timesheet</span>
              </Link>
            </li>
            <li>
              <Link to="!#">
                <span className="ti-book"></span>
                <span>Contacts</span>
              </Link>
            </li>
            <li>
              <Link to="!#">
                <span className="ti-settings"></span>
                <span>Account</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="main-content">     
        <header className="admin-header">
          <div className="search-wrapper">
            <span className="ti-search"></span>
            <input type="search" placeholder="Search" />
          </div>
          
          <div className="social-icons">
            <span className="ti-bell"></span>
            <span className="ti-comment"></span>
            <div></div>
          </div>
        </header>
          
        <main>    
          <h2 className="dash-title">Product</h2>
          <div className="dash-create">
            <div className="card-single">
              <div className="card-body">
                <div className="create-product">
                  <div className="upload">
                    <input type="file" name="file" id="file_up" />
                    <div id="file_img" style={styleUpload}>
                      <img src="https://cdn.dribbble.com/users/1843236/screenshots/5438408/untitled.jpg?compress=1&resize=400x300" alt=""/>
                      <span>x</span>
                    </div>
                  </div>

                  <form>
                    <div className="row">
                      <label htmlFor="product_id">Product ID</label>
                      <input type="text" name="product_id" id="product_id" required value={product.product_id} />
                    </div>
                    <div className="row">
                      <label htmlFor="title">Title</label>
                      <input type="text" name="title" id="title" required value={product.title} />
                    </div>
                    <div className="row">
                      <label htmlFor="price">Price</label>
                      <input type="text" name="price" id="price" required value={product.price} />
                    </div>
                    <div className="row">
                      <label htmlFor="description">Description</label>
                      <textarea type="text" name="description" id="description" required value={product.description} rows="2" />
                    </div>
                    <div className="row">
                      <label htmlFor="content">Content</label>
                      <textarea type="text" name="content" id="content" required value={product.content} rows="3" />
                    </div>
                    <div className="row">
                      <label htmlFor="categories">Categories:  </label>
                      <select name="category" value={product.category}>
                        <option value="">Please select a category</option>
                        {
                          categories.map(category => (
                            <option key={category._id} value={category.name}>
                              {category.name}
                            </option>
                          ))
                        }
                      </select>
                    </div>

                    <button type="submit">Create</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          

        </main>
      </div>
    </div>
  
  )
}

export default CreateProduct
