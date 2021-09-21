// https://leetcode-cn.com/problems/ugly-number-ii/

/* 自己的思路   超时了...
  写一个函数，功能是判断一个数是不是丑数
  从 1 开始，无限循环，对丑数计数 count，当 count = n 时，终止循环
*/
var nthUglyNumber = function(n) {
  let num = 1, count = 0;
  while (true) {
    if (isUglyNumber(num)) count++;
    if (count === n) return num;
    num++;
  }
};
let isUglyNumber = function(num) {
  while (num !== 1) {
    if (num % 2 === 0) num /= 2;
    else if (num % 3 === 0) num /= 3;
    else if (num % 5 === 0) num /= 5;
    else return false;
  }
  return true;
};

/* 答案  动态规划 或 最小堆，暂时先不研究了 */

/* 测试 */
let n = 10;
console.log(nthUglyNumber(n));
