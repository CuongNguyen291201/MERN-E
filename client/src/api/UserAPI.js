import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get('/user/infor', {
            headers: {Authorization: token}
          })
          setIsLogged(true)
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
          console.log(res)
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

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin]
  }
}

export default UserAPI
