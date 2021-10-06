// https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/

/* 这道题是先看的答案，直接贴答案了 */

/* 答案      二分查找      时间复杂度 O(nlogn) 
  https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/solution/liang-shu-zhi-he-ii-shu-ru-you-xu-shu-zu-by-leet-2/
*/
var twoSum = function(numbers, target) {
  for (let i = 0; i < numbers.length; i++) {
    let start = i + 1, end = numbers.length - 1;
    let x = target - numbers[i];
    while (start <= end) {
      let mid = Math.floor((end - start) / 2) + start;
      if (numbers[mid] === x) return [i + 1, mid + 1];  // 注意题目要求索引从 1 开始
      else if (numbers[mid] < x) start = mid + 1;
      else end = mid - 1;
    }
  }
  return [-1, -1];
};

/* 理解答案后自己写的二分查找     和答案一样 */
var twoSum = function(numbers, target) {
  let n = numbers.length;
  for (let i = 0; i < n; i++) {
    let start = i + 1, end = n - 1;  // 注意 start = i + 1
    let x = target - numbers[i];
    while (start <= end) {
      let mid = Math.floor((end - start) / 2) + start;
      if (numbers[mid] === x) return [i + 1, mid + 1];  // 注意题目要求索引从 1 开始
      else if (numbers[mid] < x) start = mid + 1;
      else end = mid - 1;
    }
  }
  return [];
};

// -------------------------------------------------------------------------------------------------------------------

/* 答案       双指针，从两头向中间走      时间复杂度 O(n) 
  还是参考上面题解
*/
var twoSum = function(numbers, target) {
  let i = 0, j = numbers.length - 1;
  while (i < j) {
    let sum = numbers[i] + numbers[j];
    if (sum === target) {
      return [i + 1, j + 1];  // 注意题目要求索引从 1 开始
    }
    else if (sum < target) ++i;
    else --j;
  }
  return [-1, -1];
};

/* 理解答案后自己写的双指针       和答案一样 */
var twoSum = function(numbers, target) {
  let i = 0, j = numbers.length - 1;
  while (i < j) {
    let sum = numbers[i] + numbers[j];
    if (sum === target) {
      return [i + 1, j + 1];  // 注意题目要求索引从 1 开始
    }
    else if (sum < target) i++;
    else j--;
  }
  return [];
};

// -------------------------------------------------------------------------------------------------------------------

/* 另外也可以用哈希表，方法与 1_两数之和 相同 */
