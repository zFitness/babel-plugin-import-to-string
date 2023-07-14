# babel-plugin-import-to-string

import 路径转换为字符串

## Example

**In**

```js
// input code
```

**Out**

```js
"use strict";

// output code
```

## Installation

```sh
$ npm install babel-plugin-import-to-string
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["import-to-string"]
}
```

### Via CLI

```sh
$ babel --plugins import-to-string script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["import-to-string"]
});
```
