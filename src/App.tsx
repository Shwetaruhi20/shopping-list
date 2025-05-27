import React from 'react';
import './App.css'
import { Provider } from 'react-redux';
import { store } from './store/store';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

const App: React.FC = () => (
  <Provider store={store}>
    <div className='appHeader'>
      <div className="logo">
        <img src="/logo.png" height={30} alt="Logo" />
      </div>
      <div className='shopping-list-title'>
        Shopping List
      </div>
    </div>
    <ProductList />
    <div className='add-product-title'>
        Add New Products
    </div>
    <ProductForm />
  </Provider>
);

export default App;
