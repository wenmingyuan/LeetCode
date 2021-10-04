// https://leetcode-cn.com/problems/squares-of-a-sorted-array/

/* 我的思路       双指针       通过，但改了很多次...      代码还是有些混乱
  left 指针初始指向最大的负数，right 指针初始指向最小的正数（包括 0）
  不断比较 left 指向的值与 right 指向的值的平方大小，将较小的平方放入新数组，并朝外侧移动这个较小值的指针
*/
var sortedSquares = function(nums) {
  let right = 0;
  while (right < nums.length && nums[right] < 0) {
    right++;
  }
  let left = right - 1;
  let result = [];

  while (left >= 0 || right < nums.length) {
    if (left < 0) {
      result.push(nums[right] * nums[right]);
      right++;
      continue;
    }
    else if (right >= nums.length) {
      result.push(nums[left] * nums[left]);
      left--;
      continue;
    }

    let lsquare = nums[left] * nums[left];
    let rsquare = nums[right] * nums[right];
    
    if (lsquare > rsquare) {
      result.push(rsquare);
      right++;
    }
    else if (lsquare <= rsquare) {  // 一开始漏掉了等于的情况，导致测试时一直超时
      result.push(lsquare);
      left--;
    }
  }

  return result;
};

/* 参考答案，修改我写的双指针（从中间往两边），把 left、right 的命名改为 i、j，另外对代码做了一些简化     时间复杂度 O(n)
  https://leetcode-cn.com/problems/squares-of-a-sorted-array/solution/you-xu-shu-zu-de-ping-fang-by-leetcode-solution/
*/
var sortedSquares = function(nums) {
  let n = nums.length;
  let j = 0;
  while (j < n && nums[j] < 0) j++;
  let i = j - 1;
  let result = [];

  while (i >= 0 || j < n) {
    if (i === -1) {  // 左指针越界
      result.push(nums[j] * nums[j]);
      j++;
    }
    else if (j === n) {  // 右指针越界
      result.push(nums[i] * nums[i]);
      i--;
    }
    // 一开始我想把下面这句和 if (i === 1) 合并，因为块里的内容一样
    // 但我没发现 i === -1 时无法计算 nums[i] * nums[i]，只能分开写
    // 同理，else 部分也无法与 else if (j === n) 合并
    else if (nums[i] * nums[i] > nums[j] * nums[j]) {
      result.push(nums[j] * nums[j]);
      j++;
    }
    else {  // 包括 nums[i] * nums[i] === nums[j] * nums[j] 的情况
      result.push(nums[i] * nums[i]);
      i--;
    }
  }

  return result;
}

/* 答案     优化的双指针（从两边往中间）    不需要找负数与正数的分界位置，并且不用处理越界情况     时间复杂度 O(n)
  参考上面题解和下面题解
  https://leetcode-cn.com/problems/squares-of-a-sorted-array/solution/977-you-xu-shu-zu-de-ping-fang-pai-xu-shuang-zhi-z/
*/
var sortedSquares = function(nums) {
  let n = nums.length;
  let result = new Array(n);
  
  for (let i = 0, j = n - 1, pos = n - 1; i <= j; ) {
    if (nums[i] * nums[i] > nums[j] * nums[j]) {
      result[pos] = nums[i] * nums[i];
      i++;
    }
    else {
      result[pos] = nums[j] * nums[j];
      j--;
    }
    pos--;
  }

  return result;
}

/* 理解答案后写的     和答案一样，一开始写错了 */
var sortedSquares = function(nums) {
  let n = nums.length;
  let result = new Array(n);
  let i = 0, j = n - 1, pos = n - 1;

  while (i <= j) {  // 条件改为 pos > -1 也可以
    let lsquare = nums[i] * nums[i];
    let rsquare = nums[j] * nums[j];
    if (lsquare >= rsquare) {
      result[pos] = lsquare;
      i++;  // 忘记写这句了...
    }
    else {
      result[pos] = rsquare;
      j--;  // 忘记写这句了...
    }
    pos--;
  }

  return result;
}
