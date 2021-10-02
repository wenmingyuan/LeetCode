// https://leetcode-cn.com/problems/search-insert-position/

/* 自己的思路   二分查找，若查找不到，返回第一个大于 target 的位置    通过    和答案差不多 */
var searchInsert = function(nums, target) {
  let start = 0, end = nums.length - 1;
  while (start <= end) {
    let mid = Math.floor((end - start) / 2) + start;
    if (target === nums[mid]) return mid;
    else if (target < nums[mid]) end = mid - 1;
    else start = mid + 1;
  }
  return start;  // 这里是没查找到 target 时返回的值，应该返回第一个大于 target 的位置
  
  // 当查找不到 target 时，返回 start 的原因（没在题解中找到满意的解释，自己总结的）：
  // 分为 2 种情况讨论：
  //   (1) 退出循环时，start === mid, end === mid - 1
  //   (2) 退出循环时，end === mid, start === mid + 1
  // 这 2 种情况下，start 都是第一个大于 target 的位置
  
  // return end + 1;  // 这样写也可以，因为上面循环的终止条件是 start > end，也就是 start === end + 1
};



/* 本题和 704_二分查找 的区别就在于：最后没查找到 target 时的返回值不同！ */
