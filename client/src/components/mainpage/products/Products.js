import React, { useContext } from 'react';

import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';

const Products = () => {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  
  return (
    <div className="category-page">
      <div className="sort-products">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates facilis amet quas facere eligendi numquam vero, beatae rerum repellat quia quasi quo suscipit perferendis quod. Amet eum aut distinctio nobis?</p>
      </div>

      <div className="products">
        {
          products.map(product => {
            return <ProductItem key={product._id} product={product}/>
          })
        }
      </div>
    </div>
  )
}

export default Products
