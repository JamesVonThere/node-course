// 方法1: 引用整個物件
// let car = require('./car');

// console.log(car);

// // { brand: 'Ford', color: 'RED', run: [Function (anonymous)] }

// console.log(car.brand);
// car.run();

// 方法2: 只引用需要的
// let { brand } = require('./car');
// console.log(brand);

// 測試順序
const second = require('./second');
const first = require('./first');
