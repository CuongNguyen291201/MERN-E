import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';

import { GlobalState } from '../../../GlobalState';

const OrderDetail = () => {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetails, setOrderDetails] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach(item => {
        if (item._id === params.id) setOrderDetails(item)
      })
    }
  }, [params, history])

  if (orderDetails.length === 0) return null;

  return (
    <div className="history-page">
      <section className="recent">
        <div className="activity-payment">
          <div className="activity-card">
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Postal Code</th>
                    <th>Country Code</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{orderDetails.address.recipient_name}</td>
                    <td>{orderDetails.address.line1} - {orderDetails.address.city}</td>
                    <td>{orderDetails.address.postal_code}</td>
                    <td>{orderDetails.address.country_code}</td>
                  </tr>
                </tbody>
              </table>
              </div>
          </div>
        </div>  
      </section>

      <section className="recent">
        <div className="activity-payment">
          <div className="activity-card">
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Products</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                {
                  orderDetails.cart.map(item => (
                    <tr key={item._id}>
                      <td>
                        <Zoom>
                          <img src={item.images.url} alt=""/>
                        </Zoom>
                      </td>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price * item.quantity}</td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>  
      </section>
    </div>
  )
}

export default OrderDetail
