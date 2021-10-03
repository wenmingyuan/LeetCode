// https://leetcode-cn.com/problems/minimum-size-subarray-sum/

/* 自己的思路     是答案的暴力法    但感觉时间复杂度过高 O(n^2)   没想到好方法，看答案了 */

/* 答案     滑动窗口     时间复杂度 O(n)

  思路：
    用 i 表示左指针，用 j 表示右指针，用 sum 表示 nums[i] 到 nums[j] 的数字和，n 表示数组长度
    初始时 i 和 j 都为 0，sum 为 0

    只要 j < n，j 不断向右移动：
      只要 sum >= target 时：
        更新子数组的最小长度
        i 右移
    
    返回最小长度

  另外需要注意不断更新 sum 的值，上面的步骤里省略了更新 sum 的过程

  自己一开始想到了，但是发现当找到大于 target 的区间时，左指针应该向右移动，但是右指针该不该向右移动呢？
  因为有可能右指针指向的是一个特别大的数，这一个数就比 target 大，所以这时向右移动右指针感觉就不能找到长度最小的区间了。
  所以我纠结在这个地方，就没有考虑用滑动窗口了。

  https://leetcode-cn.com/problems/minimum-size-subarray-sum/solution/chang-du-zui-xiao-de-zi-shu-zu-by-leetcode-solutio/
*/
var minSubArrayLen = function(target, nums) {
  let n = nums.length;
  if (n === 0) return 0;
  
  let result = Infinity;
  let i = 0, j = 0, sum = 0;

  while (j < n) {  // 当 j 越界时终止循环
    sum += nums[j];
    while (sum >= target) {
      result = Math.min(result, j - i + 1);  // 更新子数组的最小长度
      sum -= nums[i];
      i++;
    }
    j++;  // 当 sum < target 时，j 右移
  }

  return result === Infinity ? 0 : result;
};

/* 理解答案后自己写的    和答案一样 */
var minSubArrayLen = function(target, nums) {
  let n = nums.length;
  let i = 0, j = 0, sum = 0, result = Infinity;

  while (j < n) {
    sum += nums[j];
    while (sum >= target) {
      result = Math.min(result, j - i + 1);
      sum -= nums[i];
      i++;
    }
    j++;
  }

  return result === Infinity ? 0 : result;
}
