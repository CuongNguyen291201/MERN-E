import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([])

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
        } catch (err) {
          swal({
            title: "Error",
            text: err.response.data.msg,
            icon: "error",
            button: "OK",
          });
        }
      }

      getUser()
    }
  }, [token])

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        const res = await axios.get('/user/history', {
          headers: {Authorization: token}
        })
        setHistory(res.data)
      }

      getHistory()
    }
  }, [token])

  const addCart = async (product) => {
    if (!isLogged) return swal("Fail!", "Please login to continue buying", "error");

    const check = cart.every(item => {
      return item._id !== product._id
    })
    if (check) {
      setCart([...cart, {...product, quantity: 1}])
      await axios.patch('/user/addtocart', {cart: [...cart, {...product, quantity: 1}]}, {
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
    history: [history, setHistory]
  }
}

export default UserAPI
