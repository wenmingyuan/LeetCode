// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/

/* 自己的思路    只想到了用 27_移除元素 中未优化的双指针做法    和答案差不多    虽然通过了，但是当 nums 为空时，我的返回值不对
  https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/solution/shan-chu-pai-xu-shu-zu-zhong-de-zhong-fu-tudo/
*/
var removeDuplicates = function(nums) {
  if (nums.length === 0) return 0;  // 答案多了这句话，也正是我没有注意到的特殊情况
  let left = 1;
  for (let right = 1; right < nums.length; right++) {
    if (nums[right] > nums[right - 1]) {
      nums[left] = nums[right];
      left++;
    }
  }
  return left;
};
