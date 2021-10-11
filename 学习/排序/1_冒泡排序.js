let bubbleSort = function(nums) {
  let n = nums.length;
  for (let i = 0; i < n - 1; i++) {  // 趟数
    for (let j = 0; j < n - i - 1; j++) {  // 无序区范围：0 ~ n - i - 1
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
      }
    }
    console.log(nums);
  }
}

// 测试
let nums = [3,4,2,5,1];
console.log(nums);
bubbleSort(nums);