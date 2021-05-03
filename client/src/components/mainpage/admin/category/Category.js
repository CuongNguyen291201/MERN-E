import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

import { GlobalState } from '../../../../GlobalState';

const Category = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [categories] = state.categoryAPI.categories;
  const [callback, setCallback] = state.categoryAPI.callback;
  const [category, setCategory] = useState('');
  const [onEdit, setOnEdit] = useState(false);
  const [id, setId] = useState('');

  const createCategory = async () => {
    try {
      if (onEdit) {
        const res = await axios.put(`/api/category/${id}`, {name: category}, {
          headers: {Authorization: token}
        })
  
        swal("Success!", res.data.msg, "success");
      } else {
        const res = await axios.post('/api/category', {name: category}, {
          headers: {Authorization: token}
        })
  
        swal("Success!", res.data.msg, "success");
      }

      setOnEdit(false);
      setCallback(!callback);
      setCategory('');
    } catch (err) { 
      swal("Error!", err.response.data.msg, "error");
    }
  }

  const editCategory = async (id, name) => {
    setId(id);
    setCategory(name);
    setOnEdit(true);
  }

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: {Authorization: token}
      })

      swal("Success!", res.data.msg, "success");
      setCallback(!callback);
    } catch (err) {
      swal("Error!", err.response.data.msg, "error");
    }
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
              <Link to="!#">
                <span className="ti-face-smile"></span>
                <span>Create Product</span>
              </Link>
            </li>
            <li>
              <Link to="!#">
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
          <h2 className="dash-title">Category</h2>
          
          <div className="dash-create">
            <div className="card-single">
              <div className="card-body">
                <div>
                  <h5>Name</h5>
                  <input type="text" name="category" value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
              </div>
              <div className="card-footer">
                <button onClick={() => createCategory()}>{ onEdit ? "Update" : "Create" }</button>
              </div>
            </div>
          </div>

          <div className="dash-cards">
            {
              categories.map(category => (
                <div className="card-single" key={category._id}>
                  <div className="card-body">
                    <span className="ti-briefcase"></span>
                    <div>
                      <h5>{category.name}</h5>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button onClick={() => deleteCategory(category._id)}>Delete</button>
                    <button onClick={() => editCategory(category._id, category.name)}>Edit</button>
                  </div>
                </div>
              ))
            }
          </div>     
        </main>
      </div>
    </div>
  )
}

export default Category
