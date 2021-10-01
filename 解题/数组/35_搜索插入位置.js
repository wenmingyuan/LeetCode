// https://leetcode-cn.com/problems/search-insert-position/

/* 自己的思路   二分查找，若查找不到，返回 start 的值（通过画图发现规律）   通过    和答案差不多 */
var searchInsert = function(nums, target) {
  let start = 0, end = nums.length - 1;
  while (start <= end) {
    let mid = Math.floor((end - start) / 2) + start;
    if (target === nums[mid]) return mid;
    else if (target < nums[mid]) end = mid - 1;
    else start = mid + 1;
  }
  return start;  // 这里的返回值比较关键，有些题解的评论区中有证明为什么返回的是 start，我直接通过画图找规律得到的
};
