/* 自己的解法 
  思路：
  遍历数组
    若该元素不存在于 Map 中，则将该元素放入 Map
    若该元素存在于 Map 中，则计算它们索引的差值（Map 的索引可以认为是 value）
      若 差值 <= k，返回 true
      若 差值 > k，则用该元素当前在数组中的索引覆盖 Map 中的索引
  返回 false
*/
// var containsNearbyDuplicate = function(nums, k) {
//   let map = new Map();
//   for (let i = 0; i < nums.length; i++) {
//     if (!map.has(nums[i])) map.set(nums[i], i);
//     else {
//       let minus = i - map.get(nums[i]);
//       if (minus <= k) return true;
//       else map.set(nums[i], i);
//     }
//   }
//   return false;
// }


/* 自己的另一个解法  空间占用更小  不过使用了不熟悉的 Set 方法
  思路：
    创建一个具有 k 个元素的 Set，遍历数组
      如果元素存在于 Set 中，返回 true
      如果不存在，则删除 Set 中最老的元素，添加数组当前元素
    返回 false
*/
// var containsNearbyDuplicate = function(nums, k) {
//   if (!k) return false;  // k = 0 时下面的代码结果不符合
//   let set = new Set();
//   for (let i = 0; i < nums.length; i++) {
//     if (set.size < k) {
//       if (set.has(nums[i])) return true;  // 刚开始添加元素的时候也要记得检查是否有重复元素
//       set.add(nums[i]);
//     }
//     else {
//       if (set.has(nums[i])) return true;
//       let iter = set.keys();
//       set.delete(iter.next().value);
//       set.add(nums[i]);
//     }
//   }
//   return false;
// }


/* 答案 和我第二个方法的思路一样（滑动窗口），但是代码比我的简洁很多
  时间复杂度：O(n)
  空间复杂度：O(min(n, k))
  参考：https://leetcode-cn.com/problems/contains-duplicate-ii/solution/hua-jie-suan-fa-219-cun-zai-zhong-fu-yuan-su-ii-by/
*/
// var containsNearbyDuplicate = function(nums, k) {
//   const set = new Set();
//   for(let i = 0; i < nums.length; i++) {
//       if(set.has(nums[i])) {  // 我写了两遍这句话，答案将它合并了
//           return true;
//       }
//       set.add(nums[i]);  // 答案将这句话也合并了。答案是先往 Set 里添加元素，再删除最老的元素。而我是先删除再添加。
//       if(set.size > k) {
//           set.delete(nums[i - k]);  // 这个是答案最厉害的地方，我想的也是删除最老的元素，但是我的实现很复杂，答案的就很简单。因为最老的元素可以通过对应的数组索引获得。
//       }  // 另外也不用判断 k = 0 的情况，因为是先添加再删除。
//   }
//   return false;
// }


/* 理解答案后自己写的 */
var containsNearbyDuplicate = function(nums, k) {
  let set = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) return true;
    set.add(nums[i]);
    if (set.size > k) set.delete(nums[i - k]);
  }
  return false;
}


/* 测试 */
// let nums = [99, 99];
// let k = 2;
let nums = [1,2,3,1,1,2,3];
let k = 0;
console.log(containsNearbyDuplicate(nums, k));
