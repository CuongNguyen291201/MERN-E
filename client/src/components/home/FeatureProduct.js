import React, { useEffect, useContext } from 'react';

import { GlobalState } from '../../GlobalState';
import ProductItem from '../mainpage/utils/productItem/ProductItem';

const FeatureProduct = () => {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search; 

  useEffect(() => {
    setSort('sort=-sold')
    setSearch('')
  }, [setSort, setSearch])
  
  return (
    <div className="home">
      <h5>Featured products</h5>
      <div className="products-home"> 
        {
          products.map(product => (
            <ProductItem key={product._id} product={product}/>
            ))
        }
      </div>
    </div>
  )
}

export default FeatureProduct
