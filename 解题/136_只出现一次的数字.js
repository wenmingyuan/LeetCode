/* 自己的思路 使用额外空间 使用 Map（后来发现用 Set 更好）
  遍历数组
    如果 Map 中没有该元素，则添加该元素，value 设为 1
    否则，删除 Map 中该元素
  返回 Map 中唯一的 key
*/
// var singleNumber = function(nums) {
//   let map = new Map();
//   for (let i = 0; i < nums.length; i++) {
//     if (!map.has(nums[i])) {
//       map.set(nums[i], 1);
//     }
//     else map.delete(nums[i]);
//   }
//   let result;
//   map.forEach(function(value, key) {
//     result = key;  // 直接在这里 return 不行，返回的是 undefined，不知道为什么
//   });
//   return result;
// }

/* 自己想到先排序再找，但是时间复杂度不符合题目要求 */
/* 题目要求线性时间复杂度，且不使用额外空间 想不出思路 看答案了 */


/* 答案 位运算-异或运算
  nums[0] ^ nums[1] ^ nums[2] ^... 的计算结果就是要找的数字（因为 0 ^ 要找的数字 = 要找的数字）（^ 为代码中的异或运算符）
  异或运算的性质：
    1. a ⊕ 0 = a
    2. a ⊕ a = 0
    3. 交换律和结合律    a⊕b⊕a = b⊕a⊕a = b⊕(a⊕a)
  参考：https://leetcode-cn.com/problems/single-number/solution/hua-jie-suan-fa-136-zhi-chu-xian-yi-ci-de-shu-zi-b/
*/
var singleNumber = function(nums) {
  let ans = 0;
  for(const num of nums) {
      ans ^= num;  // a ^= b 即 a = a ^ b
  }
  return ans;
}


/* 理解答案后自己写的   和答案一样 */
var singleNumber = function(nums) {
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    result ^= nums[i];
  }
  return result;
}


/* 测试 */
// let nums = [2,2,1];
let nums = [4,1,2,1,2];
console.log(singleNumber(nums));
