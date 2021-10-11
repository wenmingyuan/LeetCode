let mergeSort = function(nums) {
  _mergeSort(nums, 0, nums.length - 1);
}

let _mergeSort = function(nums, left, right) {
  if (left >= right) return;
  let mid = Math.floor((left + right) / 2);
  _mergeSort(nums, left, mid);
  _mergeSort(nums, mid + 1, right);
  merge(nums, left, mid, right);  // 归并操作
}

let merge = function(nums, left, mid, right) {
  let result = [];
  let i = left, j = mid + 1;  // i 遍历左半部分，j 遍历右半部分
  while (i <= mid && j <= right) {  // 左、右部分都有元素
    if (nums[i] <= nums[j]) {
      result.push(nums[i]);
      i++;
    }
    else {
      result.push(nums[j]);
      j++;
    }
  }
  while (i <= mid) {  // 左半部分还有元素
    result.push(nums[i]);
    i++;
  }
  while (j <= right) {  // 右半部分还有元素
    result.push(nums[j]);
    j++;
  }
  for (let i = left; i <= right; i++) {  // 修改原数组
    nums[i] = result[i - left];
  }
}

// 测试
let nums = [2,4,5,3,1];
mergeSort(nums);
console.log(nums);
