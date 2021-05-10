import React, { useState, useContext } from 'react';
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
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      categories.map(category => (
                        <tr key={category._id}>
                          <td>{category.name}</td>
                          <td>{new Date(category.createdAt).toDateString()}</td>
                          <td>{new Date(category.updatedAt).toDateString()}</td>
                          <td>
                            <button onClick={() => deleteCategory(category._id)}>Delete</button>
                            <button onClick={() => editCategory(category._id, category.name)}>Edit</button>
                          </td>
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
  )
}

export default Category
