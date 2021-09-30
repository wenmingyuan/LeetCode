function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}


/* 自己的思路 快慢指针  通过  和答案一样
  初始时，让指针 pre 和 cur 同时指向链表第一个结点。
  让它们同时向后移动，cur 的移动速度是 pre 的 2 倍。
  当 cur 指向 null（有 2 个中间结点的情况） 或 cur.next 指向 null 时（有 1 个中间结点的情况），返回 pre

  这种做法是让快慢指针初始都指向第一个结点，如果有 2 个中间结点，返回的是中间偏后的结点
  如 [1,2,3,4,5,6]，返回的是 4

  或者可以使用 dummy 结点，如果有 2 个中间结点，返回的是中间偏前的结点
  如 [1,2,3,4,5,6]，返回的是 3
*/
var middleNode = function(head) {
  let pre = head, cur = head;
  while (cur && cur.next) {
    pre = pre.next;
    cur = cur.next.next;
  }
  return pre;
}
