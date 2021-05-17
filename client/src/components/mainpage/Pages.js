import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import Products from './products/Products';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import NotFound from './utils/not-found/NotFound';
import Banner from '../banner/Banner';
import DetailProduct from './detailProduct/DetailProduct';
import OrderHistory from './history/OrderHistory';
import OrderDetail from './history/OrderDetail';
import Admin from './admin/Admin';
import CreateProduct from './admin/create-product/CreateProduct'; 

import { GlobalState } from '../../GlobalState';

const Pages = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

    return (
      <Switch>
          <Route path="/" exact component={Banner} />
  
          <Route path="/products" exact component={Products} />
          <Route path="/detail/:id" exact component={DetailProduct} />
          
          <Route path="/login" exact component={ isLogged ? NotFound : Login} />
          <Route path="/register" exact component={ isLogged ? NotFound : Register} />
          <Route path="/history" exact component={ isLogged ? OrderHistory : NotFound} />
          <Route path="/history/:id" exact component={ isLogged ? OrderDetail : NotFound} />
          
          <Route path="/cart" exact component={Cart} />
  
          <Route path="/admin" exact component={ isAdmin ? Admin : NotFound } />
          <Route path="/admin/edit-product/:id" exact component={ isAdmin ? CreateProduct : NotFound } />
  
          <Route path="#" exact component={NotFound} />
      </Switch>
    )
  }

export default Pages
