let selectionSort = function(nums) {
  let n = nums.length;
  for (let i = 0; i < n - 1; i++) {  // 趟数：n - 1
    let minIndex = i;  // 无序区范围：i ~ n - 1
    for (let j = i + 1; j < n; j++) {
      if (nums[j] < nums[minIndex]) minIndex = j;
    }
    [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]];
    console.log(nums);
  }
}

// 测试
let nums = [2,4,5,3,1];
console.log(nums);
selectionSort(nums);
