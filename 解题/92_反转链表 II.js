function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}


/* 自己的解法 采用了类似于题目 206_反转链表的做法 写了两个半小时... 写的比较复杂 竟然通过了
  还是要熟练 反转链表 的思路
  感觉好难确定循环体中某些语句是写在开头还是结尾，需要加强练习。
  ------------------------------------------------------------------------------------------
  这道题实际上不需要 while 循环，用 for 循环即可，因为循环次数是固定的
*/
// var reverseBetween = function(head, left, right) {
//   if (left === right) return head;

//   let a = null, b = head, c = b;
//   let index = 1;
//   let l;  // l 代表指向 left 位置的指针

//   while (c) {
//     c = c.next;
//     if (index === left) {
//       b.next = a;
//       l = b;
//     }
//     else if (index === right) {
//       b.next = a;
//       if (l.next) l.next.next = b ;
//       else head = b;
//       l.next = c;
//       return head;
//     }
//     else if (index > left) {
//       b.next = a;
//     }
//     a = b;
//     b = c;
//     index++;
//   }
// }


/* 回头可以找找上面自己的做法有没有别人用，参考别人的再改改 */


/* 答案 头插法 
  参考：https://leetcode-cn.com/problems/reverse-linked-list-ii/solution/fan-zhuan-lian-biao-ii-by-leetcode-solut-teyq/
*/
// var reverseBetween = function(head, left, right) {
//   // 设置 dummyNode 是这一类问题的一般做法
//   const dummy_node = new ListNode(-1);
//   dummy_node.next = head;
//   let pre = dummy_node;
//   for (let i = 0; i < left - 1; ++i) {
//       pre = pre.next;
//   }
//   let cur = pre.next;
//   for (let i = 0; i < right - left; ++i) {
//       const next = cur.next;
//       cur.next = next.next;
//       next.next = pre.next;
//       pre.next = next;
//   }
//   return dummy_node.next;
// }


/* 自己理解了头插法后写的
  还是花了很长时间才写出来，还是在循环体内语句的顺序上思考了很长时间，还是不熟练。
  我的代码可以优化的地方：
    不必在第一个循环前创建 b 指针，在第一个循环结束后创建即可
    可以考虑把第二个循环前创建 c 指针的语句放到循环体内，不过要调整一下语句的顺序
*/
// var reverseBetween = function(head, left, right) {
//   let dummy = new ListNode(0, head);
//   let a = dummy, b = a.next;
//   for (let i = 1; i < left; i++) {
//     a = b;
//     b = b.next;
//   }
//   let c = b.next;
//   for (let i = 0; i < right - left; i++) {
//     b.next = c.next;
//     c.next = a.next;
//     a.next = c;
//     // c = c.next;  // 这句有问题，c.next 已经不是我想象的后面的结点了
//     c = b.next;
//   }
//   return dummy.next;
// }


/* 答案：两次遍历 
  参考：https://leetcode-cn.com/problems/reverse-linked-list-ii/solution/fan-zhuan-lian-biao-ii-by-leetcode-solut-teyq/
*/
// var reverseBetween = function(head, left, right) {
//   // 因为头节点有可能发生变化，使用虚拟头节点可以避免复杂的分类讨论
//   const dummyNode = new ListNode(-1);
//   dummyNode.next = head;
//   let pre = dummyNode;
//   // 第 1 步：从虚拟头节点走 left - 1 步，来到 left 节点的前一个节点
//   // 建议写在 for 循环里，语义清晰
//   for (let i = 0; i < left - 1; i++) {
//       pre = pre.next;
//   }
//   // 第 2 步：从 pre 再走 right - left + 1 步，来到 right 节点
//   let rightNode = pre;
//   for (let i = 0; i < right - left + 1; i++) {
//       rightNode = rightNode.next;
//   }
//   // 第 3 步：切断出一个子链表（截取链表）
//   let leftNode = pre.next;
//   let curr = rightNode.next;
//   // 注意：切断链接
//   pre.next = null;
//   rightNode.next = null;
//   // 第 4 步：同第 206 题，反转链表的子区间
//   reverseLinkedList(leftNode);
//   // 第 5 步：接回到原来的链表中
//   pre.next = rightNode;
//   leftNode.next = curr;
//   return dummyNode.next;
// }
// // 这个是要被上面函数调用的函数
// const reverseLinkedList = (head) => {
//   let pre = null;
//   let cur = head;
//   while (cur) {
//       const next = cur.next;
//       cur.next = pre;
//       pre = cur;
//       cur = next;
//   }
// }


/* 自己写的两次遍历 和答案一样 有一点区别在于答案的 reverseList() 没有返回值，实际上也不需要返回值 */
var reverseBetween = function(head, left, right) {
  // 将链表拆成 3 部分
  let dummy = new ListNode(0, head);
  let start = dummy;  // start 是 left 位置的前一结点
  for (let i = 1; i < left; i++) start = start.next;
  let p = start.next, q = p;  // p 指向 left 位置结点，q 之后要指向 right 位置结点
  for (let i = 0; i < right - left; i++) q = q.next;
  let end = q.next;  // end 是 right 位置的后一结点
  start.next = null;
  q.next = null;
  // 反转中间部分的链表
  q = reverseList(p);  // 第一遍写成 let q 了，注意不要再写一遍 let
  // 将 3 部分链表合并
  start.next = q;
  p.next = end;
  // 返回结果
  return dummy.next;
}
// 把自己写的 206_反转链表 直接拿过来用
var reverseList = function(head) {
  let a = null, b = head;
  while (b) {
    let c = b.next;
    b.next = a;
    a = b;
    b = c;
  }
  return a;
}


/* 还可以用递归，暂时先不搞了 */


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
append(head, 5);

head = reverseBetween(head, 2, 4);
show(head);
