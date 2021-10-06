// https://leetcode-cn.com/problems/single-number/

/* 最近重写了一遍 */

/* 自己的思路      用 Set     通过        但不满足空间复杂度要求
  如果 Set 中没有当前数组元素，就放入；如果有，就删除。最后剩下的就是要找的数字。 
*/
var singleNumber = function(nums) {
  let result = null;
  let set = new Set();

  for (let e of nums) {
    if (set.has(e)) set.delete(e);
    else set.add(e);
  }
  for (let e of set) {
    result = e;
  }

  return result;
}

/* 自己的思路     先排序再找      但不满足时间复杂度、空间复杂度要求 */

/* 答案       位运算-异或运算      时间复杂度 O(n)，空间复杂度 O(1)

  nums[0] ^ nums[1] ^ nums[2] ^ ... 的计算结果就是要找的数字

  异或运算的性质：
      1. a ⊕ 0 = a
      2. a ⊕ a = 0
      3. 交换律和结合律    a⊕b⊕a = b⊕a⊕a = b⊕(a⊕a)

  https://leetcode-cn.com/problems/single-number/solution/hua-jie-suan-fa-136-zhi-chu-xian-yi-ci-de-shu-zi-b/
*/
var singleNumber = function(nums) {
  let ans = 0;
  for(const num of nums) {
      ans ^= num;  // a ^= b 即 a = a ^ b
  }
  return ans;
}

/* 理解答案后自己写的异或运算 */
var singleNumber = function(nums) {
  let result = 0;
  for (let e of nums) {
    result ^= e;
  }
  return result;
}
