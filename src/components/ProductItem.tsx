import React, { useReducer } from "react";
import { useAppDispatch } from "../hooks";
import { removeProduct, updateProduct } from "../features/products/productsSlice";
import "../style.css";
import type { ProductItemProps, ProductState, EditProductAction } from "../types";
import { validateName, validateAmount, handleNameChange, handleAmountChange } from "../utils/productUtils";

const reducer = (state: ProductState, action: EditProductAction): ProductState => {
  switch (action.type) {
    case "SET_EDITING":
      return { ...state, isEditing: action.payload };
    case "SET_NAME":
      return { ...state, editedName: action.payload };
    case "SET_AMOUNT":
      return { ...state, editedAmount: action.payload };
    case "SET_NAME_ERROR":
      return { ...state, nameError: action.payload };
    case "SET_AMOUNT_ERROR":
      return { ...state, amountError: action.payload };
    case "RESET":
      return {
        isEditing: false,
        editedName: action.payload.name,
        editedAmount: action.payload.amount,
        nameError: "",
        amountError: "",
      };
    default:
      return state;
  }
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const [state, dispatchForm] = useReducer(reducer, {
    isEditing: false,
    editedName: product.name,
    editedAmount: product.amount.toString(),
    nameError: "",
    amountError: "",
  });

  const validate = (): boolean => {
    const [isNameValid, nameErr] = validateName(state.editedName);
    const [isAmountValid, amountErr] = validateAmount(state.editedAmount);
    dispatchForm({ type: "SET_NAME_ERROR", payload: nameErr });
    dispatchForm({ type: "SET_AMOUNT_ERROR", payload: amountErr });
    return isNameValid && isAmountValid;
  };

  const handleSave = () => {
    if (!validate()) return;
    const amountNum = parseFloat(state.editedAmount);
    if (state.editedName === product.name && amountNum === product.amount) {
      dispatchForm({ type: "SET_EDITING", payload: false });
      return;
    }
    dispatch(updateProduct({ ...product, name: state.editedName.trim(), amount: amountNum }));
    dispatchForm({ type: "SET_EDITING", payload: false });
  };

  const handleCancel = () => {
    dispatchForm({
      type: "RESET",
      payload: { name: product.name, amount: product.amount.toString() },
    });
  };

  return (
    <tr>
      <td className="tableData">
        {state.isEditing ? (
          <>
            <input
              type="text"
              value={state.editedName}
              onChange={(e) => handleNameChange(e, (val) => dispatchForm({ type: "SET_NAME", payload: val }))}
              className={`${state.isEditing ? "productFormField" : ""}`}
            />
            {state.nameError && <div className="text-red-600 text-sm">{state.nameError}</div>}
          </>
        ) : (
          <span>{product.name}</span>
        )}
      </td>
      <td className="tableData">
        {state.isEditing ? (
          <div>
            <input
              type="text"
              value={state.editedAmount}
              onChange={(e) => handleAmountChange(e, (val) => dispatchForm({ type: "SET_AMOUNT", payload: val }))}
              className={`${state.isEditing ? "productFormField" : ""}`}
            />
            {state.amountError && <div className="text-red-600 text-sm">{state.amountError}</div>}
          </div>
        ) : (
          <span>{product.amount}</span>
        )}
      </td>
      <td className="tableData">
        <div className="buttonContainer">
          {state.isEditing ? (
            <>
              <button className="actionButton" onClick={handleSave}>
                Save
              </button>
              <button className="actionButton" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button className="actionButton" onClick={() => dispatchForm({ type: "SET_EDITING", payload: true })}>
              Edit
            </button>
          )}
          <button className="actionButton" onClick={() => dispatch(removeProduct(product.id))}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductItem;
