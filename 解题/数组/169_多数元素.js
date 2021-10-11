// https://leetcode-cn.com/problems/majority-element/

/* 自己的思路  先对数组排序，再取数组中间元素  通过   但时间复杂度、空间复杂度不满足题目要求  */
// var majorityElement = function(nums) {
//   nums.sort((x, y) => x - y);
//   index = Math.floor(nums.length / 2);
//   return nums[index];
// }


/* 还可以用 Map 记录每个元素的出现次数，遍历 Map，当 value > nums.length / 2 时（我一开始想的是找 value 的最大值...），返回该数字 */


/* 答案   用 Map 的情况下，可以进一步优化时间，只需遍历一次
  思路：每放一个元素到 Map 中后，查看该元素的 value 是否 > nums.length / 2，若是，则返回
  下面的代码是用的 Object，和 Map 类似。
  参考：https://leetcode-cn.com/problems/majority-element/solution/yi-ban-by-shetia/
*/
// var majorityElement = function(nums) {
//   let half = nums.length / 2
//   let obj = {}
//   for(let num of nums){
//      obj[num] = (obj[num] || 0) + 1  // 计数方法值得学习！使用了 或 操作符
//      if(obj[num] > half) return num
//   }
// }


/* 答案   用栈，和摩尔投票法原理一样，更易于理解，区别在于空间复杂度为 O(n)  
  思路：
    遍历数组
      当 栈为空 或 当前元素与栈顶元素相同 时，当前元素入栈
      当前元素与栈顶元素不同时，将栈顶元素出栈
    返回栈顶元素（返回栈中的任意元素都可以，因为栈里只会存在要找的数）
  参考：https://leetcode-cn.com/problems/majority-element/solution/yi-ban-by-shetia/
*/
// var majorityElement = function(nums) {
//   let stack = []
//   for(let n of nums){
//     let m = stack.length
//     if(stack[m - 1] === n || !m){
//       stack.push(n)
//     } else {
//       stack.pop()
//     }
//   }
//   return stack[0]
// }


/* 自己没想出来 时间复杂度 O(n)，空间复杂度 O(1) 的方法，直接看答案了 */
/* 答案 摩尔投票法  还是没太理解，先记结论吧  通过上面栈的思路更容易记忆，candidate 就是栈底元素，count 就是栈内元素个数
  思路：
    遍历数组
      当 count === 0 时，candidate 换成当前元素
      若 当前元素 和 candidate 相同，则 count++
      若 当前元素 和 candidate 不同，则 count--
    返回 candidate
  结合 2 种语言的代码，改写一下答案
  JAVA 代码参考：https://leetcode-cn.com/problems/majority-element/solution/duo-shu-yuan-su-by-leetcode-solution/
  JS 代码参考：https://leetcode-cn.com/problems/majority-element/solution/yi-ban-by-shetia/
*/
var majorityElement = function(nums) {
  let count = 0;
  let candidate = null;
  for (let num of nums) {
    if (count === 0) candidate = num;
    count += (num === candidate) ? 1 : -1;
  }
  return candidate;
}


/* 自己写一遍摩尔投票法  和答案一样，我把 count 用 size 表示了，是按栈的思路来的，理解起来还是有点奇怪  */
var majorityElement = function(nums) {
  let size = 0;
  let candidate = null;
  for (let num of nums) {
    if (size === 0) candidate = num;
    if (num === candidate) size++;
    else size--;
  }
  return candidate;
}


/* 测试 */
// let nums = [3,2,3];
let nums = [2,2,1,1,1,2,2];
console.log(majorityElement(nums));
