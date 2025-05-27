import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks';
import { addProduct, updateProduct } from '../features/products/productsSlice';
import '../style.css';
import type { Props, Product } from '../types';
import { validateName, validateAmount } from '../utils/productUtils';

const ProductForm: React.FC<Props> = ({ initialProduct }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [nameError, setNameError] = useState('');
  const [amountError, setAmountError] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setAmount(initialProduct.amount.toString());
    }
  }, [initialProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [isNameValid, nameError] = validateName(name);
    const [isAmountValid, amountError] = validateAmount(amount);
    if (!isNameValid || !isAmountValid) {
      setNameError(nameError);
      setAmountError(amountError);
      return;
    }
    setNameError('');
    setAmountError('');

    const product: Product = {
      id: initialProduct?.id || crypto.randomUUID(),
      name: name.trim(),
      amount: parseFloat(amount),
    };
    try {
      if (initialProduct) {
        dispatch(updateProduct(product));
      } else {
        dispatch(addProduct(product));
      }
      setName('');
      setAmount('');
    } catch (error) {
      console.error('Failed to save product:', error);
  }
  };

  return (
    <form onSubmit={handleSubmit} className="formInputWrapper">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex flex-col w-full sm:w-auto">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="productFormField w-full sm:w-auto"
          />
          {nameError && <span className="text-red-600 text-sm">{nameError}</span>}
        </div>
        <div className="flex flex-col w-full sm:w-auto">
          <input
            type="text"
            placeholder="Amount (€)"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setAmount(value);
              }
            }}
            className="productFormField w-full sm:w-auto"
          />
          {amountError && <span className="text-red-600 text-sm">{amountError}</span>}
        </div>
        <div className="flex flex-col w-full sm:w-auto">
          <button type="submit" className="actionButton w-full sm:w-auto">
            {initialProduct ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </form>
  );
};
export default ProductForm;
