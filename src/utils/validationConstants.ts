export const NAME_REGEX = /^(?=.*[A-Za-z])[A-Za-z0-9\s-_]+$/;
export const AMOUNT_REGEX = /^\d*\.?\d{0,5}$/;

export const ERROR_MESSAGES = {
  nameRequired: "Please enter a name",
  nameInvalid: "Enter a valid name with at least 1 letter, numbers, spaces, -, and _",
  nameTooShort: "Must be at least 3 characters",
  nameTooLong: "Name must be less than or equal to 30 characters",
  amountRequired: "Please enter an amount",
  amountInvalid: "Invalid amount. Please enter a valid amount.",
  amountTooSmall: "Amount must be > 0",
  amountTooLarge: "Amount must be less than 10,000"
};