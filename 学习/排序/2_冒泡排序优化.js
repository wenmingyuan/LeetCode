let bubbleSort = function(nums) {
  let n = nums.length;
  for (let i = 0; i < n - 1; i++) {
    let exchaged = false;  // 标志
    for (let j = 0; j < n - i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        exchaged = true;  // 发生交换，修改标志
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
      }
    }
    console.log(nums);
    if (!exchaged) return;  // 没有发生交换，提前终止
  }
}

// 测试
let nums = [1,2,3,4,6,5];
console.log(nums);
bubbleSort(nums);