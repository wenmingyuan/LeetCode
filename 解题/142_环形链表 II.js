function ListNode(val) {
  this.val = val;
  this.next = null;
}


/* 自己的解法 先用空间复杂度 O(n) 的方法做一遍 通过 */
var detectCycle = function(head) {
  let memo = new Map();  // 由于这道题需要获取重复元素的索引，但是 Set 没有索引（但 Set 有序），所以使用 Map
  let index = 0;
  while (head) {  // 小技巧：可以把 head 当做 cur 来用（移动的指针），这样就不用声明 cur 了
    // 返回值应该是 ListNode 类型，我没看题目要求...  那这道题用 Set 也可以，index 就不需要了
    // let pos = memo.get(head);
    // if (pos !== undefined) return pos;
    if (memo.get(head) !== undefined) return head;
    memo.set(head, index++);  // 注意 index++ 和 ++index 不同
    head = head.next;
  }
  return null;
}


/* 答案的空间复杂度 O(1) 的方法
  ------------------------------------------------------------------------------------------------------------------------------------------
  经过数学推导得出的关键结论是：当 slow 和 fast 相遇时，让指针 p 从 head 开始后移，同时 slow 也后移。当 p 和 slow 相遇时，它们指向的结点正是入环点。
  ------------------------------------------------------------------------------------------------------------------------------------------
  感觉自己根本想不出来，需要数学推导
  注意：快指针一开始是指向 head，应该是和数学计算有关，和题目 141_环形链表 不太一样
        141_环形链表 貌似快指针一开始指向 head 或 head.next 都可以。
  参考：https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/huan-xing-lian-biao-ii-by-leetcode-solution/
*/
var detectCycle = function(head) {
  if (head === null) {
      return null;
  }
  let slow = head, fast = head;
  while (fast !== null) {
      slow = slow.next;
      if (fast.next !== null) {
          fast = fast.next.next;
      } else {
          return null;
      }
      if (fast === slow) {
          let ptr = head;
          while (ptr !== slow) {
              ptr = ptr.next;
              slow = slow.next;
          }
          return ptr;
      }
  }
  return null;
}


/* 自己知道答案的主要结论后写的（然而我自己不会推导结论，直接记住了答案的结论）  和答案一样 */
var detectCycle = function(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let p = head;
      while (p !== slow) {
        p = p.next;
        slow = slow.next;
      }
      return p;
    }
  }
  return null;
}
