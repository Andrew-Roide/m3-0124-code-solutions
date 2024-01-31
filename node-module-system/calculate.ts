import { add } from './add.js';
import { subtract } from './subtract.js';
import { multiply } from './multiply.js';
import { divide } from './divide.js';

const num1 = Number(process.argv[2]);
const operation = process.argv[3].trim();
const num2 = Number(process.argv[4]);

if (operation === 'plus' || operation === '+') {
  const result = add({ num1, num2 });
  console.log(`Result: ${result}`);
} else if (operation === 'minus' || operation === '-') {
  const result = subtract({ num1, num2 });
  console.log(`Result: ${result}`);
} else if (operation === 'times' || operation === '*') {
  const result = multiply({ num1, num2 });
  console.log(`Result: ${result}`);
} else if (operation === 'divide' || operation === '/') {
  const result = divide({ num1, num2 });
  console.log(`Result: ${result}`);
} else {
  console.error(
    'Invalid operation. Please use "plus" or "+", "minus" or "-", "times" or "*", "divide" or "/".'
  );
}
