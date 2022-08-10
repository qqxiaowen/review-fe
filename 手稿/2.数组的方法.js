/*
 * @Author: xiaoWen
 * @Date: 2021-12-27 18:29:31
 * @LastEditors: xiaoWen
 * @LastEditTime: 2021-12-27 18:29:32
 */
// 数组的方法-手稿

// join链接多层数据
let levelArr = [0, [1, [2, 3, [4]]]];
let normalArr = [0, 1, 2, 3, 4];
console.log(levelArr.join('')); // 01,2,3,4
console.log(levelArr.join('-')); // 0-1,2,3,4
console.log(normalArr.join('')); // 01234
console.log(normalArr.join('-')); // 0-1-2-3-4


// 正则-下面做法几乎不用，作为了解即可
var myRe = /ab*/g;
var str = 'abbcdefabh';
var myArray = myRe.exec(str);
// while ((myArray = myRe.exec(str)) !== null) {
//   var msg = 'Found ' + myArray[0] + '. ';
//   msg += 'Next match starts at ' + myRe.lastIndex;
//   console.log(msg);
// }
console.log(myArray, myRe, myRe.lastIndex);
var myArray = myRe.exec(str);
console.log(myArray, myRe, myRe.lastIndex);
var myArray = myRe.exec(str);
console.log(myArray, myRe, myRe.lastIndex);
// [ 'abb', index: 0, input: 'abbcdefabh', groups: undefined ] /ab*/g 3
// [ 'ab', index: 7, input: 'abbcdefabh', groups: undefined ] /ab*/g 9
// null /ab*/g 0


// 正则 exec 提取str中域名下一级路由
let str = 'http://127.0.0.1:9080/project/home?pramas=1234';
let middleStr = /\:\d{1,6}\/[a-z]+\//.exec(str);
let result = /[a-z]+/.exec(middleStr[0])[0];
console.log('result: ', result);
