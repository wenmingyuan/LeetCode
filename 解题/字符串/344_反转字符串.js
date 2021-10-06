// https://leetcode-cn.com/problems/reverse-string/

/* 最近重写了一遍 */

/* 自己的思路     双指针     通过     和答案一样 */
var reverseString = function(s) {
  let i = 0, j = s.length - 1;
  while (i < j) {
    let tmp = s[i];
    s[i] = s[j];
    s[j] = tmp;
    i++;  // 忘写了...
    j--;  // 忘写了...
  }
  // 这道题没有返回值
}
