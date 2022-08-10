/*
 * @Date: 2022-08-10 11:34:35
 * @LastEditors: xiaoWen
 * @LastEditTime: 2022-08-10 11:36:44
 * @FilePath: /study/class实现继承.js
 */
class NBACreate2 {
  //class 中的属性要写入constructor中
  constructor(name, age, height) {
    (this.name = name), (this.age = age), (this.height = height);
  }
  say() {
    console.log(`我是${this.name},今年${this.age}岁了。`);
  }
}

class MVP extends NBACreate2 {
  constructor(name, age, height, year) {
    //使用super借用NBACreate2
    super(name, age, height);
    this.year = year;
  }
  sayMVp() {
    console.log(`我是${this.name},我是${this.year}的mvp`);
  }
}

var y2 = new MVP('大明', '27', '187', 18);
// console.log(y2);
// y2.say();
// y2.sayMVp();


var y1 = new NBACreate2('小明', '11', '180');
// y1.say()
// y1.sayMVp()


console.log(y2.__proto__.constructor)
console.log(y2.__proto__.__proto__.constructor)
console.log(y2.__proto__.__proto__.__proto__.constructor)