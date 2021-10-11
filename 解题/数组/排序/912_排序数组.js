// https://leetcode-cn.com/problems/sort-an-array/

/* 见 /学习/排序 */

// 这里使用归并排序        通过
let sortArray = function(nums) {
  _mergeSort(nums, 0, nums.length - 1);
  return nums;
}

let _mergeSort = function(nums, left, right) {
  if (left >= right) return;

  let mid = Math.floor((left + right) / 2);
  _mergeSort(nums, left, mid);
  _mergeSort(nums, mid + 1, right);
  merge(nums, left, mid, right);
}

let merge = function(nums, left, mid, right) {
  let result = [];
  let i = left, j = mid + 1;

  while (i <= mid || j <= right) {
    if (i <= mid && j <= right) {
      if (nums[i] <= nums[j]) {
        result.push(nums[i]);
        i++;
      }
      else {
        result.push(nums[j]);
        j++;
      }
    }
    else if (i <= mid) {
      result.push(nums[i]);
      i++;
    }
    else {
      result.push(nums[j]);
      j++;
    }
  }

  for (let i = left; i <= right; i++) {
    nums[i] = result[i - left];
  }
}
