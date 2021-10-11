let heapSort = function(nums) {
  let n = nums.length;
  // 建堆
  for (let i = Math.floor((n - 2) / 2); i >= 0; i--) {  // i 是非叶子节点的索引
    sift(nums, i, n - 1);  // 注意 last 参数位置填的是 n - 1，这里没有用当前堆的最后一个元素，而是整个堆的最后一个元素，效果一样，但更方便获取索引
  }
  // 开始排序
  for (let i = n - 1; i >= 0; i--) {  // i 是堆的最后一个元素的索引
    [nums[0], nums[i]] = [nums[i], nums[0]];  // 交换堆顶元素与堆的最后一个元素
    sift(nums, 0, i - 1);  // 注意更新堆的最后一个元素的索引
  }
}

// 堆的向下调整函数
let sift = function(nums, first, last) {  // first 是堆顶元素的索引，last 是堆的最后一个元素的索引
  let parent = first, child = 2 * parent + 1;  // parent、child 都是指针，child 是 parent 的左孩子
  let tmp = nums[first];  // tmp 为原堆顶元素的值
  while (child <= last) {  // 只要不越界
    if (child + 1 <= last && nums[child + 1] > nums[child]) {  // 若右孩子存在，且比左孩子大，则更新 child
      child = child + 1;
    }
    if (tmp < nums[child]) {
      nums[parent] = nums[child];  // child 位置的元素上移到 parent 位置
      parent = child;  // 更新 parent 指针
      child = 2 * parent + 1;  // 更新 child 指针
    }
    else break;
  }
  // 此时 child > last（越界） 或 tmp >= nums[child]（不需要再调整了）
  nums[parent] = tmp;  // tmp 被放到正确的位置上
}

// 测试
let nums = [2,4,5,3,1];
heapSort(nums);
console.log(nums);
