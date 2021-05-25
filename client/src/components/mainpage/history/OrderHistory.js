import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { GlobalState } from '../../../GlobalState';

const OrderHistory = () => {
  const state = useContext(GlobalState)
  const [history] = state.userAPI.history

  return (
    <div className="history-page">
      <h2>History</h2>
      <h4>You have {history.length} ordered</h4>

      <section className="recent">
        <div className="activity-payment">
          <div className="activity-card">
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                  <th>Payment ID</th>
                  <th>Date of Puchased</th>
                  <th></th>
                  </tr>
                </thead>
                <tbody>
                {
                  history.map(item => (
                    <tr key={item._id}>
                      <td>{item.paymentID}</td>
                      <td>{new Date(item.createdAt).toDateString()}</td>
                      <td className="history-view"><Link to={`/history/${item._id}`}>View</Link></td>
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

export default OrderHistory
