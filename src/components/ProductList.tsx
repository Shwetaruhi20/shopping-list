import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchInitialProducts } from '../features/products/productsSlice';
import "../style.css";
import ProductItem from './ProductItem';


const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInitialProducts());
  }, [dispatch]);

  const products = useAppSelector(state => state.products);
  return (
    <div>
      <div className='tableContainer'>
        <table className='productTable'>
          <thead>
            <tr>
              <th className='tableHeader'>Name</th>
              <th className='tableHeader'>Amount (€)</th>
              <th className='tableHeader'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};



export default ProductList;
