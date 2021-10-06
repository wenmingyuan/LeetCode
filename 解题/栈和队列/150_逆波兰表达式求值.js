// https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/

/* 自己的思路      题目最下方已经告诉了如何用栈计算逆波兰表达式

    当遇到数字时，将数字入栈
    当遇到操作符时，取出栈中最上方的 2 个元素，先取出为操作符右侧的数，后取出的为操作符左边的数，将计算结果压栈
    最后只剩下一个元素，即为最终结果
*/

/* 答案     和上面写的思路一样 */

/* 确认思路后自己写的         通过        和答案差不多 */
var evalRPN = function(tokens) {
  let stack = [];
  let set = new Set(['+', '-', '*', '/']);

  for (let e of tokens) {
    if (!set.has(e)) {
      stack.push(e - 0);  // 注意将字符串转换成整数类型
    }
    else {
      let rnum = stack.pop();
      let lnum = stack.pop();
      if (e === '+') stack.push(lnum + rnum);
      else if (e === '-') stack.push(lnum - rnum);
      else if (e === '*') stack.push(lnum * rnum);
      else stack.push(Math.trunc(lnum / rnum));  // 一开始只写了 lnum / rnum，但题目要求只保留整数部分...  注意不能用 Math.floor()，因为可能是负数
    }
  }

  return stack[0];
};
