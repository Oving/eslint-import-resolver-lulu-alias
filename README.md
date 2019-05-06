# eslint-import-resolver-lulu-alias
eslint import resolver for lulu(on webpack actually) alias

## Installation

Prerequisites: Node.js >=6.x and corresponding version of npm.

```shell
npm install eslint-import-resolver-lulu-alias --save-dev
```

## Usage

Pass this resolver and its parameters to `eslint-plugin-import` using your `eslint` config file, `.eslintrc` or `.eslintrc.js`.

```js
"settings": {
  "import/resolver": {
    "lulu-alias": {
      "configPath": "lulu.config.js"
    }
  }
}
```

Note:

- The alias config object contains one propertie: `configPath` 
- The default value of `configPath` property is `lulu.config.js` if it is assigned to an undefined or not specified