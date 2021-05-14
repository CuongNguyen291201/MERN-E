import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);
  const [infor, setInfor] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get('/user/infor', {
            headers: {Authorization: token}
          })
          setIsLogged(true)
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
          setCart(res.data.cart)
          setInfor([res.data.name, res.data.mobile, res.data.address])
        } catch (err) {
          swal("Error", err.response.data.msg, "error")
        }
      }

      getUser()
    }
  }, [token])

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get('/api/payment', {
            headers: {Authorization: token}
          })
          setHistory(res.data)
        } else {
          const res = await axios.get('/user/history', {
            headers: {Authorization: token}
          })
          setHistory(res.data)
        }
      }
      getHistory()
    }
  }, [token, callback, isAdmin])

  const addCart = async (product) => {
    if (!isLogged) return swal("Fail!", "Please login to continue buying", "error");

    const check = cart.every(item => {
      return item._id !== product._id
    })
    if (check) {
      setCart([...cart, {...product, quantity: 1}])
      await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
        headers: {Authorization: token}
      })
    } else {
      swal("Thank you!", "This product has been added to cart!", "info");
    }
  } 

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory],
    callback: [callback, setCallback],
    infor: [infor, setInfor]
  }
}

export default UserAPI
