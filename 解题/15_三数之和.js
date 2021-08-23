/* 自己的思路
  -------------------------------------------------------------------------------------------
  用 3 个 for 循环，然后数组去重
  好歹是通过了…… 时间嘛…… 击败了 5% 的人
*/
var threeSum = function(nums) {
  let result = new Set();  // Set 用来去重，但注意元素如果是数组，那么达不到去重效果，需要将数组转换为字符串
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      let want = 0 - nums[i] - nums[j];
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[k] === want) {
          let element = [nums[i], nums[j], nums[k]].sort();  // 排序，这样才能出现重复的元素
          result.add(element.toString());  // 数组转换成字符串
          break;
        }
      }
    }
  }
  result = Array.from(result);  // Set 转换成数组
  for (let i = 0; i < result.length; i++) {
    result[i] = result[i].split(',').map(Number);  // 把每个字符串转换回数组
  }
  return result;
};

/* 看了答案思路后自己写的
  -------------------------------------------------------------------------------------------
  声明 result
  首先对 nums 进行升序排序
  遍历数组 从第 1 位到倒数第 3 位 将 nums[i] 作为固定数：
  若当前位和上一位数值相同，则跳过这一轮
    左指针 left = i + 1
    右指针 right = nums.length - 1
    只要 left < right，循环；
      sum = nums[i] + nums[left] + nums[right]
      若 sum > 0，则 right 左移
      若 sum < 0，则 left 右移
      若 sum = 0，则
        若 nums[left] 和 nums[left - 1] 不相等，则将这组数放入 result 中
        left 右移
        right 左移
  返回 result
*/
var threeSum = function(nums) {
  let result = [];
  nums.sort((x, y) => {return x - y;})  // 注意 sort() 内要写函数才能升序排列
  for (let i = 0; i < nums.length - 2; i++) {
    if (i !== 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1,
        right = nums.length - 1;
    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];
      if (sum > 0) right--;
      else if (sum < 0) left++;
      else {
        if (left === i + 1 || (left !== i + 1 && nums[left] !== nums[left - 1])) {
          result.push([nums[i], nums[left], nums[right]]);
        }
        left++;
        right--;
      }
    }
  }
  return result;
}


/* 测试用例 */
nums = [-1,0,1,2,-1,-4];
let result = threeSum(nums);
console.log(result);

/* 总结
  求和问题主要考虑 2 种方法：
    哈希表
    多指针
*/