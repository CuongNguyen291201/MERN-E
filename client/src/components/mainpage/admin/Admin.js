import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { GlobalState } from '../../../GlobalState';
import CreateProduct from './create-product/CreateProduct';
import Category from './category/Category';

const Admin = () => {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;

  const [paymentDetail, setPaymentDetail] = useState([])
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach(item => {
        if (item._id === params.id) setPaymentDetail(item)
      })
    }
  }, [params, history])

  console.log(history)

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
                                {
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
          
          {/* {
            params.id ? 
              <div className="payment-infor table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      paymentDetail.cart.map(item => (
                        <tr key={item._id}>
                          <td><img src={item.images.url} alt=""/></td>
                          <td>{item.title}</td>
                          <td>{item.quantity}</td>
                          <td>{item.quantity * item.price}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            : <div></div>
          } */}

        </main>
        <Category />

        <CreateProduct />
      </div>
    </div>
  )
}

export default Admin
