import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory, useParams } from 'react-router-dom';

import { GlobalState } from '../../../../GlobalState';
import Loading from '../../utils/loading/Loading';

const initialState = {
  product_id: '',
  title: '',
  price: 0,
  description: '',
  content: '',
  category: '',
  _id: ''
};

const CreateProduct = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [products] = state.productsAPI.products;
  const [categories] = state.categoryAPI.categories;
  const [callback, setCallback] = state.productsAPI.callback;
  const [isAdmin] = state.userAPI.isAdmin;

  const [product, setProduct] = useState(initialState);
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    if (params.id) {
      setOnEdit(true)
      products.forEach(product => {
        if (product._id === params.id) {
          setProduct(product)
          setImages(product.images)
        }    
      })
    } else {
      setOnEdit(false)
      setProduct(initialState)
      setImages(false)
    }
  }, [params, products])

  const styleUpload = {
    display: images ? "block" : "none"
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    try {
      if (!isAdmin) return swal("Error", "You're not an admin.", "error")
      const file = e.target.files[0]

      if (!file) return swal("Error", "File not exist.", "error")
      if (file.size > 1024 * 1024) return swal("Error", "Size too large.", "error")
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') return swal("Error", "File format is incorrect.", "error")

      let formData = new FormData()
      formData.append('file', file)

      setLoading(true)
      const res = await axios.post('/api/upload', formData, {
        headers: {'content-type': 'multipart/form-data', Authorization: token}
      })
      setLoading(false)
      setImages(res.data)
    } catch (err) {
      swal("Error", err.response.data.msg, "error")
    }
  }

  const handleDestroy = async (e) => {
    try {
      if (!isAdmin) return swal("Error", "You're not an admin.", "error")
      setLoading(true)
      await axios.post('/api/destroy', {public_id: images.public_id}, {
        headers: {Authorization: token}
      })
      setLoading(false)
      setImages(false)
    } catch (err) {
      swal("Error", err.response.data.msg, "error")
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setProduct({...product, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!isAdmin) return swal("Error", "You're not an admin.", "error")
      if (!images) return swal("Error", "No image upload.", "error")  
      
      if (onEdit) {
        await axios.put(`/api/products/${product._id}`, {...product, images}, {
          headers: {Authorization: token}
        })
      } else {
        await axios.post('/api/products', {...product, images}, {
          headers: {Authorization: token}
        })  
      }
      setCallback(!callback)
      history.push('/admin/create-product')
    } catch (err) {
      swal("Error", err.response.data.msg, "error")
    }
  }

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true)
      const destroyImg = axios.post('/api/destroy', {public_id}, {
        headers: {Authorization: token}
      })

      const deleteProduct = axios.delete(`/api/products/${id}`, {
        headers: {Authorization: token}
      })

      await destroyImg
      await deleteProduct
      setCallback(!callback)
      setLoading(false)
    } catch (err) {
      swal("Error", err.response.data.msg, "error")
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
                    <input type="file" name="file" id="file_up" onChange={handleUpload} />
                    {
                      loading ? 
                        <div id="file_img"><Loading /></div>
                      :
                        <div id="file_img" style={styleUpload}>
                          <img src={images ? images.url : ""} alt=""/>
                          <span onClick={handleDestroy}>x</span>
                        </div>
                    }
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <label htmlFor="product_id">Product ID</label>
                      <input type="text" name="product_id" id="product_id" required value={product.product_id} onChange={handleChange} />
                    </div>
                    <div className="row">
                      <label htmlFor="title">Title</label>
                      <input type="text" name="title" id="title" required value={product.title} onChange={handleChange} />
                    </div>
                    <div className="row">
                      <label htmlFor="price">Price</label>
                      <input type="text" name="price" id="price" required value={product.price} onChange={handleChange} />
                    </div>
                    <div className="row">
                      <label htmlFor="description">Description</label>
                      <textarea type="text" name="description" id="description" required value={product.description} rows="2" onChange={handleChange} />
                    </div>
                    <div className="row">
                      <label htmlFor="content">Content</label>
                      <textarea type="text" name="content" id="content" required value={product.content} rows="3" onChange={handleChange} />
                    </div>
                    <div className="row">
                      <label htmlFor="categories">Categories:  </label>
                      <select name="category" value={product.category} onChange={handleChange}>
                        <option value="">Please select a category</option>
                        {
                          categories.map(category => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))
                        }
                      </select>
                    </div>

                    <button type="submit">{onEdit ? "Update" : "Create"}</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          <section className="recent">
            <div className="activity-grid">
              <div className="activity-card">
                <h3>Products</h3>
                  
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Sold</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        products.map(product => (
                          <tr key={product._id}>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.sold}</td>
                            <td className="td-team">
                                <img src={product.images.url} alt="" className="img" />
                            </td>
                            <td>
                              {product.category}
                            </td>
                            <td>
                              <Link to={`/admin/edit-product/${product._id}`} style={{marginRight: '5px'}}>Edit</Link>
                              <Link to="/admin/create-product" onClick={() => deleteProduct(product._id, product.images.public_id)}>Delete</Link>
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
      </div>
    </div>
  
  )
}

export default CreateProduct
