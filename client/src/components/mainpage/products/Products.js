import React, { useContext, useEffect } from 'react';

import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';

const Products = () => {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [page, setPage] = state.productsAPI.page;
  const [result] = state.productsAPI.result;
  
  const [categories] = state.categoryAPI.categories;

  useEffect(() => {
    setCategory('')
    setSort('') 
    setPage(12/9)
  }, [setCategory, setSort, setPage])

  return (
    <div className="product-all">
      <div className="category-page">
        <div className="filter-products">
          <div className="filter">
            <span>Filter: </span>
            <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Products</option>
              {
                categories.map(category => (
                  <option value={"category=" + category.name} key={category._id}>
                    {category.name}
                  </option>
                ))
              }
            </select>
          </div>

          <div className="sort">
              <span>Sort By: </span>
              <select name="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Newest</option>
                <option value="sort=oldest">Oldest</option>
                <option value="sort=-sold">Best sales</option>
                <option value="sort=-price">Price: Hight-Low</option>
                <option value="sort=price">Price: Low-Hight</option>
              </select>
          </div>
        </div>

        <div className="products">
          {
            products.map(product => {
              return <ProductItem key={product._id} product={product}/>
            })
          }
        </div>
      </div>
      {
        result < page * 9 ? ""
        : <button onClick={() => setPage(page+1)}>Load More</button>
      }
    </div>
  )
}

export default Products
