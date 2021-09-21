function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}


/* 自己没想出来思路，感觉用不了递归，唯一的思路就是先反转两个链表，再将对应结点相加，将新链表再反转得到最终链表  感觉太麻烦了，直接看答案了 */


/* 答案 用栈
  我本来也有想到用 2 个数组把 2 条链表结点的值都保存下来，然后在相加，再反转数组，再创建新链表。
  没有这么做的原因大概是觉得这样太占空间了，总是想着在 O(1) 的空间复杂度内解决问题。看来有时候不可避免要开新空间。
  ---------------------------------------------------------------------------------------------------------------------
  答案和我写的的区别：
    答案没有特意分类讨论哪个是长数组，哪个是短数组，通过对短数组补零，使得两个数组进行加法运算的位数一样多，这段代码相当精彩。
    我把求和的结果覆盖到长数组上了，之后再遍历长数组创建新链表。但答案直接用求和结果创建新链表的结点。我的做法明显是多此一举。
    答案通过 while 循环 配合 pop()。而我是用的 for 循环固定循环次数，并且没有弹栈的操作。答案明显更容易理解一些。
  ---------------------------------------------------------------------------------------------------------------------
  从答案中体悟到：有时候一味地追求效率反而造成理解起来更复杂
                比如我自己没有用补零的方法，一个是不知道怎么实现（现在知道了），另一个是补零后需要进行更多次加法运算
                我的方法可以减少不必要的运算，但是想出这个方法要花不少时间，另外代码写出来也会比较复杂
                再比如我没有用 pop() 弹栈，但答案用了。
                我觉得弹栈需要从数组中删除元素，可能会多花一些时间，所以就不想用 pop()
                但是我的方法其实和栈这个模型就没太大关系了，完全就是操作数组，这也造成了理解起来更复杂。
                所以还是要在保证代码易理解的基础上进行优化，否则代码写的慢，也难理解，唯独时间或空间占用小一点，但得不偿失。
  ---------------------------------------------------------------------------------------------------------------------
  我把下面两个语言的代码结合了一下成为答案
  JAVA 代码参考：https://leetcode-cn.com/problems/add-two-numbers-ii/solution/liang-shu-xiang-jia-ii-by-leetcode-solution/
  JS 代码参考：https://leetcode-cn.com/problems/add-two-numbers-ii/solution/javascriptji-chu-ban-ben-fan-zhuan-lian-biao-he-ji/
*/
var addTwoNumbers = function(l1, l2) {
  let stack1 = [], stack2 = [];
  while (l1) {
    stack1.push(l1.val);
    l1 = l1.next;
  }
  while (l2) {
    stack2.push(l2.val);
    l2 = l2.next;
  }
  let carry = 0;
  let head = null;
  while (stack1.length > 0 || stack2.length > 0 || carry !== 0) {
    let a = stack1.length > 0 ? stack1.pop() : 0;
    let b = stack2.length > 0 ? stack2.pop() : 0;
    let sum = a + b + carry;
    carry = Math.floor(sum / 10);
    let cur = new ListNode(sum % 10);
    cur.next = head;
    head = cur;
  }
  return head;
}


