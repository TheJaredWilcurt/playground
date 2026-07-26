# CSS Minifier Playground

CSS Minifier Playground - Live output comparison of various minifiers.


## Site usage

The site supports the following URL Query Params:

* `i=.cow%20%7B%0A%20%20color%3A%20%23F00%3B%0A%7D`
* `e=.cow%7Bcolor%3Ared%7D`

It prefills the Input CSS textbox and Expected CSS textbox with the content
provided in the URL. To create that mess of characters use `encodeURIComponent`.

**Example JavaScript:**

```js
const input = `
.cow {
  color: #F00;
}
`.trim();
const expected = '.cow{color:red}';
const link = [
  'https://TheJaredWilcurt.com/playground/',
  '?i=' + encodeURIComponent(input),
  '&e=' + encodeURIComponent(expected)
].join('');
/*
https://TheJaredWilcurt.com/playground/?i=.cow%20%7B%0A%20%20color%3A%20%23F00%3B%0A%7D&e=.cow%7Bcolor%3Ared%7D
*/
```

For shorter URLs, on page load the `i` and `e` codes automatically get
compressed and replaced with `v` and `x` params.


## Running locally

1. Download/Fork/Clone repo
1. Install [Proto](https://github.com/TheJaredWilcurt/blog/discussions/41)
   * To manage your Node/npm versions.
1. Run `npm install`
1. Run `npm start`


## Lint

1. `npm run lint` to see linting errors
1. `npm run fix` to auto-fix linting errors where possible


## Build

1. `npm run build` to build the app for distribution
1. `npm run preview` to manually test the built app


* * *


### AI Disclosure

* No AI of any kind was used at any point in this project.

A full list of dependencies can be seen in the `package.json`.
