/* 自己的思路   通过   借鉴 448_找到所有数组中消失的数字 的思路，对数组元素做标记
  为区分出现 0 次、1 次、2 次的元素，选择了 元素值 + n 的标记方式 
*/
// var findDuplicates = function(nums) {
//   let result = [];
//   let n = nums.length;
//   for (let i = 0; i < n; i++) {
//     let index = (nums[i] - 1) % n;
//     nums[index] += n;
//   }
//   for (let i = 0; i < n; i++) {
//     // 把 n * 2 写成 2n 了...    push() 的参数写成 nums[i] 了...
//     if (nums[i] > n * 2) result.push(i + 1);
//   }
//   return result;
// }


/* 答案 思路差不多，但我的代码复杂了，答案很简洁
  ----------------------------------------------------------------------------
  答案和我的区别：
    在对元素进行第 2 次标记之前，判断元素是否已标记
      若标记，则放入 result（这样就不需要标记两次了，也不需要后面的循环了） 
  因此这道题也可以用 元素加负号 做标记
  ----------------------------------------------------------------------------
  参考 Python 代码自己写的 JS 代码：https://leetcode-cn.com/problems/find-all-duplicates-in-an-array/solution/fu-shu-suo-yin-hao-by-powcai/
*/
var findDuplicates = function(nums) {
  let result = [];
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    let index = (nums[i] - 1) % n;
    if (nums[index] > n) result.push(index + 1);  // 若标记过，就放到 result 里
    else nums[index] += n;
  }
  return result;
}


/* 测试 */
let nums = [4,3,2,7,8,2,3,1];
console.log(findDuplicates(nums));
