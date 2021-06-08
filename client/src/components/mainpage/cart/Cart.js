import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';

import { GlobalState } from '../../../GlobalState';
import PaypalButton from './PaypalButton';
import Empty from './img/logo-cart.png'

const Cart = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [infor] = state.userAPI.infor; 
  const [cart, setCart] = state.userAPI.cart;
  const [callback, setCallback] = state.userAPI.callback;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      }, 0)
      setTotal(total)
    }
    getTotal()
  }, [cart])

  const addToCart = async (cart) => {
    await axios.patch('/user/addcart', {cart}, {
      headers: {Authorization: token}
    })
  }

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1
      }
    })

    setCart([...cart])
    addToCart(cart)
  }

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
      }
    })

    setCart([...cart])
    addToCart(cart)
  }

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1)
        }
      })
      setCart([...cart])
      addToCart(cart)
    }
  }

  const tranSuccess = async (payment) => {
    const {paymentID, address} = payment;

    await axios.post('/api/payment', {cart, paymentID, address}, {
      headers: {Authorization: token}
    })

    setCart([])
    addToCart([])
    swal("Thank you!", "You have successfully placed an order!", "success");
    setCallback(!callback)
  }

  if (cart.length === 0) {
    return (
      <div className="shopping-cart no-products">
        <img src={Empty} alt=""/>
        <p>There are no products in your shopping cart.</p>
        <Link to="/products">Keep shopping</Link>
      </div>
    )
  }
    
  return (
    <div className="shopping-cart">
      <div className="cart-detail">
        <h5>CART <small>({cart.length} products)</small></h5>
          {
            cart.map(product => (
              <Fade left key={product._id}>
                <div className="cart">
                  <img src={product.images.url} alt="" className="img_container" />
                  <div className="box-detail">
                    <h3>{product.title}</h3>
                    <p>$ {product.price * product.quantity}</p>

                    <div className="amount">
                      <button onClick={() => decrement(product._id)}> - </button>
                      <span>{product.quantity}</span>
                      <button onClick={() => increment(product._id)}> + </button>
                    </div>

                    <i className="fas fa-times delete" onClick={() => removeProduct(product._id)}></i>
                  </div>
                </div>
              </Fade>
            ))
          }
      </div>

      <div className="total">
        <div className="address">
          <h5 className="address-title">Address</h5>
          <p className="address-name">{infor[0]} | {infor[1]}</p>
          <p>{infor[2]}</p>
        </div>
        <div className="payment">
          <p>Subtotal: <span>${total}</span></p>
          <p>Total: <span>${total}</span></p>
        </div>
        <PaypalButton 
          total={total}
          tranSuccess={tranSuccess}
          className="payment-button"
        />
      </div>
      
    </div> 
  )
}

export default Cart
