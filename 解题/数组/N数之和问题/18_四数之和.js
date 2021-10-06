// https://leetcode-cn.com/problems/4sum/

/* 从这道题开始，改变做题策略：
    1. 先记录自己的思路
    2. 查看答案思路和自己是否一样，理解答案思路
    3. 按照答案思路，自己写代码
    4. 查看答案代码和自己代码的区别
    5. 总结这道题的思想、需要注意的细节
*/

/* 自己的思路    使用 15_三数之和 的双指针方法，区别在于需要多固定一个指针 */

/* 答案和自己思路一样 
  下面题解的代码类似于 15_三数之和 代码随想录的代码，主要是看思路，我感觉自己不会按照他的代码写，还是按自己的风格写就好
  https://leetcode-cn.com/problems/4sum/solution/shuang-zhi-zhen-jie-fa-can-zhao-san-shu-zhi-he-ge-/
*/

/* 自己写的双指针       通过 */
var fourSum = function(nums, target) {
  let result = [];
  let n = nums.length;
  nums.sort(function(x, y){return x - y});

  // 固定 a
  for (let a = 0; a < n - 3; a++) {
    // 跳过 nums[a] 连续相等的情况
    if (nums[a] !== nums[a - 1]) {

      // 固定 b
      for (let b = a + 1; b < n - 2; b++) {
        // 跳过 nums[b] 连续相等的情况
        if (b === a + 1 || nums[b] !== nums[b - 1]) {
          let start = b + 1, end = n - 1;

          // 双指针
          while (start < end) {
            // 跳过 nums[start] 连续相等的情况
            if (start === b + 1 || nums[start] !== nums[start - 1]) {  // 一开始错写成了 nums[start] !== nums[end]...
              let sum = nums[a] + nums[b] + nums[start] + nums[end];
              if (sum === target) {
                result.push([nums[a], nums[b], nums[start], nums[end]]);
                start++;
                end--;
              }
              else if (sum < target) start++;
              else end--;
            }
            else start++;  // 忘写 else 了...
          }

        }
      }

    }
  }

  return result;
};
