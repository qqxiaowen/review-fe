/*
 * @Author: xiaoWen
 * @Date: 2021-12-28 10:06:22
 * @LastEditors: xiaoWen
 * @LastEditTime: 2021-12-28 14:32:44
 */
// 手写new

// 构造函数
function Person(name) {
  this.name = name;
  // return null;
  // return 1;
  return '1';
  // return true;
  // return Symbol('1');
  // return BigInt(1);

  // return [1];
  // return { x: 1 };
  // return function () {};
}

// 正常的new
let p1 = new Person('HuLu');
console.log('正常的new');
console.log(p1);
console.log(p1.__proto__.constructor);

console.log('分割线------------------');

function selfNew(fun, ...args) {
  // 创建一个空的简单JavaScript对象（即{}
  let obj = {};
  // 为步骤1新创建的对象添加属性__proto__，将该属性链接至构造函数的原型对象
  obj.__proto__ = fun.prototype;
  // 将步骤1新创建的对象作为this的上下文
  let result = fun.apply(obj, args);
  // 如果该函数没有返回对象，则返回this（obj）
  return result === undefined || result === null ? obj : result;
  // return ['object', 'function'].includes(typeof result) && result !== null ? result : obj;
}

// 自己写的new
let p2 = selfNew(Person, 'HuLu');
console.log('自己的new');
console.log(p2);
console.log(p2.__proto__.constructor);

// function selfNew2(fun, ...args) {
//   let obj = Object.create(fun.prototype);
//   let result = fun.apply(obj, args);
//   return ['object', 'function'].includes(typeof result) && result !== null ? result : obj;
// }

// let p3 = selfNew2(Person, 'HuLu');
// console.log(p3);
// console.log(p3.__proto__.constructor);
