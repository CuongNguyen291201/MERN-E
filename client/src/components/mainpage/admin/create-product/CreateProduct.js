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
  const [page, setPage] = state.productsAPI.page;
  const [sort, setSort] = state.productsAPI.sort;
  const [category, setCategory] = state.productsAPI.category;
  const [search, setSearch] = state.productsAPI.search; 

  const [product, setProduct] = useState(initialState);
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    setPage(10)
    setSort('')
    setCategory('')
    setSearch('')
  }, [setPage, setSort, setCategory, setSearch])

  useEffect(() => {
    if (params.id) {
      setEdit(true)
      products.forEach(product => {
        if (product._id === params.id) {
          setProduct(product)
          setImages(product.images)
        }    
      })
    } else {
      setEdit(false)
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
      
      if (edit) {
        await axios.put(`/api/products/${product._id}`, {...product, images}, {
          headers: {Authorization: token}
        })
      } else {
        await axios.post('/api/products', {...product, images}, {
          headers: {Authorization: token}
        })  
      }
      setCallback(!callback)
      history.push('/admin')
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
      history.push('/admin')
    } catch (err) {
      swal("Error", err.response.data.msg, "error")
    }
  }

  return (
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
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))
                    }
                  </select>
                </div>

                <button type="submit">{edit ? "Update" : "Create"}</button>
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
                  <h5>{products.length}</h5>
                  <small>Number of products</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CreateProduct
