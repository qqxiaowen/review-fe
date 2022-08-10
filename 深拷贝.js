/*
 * @Author: xiaoWen
 * @Date: 2022-03-08 11:33:36
 * @LastEditors: xiaoWen
 * @LastEditTime: 2022-03-08 13:32:52
 */
let data = {
  undefined: undefined,
  null: null,
  boolean: true,
  str: 'str',
  num: 6,
  Symbol: Symbol('symbol'),
  // bigInt: BigInt(12),
  reg: /\d/,
  children: [{ name: 'cName1' }, { name: 'cName2' }, { name: 'cName3' }],
  sayFunc: () => {
    console.log('我是sayFunc');
  },
  obj: {
    desc: 'desc'
  }
};

// 方案一
// let resultData = JSON.parse(JSON.stringify(data)); // undefined symbol function 丢失，正则变为空对象; BigInt直接报错

// 方案二
let resultData = { ...data }; // 只能copy深拷贝一层，data.children下元素无法深拷贝

// console.log(data);
console.log(data.Symbol);
data.sayFunc();
console.log(data.obj.desc);

console.log('修改前===========');
console.log(resultData);

console.log('修改后===========');
data.sayFunc = () => {
  console.log('我是edit修改的函数');
};
data.Symbol = Symbol('symbol-edit');
data.obj.desc = 'edit';
data.children[0] = {};
data.reg = /\w/;

console.log(resultData);
console.log(resultData.Symbol);
resultData.sayFunc();
console.log(resultData.obj.desc);
