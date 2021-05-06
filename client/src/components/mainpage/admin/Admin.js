import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { GlobalState } from '../../../GlobalState';

const Admin = () => {
  const state = useContext(GlobalState);
  const [categories] = state.categoryAPI.categories;

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
          <h2 className="dash-title">Overview</h2>
              
          <div className="dash-cards">
            <div className="card-single">
              <div className="card-body">
                <span className="ti-briefcase"></span>
                <div>
                  <h5>Account Balance</h5>
                  <h4>$30,659.45</h4>
                </div>
              </div>
              <div className="card-footer">
                <Link to="!#">View all</Link>
              </div>
            </div>
                  
            <div className="card-single">
              <div className="card-body">
                <span className="ti-reload"></span>
                <div>
                  <h5>Pending</h5>
                  <h4>$19,500.45</h4>
                </div>
              </div>
              <div className="card-footer">
                <Link to="!#">View all</Link>
              </div>
            </div>
                  
            <div className="card-single">
              <div className="card-body">
                <span className="ti-check-box"></span>
                <div>
                  <h5>Processed</h5>
                  <h4>$20,659</h4>
                </div>
              </div>
              <div className="card-footer">
                <Link to="!#">View all</Link>
              </div>
            </div>
          </div>
                  
          <section className="recent">
            <div className="activity-grid">
              <div className="activity-card">
                  <h3>Categories</h3>
                  
                  <div className="table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Created At</th>
                          <th>Updated At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          categories.map(category => (
                            <tr key={category._id}>
                              <td>{category.name}</td>
                              <td>{new Date(category.createdAt).toDateString()}</td>
                              <td>{new Date(category.updatedAt).toDateString()}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
              </div>
              
              <div className="summary">
                <div className="summary-card">
                  <div className="summary-single">
                    <span className="ti-id-badge"></span>
                    <div>
                      <h5>196</h5>
                      <small>Number of staff</small>
                    </div>
                  </div>
                  <div className="summary-single">
                    <span className="ti-calendar"></span>
                    <div>
                      <h5>16</h5>
                      <small>Number of leave</small>
                    </div>
                  </div>
                  <div className="summary-single">
                    <span className="ti-face-smile"></span>
                    <div>
                      <h5>12</h5>
                      <small>Profile update request</small>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
              
        </main>
      </div>
    </div>
  )
}

export default Admin
