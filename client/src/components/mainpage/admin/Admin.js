import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { GlobalState } from '../../../GlobalState';
import CreateProduct from './create-product/CreateProduct';
import Category from './category/Category';

const Admin = () => {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [products] = state.productsAPI.products;

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
              <Link to="/admin">
                <span className="ti-face-smile"></span>
                <span>Create Product</span>
              </Link>
            </li>
            <li>
              <Link to="/admin">
                <span className="ti-agenda"></span>
                <span>Create Category</span>
              </Link>
            </li>
            <li>
              <Link to="/admin">
                <span className="ti-clipboard"></span>
                <span>Leaves</span>
              </Link>
            </li>
            <li>
              <Link to="/admin">
                <span className="ti-folder"></span>
                <span>Projects</span>
              </Link>
            </li>
            <li>
              <Link to="/admin">
                <span className="ti-time"></span>
                <span>Timesheet</span>
              </Link>
            </li>
            <li>
              <Link to="/admin">
                <span className="ti-book"></span>
                <span>Contacts</span>
              </Link>
            </li>
            <li>
              <Link to="/admin">
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
                  <h5>Total Revenue</h5>
                  <h4>
                  ${
                    history.reduce((prev, item) => prev + (
                      item.cart.reduce((pre, product) => pre + (product.quantity * product.price), 0)
                    ), 0)  
                  }
                  </h4>
                </div>
              </div>
            </div>
                  
            <div className="card-single">
              <div className="card-body">
                <span className="ti-check-box"></span>
                <div>
                  <h5>Number of Products Sold</h5>
                  <h4>
                  {
                    products.reduce((pre, product) => pre + product.sold, 0)
                  }
                  </h4>
                </div>
              </div>
            </div>
          </div>
                  
          <section className="recent">
            <div className="activity-payment">
              <div className="activity-card">
                <h3>Payment</h3>
                  
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Date Of Ordered</th>
                        <th>Address</th>
                        <th>Quantity</th>
                        <th>Total Money</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        history.map(item => (
                          <tr key={item._id}>
                            <td className="td-team">
                              {
                                item.cart.map(product => (
                                  <img src={product.images.url} alt="" className="img" key={product._id}/>
                                ))
                              }
                            </td>
                            <td>{new Date(item.createdAt).toDateString()}</td>
                            <td>{item.address.recipient_name + " - " + item.address.line1 + " - " + item.address.city + " - " + item.address.country_code}</td>
                            <td>
                              {
                                item.cart.map(product => (
                                  <p key={product._id}><span>{product.title + " - " + product.quantity}</span></p>
                                ))
                              }
                            </td>
                            <td>
                              ${
                                item.cart.reduce((pre, product) => pre + (product.quantity * product.price), 0)
                              }
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>  
          </section>
        </main>
        <Category />

        <CreateProduct />
      </div>
    </div>
  )
}

export default Admin
