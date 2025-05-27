import { validateName, validateAmount, checkDuplicates } from '../utils/productUtils';

test('should return false for empty name', () => {
  const [isValid, error] = validateName('');
  expect(isValid).toBe(false);
  expect(error).toBe('Please enter a name');
});

test('should return false for name with only spaces', () => {
  const [isValid, error] = validateName('   ');
  expect(isValid).toBe(false);
  expect(error).toBe('Please enter a name');
});

test('should return false for name longer than 30 characters', () => {
  const longName = 'a'.repeat(31);
  const [isValid, error] = validateName(longName);
  expect(isValid).toBe(false);
  expect(error).toBe('Name must be less than or equal to 30 characters');
});

test('should return true for valid name', () => {
  const [isValid, error] = validateName('Valid Product');
  expect(isValid).toBe(true);
  expect(error).toBe('');
});

test('should return false for amount less than 0', () => {
  const [isValid, error] = validateAmount('-1');
  expect(isValid).toBe(false);
  expect(error).toBe('Invalid amount. Please enter a valid amount.');
});

test('should return false for amount with non-numeric characters', () => {
  const [isValid, error] = validateAmount('12a');
  expect(isValid).toBe(false);
  expect(error).toBe('Invalid amount. Please enter a valid amount.');
});

test('should return true for valid amount', () => {
  const [isValid, error] = validateAmount('12.34');
  expect(isValid).toBe(true);
  expect(error).toBe('');
});

test('should return true for valid integer amount', () => {
  const [isValid, error] = validateAmount('100');
  expect(isValid).toBe(true);
  expect(error).toBe('');
});

test('should return false for amount greater than 10000', () => {
  const [isValid, error] = validateAmount('10001');
  expect(isValid).toBe(false);
  expect(error).toBe('Amount must be less than 10,000');
});

test('should return true for duplicate product name', () => {
  const products = [{id: "1", name: 'Product A', amount: 10 }, {id: "3", name: 'Product B', amount: 24 }];
  const isDuplicate = checkDuplicates('Product A', products);
  expect(isDuplicate).toBe(true);
});

test('should return false for unique product name', () => {
  const products = [{id: "1", name: 'Product A', amount: 10 }, {id: "3", name: 'Product B', amount: 24 }];
  const isDuplicate = checkDuplicates('Product C', products);
  expect(isDuplicate).toBe(false);
});
