// https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string/

/* 自己的思路     用栈

  一开始没有理解题目的意思是一次删除 2 个相邻的相等元素，而不是一次删除所有相邻的相等元素 

  若当前元素和栈顶元素相等，则将栈顶元素出栈
  否则，当前元素入栈
*/

/* 答案     和我的思路相同   */

/* 和答案确认思路后，自己写的代码       通过      和答案一样 */
var removeDuplicates = function(s) {
  let stack = [];
  for (let e of s) {
    if (stack[stack.length - 1] === e) {
      stack.pop();
    }
    else stack.push(e);
  }
  return stack.join('');
};
