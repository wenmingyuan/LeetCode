// https://leetcode-cn.com/problems/third-maximum-number/

/* 自己的思路   先排序，再遍历   通过   */
// var thirdMax = function(nums) {
//   nums.sort((x, y) => y - x);  // 降序排列
//   let count = 1;
//   for (let i = 0; i < nums.length - 1; i++) {
//     if (nums[i] > nums[i + 1]) count++;
//     if (count === 3) return nums[i + 1];
//   }
//   return nums[0];  // count < 3 的情况
// }


/* 自己的思路    时间复杂度为 O(n)    通过
  先思考怎么找第一大的数，遍历数组，用擂台法即可。
  再思考怎么找第二大的数，如法炮制，但遇到第一大的数时，需要直接跳过。 
  再思考怎么找第三大的数，如法炮制，遇到第一大的数或第二大的数，直接跳过。
  若不存在第三大的数，返回第一大的数。
*/
// var thirdMax = function(nums) {
//   let max1 = -Infinity;
//   for (let num of nums) {
//     if (num > max1) max1 = num;
//   }
//   let max2 = -Infinity;
//   for (let num of nums) {
//     if (num !== max1 && num > max2) max2 = num;
//   }
//   let max3 = -Infinity;
//   for (let num of nums) {
//     if (num !== max1 && num !== max2 && num > max3) max3 = num;
//   }
//   return max3 !== -Infinity ? max3 : max1;
// }


/* 答案的思路和我的类似，但只需要一次遍历，可以同时更新三个最值   理解答案后自己写的   和答案一样
   思路：
     将 max1, max2, max3 都设为 -Infinity，每遇到一个数组元素，就根据该元素和 3 个最值的大小关系更新这 3 个最值（不一定 3 个都要更新）
   可以结合下面的动图理解
   动图：https://leetcode-cn.com/problems/third-maximum-number/solution/alton-di-san-da-de-shu-shuang-san-zhi-zh-0t7l/
*/
var thirdMax = function(nums) {
  let max1 = -Infinity, max2 = -Infinity, max3 = -Infinity;
  for (let num of nums) {
    if (num > max1) {
      max3 = max2;
      max2 = max1;
      max1 = num;
    }
    else if (num < max1 && num > max2) {
      max3 = max2;
      max2 = num;
    }
    else if (num < max2 && num > max3) {
      max3 = num;
    }
  }
  return max3 !== -Infinity ? max3 : max1;
}


/* 测试 */
let nums = [3, 2, 1];
// let nums = [1, 2];
// let nums = [2, 2, 3, 1];
// let nums = [3];
console.log(thirdMax(nums));
