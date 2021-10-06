// https://leetcode-cn.com/problems/3sum/

/* 最近重写了这道题 */

/* 自己的思路一开始比较乱，直接看答案了 */

/* 看了答案后的分析：

  这道题和 1_两数之和 的区别在于：
    1. 需要固定一个数字，再去找满足条件的另外两个数字
    2. 1_两数之和 告诉了只有一组有效答案，不会重复。而这道题满足条件的数字组合可能重复出现，需要考虑如何去重

  方法的选择：
    1. 使用 1_两数之和 的哈希表方法不合适，因为每次遍历都要创建一个 Map
    2. 使用 167_两数之和 II - 输入有序数组 的二分查找可以考虑，但时间复杂度较高：O(nlogn)（排序）+ O(n*n*logn) = O(n^2 * logn)
    3. 使用 167_两数之和 II - 输入有序数组 的双指针方法是最优的，时间复杂度：O(nlogn)（排序）+ O(n*n) = O(n^2)
*/

/* 答案       双指针

  思路：
    先对数组排序
    用 a 指针遍历数组：
      注意跳过 nums[a] 连续相等的情况，因为要去重
      当 a 固定下来时，可以把 a 的右半部分区间看做是求两数之和的问题
      b 指针指向 a + 1，c 指针指向末尾
      b、c 从两头向中间走，比较 nums[a] + nums[b] + nums[c] 和 0 的大小关系
      注意跳过 nums[b] 连续相等的情况，因为要去重
    
  思路可参考，但它的代码我觉得自己写不出来：https://leetcode-cn.com/problems/3sum/solution/dai-ma-sui-xiang-lu-dai-ni-gao-ding-ha-x-w6pp/
*/
/* 大部分题解的代码都较难理解，所以不贴了，重点是掌握思路，看自己下面写的代码就行 */

/* 自己写的双指针    通过 */
var threeSum = function(nums) {
  let n = nums.length;
  let result = [];
  nums.sort(function(x, y){return x - y});  // 一开始忘记排序了...

  for (let a = 0; a < n - 2; a++) {  // 注意 a < n - 2
    // 跳过 nums[a] 连续相等的情况
    if (nums[a] !== nums[a - 1]) {  // 包括 nums[-1]，即 undefined
      let b = a + 1, c = n - 1;

      while (b < c) {
        // 跳过 nums[b] 连续相等的情况
        if (b === a + 1 || nums[b] !== nums[b - 1]) {  // 一开始条件写成 b > a + 1 && nums[b] !== nums[b - 1]，忽略了 b === a + 1 的情况
          let sum = nums[a] + nums[b] + nums[c];
          if (sum === 0) {
            result.push([nums[a], nums[b], nums[c]]);
            b++;
            c--;
          }
          else if (sum < 0) b++;
          else c--;
        }
        else b++;  // 一开始忘记写这句了，导致无限循环...
      }
      
    }
  }

  return result;
}
