# puppeteer-cloak
Use this project to hide your puppeteer page from anti scraping or anti bot tests

## Installation

```bash
yarn add puppeteer-cloak
# - or -
npm install puppeteer-cloak
```
## Usage

```js
const puppeteerCloak = require('puppeteer-cloak');

const browser = await puppeteer.launch();
// I always use this method to get the active page, and not to have to open a new tab
const page = (await this.browser.pages())[0];
// use this instead of the page, to get all the cloaking benefits
const cloakedPage = puppeteerCloak(page);
```

## Creator

**Pavle Aleksic**

- <https://twitter.com/aleksicpaja>

## License
This project is licensed under the terms of the MIT license.
