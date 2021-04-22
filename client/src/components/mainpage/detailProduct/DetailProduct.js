import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';

const DetailProduct = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [detailProduct, setDetailProduct] = useState([]);

  useEffect(() => {
    if (params) {
      products.forEach(product => {
        if (product._id === params.id) setDetailProduct(product);
      })
    }
  }, [params, products])

  console.log(detailProduct)

  if (detailProduct.length === 0) return null;
  return (
    <div className="detail">
      <img src={detailProduct.images.url} alt=""/>
      <div className="box-detail">
        <div className="row">
          <h3>{detailProduct.title}</h3>
        </div>
        <p>$ {detailProduct.price}</p>
        <Link to="/cart" className="cart">Add to Cart</Link>
        <p>Sold: {detailProduct.sold}</p>
        <p>Shop secure. Free Returns</p>
        <p>Share</p>
      </div>
    </div>
  )
}

export default DetailProduct
