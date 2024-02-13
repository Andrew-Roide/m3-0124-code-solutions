# react-effects-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- When is a component "mounted" to the DOM?
  initial rendering

- What is a React Effect?
  function that performs side effects in components

- When should you use an Effect and when should you not use an Effect?
  use it when fetching data or manipulating the DOM. Don't use it for tasks without side effects

- When do Effects run?
  initial render and after every render

- What function is used to declare an Effect?
  useEffect()

- What are Effect dependencies and how do you declare them?
  an array of values that the effect depends on. Declare them as an optional emptyarray

- Why would you want to clean up from an Effect?
  when you want to cancel network requests or prevent memory leaks

- How do you clean up from an Effect?
  return statement from the useEffect

- When does the cleanup function run?
  after the component is mounted

## Notes

All student notes should be written here.

How to write `Code Examples` in markdown

for JS:

```javascript
const data = 'Howdy';
```

for HTML:

```html
<div>
  <p>This is text content</p>
</div>
```

for CSS:

```css
div {
  width: 100%;
}
```
