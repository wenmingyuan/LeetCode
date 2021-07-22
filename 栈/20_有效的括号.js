// 我的思路：
// 1. 创建栈
// 2. 从左至右遍历字符串，
//      若当前字符是左括号，则压栈；
//      若为右括号，则比较该右括号是否与栈顶元素匹配
//        若匹配，则弹出栈顶元素，进行下一轮循环
//        若不匹配，则返回false
// 3. 最后判断栈是否为空
//      若为空，则返回true
//      若不为空，则返回false（左括号过多，没有相应右括号的情况）

var isValid = function(s) {
  var stack = new Array();
  for (var i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
      stack.push(s[i]);
    } else {
      top = stack.pop();
      if ((top === '(' && s[i] === ')') || (top === '{' && s[i] === '}') || (top === '[' && s[i] === ']')) {
        continue;
      } else {
        return false;
      }
    }
  }
  if (stack.length === 0) {
    return true;
  } else {
    return false;
  }
};

s = '()[]{()'
console.log(isValid(s));

// 根据博客改写：
// 1. 若字符串长度是奇数，则直接返回false，节省时间
// 2. 把else中的嵌套改成多个else if，结构更清晰
// 3. 可以先取栈顶元素（用stack[stack.length - 1]），再弹栈
// 4. 最后的if else可以简化，因为数字可以通过加上!或!!变成布尔变量
var isValid = function(s) {
  if (s.length % 2) {
    return false;
  }
  var stack = new Array();
  for (var i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
      stack.push(s[i]);
    }
    else if (stack[stack.length - 1] === '(' && s[i] === ')') {
      stack.pop();
    }
    else if (stack[stack.length - 1] === '{' && s[i] === '}') {
      stack.pop();
    }
    else if (stack[stack.length - 1] === '[' && s[i] === ']') {
      stack.pop();
    }
    else {
      return false;
    }
  }
  return !stack.length;
};


// 答案使用了Map：
var isValid = function(s) {
  const n = s.length;
  if (n % 2 === 1) {
      return false;
  }
  const pairs = new Map([
      [')', '('],
      [']', '['],
      ['}', '{']
  ]);
  const stk = [];
  for (let ch of s){
      if (pairs.has(ch)) {
          if (!stk.length || stk[stk.length - 1] !== pairs.get(ch)) {
              return false;
          }
          stk.pop();
      } 
      else {
          stk.push(ch);
      }
  };
  return !stk.length;
};
