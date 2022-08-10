function NBACreate(name, age, height) {
  this.name = name;
  this.age = age;
  this.height = height;
}
NBACreate.prototype.say = function () {
  console.log(`我是${this.name},今年${this.age}岁了。`);
};

var x1 = new NBACreate('小明', '22', '171');
// console.log(x1);
// x1.say();

function NBACreateMVP(year, ...args) {
  NBACreate.apply(this, args); // 使用apply调用继承的构造器，这里的this是被外部的new调用过的，已经指的是实例对象了
  this.year = year;
}
// console.log(NBACreateMVP.prototype.__proto__.constructor);
NBACreateMVP.prototype.__proto__ = NBACreate.prototype; // MVP的原型原本是object，将其指为继承的构造器的原型。意味mvp是被继承的构造器创建出来的
// NBACreateMVP.prototype = Object.create(NBACreate.prototype) // 写法2

NBACreateMVP.prototype.say2 = function () {
  console.log('say2');
};

var x2 = new NBACreateMVP('大名', '18', '175', 5);
// console.log(x2);
// x2.say();
console.log(x2.__proto__ === NBACreateMVP.prototype);
console.log(x2.__proto__.__proto__ === NBACreate.prototype);
console.log(x2.__proto__.__proto__.__proto__);
// x2.say2();

// x1.say2()
