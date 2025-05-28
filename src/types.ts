export interface Product {
  id: string;
  name: string;
  amount: number;
}
export interface Props {
  initialProduct?: Product | null;
}

export interface ProductItemProps {
  product: Product;
}
export type FormState = {
  name: string;
  amount: string;
  nameError: string;
  amountError: string;
};

export type addProductAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_AMOUNT'; payload: string }
  | { type: 'SET_NAME_ERROR'; payload: string }
  | { type: 'SET_AMOUNT_ERROR'; payload: string }
  | { type: 'SET_ALL'; payload: { name: string; amount: string } }
  | { type: 'RESET' };


export type EditProductAction =
  | { type: "SET_EDITING"; payload: boolean }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_AMOUNT"; payload: string }
  | { type: "SET_NAME_ERROR"; payload: string }
  | { type: "SET_AMOUNT_ERROR"; payload: string }
  | { type: "RESET"; payload: { name: string; amount: string } };

export type ProductState = {
  isEditing: boolean;
  editedName: string;
  editedAmount: string;
  nameError: string;
  amountError: string;
};

export type ValidationResult = [isValid: boolean, errorMessage: string];