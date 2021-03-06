import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';

import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';

const DetailProduct = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [detailProduct, setDetailProduct] = useState([]);
  const addCart = state.userAPI.addCart;

  useEffect(() => {
    if (params) {
      products.forEach(product => {
        if (product._id === params.id) setDetailProduct(product);
      })
    }
  }, [params, products])

  if (detailProduct.length === 0) return null;
  return (
    <>
      <div className="detail">
        <Zoom>
          <img src={detailProduct.images.url} alt=""/>
        </Zoom>
        <div className="detail-product">
          <div className="row">
            <h3>{detailProduct.title}</h3>
          </div>
          <p>$ {detailProduct.price}</p>
          <p 
            to="/cart" className="cart"
            onClick={() => addCart(detailProduct)}
          >
            Add to Cart
          </p>
          <p>Sold: {detailProduct.sold}</p>
          <p>Shop secure. Free Returns</p>
          <p>Share: 
            {" "}<i className="fab fa-facebook-f fb"></i>
            {" "}<i className="fab fa-youtube yt"></i>
          </p>
        </div>
      </div>
      <div className="related-products">
        <h3>Related Products</h3>
        <div className="products">
          {
            products.map(product => {
              return product.category === detailProduct.category 
                ? <ProductItem key={product._id} product={product} /> : null
              })
          }
        </div>
      </div>
    </>
  )
}

export default DetailProduct
