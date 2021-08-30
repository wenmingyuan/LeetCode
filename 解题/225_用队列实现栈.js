/* 自己的思路    和答案差不多
  用主队列保存元素，辅助队列用来临时存放元素
  模拟新元素的入栈操作：
    让该元素进入辅助队列
    将主队列中的所有元素出队，全部进入辅助队列
    将辅助队列中的全部元素出队，全部进入主队列
    至此，主队列的队首元素即是新元素，实现了后进先出
  模拟其他几种栈的操作都很简单了
  参考：https://leetcode-cn.com/problems/implement-stack-using-queues/solution/yong-dui-lie-shi-xian-zhan-by-leetcode-solution/
*/
/**
 * Initialize your data structure here.
 */
var MyStack = function() {
  this.mainQueue = [];
  this.helpQueue = [];
};

/**
 * Push element x onto stack. 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
  this.helpQueue.push(x);
  while (this.mainQueue.length) {  // 一开始条件没加 .length，没加的话条件一直是 true！
    this.helpQueue.push(this.mainQueue.shift());
  }
  while (this.helpQueue.length) {  // 这里也可以直接交换 2 个队列
    this.mainQueue.push(this.helpQueue.shift());
  }
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function() {
  return this.mainQueue.shift();
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function() {
  return this.mainQueue[0];
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
  // if (this.mainQueue.length) return false;
  // else return true;
  // 可以简写成下面代码
  return !this.mainQueue.length;
};


/* 答案  只用一个队列也可以实现栈
  思路：
    模拟新元素入栈：
      统计队列中元素个数
      将新元素入队
      把队列中除了新元素的所有元素依次 出队后入队（使用 for 循环，出队次数是之前统计的元素个数）
    模拟其他栈的操作都很简单。
  参考：https://leetcode-cn.com/problems/implement-stack-using-queues/solution/yong-dui-lie-shi-xian-zhan-by-leetcode-solution/
*/


/* 测试 */
var obj = new MyStack()
obj.push(1)  // 测试的时候写成 obj.push(1,2,3) 了，发现结果不对，原因是 push() 是自己写的函数，只接收一个参数...
obj.push(2)
obj.push(3)
console.log(obj.pop());
console.log(obj.pop());
// console.log(obj.pop());
console.log(obj.top());
console.log(obj.empty());
