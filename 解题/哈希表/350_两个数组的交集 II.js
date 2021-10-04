// https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/

/* 自己的思路     用 Map     通过

    将较大的数组转换成 Map
    遍历另一个数组，查找当前元素是否存在于 Map 且 value 不等于 0：
      若存在且 value 不等于 0，则将其放入 result，并将 Map 中该 key 的 value 减一
    返回 result
*/
var intersect = function(nums1, nums2) {
  if (nums1.length > nums2.length) return intersect(nums2, nums1);

  let map = new Map();
  let result = [];

  for (let e of nums2) {
    // 参考题解，改进我的 Map 计数写法
    // 之前我都是用 map.get(key) === undefined 来判断 map 中是否有 key，现在可以用 map.has(key) 判断
    // https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/solution/js-xie-leetcode-by-zhl1232/

    // 原来我的写法
    // let val = map.get(e) === undefined ? 0 : map.get(e);
    // map.set(e, val + 1);
    
    // 改进后的写法
    if (map.has(e)) {
      map.set(e, map.get(e) + 1)
    }
    else map.set(e, 1);
  }

  for (let e of nums1) {
    let val = map.get(e);
    if (val !== undefined && val !== 0) {
      result.push(e);
      map.set(e, val - 1);
    }
  }

  return result;
}

/* 答案    思路和我差不多    区别在于答案选择了较小的数组转换成 Map，理由是更省空间     但我感觉这样时间会更长，不研究了 
  https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/solution/liang-ge-shu-zu-de-jiao-ji-ii-by-leetcode-solution/
*/


/* ----------- 下面的双指针是好久以前写的了...   上面的 Map 是最近重写的... ----------- */


/* 自己写的 排序 + 双指针      借鉴 349_两个数组的交集 的思路       和答案一样
  https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/solution/ha-xi-biao-liang-ge-shu-zu-de-jiao-ji-ii-fkwo/#comment
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
