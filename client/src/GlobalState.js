import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import ProductsAPI from './api/ProductsAPI';
import UserAPI from './api/UserAPI';
import CategoriesAPI from './api/CategoriesAPI';

export const GlobalState = createContext()

export const DataProvider = ({children}) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const login = localStorage.getItem('Login')
    if (login) {
      const refreshToken = async () => {
        const res = await axios.get('/user/refresh_token', )
        setToken(res.data.accesstoken)
        
        setTimeout(() => {
          refreshToken()
        }, 10 * 60 * 1000)
      }
      refreshToken()
    }
  }, [])
  
  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    categoryAPI: CategoriesAPI(token)
  }

  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  )
}