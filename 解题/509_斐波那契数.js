/* 这里共写了 4 种方法
  1. 暴力递归
  2. 自顶向下，即递归 + 记忆化
  3. 自底向上 + 优化空间
  4. 自底向上 + 未优化空间
*/


/* ----------------------------------------------------------------------------- */


/* 1. 自己写的 暴力递归 */
// var fib = function(n) {
//   if (n === 0 || n === 1) return n;
//   return fib(n - 1) + fib(n - 2);
// }


/* ----------------------------------------------------------------------------- */


/* 2. 自己写的 自顶向下，即递归 + 记忆化
  虽然也能通过，但是我没想到怎么把 let memo = [0, 1] 写到函数里面，这样就很奇怪
*/
// var fib = function(n) {
//   if (n === 0 || n === 1) return n;
//   if (memo[n] !== undefined) return memo[n];
//   let res = fib(n - 1) + fib(n - 2);
//   memo.push(res);
//   return res;
// }

// let memo = [0, 1];


/* 2. 答案的 自顶向下，即递归 + 记忆化
  参考：https://leetcode-cn.com/problems/fibonacci-number/solution/di-gui-huan-cun-di-gui-die-dai-by-lxhgua-4u8u/
*/
// var fib = function(n) {
//   if (n < 1) return 0;
//   let cache = [];
//   const help = (cache, n) => {
//       if (n == 1 || n == 2) return 1;
//       if(cache[n]) return cache[n];
//       cache[n] = help(cache, n - 1) + help(cache, n - 2);
//       return cache[n];
//   };
//   return help(cache, n);
// }


/* 2. 理解答案后自己重写一遍 */
// var fib = function(n) {
//   let cache = [0, 1];
//   function helper(cache, n) {
//     if (n <= 1) return n;
//     // 忘记写下面这步了 有缓存直接调用缓存
//     if (cache[n]) return cache[n];
//     // let res = helper(cache, n - 1) + helper(cache, n - 2);
//     // cache.push(res);
//     // 上面两步可以直接简化成下面的代码，原因是 arr[arr.length] = xxx 和 arr.push(xxx) 效果一样
//     cache[n] = helper(cache, n - 1) + helper(cache, n - 2);
//     // return res;
//     return cache[n];
//   }
//   return helper(cache, n);
// }


/* ----------------------------------------------------------------------------- */


/* 3. 自己写的 自底向上 + 优化空间 
  和答案差不多，区别在我没有意识到 滚动数组 的概念
*/
// var fib = function(n) {
//   let sum0 = 0, sum1 = 1;
//   for (let i = 1; i <= n - 1; i++) {
//     let tmp = sum0;
//     sum0 = sum1;
//     sum1 = tmp + sum1;
//   }
//   return n === 0 ? sum0 : sum1;
// }


/* 3. 答案的 自底向上 + 优化空间
  参考：https://leetcode-cn.com/problems/fibonacci-number/solution/fei-bo-na-qi-shu-by-leetcode-solution-o4ze/
  改变变量的值的时候采用 滚动数组 的思想，比我使用 tmp 暂存变量好理解，值得学习
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


/* 3. 理解答案后自己重写一遍 */
// var fib = function(n) {
//   if (n === 0) return 0;
//   let p = 0, q = 1, r = 1;
//   for (let i = 1; i <= n - 2; i++) {
//     p = q;
//     q = r;
//     r = p + q;
//   }
//   return r;
// }


/* ----------------------------------------------------------------------------- */


/* 4. 答案的 自底向上 + 未优化空间 
  参考：https://leetcode-cn.com/problems/fibonacci-number/solution/di-gui-dong-tai-gui-hua-by-cctt-2/
*/
// var fib = function(n) {
//   let dp = [0, 1];
//   for(let i = 2; i <= n; i++){
//       dp[i] = dp[i - 1] + dp[i - 2];
//   }
//   return dp[n];
// }


/* 4. 理解答案后自己写的 */
var fib = function(n) {
  // if (n === 0) return 0;
  let arr = [0, 1];
  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  // return arr[arr.length - 1];
  // 可以直接写成下面那样
  return arr[n];
}


/* ----------------------------------------------------------------------------- */


/* 测试 */
console.log(fib(6));
