function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}


/* 自己写的  这题很简单就没写思路  通过  
和答案的代码差不多，区别在于：
  答案没有把 pre.next 声明为 cur
  答案只声明一个指针的好处就是移动 pre 后，相当于会自动移动 pre.next
  而我使用的是双指针，移动 pre 后还需要移动 cur 
*/
// var removeElements = function(head, val) {
//   if (!head) return null;
//   let dummy = new ListNode(0, head);
//   let pre = dummy, cur = pre.next;
//   while (cur) {
//     if (cur.val === val) {
//       pre.next = cur.next;
//     }
//     else pre = cur;
//     cur = cur.next;
//   }
//   return dummy.next;
// }


/* 答案也用了递归，下面是自己写的递归  通过   写的不太好，见下面注释  */
var removeElements = function(head, val) {
  if (!head) return null;
  // 下面可以直接去掉，冗余了
  // if (!head.next) {
  //   return head.val === val ? null : head;
  // }
  // 下面其实和答案差不多
  if (head.val === val) head = removeElements(head.next, val);
  else head.next = removeElements(head.next, val);
  return head;
}


/* 答案的递归   比我写的简洁！  
  原因是：
    答案通过递归的最内层得出终止条件
    而我是最内层的外面一层，还不是最深处
    因此我其实写了 2 个终止条件，冗余了
  参考：https://leetcode-cn.com/problems/remove-linked-list-elements/solution/yi-chu-lian-biao-yuan-su-by-leetcode-sol-654m/
*/
var removeElements = function(head, val) {
  if (head === null) {
      return head;
  }
  head.next = removeElements(head.next, val);
  return head.val === val ? head.next : head;
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

// let head = createList([1,2,6,3,4,5,6]);
// let val = 6;
let head = null;
let val = 1;
// let head = createList([7,7,7,7]);
// let val = 7;
printList(head);
head = removeElements(head, val);
printList(head);
