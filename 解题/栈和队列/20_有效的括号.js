// https://leetcode-cn.com/problems/valid-parentheses/

/* 我的思路
  -------------------------------------------------------
  创建栈
  遍历字符串中的字符
    若是左括号，则进栈
    若是右括号，则比较其与栈顶元素是否匹配
      若匹配，则弹出栈顶元素
      若不匹配，则返回 false
  若栈为空，则返回 true
  若栈不为空，则返回 false  
*/
// var isValid = function(s) {
//   let stack = [];
//   for (let i = 0; i < s.length; i++) {
//     if (s[i] === '(' || s[i] === '{' || s[i] === '[') stack.push(s[i]);  // 是 push()，而不是 push[] !!!
//     else if (s[i] === ')') {
//       if (stack[stack.length - 1] === '(') stack.pop();
//       else return false;
//     }
//     else if (s[i] === '}') {
//       if (stack[stack.length - 1] === '{') stack.pop();
//       else return false;
//     }
//     else if (s[i] === ']') {
//       if (stack[stack.length - 1] === '[') stack.pop();
//       else return false;
//     }
//   }
//   // return !stack; // 这里写 !stack 是不对的，会一直是 false
//   return !stack.length;
// }

/* 优化自己写的代码，把 return false 合并 */
// var isValid = function(s) {
//   let stack = [];
//   for (let i = 0; i < s.length; i++) {
//     if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
//       stack.push(s[i]);
//     }
//     else if (s[i] === ')' && stack[stack.length - 1] === '(') {
//       stack.pop();
//     }
//     else if (s[i] === '}' && stack[stack.length - 1] === '{') {
//       stack.pop();
//     }
//     else if (s[i] === ']' && stack[stack.length - 1] === '[') {
//       stack.pop();
//     }
//     else return false;
//   }
//   return !stack.length;
// }

/* 答案使用了 Map，并首先判断 s.length 是否为奇数
  参考：https://leetcode-cn.com/problems/valid-parentheses/solution/you-xiao-de-gua-hao-by-leetcode-solution/
*/
// var isValid = function(s) {
//   const n = s.length;
//   if (n % 2 === 1) {
//       return false;
//   }
//   const pairs = new Map([
//       [')', '('],
//       [']', '['],
//       ['}', '{']
//   ]);
//   const stk = [];
//   for (let ch of s){
//       if (pairs.has(ch)) {
//           if (!stk.length || stk[stk.length - 1] !== pairs.get(ch)) {
//               return false;
//           }
//           stk.pop();
//       } 
//       else {
//           stk.push(ch);
//       }
//   };
//   return !stk.length;
// }

/* 自己看了答案后写的 */
var isValid = function(s) {
  if (s.length % 2) return false;
  let map = new Map();
  map.set('(', ')');
  map.set('{', '}');
  map.set('[', ']');
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    // 如果是左括号，就将它对应的右括号入栈
    if (map.has(s[i])) stack.push(map.get(s[i]));  // map.has(key) 判断 map 中是否存在 key，map.get(key) 获取 key 对应的 value
    // 如果是右括号，分两种情况：
    // 1. 它和栈顶元素相同，那么就出栈
    else if (s[i] === stack[stack.length - 1]) stack.pop();
    // 2. 它和栈顶元素不同（包括栈为空的情况，stack[-1] 是 undefined，不会报错），返回 false
    else return false;
  }
  return !stack.length;
}


/* 测试 */
let s = '()';
console.log(isValid(s));
