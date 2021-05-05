import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

import valid from '../utils/valid/valid';

const Register = () => {
  const [user, setUser] = useState({
    name: '', email: '', password: '', cf_password: ''
  })
  const [error, setError] = useState({})
  // const [checkPass, setCheckPass] = useState(false)
  // const [checkCfPass, setCheckCfPass] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const check = valid({...user})
    if (check.errLength > 0 ) {
      setError(check.errMsg)
    } else {
      setError('')
      try {
        await axios.post('/user/register', {...user})
        localStorage.setItem('Login', true)
        window.location.href = "/"
      } catch (err) {
        swal({
          title: "Error",
          text: err.response.data.msg,
          icon: "error",
          button: "OK",
        });
      }
    }
  }

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit}>
        <h2 style={{textAlign: 'center'}}>Register</h2>
        <div className="form-group">
          <label htmlFor="exampleInputName1">Name</label>
          <input type="name" className="form-control" id="exampleInputName1" aria-describedby="nameHelp" name="name" value={user.name} onChange={handleChange} />

          <small className="form-text text-danger">
            {error.name ? error.name : ''}
          </small>        
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={user.email} onChange={handleChange} />

          <small className="form-text text-danger">
            {error.email ? error.email : ''}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={user.password} onChange={handleChange} />
        
          <small className="form-text text-danger">
            {error.password ? error.password : ''}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputConfirmPassword1">Confirm Password</label>
          <input type="password" className="form-control" id="exampleInputConfirmPassword1" name="cf_password" value={user.cf_password} onChange={handleChange} />
        
          <small className="form-text text-danger">
            {error.cf_password ? error.cf_password : ''}
          </small>
        </div>
        <button type="submit" className="btn btn-dark w-100"
          disabled={user.name && user.email && user.password && user.cf_password ? false : true}  
        > 
          Register
        </button>
        <p className="my-2">
          Already have an account? <Link to="/login" style={{color: "crimson"}}>Login Now</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
