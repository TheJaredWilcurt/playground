# CSS Minifier Playground

CSS Minifier Playground - Live output comparison of various minifiers.


## Site usage

The site supports the following URL Query Param:

* `/?i=.cow%20%7B%0A%20%20color%3A%20%23F00%3B%0A%7D`

It prefills the input CSS textbox. To create that mess you run this in the
browser's console:

* `'/?i=' + encodeURIComponent('.cow {\n  color: #F00;\n}')`

Copy and paste it at the end of the site url and press enter. It will then
prefill the value, compress it, and replace it in the URL with the compressed
version (stored in `/?v=...`).

You can share links to the site either way (`i` or `v`) to have it prefilled.
There is a limit to how many characters can be stored in a URL, and the limit
is browser specific. So if you go crazy, then the browser will get mad at you.


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
