import { takeAChance } from './take-a-chance.js';

takeAChance('Andrew')
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error.message);
  });

// use case of using reason if the promise is rejected?
