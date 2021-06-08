import React, { useEffect, useContext } from 'react';

import { GlobalState } from '../../GlobalState';
import ProductItem from '../mainpage/utils/productItem/ProductItem';

const FeatureProduct = () => {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search; 
  const [page, setPage] = state.productsAPI.page;
  const [category, setCategory] = state.productsAPI.category;

  useEffect(() => {
    setSort('sort=-sold')
    setSearch('')
    setPage(2/3)
    setCategory('')
  }, [setSort, setSearch, setPage, setCategory, sort, search, page, category])
  
  return (
    <div className="home">
      <h5>Today's Suggestions</h5>
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
