/* 自己的思路   通过    根据数组创建 Set，查找 1 到 n 是否存在于 Set 中，将不存在的数放入结果数组 */
// var findDisappearedNumbers = function(nums) {
//   let result = [];
//   let set = new Set(nums);
//   for (let i = 1; i <= nums.length; i++) {
//     if (!set.has(i)) result.push(i);
//   }
//   return result;
// }


/* 没想出来 时间复杂度 O(n) 不占用额外空间的方法  看答案了 */
/* 答案  原地修改数组
  思想简而言之：
    1. 数组元素的值 和 数组索引 一一对应
    2. 数组索引 和 数组索引处的元素 一一对应
    3. 根据 1, 2 得出 数组元素的值 和 数组索引处元素 一一对应
    4. 第一遍遍历数组时，根据 当前元素的值 对 数组索引处元素 做标记。
    5. 第二遍遍历数组时，找出 没有标记的元素的索引，该索引 与 消失的数字 一一对应。
  思想来源：
    元素的范围是 1 ~ n，这与数组下标的范围 0 ~ n-1 是有关系的。
    因此可以创建一个长度为 n 的新数组，元素全部设为 false
    遍历原数组，将 元素的值 - 1 作为索引，将新数组对应索引处的元素设为 true
    遍历新数组，元素值为 false 的索引 + 1 就是消失的数字
  ------------------------------------------------------------------------------------------------------
  具体到这道题：
    为了不占用额外空间，可以直接在原数组上 “做标记”，思想和上面用 2 个数组是一样的。
    “做标记” 的方法很多，答案中有 2 种方法：
      1. 元素值 + n
      2. 元素值加负号（我更喜欢这种方法）
    注意：
      1. 如果元素已经被标记，那么不需要重复标记。
         例如采用加负号的方法做标记，重复标记就变成正数了，就有问题了。
         元素值 + n 的方法，答案是重复标记，因为最后只要判断元素是否大于 n 即可，重复加 n 没影响。
      2. 用 数组元素 去标记 对应索引位置的元素时，该数组元素可能已被标记，因此需要将其还原为未标记时的数值。
    另外，答案都没有复原数组，这点我感到很无语。
  参考： 
    元素值 + n：https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array/solution/zhao-dao-suo-you-shu-zu-zhong-xiao-shi-d-mabl/
    元素值加负号、Python 代码、动图：https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array/solution/yi-zhang-dong-tu-bang-zhu-li-jie-yuan-di-uign/
*/
// 代码是自己参照上面 Python 代码写的   通过
var findDisappearedNumbers = function(nums) {
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    let index = Math.abs(nums[i]) - 1;  // 注意获取索引的时候要取绝对值
    if (nums[index] > 0) {  // 如果没标记过
      nums[index] *= -1;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) result.push(i + 1);
  }
  return result;
}


/* 测试 */
let nums = [4,3,2,7,8,2,3,1];
// let nums = [1, 1];
console.log(findDisappearedNumbers(nums));
