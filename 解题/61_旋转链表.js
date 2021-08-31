function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}


/* 自己的思路   一开始没通过   修改后通过了
  ------------------------------------------------------------------------------------------------------------------------------
  没通过原因：
    pre === cur 时我的代码会有问题（即 k 能整除 length 时）
    我一开始写的时候只注意到 k === 0 时 pre 和 cur 会相等
  ------------------------------------------------------------------------------------------------------------------------------
  思路：
      1. 设置 dummy 结点，pre 和 cur 指针指向 dummy
      2. 用 cur 指针遍历链表，当 cur.next === null 时停止（之后要用 cur），最终获得链表长度 length
      3. pre 向后移动 length - k % length 个位置
      4. newHead 指针指向 pre.next
         pre.next = null  （从 pre 后面断开链表）
         cur.next = head  （连接链表）
      5. 返回 newHead
*/
var rotateRight = function(head, k) {
  if (!head) return null;
  // if (!k) return head;   删除这句
  let dummy = new ListNode(0, head);
  let pre = dummy, cur = dummy;
  let length = 0;
  while (cur.next) {
    length++;
    cur = cur.next;
  }
  if (k % length === 0) return head;  // 添加这句    k 能整除 length 时，不需要任何操作
  for (let i = 0; i < length - k % length; i++) {
    pre = pre.next;
  }
  let newHead = pre.next;
  pre.next = null;
  cur.next = head;
  return newHead;
}


/* 答案   和我的思路差不多，但是更加清晰
  答案的思路是：先将链表连成环，再断开链表
  ----------------------------------------------------------------------------------------------------------
  其实这就是这道题的本质：先构造环形链表，再找到合适的位置断开链表！这就是对旋转链表的直观理解！
  ----------------------------------------------------------------------------------------------------------
  而我处理指针的指向时，先后顺序有些随意
  答案没有用到 pre 指针，因为将链表连成环后，cur 就可以当做 pre 来用
  参考：https://leetcode-cn.com/problems/rotate-list/solution/xuan-zhuan-lian-biao-by-leetcode-solutio-woq1/
*/
var rotateRight = function(head, k) {
  if (k === 0 || !head || !head.next) {
      return head;
  }
  let n = 1;
  let cur = head;
  while (cur.next) {
      cur = cur.next;
      n++;
  }
  let add = n - k % n;
  if (add === n) {
      return head;
  }
  cur.next = head;  // 答案先将链表连成了环
  while (add) {
      cur = cur.next;  // 答案直接用已有的 cur 代替了我的 pre
      add--;
  }
  const ret = cur.next;
  cur.next = null;
  return ret;
}


/* 测试 */
/* 根据数组创建链表 */
function createList(arr) {
  let dummy = new ListNode(0);
  let cur = dummy;
  for (let i = 0; i < arr.length; i++) {
    let node = new ListNode(arr[i]);
    cur.next = node;
    cur = node;
  }
  return dummy.next;
}

/* 打印链表 */
function printList(head) {
  let str = '';
  // 注意：这里不需要再新建一个指针来移动，如 let cur = head   直接用 head 即可！
  // 因为 JS 的参数是值传递！
  // 如果修改 head.val，那么会影响原链表，但这里不涉及修改结点的值
  // 如果将 head 重新指向其他地方，如下面的 head = head.next，并不会影响原链表的 head，因为是值传递，相当于复制了一份
  while (head) {
    str += '--->' + head.val;
    head = head.next;
  }
  console.log(str);
}

// let head = createList([1,2,3,4,5]);
// let k = 2;
let head = createList([0,1,2]);
let k = 4;
printList(head);
head = rotateRight(head, k);
printList(head);
