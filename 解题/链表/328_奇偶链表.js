function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}


/* 自己的思路  和答案一样
  指针 i 放在奇数位，指针 j 放在偶数位
  把奇数位结点串起来
  把偶数位结点串起来
  让最后一个奇数结点指向第一个偶数节点
  分情况讨论（后来发现两种情况可以合并）：
    结点个数是奇数时
    结点个数是偶数时
*/
var oddEvenList = function(head) {
  if (!head) return null;
  let i = head, j = i.next, head2 = j;
  while (i.next && j.next) {
    i.next = j.next;
    i = j.next;  // 这里也可以写 i = i.next
    j.next = i.next;
    j = i.next;  // 同上，可以写 j = j.next
  }
  i.next = head2;
  return head;
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
append(head, 5);
show(head);

head = oddEvenList(head);
show(head);
