// https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/

/* 自己的思路如下      感觉很麻烦，看答案了
  因为要找的元素是连续存在的，所以在查找到 target 后，还需要对该位置的左、右区间进行查找
*/

/* 不同的题解写法区别较大，而且都比较复杂，我参考了下有些题解，然后自己写了
  https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/solution/34po-shi-wu-hua-de-er-fen-cha-zhao-zan-men-yi-bu-y/
*/

/* 结合了答案和自己的理解写的     通过 

  思路：
    需要 2 次二分查找，先在数组中查找 target 的左边界，再查找右边界

    查找边界和 35_搜索插入位置 的区别在于：
      在查找到 target 后，不能停止查找，因为要找到边界！
      (1) 如果查找左边界，当查找到 target 后，应该将区间缩小至 mid 的左侧范围，即 end = mid - 1
      (2) 如果查找右边界，当查找到 target 后，应该将区间缩小至 mid 的右侧范围，即 start = mid + 1

      由于查找到 target 后不能像 35 题一样终止 while 循环，所以最后一定是通过 start > end 的方式终止循环的，这时 start === end + 1
      对于返回的左、右边界应该取 start 还是 end，我是通过简单的情况归纳得到的：
      比如数组是：[8]，target 也是 8。通过模拟 while 循环，可以发现：
        在查找左边界时，start 就是左边界
        在查找右边界时，end 就是右边界
    ----------------------------------------------------------------------------------------------------------------
      这个规律我琢磨了半天，下次做这道题直接由简单情况归纳规律
    ----------------------------------------------------------------------------------------------------------------
    
    最后需要根据是否查找到 target，来决定返回 [-1, -1] 还是 [左边界, 右边界]
    经过自己画图发现：
      (1) 当 右边界 - 左边界 === -1 时，说明没有查找到 target
      (2) 其余情况（即 右边界 - 左边界 >= 0），说明查找到了 target
    ----------------------------------------------------------------------------------------------------------------
    这个规律题解基本都没讲，自己找规律又找了半天，以后做这道题的时候，还是由简单的情况归纳得到规律算了，证明感觉太麻烦了
    ----------------------------------------------------------------------------------------------------------------
*/
var searchRange = function(nums, target) {
  // 找左边界
  let getLeftBorder = function() {
    let start = 0, end = nums.length - 1;
    while (start <= end) {
      let mid = Math.floor((end - start) / 2) + start;
      if (nums[mid] >= target) end = mid - 1;  // 注意等于是和大于还是小于合并
      else start = mid + 1;
    }
    return start;  // 注意返回值，返回 end + 1 也可以，因为退出循环时 start === end + 1
  }

  // 找右边界
  let getRightBorder = function() {
    start = 0, end = nums.length - 1;
    while (start <= end) {
      let mid = Math.floor((end - start) / 2) + start;
      if (nums[mid] <= target) start = mid + 1;  // 注意等于是和大于还是小于合并
      else end = mid - 1;
    }
    return end;  // 注意返回值，返回 start - 1 也可以，因为退出循环时 end === start - 1
  }

  let leftBorder = getLeftBorder();
  let rightBorder = getRightBorder();

  // 没查找到 target
  if (rightBorder - leftBorder === -1) return [-1, -1];
  // 查找到了 target
  else return [leftBorder, rightBorder];
}


  // 下面注释掉的条件是一开始写的时候，分类讨论了：
  //     (1) target > 数组最大元素的情况
  //     (2) target < 数组最小元素的情况
  //     (3) 数组最小元素 < target < 数组最大元素，并且数组中查找不到 target 的情况

  // 后来发现 (3) 包含了 (1)、(2)，可以合并写

  // if (leftBorder === nums.length || rightBorder === -1 || rightBorder - leftBorder === -1) {
  //   return [-1, -1];
  // }
