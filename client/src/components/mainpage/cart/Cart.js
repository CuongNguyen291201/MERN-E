import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

import { GlobalState } from '../../../GlobalState';
import PaypalButton from './PaypalButton';

const Cart = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [cart, setCart] = state.userAPI.cart;
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
  }

  if (cart.length === 0) return <h2 style={{ textAlign: 'center', fontSize: '5rem'}}>Cart Empty</h2>
    
  return (
    <div className="shopping-cart">
      <div>

      <h2>CART <small>({cart.length} propucts)</small></h2>
      {
        cart.map(product => (
          <div className="cart" key={product._id}>
              <img src={product.images.url} alt="" className="img_container" />
              <div className="box-detail">
                <div className="row">
                  <h3>{product.title}</h3>
                </div>
                <p>$ {product.price * product.quantity}</p>

                <div className="amount">
                  <button onClick={() => decrement(product._id)}> - </button>
                  <span>{product.quantity}</span>
                  <button onClick={() => increment(product._id)}> + </button>
                </div>

                <div className="delete" onClick={() => removeProduct(product._id)}>X</div>
              </div>
            </div>
        ))
      }
      </div>

      <div className="total">
        <h3>Total: ${total}</h3>
        <PaypalButton 
          total={total}
          tranSuccess={tranSuccess}
          />
      </div>
      
    </div> 
  )
}

export default Cart
