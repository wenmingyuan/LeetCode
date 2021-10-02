// https://leetcode-cn.com/problems/remove-element/

/* 自己的思路     双指针

  1. i 指针初始指向数组第一个元素，j 指针初始指向数组最后一个元素
  2. 只要 i <= j，循环：
      若 nums[i] 不等于 val，则 i 向右移动
      否则，nums[i] 与 nums[j] 交换，j 向左移动
  3. 返回 j + 1
*/
var removeElement = function(nums, val) {
  let i = 0, j = nums.length -1;
  while (i <= j) {
    if (nums[i] !== val) i++;
    else {
      // [nums[i], nums[j]] = [nums[j], nums[i]];
      nums[i] = nums[j];  // 看了答案后发现，可以直接用后面元素覆盖前面元素，无需交换，因为题目不要求
      j--;
    }
  }
  // return nums.length - 1 - j;  // 一开始以为要返回等于 val 的元素个数，没注意看题...
  return j + 1;
};

/* 答案    优化的双指针做法和我写的一样，只需遍历 1 次数组  

  答案和我的区别在于：
    没有交换变量，直接用后面的元素覆盖前面的元素，因为题目不要求后面的元素写成什么样
*/

/* 答案    未优化的双指针做法，最坏需要遍历 2 次数组

  思想：
    要是允许用额外空间，那就可以通过遍历原数组，把所有不等于 val 的元素都放入新数组，返回新数组即可。
    但这道题不允许用额外空间，可以考虑把原数组就当做新数组，把不等于 val 的元素直接从原数组的开头进行写入，覆盖掉原数组的元素。
    right 指针负责遍历原数组，left 指针指向新数组的末尾，方便添加元素到新数组中。
  
  https://leetcode-cn.com/problems/remove-element/solution/yi-chu-yuan-su-by-leetcode-solution-svxi/
*/
var removeElement = function(nums, val) {
  const n = nums.length;
  let left = 0;
  for (let right = 0; right < n; right++) {
      if (nums[right] !== val) {
          nums[left] = nums[right];
          left++;
      }
  }
  return left;
};

/* 测试 */
let nums = [0,1,2,2,3,0,4,2];
let val = 2;
let n = removeElement(nums, val);
console.log(nums);
console.log(n);
