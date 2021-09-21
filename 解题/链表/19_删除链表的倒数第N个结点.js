function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

/* 自己的思路
  ----------------------------------------------
  一趟遍历，将每个结点的指针放入数组
  然后令数组中倒数第 n -1 个元素.next = 第 n + 1 个元素
  另外考虑边界情况
*/
// var removeNthFromEnd = function(head, n) {
//   let arr = [];
//   // let dummy = new ListNode();
//   // dummy.next = head;
//   let dummy = new ListNode(0, head);  // 上面 2 句可以合并成这一句
//   let cur = dummy;
//   while (cur) {
//     arr.push(cur);
//     cur = cur.next;
//   }
//   let pre = arr[arr.length - n - 1];
//   pre.next = pre.next.next;
//   return dummy.next;
// }


/* 自己的另一个思路：双指针（大概因为做过这道题才想到）
  ----------------------------------------------
  dummy 指向 head（创建头结点，方便删除第一个结点的情况）
  pre 指向 dummy
  cur 指向 dummy.next.next... （n + 1 个 .next）
  只要 cur 不为空，循环：
    cur 右移
    pre 右移
  pre.next = pre.next.next
*/
var removeNthFromEnd = function(head, n) {
  // let dummy = new ListNode();
  // dummy.next = head;
  let dummy = new ListNode(0, head);  // 上面 2 句可以合并成这一句
  let pre = dummy, cur = dummy;
  for (let i = 0; i < n + 1; i++) {
    cur = cur.next;  // 写成 cur = dummy.next 了…… 需要细心一些
  }
  while (cur) {
    cur = cur.next;
    pre = pre.next;
  }
  pre.next =  pre.next.next;
  return dummy.next;
}


/* 答案还有一种解法是利用栈
  ----------------------------------------------
  感觉和我想的把所有结点的指针存在数组里差不多
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

let ll = createFirstNode(1);
append(ll, 2);
append(ll, 3);
append(ll, 4);
append(ll, 5);
show(ll);

ll = removeNthFromEnd(ll, 2);
show(ll);