/* 大概知道答案思路后自己写的，写的时候还没看答案代码  通过  自己写的太麻烦了，原因见上面的注释  
*/
let getStack = function(ll) {
  let stack = [];
  while (ll) {
    stack.push(ll.val);
    ll = ll.next;
  }
  return stack;
}
var addTwoNumbers = function(l1, l2) {
  let stack1 = getStack(l1);  // 把链表结点的值都放到数组里
  let stack2 = getStack(l2);
  let longStack, shortStack;  // 看哪个是长数组，哪个是短数组
  if (stack1.length < stack2.length) {
    shortStack = stack1;
    longStack = stack2;
  }
  else {
    shortStack = stack2;
    longStack = stack1;
  }
  let shortLen = shortStack.length, longLen = longStack.length;
  let carrier = 0;  // 进位
  for (let i = 1; i <= shortLen; i++) {  // <= 写成了 <
    let sum = longStack[longLen - i] + shortStack[shortLen - i] + carrier;  // 两个数组从最后一位元素开始，往前直到短数组结束，两个数组对应位置元素相加
    longStack[longLen - i] = sum % 10;  // 个位  直接把 longStack 作为相加后的数组，不需要开辟新空间
    carrier = Math.floor(sum / 10);  // 进位
  }
  if (carrier) {  // 短数组遍历完了如果还有进位
    let index = longLen - shortLen - 1;
    while (longStack[index] === 9) {  // 如果是 9 需要特殊对待，因为之后可能涉及增加一位数，如 9-9 进位变成 1-0-0
      longStack[index] = 0;
      index--;
    }
    if (index === -1) {  // 全是 9 的情况，即 9-9-9，需要添加一位数，不同于 8-9-9
      longStack.unshift(1);
    }
    else longStack[index]++;  // 不全是 9 的情况，如 6-7 或 8-9-9，加 1 即可，不需要添加一位数
  }
  let dummy = new ListNode(0);
  let p = dummy;
  for (let i = 0; i < longStack.length; i++) {  // 把数组变成链表
    p.next = new ListNode(longStack[i]);
    p = p.next;
  }
  return dummy.next;
}


/* 理解答案的代码后自己写的   和答案一样，区别在于答案的头插法更简洁，不需要 dummy
  自己理顺流程：
    1. 把 2 条链表的所有结点的值放到 2 个栈里
    2. 循环以下步骤   循环条件：两个栈不都为空，或进位为 1（最后两个栈都空了，但还要进位的情况）
      (1) 同时对 2 个栈进行弹栈，若一个栈为空，另一个栈不为空，则设定空栈取出的值为 0（为了保持加法运算位数一致）
      (2) sum = val1 + val2 + carry
      (3) 创建结点，结点的值为 sum % 10
      (4) carry = Math.floor(sum / 10)
      (5) 利用头插法将结点串入新链表
    3. 返回新链表的 head
*/
var addTwoNumbers = function(l1, l2) {
  let stack1 = [], stack2 = [];
  while (l1) {
    stack1.push(l1.val);
    l1 = l1.next;
  }
  while (l2) {
    stack2.push(l2.val);
    l2 = l2.next;
  }
  let carry = 0;
  let dummy = new ListNode();
  while (stack1.length || stack2.length || carry) {
    let val1 = stack1.length ? stack1.pop() : 0;
    let val2 = stack2.length ? stack2.pop() : 0;
    let sum = val1 + val2 + carry;
    let node = new ListNode(sum % 10);
    carry = Math.floor(sum / 10);
    node.next = dummy.next;
    dummy.next = node;
  }
  return dummy.next;
}


/* 用递归需要把短链表的前面补 0，保证两条链表长度一样，太麻烦了
  参考：https://leetcode-cn.com/problems/add-two-numbers-ii/solution/cdi-gui-jie-fa-by-naihai/
*/


/* 测试 */
// 创建第一个结点
function createFirstNode(val) {
  return new ListNode(val);
}

// 追加结点
// head 不为空的情况下才能用
// 因为不知道怎么在 head 为空时修改 head，JS 是值传递，除非参数是对象，否则修改不了 head，所以就先用 createFirstNode() 创建结点
function append(head, val) {
  let cur = head;
  while (cur.next) cur = cur.next;
  cur.next = new ListNode(val);
}

// 打印链表
function show(head) {
  let str = '';
  let cur = head;
  while (cur !== null) {
    str = str + '--->' +  cur.val;
    cur = cur.next;
  }
  console.log(str);
}

let l1 = createFirstNode(7);
append(l1, 2);
append(l1, 4);
append(l1, 3);
show(l1);

let l2 = createFirstNode(5);
append(l2, 6);
append(l2, 4);
show(l2);

// let l1 = createFirstNode(0);
// let l2 = createFirstNode(0);

let head = addTwoNumbers(l1, l2);
show(head);
