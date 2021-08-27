/* 自己的思路  通过
  把第一个数组的所有元素都放入 set1
  把第二个数组的所有元素都放入 set2
  遍历 set1 ，判断每个元素是否在 set2 中
    如果在，则将该元素放入结果数组中
*/
// var intersection = function(nums1, nums2) {
//   let result = [];
//   let set1 = new Set(nums1);
//   let set2 = new Set(nums2);
//   set1.forEach(function (x) {
//     if (set2.has(x)) result.push(x);
//   })
//   return result;
// }


/* 答案 和我的思路一样，区别在于答案比较了 set1 和 set2 的 size，遍历较小的 set 
  参考：https://leetcode-cn.com/problems/intersection-of-two-arrays/solution/liang-ge-shu-zu-de-jiao-ji-by-leetcode-solution/
*/
// const set_intersection = (set1, set2) => {
//   if (set1.size > set2.size) {  // 判断 set1 和 set2 的大小，以便后面使用较小的 set 来遍历，节约时间
//       return set_intersection(set2, set1);
//   }
//   const intersection = new Set();  // 感觉其实没必要用 Set，直接用数组不就行了？
//   for (const num of set1) {
//       if (set2.has(num)) {
//           intersection.add(num);
//       }
//   }
//   return [...intersection];  // Set 转 数组
// }
// var intersection = function(nums1, nums2) {
//   const set1 = new Set(nums1);
//   const set2 = new Set(nums2);
//   return set_intersection(set1, set2);
// }


/* 学习 Set 的遍历 */
// let set = new Set();
// set.add(1).add(2).add(3);

// set.forEach(function (value, key) {  // 由于 Set 的 value 和 key 一样，并且 JS 对函数的参数个数要求不严格，所以只写一个参数也行
//   console.log(value, key);
// })
// set.forEach(function (value) {  // 只写一个参数
//   console.log(value);
// })


/* 答案 另一种做法：排序 + 双指针 
  参考：https://leetcode-cn.com/problems/intersection-of-two-arrays/solution/liang-ge-shu-zu-de-jiao-ji-by-leetcode-solution/
*/
// var intersection = function(nums1, nums2) {
//   nums1.sort((x, y) => x - y);
//   nums2.sort((x, y) => x - y);
//   const length1 = nums1.length, length2 = nums2.length;
//   let index1 = 0, index2 = 0;
//   const intersection = [];
//   while (index1 < length1 && index2 < length2) {
//       const num1 = nums1[index1], num2 = nums2[index2];
//       if (num1 === num2) {
//           // 保证加入元素的唯一性
//           if (!intersection.length || num1 !== intersection[intersection.length - 1]) {
//               intersection.push(num1);
//           }
//           index1++;
//           index2++;
//       } else if (num1 < num2) {
//           index1++;
//       } else {
//           index2++;
//       }
//   }
//   return intersection;
// }


/* 大概知道了答案的意思后自己写的 排序 + 双指针 写的时候还没看答案代码  和答案一样 */
var intersection = function(nums1, nums2) {
  let result = [];
  nums1.sort((x, y) => {return x - y;});
  nums2.sort((x, y) => {return x - y;});
  let i = 0, j = 0;
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) i++;
    else if (nums1[i] > nums2[j]) j++;
    else {  // nums1[i] 和 nums2[j] 相等时
      if (result.length === 0 || result[result.length - 1] !== nums1[i]) {  // 防止添加重复元素到 result 中
        result.push(nums1[i]);
      }
      i++;
      j++;
    }
  }
  return result;
}


/* 测试 */
// let nums1 = [1,2,2,1], nums2 = [2,2];
let nums1 = [4,9,5], nums2 = [9,4,9,8,4];
console.log(intersection(nums1, nums2));
