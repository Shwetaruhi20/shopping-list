import React, { useState } from "react";
import { useAppDispatch } from "../hooks";
import { removeProduct, updateProduct } from "../features/products/productsSlice";
import "../style.css";
import type { ProductItemProps } from "../types";
import { validateName, validateAmount } from "../utils/productUtils";

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(product.name);
  const [editedAmount, setEditedAmount] = useState(product.amount.toString());
  const [nameError, setNameError] = useState("");
  const [amountError, setAmountError] = useState("");

  const validate = (): boolean => {
    const [isNameValid, nameErr] = validateName(editedName);
    const [isAmountValid, amountErr] = validateAmount(editedAmount);
    setNameError(nameErr);
    setAmountError(amountErr);
    return isNameValid && isAmountValid;
  };

  const handleSave = () => {
    if (!validate()) return;
    const amountNum = parseFloat(editedAmount);
    if (editedName === product.name && amountNum === product.amount) {
      setIsEditing(false);
      return;
    }
    dispatch(updateProduct({ ...product, name: editedName.trim(), amount: amountNum }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(product.name);
    setEditedAmount(product.amount.toString());
    setNameError("");
    setAmountError("");
    setIsEditing(false);
  };

  return (
    <tr>
      <td className="tableData">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className={`inputField ${isEditing ? "border border-blue-500" : ""}`}
            />
            {nameError && <div className="text-red-600 text-sm">{nameError}</div>}
          </>
        ) : (
          <span>{product.name}</span>
        )}
      </td>
      <td className="tableData">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedAmount}
              onChange={(e) => setEditedAmount(e.target.value)}
              className={`inputField ${isEditing ? "border border-blue-500" : ""}`}
            />
            {amountError && <div className="text-red-600 text-sm">{amountError}</div>}
          </>
        ) : (
          <span>{product.amount}</span>
        )}
      </td>
      <td className="tableData">
        <div className="flex gap-5">
          {isEditing ? (
            <>
              <button className="actionButton" onClick={handleSave}>
                Save
              </button>
              <button className="actionButton" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button className="actionButton" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}
          <button
            className="actionButton"
            onClick={() => dispatch(removeProduct(product.id))}
          >Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductItem;
