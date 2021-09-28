// https://leetcode-cn.com/problems/design-linked-list/

/* 自己写的   由于每个函数都不需要返回 head，所以感觉写的很奇怪，选择用 dummy 代替 head 了    通过  */
/**
 * Initialize your data structure here.
 */
var MyLinkedList = function() {
  this.dummy = new ListNode(0);
};

// 一开始结点的定义写错了...   见注释
let ListNode = function(val, next) {
  // this.val === undefined ? 0 : val;
  // this.next === undefined ? null : next;
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
  if (index < 0) return -1;
  let cur = this.dummy;
  for (let i = 0; i <= index; i++) {
    cur = cur.next;
    if (!cur) return -1;
  }
  return cur.val;
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
  this.dummy.next = new ListNode(val, this.dummy.next);
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
  let cur = this.dummy;
  while (cur.next) {
    cur = cur.next;
  }
  cur.next = new ListNode(val);
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
  if (index < 0) {
    this.addAtHead(val);
    return;
  }

  let cur = this.dummy;
  for (let i = 0; i < index; i++) {
    cur = cur.next;
    if (!cur) return;
  }
  let node = new ListNode(val, cur.next);
  cur.next = node;
};

/**
 * Delete the index-th node in the linked list, if the index is valid. 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
  if (index < 0) return;

  let cur = this.dummy;
  for (let i = 0; i < index; i++) {
    cur = cur.next;
    if (!cur.next) return;
  }
  cur.next = cur.next.next;
};

/* 答案和我的区别在于：MyLinkedList 中，除了定义了 dummy 结点（答案代码中的 head 就是 dummy），还定义了链表长度 size
  这样就方便了 addAtIndex() 对于 index 超过链表长度时的判断
  对于特殊情况的判断就可以写成 if (index < 0 || index >= size)
  addAtTail(val) 相当于 addAtIndex(size, val)
  addAtHead(val) 相当于 addAtIndex(0, val) 
  但要注意在 addAtIndex() 和 deleteAtIndex() 函数中维护 size 的变化
  https://leetcode-cn.com/problems/design-linked-list/solution/she-ji-lian-biao-by-leetcode/
*/

/* 答案的设计值得掌握，之后按照答案自己写一遍，暂时先不写了 */

