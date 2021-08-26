function ListNode(val) {
  this.val = val;
  this.next = null;
}

/* 自己的解法 题目的进阶要求是空间复杂度 O(1)，没想出来，先用 O(n) 做 通过了 和答案的哈希表一样 */
// var hasCycle = function(head) {
//   let memo = new Set();
//   let cur = head;
//   while (cur) {
//     if (memo.has(cur)) return true;
//     memo.add(cur);
//     cur = cur.next;
//   }
//   return false;
// }


/* 答案的快慢指针做法 原理是弗洛伊德判圈法 时间复杂度为 O(1)
  思路参考：https://leetcode-cn.com/problems/linked-list-cycle/solution/huan-xing-lian-biao-by-leetcode-solution/
  代码参考：https://leetcode-cn.com/problems/linked-list-cycle/solution/141-huan-xing-lian-biao-you-er-yuan-du-d-tpkp/
*/
var hasCycle = function(head) {
  if (!head) return false;
  let slowp = head,
      fastp = head;
  while (fastp.next !== null && fastp.next.next !== null) {
    slowp = slowp.next;
    fastp = fastp.next.next;
    if (slowp === fastp) {
      return true;
    }
  }
  return false;
}


/* 自己理解了快慢指针后写的 和答案差不多 */
var hasCycle = function(head) {
  if (!head) return false;
  let slow = head, fast = head.next;  // 假设快慢指针都从虚拟头结点出发，保持逻辑一致性
  while (fast && fast.next) {  // 快指针每次走两步，所以判断是否为空需要两个条件
    if (slow === fast) return true;
    slow = slow.next;
    fast = fast.next.next;
  }
  return false;
}
