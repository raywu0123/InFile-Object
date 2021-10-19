const createInfileObject = require('../index');
const fObj = createInfileObject('myObject.json');

fObj.name = "Hello World!";
fObj.arr = [1, 2, 3, 4];
fObj.arr.push(5);