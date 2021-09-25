// https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/

function ListNode(val) {
  this.val = val;
  this.next = null;
}

/* 自己的解法  双指针   通过 */
var getKthFromEnd = function(head, k) {
  let pre = head, cur = pre;  // 一开始写成 cur = head.next.next 了，自己用 k = 2 测试，忘记还原成 k 了...
  for (let i = 0; i < k; i++) {
    cur = cur.next;
  }
  while (cur) {
    cur = cur.next;
    pre = pre.next;
  }
  return pre;
};
