import type { ValidationResult } from "../types";

const NAME_REGEX = /^[A-Za-z0-9\s]+$/;
const AMOUNT_REGEX = /^\d+(\.\d+)?$/;

const validateName = (value: string): ValidationResult => {
  const trimmed = value.trim();
  let error = "";
  if (!trimmed) {
    error = "Please enter a name";
  } else if (!NAME_REGEX.test(trimmed)) {
    error = "Letters, numbers, and spaces only";
  } else if (trimmed.length < 3) {
    error = "Must be at least 3 characters";
  } else if (trimmed.length > 30) {
    error = "Name must be less than or equal to 30 characters";
  }
  return [!error, error];
};

const validateAmount = (value: string): ValidationResult => {
  let error = "";
  if (!value) {
    error = "Please enter an amount";
  } else if (!AMOUNT_REGEX.test(value)) {
    error = "Invalid amount. Please enter a valid amount.";
  } else if (parseFloat(value) <= 0) {
    error = "Amount must be > 0";
  } else if (parseFloat(value) > 10000) {
    error = "Amount must be less than 10,000";
  }
  return [!error, error];
};

const checkDuplicates = (name: string, products: { name: string }[]): boolean => {
  const trimmedName = name.trim().toLowerCase();
  return products.some(product => product.name.trim().toLowerCase() === trimmedName);
};

export { validateName, validateAmount, checkDuplicates };
