import React, { useEffect, useContext } from 'react';

import { GlobalState } from '../../GlobalState';
import ProductItem from '../mainpage/utils/productItem/ProductItem';

const FeatureProduct = () => {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [page, setPage] = state.productsAPI.page;
  const [sort, setSort] = state.productsAPI.sort;

  useEffect(() => {
    setPage(1/3)
    setSort('sort=-sold')
  }, [setPage, setSort])

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
