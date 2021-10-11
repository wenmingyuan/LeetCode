// https://leetcode-cn.com/problems/kth-largest-element-in-an-array/

let findKthLargest = function(nums, k) {
  _quickSort(nums, 0, nums.length - 1, k);
  return nums[nums.length - k];  // 返回第 k 大的数
}

let _quickSort = function(nums, left, right, k) {
  if (left >= right) return;

  // 随机选择一个位置的元素和第一个元素交换，降低出现最坏情况（时间复杂度 O(n^2)）的可能性
  // 参考 https://leetcode-cn.com/problems/kth-largest-element-in-an-array/solution/kuai-su-pai-xu-de-si-lu-by-hyj8/
  let random = Math.floor(Math.random() * (right - left + 1)) + left;
  [nums[left], nums[random]] = [nums[random], nums[left]];

  let mid = partition(nums, left, right);
  if (mid < nums.length - k) {  // 在快速排序的基础上增加判断条件
    _quickSort(nums, mid + 1, right, k);  // 一开始忘记传参数 k 了...
  }
  else if (mid > nums.length - k) {  // 在快速排序的基础上增加判断条件
    _quickSort(nums, left, mid - 1, k);
  }
  else return;
}

// partition() 函数和快速排序相同
let partition = function(nums, left, right) {
  let tmp = nums[left];
  while (left < right) {
    while (left < right && nums[right] >= tmp) right--;
    nums[left] = nums[right];
    while (left < right && nums[left] <= tmp) left++;
    nums[right] = nums[left];
  }
  nums[left] = tmp;
  return left;
}

// 测试
let nums = [3,2,3,1,2,4,5,5,6];
let k = 4;
console.log(findKthLargest(nums, k));
