function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}


/* 这道题可配合 328_奇偶链表 一起做 */
/* 自己的思路 感觉条件判断太难写了  花了 2 个小时，代码逻辑总感觉很繁琐  居然通过了
*/
var partition = function(head, x) {
  if (!head) return null;
  let dummyP = new ListNode(0, head);
  let dummyQ = new ListNode(0, head);
  let p = dummyP, q = dummyQ;
  while (true) {
    while (p.next && p.next.val < x) p = p.next;
    q.next = p.next;
    q = q.next;
    if (!p.next) {
      p.next = dummyQ.next;
      return dummyP.next;
    }
    while (q.next && q.next.val >= x) q = q.next;
    if (!q.next) {
      p.next = dummyQ.next;
      return dummyP.next;
    }
    p.next = q.next;
    p = p.next;
  }
}


/* 答案和我的思路类似（模拟法），但是实现很简单，原因是答案多使用了一个指针 head（相当于 cur）！
  感觉我把整个过程复杂化了，没有看到本质！
  这道题的本质就是：
    构造一小一大 2 个链表
    遍历原链表
      每遇到一个结点就把它串到一条构造的链表的末尾（根据它的值的大小判断串到哪一条链表上）
    把大链表接到小链表后面
  动画可参考：https://leetcode-cn.com/problems/partition-list/solution/yi-miao-jiu-neng-kan-dong-de-dong-hua-xi-dubr/
  代码参考：https://leetcode-cn.com/problems/partition-list/solution/fen-ge-lian-biao-by-leetcode-solution-7ade/
*/
var partition = function(head, x) {
  let small = new ListNode(0);
  const smallHead = small;
  let large = new ListNode(0);
  const largeHead = large;
  while (head !== null) {
      if (head.val < x) {
          small.next = head;
          small = small.next;
      } else {
          large.next = head;
          large = large.next;
      }
      head = head.next;
  }
  large.next = null;
  small.next = largeHead.next;
  return smallHead.next;
}


/* 理解答案后自己写的 和答案一样 */
var partition = function(head, x) {
  let dummySmall = new ListNode(0);
  let dummyLarge = new ListNode(0);
  let small = dummySmall, large = dummyLarge;
  while (head) {
    if (head.val < x) {
      small.next = head;
      small = small.next;
    }
    else {
      large.next = head;
      large = large.next;
    }
    head = head.next;  // 忘写这句了...
  }
  large.next = null;
  small.next = dummyLarge.next;
  return dummySmall.next;
}


/* 总结经验：
  图一定要画的简洁、清楚！
  有些时候链表不要按题目中的画，那不适合发现规律，画成易于理解的形式比较好  
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

let head = createFirstNode(1);
append(head, 4);
append(head, 3);
append(head, 2);
append(head, 5);
append(head, 2)
show(head);

head = partition(head, 3);
show(head);
