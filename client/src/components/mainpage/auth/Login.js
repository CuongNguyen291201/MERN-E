import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState({
    email: '', password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/user/login', {...user})
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

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit}>
        <h2>Hi,</h2>
        <p>Login or Register</p>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={user.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={user.password} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-dark w-100"
          disabled={user.email && user.password ? false : true}  
        > 
          Login
        </button>
        <p className="my-2">
          You don't have an account? <Link to="/register" style={{color: "crimson"}}>Register Now</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
