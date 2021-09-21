// https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/

// 自己的思路  用栈   通过
// 遍历字符串，只要字符不是空格，则让字符进栈
// 否则将所有字符出栈，将这些字符和空格拼接到 result（结果字符串） 上
// 遍历结束后栈中还有元素，需要单独将它们出栈，拼接到 result 上
var reverseWords = function(s) {
  let stack = [];
  let result = '';
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== ' ') stack.push(s[i]);
    else {
      while (stack.length) {  // 忘记加 length
        result += stack.pop();
      }
      result += ' ';
    }
  }
  while (stack.length) {  // 忘记加 length
    result += stack.pop();
  }
  return result;
};

/* 答案的解法五花八门，JS 的题解很多是用内置方法做的 */

/* 测试 */
let s = "Let's take LeetCode contest";
console.log(reverseWords(s));
