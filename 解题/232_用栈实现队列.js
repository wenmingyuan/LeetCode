/* 相关题目：225_用队列实现栈 */


/* 自己的思路   通过
  主栈存放元素，辅助栈临时存放元素
  模拟入队操作：
    主栈元素全部出栈，进入辅助栈
    新元素进入主栈
    辅助栈元素全部出栈，进入主栈
  模拟队列其他操作都很简单
*/
/**
 * Initialize your data structure here.
 */
var MyQueue = function() {
  this.mainStack = [];
  this.helpStack = [];
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
  while (this.mainStack.length) {
    this.helpStack.push(this.mainStack.pop());
  }
  this.mainStack.push(x);
  while (this.helpStack.length) {
    this.mainStack.push(this.helpStack.pop());
  }
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
  return this.mainStack.pop();
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
  return this.mainStack[this.mainStack.length - 1];
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
  return !this.mainStack.length;
};


/* 答案的另一种方法  均摊时间复杂度为 O(1)   更优
  思路：
    一个输入栈（存储 push 的元素），一个输出栈（存储要 pop 的元素）
    1. 模拟入队操作：
       若输入栈为空，则 front = 新元素的值（front 在后面取队首元素时要用）
       将新元素压入输入栈
    2. 模拟出队操作：
       若输出栈为空，则将输入栈的全部元素出栈，进入输出栈
       输出栈弹出栈顶元素
    3. 模拟取队首元素操作：
       若输出栈不为空，则返回输出栈栈顶元素
       否则，返回 front
    4. 模拟判空操作：
       若两个栈都为空，则返回 true
       否则，返回 false
  出队的时间复杂度分析：
    0. 主要是出队涉及均摊时间的问题
    1. 当输出栈为空时，出队时间复杂度为 O(n)
       原因：
         输入栈元素全部出栈时间为 O(n)
         全部元素压入输出栈时间为 O(n)
         出队一个元素时间为 O(1)
         因此总时间为 O(2n + 1)，即 O(n)
    2. 当输出栈不为空时，出队时间复杂度为 O(1)
       原因：
         从输出栈出队一个元素的时间为 O(1)
    3. 因此，除了栈为空时，出队时间复杂度为 O(n)，其他时间出队时间复杂度均为 O(1)
       假设从栈为空的状态开始，将输入栈中的元素全部模拟出队
       所需时间是 O(2n + 1 * n) = O(3n)，总出队次数为 n，均摊出队一次时间为 O(3n / n) = O(3)，即 O(1)
  参考：https://leetcode-cn.com/problems/implement-queue-using-stacks/solution/yong-zhan-shi-xian-dui-lie-by-leetcode/
*/


/* 自己理解答案后写的   和 JAVA 代码一样  */
var MyQueue = function() {
  this.inStack = [];
  this.outStack = [];
  this.front;
}
MyQueue.prototype.push = function(x) {
  if (!this.inStack.length) this.front = x;
  this.inStack.push(x);
}
MyQueue.prototype.pop = function() {
  if (!this.outStack.length) {
    while (this.inStack.length) {
      this.outStack.push(this.inStack.pop());
    }
  }
  return this.outStack.pop();
}
MyQueue.prototype.peek = function() {
  if (!this.outStack.length) return this.front;
  else return this.outStack[this.outStack.length - 1];
}
MyQueue.prototype.empty = function() {
  return !this.inStack.length && !this.outStack.length;
}


/* 测试 */
var obj = new MyQueue()
obj.push(1)
obj.push(2)
obj.push(3)
console.log(obj.peek());
console.log(obj.pop());
console.log(obj.pop());
console.log(obj.peek());
console.log(obj.pop());
console.log(obj.empty());
