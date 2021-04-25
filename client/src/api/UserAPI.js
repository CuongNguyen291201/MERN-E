import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get('/user/infor', {
            headers: {Authorization: token}
          })
          setIsLogged(true)
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
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

  const addCart = async (product) => {
    if (!isLogged) return swal("Fail!", "Please login to continue buying", "error");

    const check = cart.every(item => {
      return item._id !== product._id
    })
    if (check) {
      setCart([...cart, {...product, quantity: 1}])
    } else {
      swal("Thank you!", "This product has been added to cart!", "info");
    }
  } 

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    addCart: [cart, setCart]
  }
}

export default UserAPI
