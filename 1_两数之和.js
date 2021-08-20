/*
  自己的解法 1
  ---------------------------------------------------------------
  一开始想的先排序...
  后来发现返回的不是原数组的索引，没法解决这个问题
  放弃该想法
*/

// var twoSum = function(nums, target) {
//     // let sortedNums = nums.sort();  //sort对数字排序不是想象的结果
//     let sortedNums = nums.sort(function(a, b) {return a - b});
//     // console.log(sortedNums);
//     let left = 0;
//     let right = sortedNums.length - 1;
//     let sum;
//     while (left < right) {
//       sum = sortedNums[left] + sortedNums[right];  // 写成 nums 了
//       if (sum > target) right--; // 写成 right -1 了
//       else if (sum < target) left++;
//       else return [left, right];  // 要返回原数组中的索引
//     }
// };


/*
  自己的解法 2：暴力解法
  ---------------------------------------------------------------
  上面的方法做不下去了，就用暴力解法了
*/

// var twoSum = function(nums, target) {
//   let sum;
//   for (let i=0; i<nums.length-1; i++) {
//     for (let j=i+1; j<nums.length; j++) {  // 边界想成 <=，实际写的 <
//       sum = nums[i] + nums[j];
//       if (sum == target) {
//         return [i, j]
//       };
//     }
//   }
//   return [];  // 答案多了这句
// }

// 时间复杂度：O(n^2)
// 空间复杂度：O(1)


/*
  答案解法
  ---------------------------------------------------------------
  创建空的 map
  循环数组 nums：
    计算 target - nums[i]（i 为索引）
    判断该值是不是 map 的 key：
      若不是 key，则将 nums[i] 作为 key，i 作为 value 添加到 map 中
      若是 key，则返回 [该 key 对应的 value, i]
*/

var twoSum = function(nums ,target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let x = target - nums[i];  // 两个字符串相减会自动转为数字相减，虽然这里不是
    if (map.has(x)) return [map.get(x), i];
    else map.set(nums[i], i);
  }
  return [];
}

// 时间复杂度：O(n)
// 空间复杂度：O(n)


/*
  测试用例
  ---------------------------------------------------------------
*/

let nums = [2,7,11,15];
let target = 9;

console.log(twoSum(nums, target));


/*
  注
  ---------------------------------------------------------------
  Map 是 ES6 新增的数据结构
  
  Map 相比 Object 的不同之处：
    有序（这道题没用上）
    key 的类型可以不是字符串，可以是任意类型
    可以直接获取键值对个数
    可迭代

  Map 用法：
    创建：
      let map = new Map();
    添加键值对：
      map.set(key, value);  也可用来覆盖键值对
      或者使用构造方法一次添加多个键值对
      let map = new Map([[key1, value1], [key2, value2]])
    清空 map：
      map.clear();
    遍历：
      map.forEach()  暂时没研究

  参考：https://www.jianshu.com/p/e3e1745a3769
*/
