/* 自己的解法 直接用 Set 就是这么不讲道理...  通过  */
// var containsDuplicate = function(nums) {
//   let set = new Set(nums);
//   return set.size === nums.length ? false : true;
// }


/* 自己的解法 先对数组排序，再遍历数组判断当前元素和前一位置元素是否相等 */
var containsDuplicate = function(nums) {
  if (nums.length < 2) return false;  // 可以不加这句，因为下面的代码适用于边界情况
  nums.sort();
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) return true;
  }
  return false;
}


/* 好吧，答案也是这 2 种做法 居然有这种题... 不过可以优化下自己的代码 */
/* 答案 Set 解法
  时间复杂度：O(N)
  空间复杂度：O(N)
  参考：https://leetcode-cn.com/problems/contains-duplicate/solution/cun-zai-zhong-fu-yuan-su-by-leetcode-sol-iedd/
*/
var containsDuplicate = function(nums) {
  const set = new Set();
  for (const x of nums) {
      if (set.has(x)) {  // 答案的做法比较标准。我的代码完全是抱着试试看的心态写的...
          return true;
      }
      set.add(x);
  }
  return false;
}


/* 答案 排序解法
  时间复杂度：O(N logN)
  空间复杂度：O(logN)
  参考：https://leetcode-cn.com/problems/contains-duplicate/solution/cun-zai-zhong-fu-yuan-su-by-leetcode-sol-iedd/
*/
var containsDuplicate = function(nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  for (let i = 0; i < n - 1; i++) {
      if (nums[i] === nums[i + 1]) {  // 答案是比较当前位和后一位，这样 for 循环中的索引更容易理解
          return true;
      }
  }
  return false;
}


/* 测试 */
let nums = [1,2,3,4];
console.log(containsDuplicate(nums));
