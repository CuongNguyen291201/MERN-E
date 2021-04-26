import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { GlobalState } from '../../../../GlobalState';

const ProductItem = ({product}) => {
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;

  return (
    <div className="product_card">
      <Link to={`/detail/${product._id}`}>
        <img src={product.images.url} alt=""/>

        <div className="product_box">
          <h3 title={product.title}>{product.title}</h3>
          <p>${product.price}</p>
        </div>
      </Link>

      <div className="row_btn">
        <Link id="btn_buy" to='#!' onClick={() => addCart(product)} >Add to Cart</Link>
      </div>
    </div>
  )
}

export default ProductItem
