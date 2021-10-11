let insertionSort = function(nums) {
  let n = nums.length;
  for (let i = 1; i < n; i++) {  // i 为无序区第一个元素的下标
    let tmp = nums[i];
    let j = i - 1;
    while (j >= 0 && nums[j] > tmp) {  // 注意条件要有 j >= 0
      nums[j + 1] = nums[j];
      j--;
    }
    nums[j + 1] = tmp;
    console.log(nums);
  }
}

// 测试
let nums = [2,4,5,3,1];
console.log(nums);
insertionSort(nums);
