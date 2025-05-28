import type { ValidationResult } from "../types";
import { NAME_REGEX, AMOUNT_REGEX, ERROR_MESSAGES } from "./validationConstants";

const validateName = (value: string): ValidationResult => {
  const trimmed = value.trim();
  if (!trimmed) {
    return [false, ERROR_MESSAGES.nameRequired];
  } else if (!NAME_REGEX.test(trimmed)) {
    return [false, ERROR_MESSAGES.nameInvalid];
  } else if (trimmed.length < 3) {
    return [false, ERROR_MESSAGES.nameTooShort];
  } else if (trimmed.length > 30) {
    return [false, ERROR_MESSAGES.nameTooLong];
  }
  return [true, ""];
};

const validateAmount = (value: string): ValidationResult => {
  if (!value) return [false, ERROR_MESSAGES.amountRequired];
  if (!AMOUNT_REGEX.test(value)) return [false, ERROR_MESSAGES.amountInvalid];

  const num = parseFloat(value);
  if (num <= 0) return [false, ERROR_MESSAGES.amountTooSmall];
  if (num > 10000) return [false, ERROR_MESSAGES.amountTooLarge];

  return [true, ""];
};

const checkDuplicates = (name: string, products: { name: string }[]): boolean => {
  const trimmedName = name.trim().toLowerCase();
  return products.some(product => product.name.trim().toLowerCase() === trimmedName);
};

const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, setName: (value: string) => void) => {
  const value = e.target.value;
  if (NAME_REGEX.test(value)) {
    setName(value);
  }
};

const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, setAmount: (value: string) => void) => {
  const value = e.target.value;
  if (AMOUNT_REGEX.test(value)) {
    setAmount(value);
  }
};

export { validateName, validateAmount, checkDuplicates, handleNameChange, handleAmountChange };
