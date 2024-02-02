# es6-async-await-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What are the `async` and `await` keywords used for?
to work with asynchronous code and Promises in a more synchronous and readable manner.

- How do `async` and `await` differ from `Promise.then` and `Promise.catch`?
async and await provide a more concise and synchronous-like way of working with asynchronous code. Promise.then and Promise.catch use a callback-style syntax.

- When do you use `async`?
beginning of a function

- When do you use `await`? When do you _not_ use `await`? (What happens if you `await` a synchronous function?)
when calling functions that return Promises or when dealing with asynchronous operations. Avoid when calling synchronous functions or performing synchronous operations

- How do you handle errors with `await`?
with try-catch block

- What do `try`, `catch` and `throw` do? When do you use them?
try allows you to define a block of code that may throw an exception or suspect an error might occur
catch handles the exception thrown from the try block. contains code that executes when an exception occurs
throw used to manually generate an exception

used when you want to handle expected errors, error logging, and throwing custom errors

- What happens if you forget to use `await` on a Promise? In that case, what happens to the Promise rejection?
the promise will not be awaited, and the function will continue its execution without waiting for the resolution or rejection of the promise. The promise rejection will go unhandled

- Which style of asynchronous programming do you prefer — callbacks, `Promise.then`, or `async/await`? Why?
async/await. Avoids callback hell, easier readability than promise.then

## Notes

basis for async await

function foo() {
  return somePromise().then(result => {
    console.log(result);
  });
}

function bar() {
  return anotherPromise().then(result => {
    console.log(result);
  });
}

async function foo() {
  const result = await somePromise();
  console.log(result);
}

async function bar() {
  const result = await anotherPromise();
  console.log(result);
}
