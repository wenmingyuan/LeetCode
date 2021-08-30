/* 相关题目：
  442_数组中重复的数据
  448_找到所有数组中消失的数字
*/


/* 自己的思路  借鉴题目 448 的思路
  由于这道题的元素范围相比于题目 442 和 448 多了个 0，所以想到在数组末尾再加一个元素。
  但是想到其他语言可能不能扩展数组长度，所以我也想到了不扩展数组空间的做法。
  -----------------------------------------------------------------------------------
  不扩展数组空间的做法：
    遍历数组
      令 index = 当前元素的值
      如果 index !== n（数组长度），则将 index 处的元素做标记（这道题有 0，不能用 元素加负号 做标记）
    再遍历数组
      如果当前元素没有标记，则返回当前元素的索引
    如果遍历完了数组，还没有结束函数，则返回 n（因为数组索引最大是 n - 1）
*/
// var missingNumber = function(nums) {
//   let n = nums.length;
//   for (let i = 0; i < n; i++) {
//     // 下面要特别注意！！！！！
//     // 一开始是这样写的：let index = nums[i]; 
//     // 忘记了 nums[i] 可能已经被标记，导致获取到的 index 是错误的
//     // 应该将元素还原后 赋值给 index
//     let index = nums[i] % (n * 2); 
//     if (index !== n) nums[index] += n * 2;
//   }
//   for (let i = 0; i < n; i++) {
//     if (nums[i] < n * 2) return i;  // 写成 return nums[i]; 了
//   }
//   return n;
// }


/* 答案没有用上面的做法 */
/* 答案   高斯公式求和，再减去数组元素之和   我居然没想到这么简单的做法，人傻了... 
  参考：https://leetcode-cn.com/problems/missing-number/solution/que-shi-shu-zi-by-leetcode/
*/
/* 自己理解答案后写的   和答案一样  */
var missingNumber = function(nums) {
  let n = nums.length;
  let idealSum = (1 + n) * n / 2;
  let realSum = 0;
  for (let num of nums) {
    realSum += num;
  }
  return idealSum - realSum;
}


/* 答案  利用异或运算（a ⊕ a = 0，a ⊕ 0 = a）
  下标的范围是 0 ~ n - 1（n 为数组长度）
  数组元素的范围是 0 ~ n
  所有下标的异或结果 ⊕ n ⊕ 所有数组元素的异或结果，即得到丢失的数字
  参考：https://leetcode-cn.com/problems/missing-number/solution/que-shi-shu-zi-by-leetcode/
*/
/* 自己理解答案后写的   和答案一样  */
// var missingNumber = function(nums) {
//   let n = nums.length;
//   let result = n;
//   for (let i = 0; i < n; i++) {
//     result ^= i ^ nums[i];
//   }
//   return result;
// }


/* 另外，用 排序 或 Map 也可以，由于空间复杂度不满足 O(1)，就不写了 */


/* 测试 */
let nums = [3,0,1];
// nums = [0,1];
// nums = [9,6,4,2,3,5,7,0,1];
// nums = [0];
console.log(missingNumber(nums));
