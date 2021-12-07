## Installation deps

```bash
$ npm install
```

## Build

```bash
$ npm run build
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Run

```bash
$ node ./dist/index.js < <input_file>
```

Example:

```bash
$ node ./dist/index.js < ./resources/example_input
```
or 
```bash
$ node ./dist/index.js
```
Input all data(past or type) and CMD/CTRL+D

To run source version:
```bash
$ npm install -g ts-node
$ ts-node ./src/index.ts < <input_file>
```
