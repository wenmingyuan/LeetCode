// https://leetcode-cn.com/problems/reverse-words-in-a-string/

/* 自己的思路     感觉要遍历很多次...   看答案了
  1. 把所有的空格变成单个空格
  2. 去除最前面和最后面的空格
  3. 把单词顺序反转
*/

/* 答案   调用 API
  1. 先用 trim() 去除字符串开头和末尾的空格
  2. 再用 split(/\s+/) 把字符串变成数组
  3. 反转数组
  4. 用空格拼接数组元素为字符串
  参考：https://leetcode-cn.com/problems/reverse-words-in-a-string/solution/fan-zhuan-zi-fu-chuan-li-de-dan-ci-by-leetcode-sol/
*/
var reverseWords = function(s) {
  return s.trim().split(/\s+/).reverse().join(' ');
};

/* 理解答案后自己写的    注意 split(/\s+/) 不应该加引号   */
var reverseWords = function(s) {
  return s.trim().split(/\s+/).reverse().join(' ');
}

/* 答案   双指针
  思路：
    1. 右指针和左指针都指向字符串末尾
    2. 右指针从后向前遍历字符串，当右指针指向的字符不为空格时，左指针指向右指针，结束遍历
    3. 左指针从后向前遍历字符串，当左指针指向的字符为空格时，将 s[left + 1: right + 1] + 空格 拼接到结果字符串，右指针指向左指针，结束遍历
    4. 回到 2
  参考：https://leetcode-cn.com/problems/reverse-words-in-a-string/solution/151-fan-zhuan-zi-fu-chuan-li-de-dan-ci-j-zle0/
*/
var reverseWords = function(s) {
  let r = s.length - 1, l = r, res = "";

  while (l >= 0) {
      //先找到单词的尾部
      while (s[r] === " ") {
          r--;
      }
      l = r;
      //给上次单词加空格，排除第一次
      if (l >= 0 && res) {
          res += " ";
      }
      //再找到单词的头部
      while (s[l] && s[l] !== " ") {
          l--;
      }
      //遍历单词并添加
      for (let i = l + 1, j = r; i <= j; i++) {
          res += s[i];
      }
      //跳到下一个单词
      r = l;
  }

  return res;
}

/* 没太看懂答案代码 ，大概理解答案后自己写的  通过 
  思路和上面写的差不多，考虑了 2 种特殊情况，作为循环终止条件：字符串开头有连续空格   字符串开头没有空格
*/
var reverseWords = function(s) {
  let right = s.length - 1, left = right;
  let result = '';

  while (right !== -1) {  // left, right 指向同一个地方，判断一个就行
    while (s[right] === ' ' && right !== -1) right--;
    left = right;
    
    while (s[left] !== ' ' && left !== -1) left--;
    if (result && left !== right)  result += ' ';  // result 的第一个单词前不加空格，left === right 时（都等于 -1）不加空格
    for (let i = left + 1; i < right + 1; i++) {  // 相当于 substring()
      result += s[i];
    }
    right = left;
  }

  return result;
}
