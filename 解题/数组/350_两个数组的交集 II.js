/* 和 349_两个数组的交集 的区别在于保留结果数组中重复元素的个数 */


/* 自己的思路  利用 Map 借鉴 349_两个数组的交集 的思路  和答案思路一样  区别在于选择哪个数组变成 Map  通过
  下面选择较大数组变成 Map 还是较小数组变成 Map 有一点问题，选哪个都不会降低时间复杂度，选小的可以降低空间复杂度。
  而我一开始还是按 349 题的模式思考，以为选大的能降低时间复杂度，但事实上不是，因为这道题和 349 题的步骤不太一样。
  下面的步骤没有修改，是选的较大的数组变成 Map
  ----------------------------------------------------------
  把较大的数组变成 Map，value 是 key 在较大数组中的个数。
  遍历较小的数组，对每个元素都在 Map 中查找
    如果存在且 value > 0，则将结果放入 result，value 减 1
*/
var intersect = function(nums1, nums2) {
  if (nums1.length < nums2.length) return intersect(nums2, nums1);  // 参考了 349_两个数组的交集 中答案的做法，相当巧妙，避开了写重复代码
  let result = [];
  let map = new Map(), arr;
  for (let i = 0; i < nums1.length; i++) {
    if (!map.has(nums1[i])) map.set(nums1[i], 1);
    else {
      // let times = map.get(nums1[i]);
      // map.set(nums1[i], ++times);
      // 上面两句可以合并成一句，当时写麻烦了
      map.set(nums1[i], map.get(nums1[i]) + 1);
    }
  }
  arr = nums2;  // 没有必要再声明一个 arr，直接用 nums2 就好了
  for (let i = 0; i < arr.length; i++) {
    // if (map.has(arr[i])) {
    // 不必判断 map 中是否有这个元素，因为我一开始想着如果没有这个元素就不能使用 map.get() 了，然后就不能继续后面的操作了
    // 但实际上，如果 map 中没有这个元素，map.get() 会返回 undefined
    // 接下来的判断语句会比较 undefined 和 0 的大小，由于 undefined 和数字比大小不会报错，所以不会出问题
      let times = map.get(arr[i]);
      if (times > 0) {
        result.push(arr[i]);
        // map.set(arr[i], --times);  // 忘记写这句了...
        // 上面写的有点麻烦
        map.set(arr[i], times - 1);
      }
    // }
  }
  return result;
}


/* 按照上面自己代码中的注释把自己的代码优化一下  通过
  参考的代码使用的是 Map，但他用了删除元素，我觉得没有必要，就没按照他的改
  参考：https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/solution/js-xie-leetcode-by-zhl1232/
*/
var intersect = function(nums1, nums2) {
  if (nums1.length < nums2.length) {
    return intersect(nums2, nums1);
  }
  let result = [];
  let map = new Map();
  for (let i = 0; i < nums1.length; i++) {
    if (!map.has(nums1[i])) {
      map.set(nums1[i], 1);
    }
    else {
      map.set(nums1[i], map.get(nums1[i]) + 1);
    }
  }
  for (let i = 0; i < nums2.length; i++) {
    let times = map.get(nums2[i]);
    if (times > 0) {
      result.push(nums2[i]);
      map.set(nums2[i], times - 1);
    }
  }
  return result;
}


/* 答案 哈希表解法，依然和上面思路一样，但是使用的是 Object，而非 Map。可以学到一些 Object 的用法。
  参考：https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/solution/350-liang-ge-shu-zu-de-jiao-ji-ii-javascript-by-hy/
*/
const intersect = (nums1, nums2) => {
  const map = {};  // 这是 Object，不是 Map
  const res = [];
  for (const num1 of nums1) { // 记录nums1各个数字的出现次数
    if (map[num1]) {  // 判断对象中是否有 num1 这个 key，实际上这句相当于 map[num1] !== undefined
      map[num1]++;  
    } else {         
      map[num1] = 1; 
    }
  }
  for (const num2 of nums2) { // 遍历nums2，看看有没有数字在nums1出现过
    const val = map[num2];
    if (val > 0) {            // 有出现过
      res.push(num2);         // 推入res数组
      map[num2]--;            // 匹配掉一个，就减一个
    }
  }
  return res;
}


/* 自己写的 排序 + 双指针 借鉴 349_两个数组的交集 的思路 和答案一样
  答案代码：https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/solution/ha-xi-biao-liang-ge-shu-zu-de-jiao-ji-ii-fkwo/#comment
*/
var intersect = function(nums1, nums2) {
  let result = [];
  nums1.sort((x, y) => x - y);
  nums2.sort((x, y) => x - y);
  let i = 0, j = 0;
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) i++;
    else if (nums1[i] > nums2[j]) j++;  // else if 写成 if 了...
    else {
      result.push(nums1[i]);
      i++;
      j++;
    }
  }
  return result;
}


/* 测试 */
let nums1 = [1,2,2,1], nums2 = [2,2];
// let nums1 = [4,9,5], nums2 = [9,4,9,8,4];
// let nums1 = [1, 1], nums2 = [3, 1, 2];
console.log(intersect(nums1, nums2));
