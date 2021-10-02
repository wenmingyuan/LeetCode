// https://leetcode-cn.com/problems/binary-search/

/* 自己的思路    将数组转换成 Map，在 Map 中查找元素的时间复杂度是 O(1)    通过 */
var search = function(nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], i);
  }
  let result = map.get(target);
  return result === undefined ? -1 : result;
};

/* 自己写的二分查找   毕竟题目名字就告诉了怎么做...   通过    和答案差不多   时间复杂度 O(logn) */
var search = function(nums, target) {
  // nums.sort(function(x, y){return x - y});   // 题目给的就是升序数组，没注意看题...
  let start = 0, end = nums.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    // let mid = Math.floor((end - start) / 2) + start;  // 答案写法，避免整型溢出
    if (target === nums[mid]) return mid;
    else if (target < nums[mid]) end = mid - 1;
    else start = mid + 1;
  }
  return -1;
}
