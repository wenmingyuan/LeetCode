/* 自己写的 递归 */
// var fib = function(n) {
//   if (n === 0 || n === 1) return n;
//   return fib(n - 1) + fib(n - 2);
// }


/* 自己写的 不知道叫什么算法 反正是正着推 一开始想不出来怎么正着推... 看了答案发现和答案的动态规划一样 */
var fib = function(n) {
  let sum0 = 0, sum1 = 1;
  for (let i = 1; i <= n - 1; i++) {
    let tmp = sum0;
    sum0 = sum1;
    sum1 = tmp + sum1;
  }
  return n === 0 ? sum0 : sum1;
}


/* 答案 动态规划 改变变量的值的时候采用 滚动数组 的思想，比我使用 tmp 暂存变量好理解，值得学习
  滚动数组图示：https://leetcode-cn.com/problems/fibonacci-number/solution/fei-bo-na-qi-shu-by-leetcode-solution-o4ze/
*/
// var fib = function(n) {
//   if (n < 2) {
//       return n;
//   }
//   let p = 0, q = 0, r = 1;
//   for (let i = 2; i <= n; i++) {
//       p = q;
//       q = r;
//       r = p + q;
//   }
//   return r;
// }


// 还需要反复学习这道题的动态规划思路
// 还没看的文章：https://leetcode-cn.com/problems/fibonacci-number/solution/dong-tai-gui-hua-tao-lu-xiang-jie-by-labuladong/
// 需要反复看的视频：https://www.bilibili.com/video/BV1bJ411y728


/* 测试 */
console.log(fib(5));
