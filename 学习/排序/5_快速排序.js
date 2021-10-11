let quickSort = function(nums) {
  _quickSort(nums, 0, nums.length - 1);
}

let _quickSort = function(nums, left, right) {
  if (left >= right) return;

  // 随机选择一个位置的元素和第一个元素交换，降低出现最坏情况（时间复杂度 O(n^2)）的可能性
  // let random = Math.floor(Math.random() * (right - left + 1)) + left;
  // [nums[left], nums[random]] = [nums[random], nums[left]];

  let mid = partition(nums, left, right);
  _quickSort(nums, left, mid - 1);
  _quickSort(nums, mid + 1, right);
}

let partition = function(nums, left, right) {
  let tmp = nums[left];
  while (left < right) {
    while (left < right && nums[right] >= tmp) right--;
    nums[left] = nums[right];
    // left++;  // 注意不能写这句！因为之前 left 和 right 可能重合，那么就不应该执行这句！
    while (left < right && nums[left] <= tmp) left++;
    nums[right] = nums[left];
    // right--;  // 注意不能写这句！因为之前 left 和 right 可能重合，那么就不应该执行这句！
  }
  nums[left] = tmp;  // nums[right] = tmp 也可以
  return left;
}

// 测试
let nums = [2,4,5,3,1];
quickSort(nums);
console.log(nums);
