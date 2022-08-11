/*
 * @Author: xiaoWen
 * @Date: 2022-03-08 11:33:36
 * @LastEditors: xiaoWen
 * @LastEditTime: 2022-08-10 17:37:53
 */
let data = {
  undefined: undefined,
  null: null,
  boolean: true,
  str: 'str',
  num: 6,
  // Symbol: Symbol('symbol'),
  // bigInt: BigInt(12),
  reg: /\d/,
  children: [{ name: 'cName1' }, { name: 'cName2' }, { name: 'cName3' }],
  sayFunc: () => {
    return '我是sayFunc';
  },
  obj: {
    desc: 'desc'
  },
  date: new Date('2022-08-08')
};

// 方案一
let resultData = JSON.parse(JSON.stringify(data)); // undefined symbol function 丢失，正则变为空对象; BigInt直接报错

// 方案二
// let resultData = { ...data }; // 只能copy深拷贝一层，data.children下元素无法深拷贝

// 方案三
// function copy(target) {
//   switch (Object.prototype.toString.call(target).slice(8, -1)) {
//     case 'Object':
//       let obj = {};
//       for (let key in target) {
//         obj[key] = copy(target[key]);
//       }
//       return obj;
//     case 'Array':
//       let arr = [];
//       target.forEach((item, index) => {
//         arr[index] = copy(item);
//       });
//       return arr;
//     default:
//       return target;
//   }
// }

// 方案四
function copy(target) {
  if (target && typeof target === 'object') {
    if (target instanceof Array) {
      let arr = [];
      target.forEach((item, index) => {
        arr[index] = copy(item);
      });
      return arr;
    }
    let obj = {};
    for (let key in target) {
      obj[key] = copy(target[key]);
    }
    return obj;
  }
  return target;
}
// let resultData = copy(data);

data.sayFunc = () => {
  return '我是edit修改的函数';
};
data.Symbol = Symbol('symbol-edit');
data.obj.desc = 'edit';
data.children[0] = {};
data.reg = /\w/;

console.log(data, data.sayFunc(), data.date.getTime());
console.log(resultData, resultData && resultData.sayFunc && resultData.sayFunc(), resultData.date.getTime && resultData.date.getTime());

// arr = [
//   null,
//   undefined,
//   8,
//   '0',
//   true,
//   [1, 2],
//   { x: 'x' },
//   function () {
//     console.log('object');
//   },
//   /\d/,
//   Symbol('123'),
//   BigInt(88)
// ];
// console.log(arr.map(item => typeof item));
// console.log(arr.map(item => Object.prototype.toString.call(item).slice(8, -1)));
