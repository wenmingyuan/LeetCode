// https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/

/* 最近重写了一遍 */

/* 自己的思路              通过
    指针 i 从后向前遍历
      只要 i 指向的字符不是 空格 或 undefined，就加入临时数组
      如果是空格，退出循环
    将临时数组的元素拼接为单词
    将该单词入栈，将空格入栈
    将栈顶元素（空格）出栈
    将栈中的元素拼接为字符串，返回该字符串
*/
var reverseWords = function(s) {
  let tmp = [], stack = [];
  for (let i = s.length - 1; i >= -1; i--) {  // 注意 i 要能等于 -1
    if (i !== -1 && s[i] !== ' ') {  // 注意当 i === -1 时进入 else 语句
      tmp.push(s[i]);
    }
    else {  // 忘写 else 了...
      let word = tmp.join('');
      stack.push(word, ' ');
      tmp = [];
    }
  }
  stack.pop();
  while (stack.length) {
    tmp.push(stack.pop());
  }
  return tmp.join('');
}

/* 答案      双指针     从前往后遍历
  https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/solution/fan-zhuan-zi-fu-chuan-zhong-de-dan-ci-iii-by-lee-2/
*/
var reverseWords = function(s) {
  const ret = [];
  const length = s.length;
  let i = 0;
  while (i < length) {
      let start = i;
      while (i < length && s.charAt(i) != ' ') {
          i++;
      }
      for (let p = start; p < i; p++) {
          ret.push(s.charAt(start + i - 1 - p));
      }
      while (i < length && s.charAt(i) == ' ') {
          i++;
          ret.push(' ');
      }
  }
  return ret.join('');
};

/* 这题得反复做，做的不熟        答案的代码值得学习，但暂时还没研究，判断条件感觉很难自己想清楚 */
