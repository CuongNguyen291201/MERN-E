import React from 'react';

import { Link } from 'react-router-dom';

const Admin = () => {
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
              <Link to="!#">
                <span className="ti-home"></span>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="!#">
                <span className="ti-face-smile"></span>
                <span>Team</span>
              </Link>
            </li>
            <li>
              <Link to="!#">
                <span className="ti-agenda"></span>
                <span>Tasks</span>
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
                  <h3>Recent activity</h3>
                  
                  <div className="table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>Project</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Team</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>App Development</td>
                          <td>15 Aug, 2020</td>
                          <td>22 Aug, 2020</td>
                          <td className="td-team">
                              <div className="img-1"></div>
                              <div className="img-2"></div>
                              <div className="img-3"></div>
                          </td>
                          <td>
                            <span className="badge success">Success</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Logo Design</td>
                          <td>15 Aug, 2020</td>
                          <td>22 Aug, 2020</td>
                          <td className="td-team">
                            <div className="img-1"></div>
                            <div className="img-2"></div>
                            <div className="img-3"></div>
                          </td>
                          <td>
                            <span className="badge warning">Processing</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Server setup</td>
                          <td>15 Aug, 2020</td>
                          <td>22 Aug, 2020</td>
                          <td className="td-team">
                            <div className="img-1"></div>
                            <div className="img-2"></div>
                            <div className="img-3"></div>
                          </td>
                          <td>
                            <span className="badge success">Success</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Front-end Design</td>
                          <td>15 Aug, 2020</td>
                          <td>22 Aug, 2020</td>
                          <td className="td-team">
                            <div className="img-1"></div>
                            <div className="img-2"></div>
                            <div className="img-3"></div>
                          </td>
                          <td>
                            <span className="badge warning">Processing</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Web Development</td>
                          <td>15 Aug, 2020</td>
                          <td>22 Aug, 2020</td>
                          <td className="td-team">
                            <div className="img-1"></div>
                            <div className="img-2"></div>
                            <div className="img-3"></div>
                          </td>
                          <td>
                            <span className="badge success">Success</span>
                          </td>
                        </tr>
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
