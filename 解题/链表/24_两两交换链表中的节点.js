function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

/* 自己的解法：递归 */
// var swapPairs = function(head) {
//   if (!head) return null;  // 当 head === null 的特殊情况，直接返回 null 
//   let newHead = head.next;
//   if (!newHead) return head;  // 终止条件 奇数个结点的情况
//   let bak = head.next.next;  // 备份指针，防止后面找不到这个结点
//   newHead.next = head;
//   // 第一遍写的时候这里写错了，head.next.next 还是 head！所以会无限递归下去！
//   // if (!head.next.next) {  // 终止条件
//   if (!bak) {  // 终止条件
//     head.next = null;
//     return newHead;
//   }
//   head.next = swapPairs(bak);
//   return newHead;
// }


/* 答案 递归 比我的代码简洁 应该学习 
  参考：https://leetcode-cn.com/problems/swap-nodes-in-pairs/solution/liang-liang-jiao-huan-lian-biao-zhong-de-jie-di-91/
*/
// var swapPairs = function(head) {
//   if (head === null|| head.next === null) {  // 我写了 3 个终止条件，实际上可以合并成这一句
//       return head;
//   }
//   const newHead = head.next;
//   head.next = swapPairs(newHead.next);  // 我没必要备份指针的，因为最后做 newHead.next = head 这一步就行了
//   newHead.next = head;
//   return newHead;
// }


/* 自己按照答案再写一遍 */
// var swapPairs = function(head) {
//   if (!head || !head.next) return head;  // 注意 !head 和 !head.next 的顺序不能写反，因为有可能 head === null，那么 head.next 就会报错（短路操作符是从左往右运算）
//   let newHead = head.next;
//   head.next = swapPairs(newHead.next);
//   newHead.next = head;
//   return newHead;
// }


/* 自己没想到用非递归方法，知道可以用迭代法后自己写的 */
// var swapPairs = function(head) {
//   if (!head || !head.next) return head;  // head 为 null 或 链表只有 1 个结点
//   let newHead = head.next;
//   let dummy2 = new ListNode(0, head);
//   let dummy1 = new ListNode(0, dummy2);
//   let pre = dummy1, cur = head;
//   while (cur) {
//     pre = cur;
//     cur = cur.next.next;
//     pre.next.next = pre;
//     if (!cur || !cur.next) {  // 终止条件 或 结点为奇数时的终止条件
//       pre.next = cur;
//       return newHead;
//     }
//     else pre.next = cur.next;
//   }
//   return newHead;
// }


/* 答案 迭代 比自己的方法要简单 值得学习 
  参考：https://leetcode-cn.com/problems/swap-nodes-in-pairs/solution/liang-liang-jiao-huan-lian-biao-zhong-de-jie-di-91/
  流程图可参考：https://leetcode-cn.com/problems/swap-nodes-in-pairs/solution/24-liang-liang-jiao-huan-lian-biao-zhong-2kiy/
*/
// var swapPairs = function(head) {
//   const dummy = new ListNode(0);
//   dummy.next = head;
//   let p = dummy;
//   while (p.next !== null && p.next.next !== null) {
//       const a = p.next;
//       const b = p.next.next;
//       p.next = b;
//       a.next = b.next;
//       b.next = a;
//       p = a;
//   }
//   return dummy.next;
// }


/* 自己看了答案后写的迭代 */
// var swapPairs = function(head) {
//   if (!head) return head;
//   let dummy = new ListNode(0, head);
//   let p = dummy, a = p.next, b = a.next;  // 不应该在这里赋值
//   while (a && b) {
//     p.next = b;
//     a.next = b.next;
//     b.next = a;
//     p = a;
//     // 和答案相比，下面我写的逻辑是混乱的
//     a = a.next;
//     if (!a) return dummy.next;
//     b = a.next;
//     if (!b) return dummy.next;
//   }
//   return dummy.next;
// }


/* 理解答案后优化自己的迭代 和答案一样 */
var swapPairs = function(head) {
  let dummy = new ListNode(0, head);
  let p = dummy;
  while (p.next && p.next.next) {
    let a = p.next;
    let b = a.next;
    p.next = b;
    a.next = b.next;
    b.next = a;
    p = a;
  }
  return dummy.next;
}


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

let head = createFirstNode(1);
append(head, 2);
append(head, 3);
append(head, 4);
head = swapPairs(head);
show(head);
