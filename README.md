# InFile-Object

InFile-Object lets you operate on json files just like usual objects!

## Install
```
npm i infile-object
```

## Usage
```
const createInfileObject = require('infile-obj');
const fObj = createInfileObject('myObject.json');

fObj.name = "Hello World!";
fObj.arr = [1, 2, 3, 4];
fObj.arr.push(5);
```

pObj writes the updates to `myObject.json` on every assignment/operation.