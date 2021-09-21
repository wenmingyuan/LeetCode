function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

/* 我的思路 和答案中的迭代法一样
  ---------------------------------------------------------------------------------------
  原地合并链表，不再占用新的空间
  要画图理解
  ---------------------------------------------------------------------------------------
  创建头结点 dummy，保持第一个结点与其他结点操作的一致性
  用 cur 指向合成链表的最后一个结点，l1 已经指向链表1的第一个结点，l2 已经指向链表2的第一个结点
  只要 l1, l2 都不为空，循环：
    cur.next = l1.val 和 l2.val 中较小的那一个结点
    cur 后移
    l1.val 和 l2.val 中较小的那一个结点的指针后移
  若 l1 为空，则 cur.next = l2
  若 l2 为空，则 cur.next = l1
  返回合成链表的第一个结点
*/
// var mergeTwoLists = function(l1, l2) {
//   let dummy = new ListNode();
//   let cur = dummy;
//   while (l1 && l2) {
//     cur.next = l1.val < l2.val ? l1 : l2;
//     cur = cur.next;
//     l1.val < l2.val ? l1 = l1.next : l2 = l2.next;
//   }
//   cur.next = !l1 ? l2 : l1;
//   return dummy.next;
// }


/* 答案：递归
  ---------------------------------------------------------------------------------------
  参考：https://leetcode-cn.com/problems/merge-two-sorted-lists/solution/hua-jie-suan-fa-21-he-bing-liang-ge-you-xu-lian-bi/
*/
// var mergeTwoLists = function(l1, l2) {
//   if(l1 === null){
//       return l2;
//   }
//   if(l2 === null){
//       return l1;
//   }
//   if(l1.val < l2.val){
//       l1.next = mergeTwoLists(l1.next, l2);
//       return l1;
//   }else{
//       l2.next = mergeTwoLists(l1, l2.next);
//       return l2;
//   }
// }


/* 看了递归解法后自己写的 和答案一样 */
var mergeTwoLists = function(l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  }
  else {
    l2.next = mergeTwoLists(l2.next, l1);
    return l2;
  }
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

let l1 = createFirstNode(1);
append(l1, 2);
append(l1, 4);
show(l1);

let l2 = createFirstNode(1);
append(l2, 3);
append(l2, 4);
show(l2);

// let l1 = createFirstNode(0);
// show(l1);

// let l2 = null;
// show(l2);

let l3 = mergeTwoLists(l1, l2);
show(l3);
