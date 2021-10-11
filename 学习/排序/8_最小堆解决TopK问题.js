// https://leetcode-cn.com/problems/kth-largest-element-in-an-array/

let findKthLargest = function(nums, k) {
  // 复制前 k 个元素到 heap 数组，用于建堆
  let heap = nums.slice(0, k);
  // 建立最小堆
  for (let i = Math.floor((k - 2) / 2); i >= 0; i--) {
    sift(heap, i, k - 1);  // 注意 heap 不要粗心写成 nums，k - 1 不要写成 n - 1
  }
  // 更新堆
  for (let i = k; i < nums.length; i++) {
    if (nums[i] > heap[0]) {
      heap[0] = nums[i];  // 更新堆顶元素
      sift(heap, 0, k - 1);
    }
  }

  // 返回第 k 大元素
  // return heap[0];

  // 返回前 k 大元素（未降序排列）
  // return heap;

  // 返回降序排列的前 k 大的元素
  for (let i = k - 1; i >= 0; i--) {
    [heap[0], heap[i]] = [heap[i], heap[0]];
    sift(heap, 0, i - 1);
  }
  return heap;
}

// 向下调整函数
let sift = function(heap, first, last) {
  let parent = first, child = 2 * parent + 1;
  let tmp = heap[first];
  while (child <= last) {
    if (child + 1 <= last && heap[child + 1] < heap[child]) {  // 注意最小堆和最大堆的比较符号有区别
      child = child + 1;
    }
    if (tmp > heap[child]) {  // 注意最小堆和最大堆的比较符号有区别
      heap[parent] = heap[child];
      parent = child;
      child = 2 * parent + 1;
    }
    else break;
  }
  heap[parent] = tmp;
}

// 测试
let nums = [3,2,3,1,2,4,5,5,6];
let k = 4;
console.log(findKthLargest(nums, k));
