/* 自己的思路
  用队列做
  将暂时的最大值存到 tmp 中，队列中的元素求和结果为 sum，最终的最大值为 max
  从右向左遍历 nums：
    sum += nums[i]
    若 sum > 0，就可以将所有元素出栈了
    若 sum <=0 && tmp + sum <= 0，即队列中的元素之和是负的，且绝对值比 tmp 大，就没必要再继续这个子串了
    若 sum <=0 && tmp + sum > 0，即队列中的元素之和是负的，但绝对值还没有 tmp 大，就可以将 nums[i] 入队列
  max = max 和 tmp 中的较大值
  返回 max
*/
// 不知道怎么处理数组中全是负数的情况……
// var maxSubArray = function(nums) {
//   let queue = [];
//   let sum = 0, tmp = 0, max;
//   for (let i = nums.length - 1; i >= 0; i--) {
//     sum += nums[i];
//     if (sum > 0) {
//       tmp += sum;
//       sum = 0;
//       queue = [];
//     }
//     else if (sum <= 0 && tmp + sum <= 0) {
//       max = max > tmp ? max : tmp;
//       tmp = 0;
//       sum = 0;
//       queue = [];
//     }
//     else queue.push(nums[i]);
//   }
//   max = max > tmp ? max : tmp;
//   return max;
// }


/* 自己魔改版 处理全是负数 居然通过了... 答案好像没有用队列做的 */
// var maxSubArray = function(nums) {
//   let queue = [];
//   let sum = 0, tmp = 0, max = nums[nums.length - 1];
//   for (let i = nums.length - 1; i >= 0; i--) {
//     sum += nums[i];
//     if (sum > 0) {
//       tmp += sum;
//       sum = 0;
//       queue = [];
//     }
//     else if (sum <= 0 && tmp + sum <= 0) {
//       if (tmp > 0) {
//         max = max > tmp ? max : tmp;
//         tmp = 0;
//         sum = 0;
//         queue = [];
//       } 
//       else {
//         max = max > nums[i] ? max : nums[i];
//         sum = 0;
//       }
//     }
//     else queue.push(nums[i]);
//   }
//   if (tmp > 0) max = max > tmp ? max : tmp;
//   return max;
// }


/* 学习了动态规划的思路后自己写的 和答案一样
  参考：https://leetcode-cn.com/problems/maximum-subarray/solution/dong-tai-gui-hua-fen-zhi-fa-python-dai-ma-java-dai/
  
  动态规划解题步骤：
    1. 定义状态（子问题）：
      以 **nums[i] 结尾** 的 **连续** 子数组的最大和
    2. 状态转移方程：
      dp[i] = dp[i - 1] + nums[i], if dp[i - 1] > 0
      nums[i], if dp[i - 1] <= 0
    3. 初始值：
      dp[0] = nums[0]
    4. 根据子问题和题目问题的关系，得出题目要的结果
*/
var maxSubArray = function(nums) {
  let dp = nums[0];
  let max = dp;
  for (let i = 1; i < nums.length; i++) {
    if (dp > 0) dp = nums[i] + dp;
    else dp = nums[i];
    max = Math.max(max, dp);  // Math.max(value1, [value2,...]) 取一组数的最大值
  }
  return max;
}


/* 测试 */
let nums = [1,2,-1];
let max = maxSubArray(nums);
console.log(max);
