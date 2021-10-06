// https://leetcode-cn.com/problems/two-sum/

/* 最近重写了一遍这道题 */

/* 自己的思路        我的思路有问题，见后面的 “坑点”

  将数组转换为 Map     key 为数组元素，value 为索引（因为题目要求返回索引）
  遍历数组：
    令 x = target - 当前数组元素
    在 Map 中查找 x 是否存在：
      若存在，则把这 2 个数的数组索引加入 result
  返回 result

  坑点：
    没通过的测试用例：[3,2,4] 6
    预期输出：[1,2]
    实际输出：[0,0]
    输出错误的原因是：0 这个索引位置被用了两次，我没有考虑到这个问题
  
  另外，Map 不会存放重复元素，只会更新重复元素的索引（value），这点我也没考虑到
*/
/* 注意下面是我一开始写的错误代码！！！    没有改正，因为思路不对，没办法直接在原来的基础上修改！ */
// var twoSum = function(nums, target) {
//   let result = [];
//   let map = new Map();
//   for (let i = 0; i < nums.length; i++) {
//     map.set(nums[i], i);
//   }
//   for (let i = 0; i < nums.length; i++) {
//     let x = target - nums[i];
//     if (map.has(x)) {
//       result.push(i, map.get(x));
//       break;  // 一开始没加这句，导致 result 中有 4 个元素（又去数组里找另一个数了），应该提前终止...
//     }
//   }
//   return result;
// }

/* 答案      哈希表     时间复杂度 O(n)

  思路：
    由于题目不允许使用同一个索引位置的元素 2 次，所以不能像我的思路一样，把数组的元素一下子全部放到 Map 中
    正确的做法如下：
      遍历数组：
        若与当前数组元素互补的值不存在于 Map 中，就把当前元素加入 Map（可能会覆盖之前的值，因为可能是重复元素）
        否则，返回这两个数的索引
    这样，当前元素就不会被提前放入到 Map 中，因此解决了同一个索引位置的元素使用 2 次的问题

  https://leetcode-cn.com/problems/two-sum/solution/liang-shu-zhi-he-by-leetcode-solution/
*/
var twoSum = function(nums, target) {
  let map = new Map();

  for (let i = 0; i < nums.length; i++) {
    let x = target - nums[i];
    if (map.has(x)) return [map.get(x), i];
    else map.set(nums[i], i);
  }

  return [];
}

/* 理解答案后自己写的      和答案差不多，注意最后加上返回值 */
var twoSum = function(nums, target) {
  let map = new Map();
  let result = [];

  for (let i = 0; i < nums.length; i++) {
    let x = target - nums[i];
    if (!map.has(x)) map.set(nums[i], i);
    else {
      result.push(i, map.get(x));
      return result;
    }
  }

  return [];  // 一开始没写这句，因为这道题一定会从上面 for 循环中 return，但为了程序的完整性，还是加上这句比较好
}

// --------------------------------------------------------------------------------------------------------------

/* 答案      双指针     时间复杂度 O(nlogn)

  思路：
    先复制一份数组，因为之后要查下标
    将原数组排序
    设置头尾两个指针，从外往内移动
      当两数之和等于 target 时，退出循环
    在复制的数组中查找这两个数的索引，注意要排除掉索引相同的情况
  
  https://leetcode-cn.com/problems/two-sum/solution/1liang-shu-zhi-he-shuang-zhi-zhen-by-hex-2wuk/
*/
/* 代码是 C++ 的，不搬过来了 */

/* 理解答案后自己写的      通过 */
var twoSum = function(nums, target) {
  let numsBak = nums.slice();  // 深拷贝
  nums.sort(function(x, y) {return x - y});

  let i = 0, j = nums.length - 1;
  let result = [];

  while (i < j) {
    let sum = nums[i] + nums[j];
    if (sum === target) {
      index1 = numsBak.indexOf(nums[i]);
      index2 = numsBak.lastIndexOf(nums[j]);  // 使用 lastIndexOf() 从后往前找，避免找到 2 个相同的索引
      result.push(index1, index2);
      break;  // 忘写了...
    }
    else if (sum < target) i++;
    else j--;
  }

  return result;
}
