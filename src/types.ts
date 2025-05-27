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

export type ValidationResult = [isValid: boolean, errorMessage: string];