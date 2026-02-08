# subdomain-generator

Zero-dependency generator for human-readable subdomains in the form:

`<word><separator><suffix>`

Example: `capybara-k4z1w0x8r2m9`

## Features

- No dependencies
- Uses cryptographically secure randomness when available
- Falls back to `Math.random()` only when no secure RNG exists

## Install

```javascript
npm i subdomain-generator
```

## Usage

```javascript
import generateSubdomain from "subdomain-generator";

console.log(generateSubdomain());
// otter-9k2m1x0qz8a3

console.log(generateSubdomain({ suffixLength: 16 }));
// alpaca-0m3k...<16 chars>

console.log(generateSubdomain({ separator: "_" }));
// giraffe_9k2m1x0qz8a3
```
