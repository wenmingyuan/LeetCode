/* 自己的思路  和答案一样，区别在答案的 minArr 第一个元素是无穷大，避免了栈为空时，最小值为 undefined 导致无法比较数字大小的情况
  在常数时间内检索到最小元素的思路：再建一个数组，存当前元素到栈底之间的最小值
  答案代码：https://leetcode-cn.com/problems/min-stack/solution/zui-xiao-zhan-by-leetcode-solution/
*/
/**
 * initialize your data structure here.
 */
var MinStack = function() {
  this.arr = [];
  this.minArr = [];
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
  this.arr.push(val);
  let minVal = this.minArr[this.minArr.length - 1];
  if (minVal === undefined) {
    this.minArr.push(val);
  }
  else this.minArr.push(Math.min(val, minVal));
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  this.arr.pop();
  this.minArr.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  return this.arr[this.arr.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  return this.minArr[this.minArr.length - 1];
};


/* 答案 还是用 2 个栈 可以在上面的思路的基础上优化辅助栈的空间
  思路：
    每次入栈时，若入栈元素 <= 辅助栈栈顶元素，则元素也进入辅助栈
    每次出栈时，若出栈元素 === 辅助栈栈顶元素，则辅助栈栈顶元素也出栈
  参考：https://leetcode-cn.com/problems/min-stack/solution/qing-xi-hao-dong-jie-shi-wei-shi-yao-xu-yao-wei-hu/
*/
var MinStack = function () {
  this.stack = []
  this.min_stack = []
};
MinStack.prototype.push = function (x) {
  this.stack.push(x)
  if (x <= this.getMin() || this.min_stack.length == 0) {
    this.min_stack.push(x)
  }
};
MinStack.prototype.pop = function () {
  let out = this.stack.pop()
  if (this.getMin() == out) {
    this.min_stack.pop()
  }
};
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1]
};
MinStack.prototype.getMin = function () {
  return this.min_stack[this.min_stack.length - 1]
};


/* 答案 只用 1 个栈
  思考：
    如果只用一个栈，并且用一个变量 min 来存储最小值，在元素出栈时会产生问题：
    若出栈的是最小值元素，min 无法在 O(1) 时间内找到曾经的最小值。
    所以需要将曾经的最小值一并放入栈中。
  思路：
    用 min 存储当前的最小值
    当入栈元素 <= min 时，先将 min 的值入栈，再将新元素入栈，然后更新 min。
    当出栈元素 === min 时，连续弹栈 2 次，并将 min 更新为第 2 次弹栈的元素
  没找着 JS 代码，自己仿照 JAVA 写了一下
  JAVA 代码参考：https://leetcode-cn.com/problems/min-stack/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-38/
*/
var MinStack = function() {
  this.arr = [];
  this.min = Infinity;  // JS 中的正无穷，用来保持操作的一致性
}
MinStack.prototype.push = function(val) {
  if (val <= this.min) {  // 忘写等于了
    // this.arr.push(this.min, val);  // 和 else 合并
    this.arr.push(this.min);
    this.min = val;
  }
  // else this.arr.push(val);  // 和 if 合并
  this.arr.push(val);  // 合并 if, else 共有部分
}
MinStack.prototype.pop = function() {
  if (this.arr.pop() === this.min) {
    this.min = this.arr.pop();
  }
}
MinStack.prototype.top = function() {
  return this.arr[this.arr.length - 1];
}
MinStack.prototype.getMin = function() {
  return this.min;
}


/* 还可以用 差值法 进一步优化 1 个栈的做法  貌似要处理整数溢出的情况，这里不写了
  参考：https://leetcode-cn.com/problems/min-stack/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-38/
*/


/* 另外这道题还可以用链表的头插法实现栈
  定义链表结点时除了 val 和 next，再定义一个 min 存储当前的最小值
  思路和我自己写的差不多，只不过用链表实现
  另外了解到链表的头插法可以实现栈，尾插法可以实现队列
  参考：
    https://leetcode-cn.com/problems/min-stack/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-38/
    https://blog.csdn.net/weixin_46528376/article/details/112686485
*/


/* 测试 */
var obj = new MinStack();
obj.push(2);
obj.push(3);
obj.push(1);
obj.push(2);
// obj.pop();
// console.log(obj.top());
// obj.pop();
// console.log(obj.top());
console.log(obj.getMin());
