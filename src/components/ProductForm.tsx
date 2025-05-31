import React, { useReducer } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addProduct } from '../features/products/productsSlice';
import '../style.css';
import type { Props, Product, FormState, addProductAction } from '../types';
import { validateName, validateAmount, checkDuplicates, handleAmountChange, handleNameChange } from '../utils/productUtils';
import type { RootState } from '../store/store';

const initialState: FormState = {
  name: '',
  amount: '',
  nameError: '',
  amountError: '',
};

const reducer = (state: FormState, action: addProductAction): FormState => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_AMOUNT':
      return { ...state, amount: action.payload };
    case 'SET_NAME_ERROR':
      return { ...state, nameError: action.payload };
    case 'SET_AMOUNT_ERROR':
      return { ...state, amountError: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const ProductForm: React.FC<Props> = () => {
  const [state, dispatchForm] = useReducer(reducer, initialState);
  const dispatch = useAppDispatch();
  const products = useAppSelector((state: RootState) => state.products);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [isNameValid, nameError] = validateName(state.name);
    const [isAmountValid, amountError] = validateAmount(state.amount);
    const isDuplicate = checkDuplicates(state.name, products);

    if (!isNameValid || !isAmountValid || isDuplicate) {
      dispatchForm({
        type: 'SET_NAME_ERROR',
        payload: isDuplicate ? 'Product with this name already exists.' : nameError,
      });
      dispatchForm({ type: 'SET_AMOUNT_ERROR', payload: amountError });
      return;
    }

    dispatchForm({ type: 'SET_NAME_ERROR', payload: '' });
    dispatchForm({ type: 'SET_AMOUNT_ERROR', payload: '' });

    const product: Product = {
      id: crypto.randomUUID(),
      name: state.name.trim(),
      amount: parseFloat(state.amount),
    };

    try {
      dispatch(addProduct(product));
      dispatchForm({ type: 'RESET' });
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="tableContainer">
      <table className='productTable'>
        <tbody>
          <tr>
            <td className="tableData w-1/2">
              <input
                type="text"
                placeholder="Product Name"
                value={state.name}
                onChange={(e) => handleNameChange(e, (val) => dispatchForm({ type: 'SET_NAME', payload: val }))}
                className="addProductFormField"
              />
              {state.nameError && <span className="text-red-600 text-sm">{state.nameError}</span>}
            </td>
            <td className="tableData w-1/4">
              <input
                type="text"
                placeholder="Amount (€)"
                value={state.amount}
                onChange={(e) => handleAmountChange(e, (val) => dispatchForm({ type: 'SET_AMOUNT', payload: val }))}
                className="addProductFormField"
              />
              {state.amountError && <span className="text-red-600 text-sm">{state.amountError}</span>}
            </td>
            <td className="tableData w-1/4">
              <button type="submit" className="actionButton w-full sm:w-auto">
                {'Add'}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default ProductForm;
