import React, { useEffect, useContext } from 'react';

import { GlobalState } from '../../GlobalState';
import ProductItem from '../mainpage/utils/productItem/ProductItem';

const SignatureProduct = () => {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [category, setCategory] = state.productsAPI.category;
  const [search, setSearch] = state.productsAPI.search;

  setCategory("category=Signature")
  useEffect(() => {
    setCategory('category=')
    setSearch('')
  }, [setCategory, setSearch, category, search])

  return (
    <div className="home">
      <h5>Signature products</h5>
      <div className="products-home">
        {
          products.map(product => (
            <ProductItem product={product} key={product._id} />
          ))
        }
      </div>
    </div>
  )
}

export default SignatureProduct
