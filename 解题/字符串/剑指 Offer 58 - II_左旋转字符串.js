// https://leetcode-cn.com/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/

/* 自己的思路        和答案一样
    遍历字符串后半部分，将每个字符放入数组中
    再遍历字符串前半部分，将每个字符放入数组中
    最后将数组转换成字符串 
*/
var reverseLeftWords = function(s, n) {
  let len = s.length;
  let arr = [];
  for (let i = n; i < len; i++) {
    arr.push(s[i]);
  }
  for (let i = 0; i < n; i++) {
    arr.push(s[i]);
  }
  return arr.join('');
};
