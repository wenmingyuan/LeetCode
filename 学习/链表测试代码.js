// 有的题的结点是按下面这样定义的，参数只有 val，按照这个通用创建结点的方式写测试代码应该不会出问题
function ListNode(val) {
  this.val = val;
  this.next = null;
}


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


/* 测试 */
let head = createList([1,2,3,4,5]);
printList(head);
