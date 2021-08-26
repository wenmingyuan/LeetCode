function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}


/* 自己写的递归 */
// var reverseList = function(head) {
//   if (!head || !head.next) return head;
//   let newHead = reverseList(head.next);
//   let cur = newHead;
//   while (cur.next) cur = cur.next;
//   cur.next = head;
//   head.next = null;
//   return newHead;
// }


/* 答案的递归 我写麻烦了，根本不需要 while 循环找末尾结点，末尾结点已经有指针指向它了，直接用这个指针就行了 
  参考：https://leetcode-cn.com/problems/reverse-linked-list/solution/fan-zhuan-lian-biao-by-leetcode-solution-d1k2/
*/
// var reverseList = function(head) {
//   if (head == null || head.next == null) {
//       return head;
//   }
//   const newHead = reverseList(head.next);
//   head.next.next = head;
//   head.next = null;
//   return newHead;
// }


/* 根据答案自己优化的递归 和答案一样 */
// var reverseList = function(head) {
//   if (!head || !head.next) return head;
//   let newHead = reverseList(head.next);
//   head.next.next = head;
//   head.next = null;
//   return newHead;
// }


/* 自己写的迭代 */
// var reverseList = function(head) {
//   if (!head) return head;
//   let dummy = new ListNode(0, head);
//   let a = dummy, b = a.next, c = b.next;
//   while (c) {
//     a = b;
//     b = c;
//     c = c.next;
//     b.next = a;
//   }
//   head.next = null;  // 忘记把 head 指向空了...
//   return b;
// }


/* 答案的迭代更简洁 
  参考：https://leetcode-cn.com/problems/reverse-linked-list/solution/fan-zhuan-lian-biao-by-leetcode-solution-d1k2/
  答案比我的简洁的原因：
    把 null 当做一个结点来对待，直接创建一个指针指向 null，这样就和其他结点保持了一致性
    在 while 循环内创建某个指针，我是在循环外先定义了所有指针
    在循环结束时移动指针，我是在循环开始时移动指针
  ---------------------------------------------------------------------------------------------
  思考后发现，如何写出正确顺序的循环体语句，关键在于意识到 b 指针和 c 指针在每次进入循环前，要指向同一个位置！！！
  而我写的代码很可能边界处出错，因为我的想法是让 c 指针永远在 b 指针后面一个位置。
  所以在最后一次进入循环时，b 不为空，c 为空。然后还要将 b 和 c 都向后移一位，这时 c 就会出问题。
  所以正确的做法是：
    确保 b 和 c 在每次进入循环前处于同一个位置
    进入循环后
      先将 c 后移
      题目相关的逻辑.......
      将 b 后移
*/
// var reverseList = function(head) {
//   let a = null;
//   let b = head;
//   while (b) {
//       const c = b.next;
//       b.next = a;
//       a = b;
//       b = c;
//   }
//   return a;
// }


/* 根据答案自己优化的迭代 
  让代码简洁（逻辑清晰）的关键是：
    考虑清楚循环体语句的先后顺序
    仔细思考循环体中的语句是该 放到前面（进入循环就执行）还是 放到后面（循环结束前执行）
    比如 c = c.next，我是应该进入循环时移动指针，还是进入循环后做一些操作，最后再移动指针
    这道题是不应该在循环结束前移动 c 指针的，因为 c 指向空时，无法再向后移动
*/
// var reverseList = function(head) {
//   let a = null, b = head;
//   let c = b;  // 这句其实也可以去掉，参照答案还能优化
//   while (b) {
//     c = c.next;
//     b.next = a;
//     a = b;
//     b = c;
//   }
//   return a;
// }


/* 自己再写一遍迭代 熟练一下 */
var reverseList = function(head) {
  // let a = null, b = head, c = b;  可以把 c 写到循环体中
  let a = null, b = head;
  while (b) {
    // c = c.next;  配合上面的优化
    let c = b.next;
    b.next = a;
    a = b;
    b = c;
  }
  return a;
}


/* 还可以用头插法 理解了头插法后自己写的  和答案一样  头插法也要掌握！在题目 92_反转链表 Ⅱ 中会用到！
  参考：https://leetcode-cn.com/problems/reverse-linked-list/solution/di-gui-by-2359451d-ezo8/
*/
// var reverseList = function(head) {
//   if (!head) return head;
//   let dummy = new ListNode(0, head);
//   let p = head, q = p.next;
//   while (q) {
//     p.next = q.next;
//     q.next = dummy.next;
//     dummy.next = q;
//     q = p.next;
//   }
//   return dummy.next;
// }


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
show(head);

head = reverseList(head);
show(head);
