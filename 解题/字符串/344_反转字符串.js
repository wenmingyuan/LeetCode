// https://leetcode-cn.com/problems/reverse-string/

// 自己的思路  直接使用数组内置的 reverse() 方法  通过  但不知道这种方法有没有使用额外空间
var reverseString = function(s) {
  return s.reverse();
};

// 自己的思路  交换数组对称位置的元素  和答案差不多
var reverseString = function(s) {
  for (let i = 0; Math.floor(i < s.length / 2); i++) {
    let tmp = s[i];
    s[i] = s[s.length - 1 - i];
    s[s.length - 1 - i] = tmp;
  }
  return s;
};

// 答案  双指针
// 参考：https://leetcode-cn.com/problems/reverse-string/solution/fan-zhuan-zi-fu-chuan-by-leetcode-solution/
var reverseString = function(s) {
  const n = s.length;
  for (let left = 0, right = n - 1; left < right; ++left, --right) {
      [s[left], s[right]] = [s[right], s[left]];  // 解构赋值 交换两个变量
  }
};

/* 测试 */
let s = ["h","e","l","l","o"];
console.log(reverseString(s));