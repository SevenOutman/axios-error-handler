# axios-error-handler

The utilities for error handling with axios.

[![npm version](https://badgen.net/npm/v/axios-error-handler)](https://npm.im/axios-error-handler) [![npm downloads](https://badgen.net/npm/dm/axios-error-handler)](https://npm.im/axios-error-handler)

## Features:

- Define error handlers based on response status code
- Wildcards mathching a class of status codes

## Install

```bash
npm i axios-error-handler
```

## Usage

```ts
import { createErrorHandler } from "axios-error-handler"

axios.interceptors.response.use(
  null,
  createErrorHandler({
    // Runs this callback if thrown.response.status is 401
    401(thrown) {
      alert("")
    },
    // Runs this callback if thrown.response.status is 5xx
    "5xx"(thrown) {
      alert("")
    },
  }),
)
```

## Sponsors

[![sponsors](https://sponsors-images.SevenOutman.sh/sponsors.svg)](https://github.com/sponsors/SevenOutman)

## License

MIT &copy; [SevenOutman](https://github.com/sponsors/SevenOutman)
