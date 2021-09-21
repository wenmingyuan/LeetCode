function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}


/* 题目要求空间复杂度 O(1) */
/* 自己的思路 先遍历一遍得到结点总的个数，然后将原链表从中间一分为二，再把第一段链表反转，再比较 2 条链表对应位置的结点值是否相同 */
/* 先看答案确认思路对不对，所以没写代码 */
/* 看了答案发现自己的思路和答案大致一样。  这道题坑爹的地方在于可以修改原链表，再复原。   题目也没说明可以修改原链表啊... */


/* 知道答案的思路后自己写的，写之前没看答案代码  通过   忘记恢复原链表了  和答案差不多
  区别在于答案反转后半段链表时没有包括中间结点，区别不大
  步骤：
    先找中间结点
    把后半段链表反转
    比较 2 条链表对应结点的值
    恢复原链表
*/
let getMiddleNode = function(head) {
  let pre = head, cur = head;
  while (cur && cur.next) {  // && 写成 || 了
    pre = pre.next;
    cur = cur.next.next;
  }
  return pre;
}
// 反转链表 头插法 写了好久 必须增加熟练度
// 时间主要花在纠结初始时 dummy 是指向 null 还是指向 head
// 后来发现应该指向 null 或 head 都可以
// 下面是指向 null，206_反转链表 是指向 head
let reverseLinkList = function(head) {
  let dummy = new ListNode(0);
  let pre = head, cur = head; 
  while (cur) {
    pre = cur;
    cur = cur.next;
    pre.next = dummy.next;
    dummy.next = pre;
  }
  return dummy.next;
}
var isPalindrome = function(head) {
  let middle = getMiddleNode(head);
  let head2 = reverseLinkList(middle);
  let cur = head;
  let cur2 = head2;
  while (cur2) {
    if (cur.val === cur2.val) {
      cur = cur.next;
      cur2 = cur2.next;
    }
    // else return false;
    // 补上恢复原链表的代码  自己写的
    else {
      reverseLinkList(head2);
      return false;
    }
  }
  // return true;
  // 补上恢复原链表的代码  自己写的
  reverseLinkList(head2);
  return true;
}


/* 如果不要求空间复杂度为 O(1)，那么就把所有结点的值放到数组里，再判断数组是否回文即可。 下面是自己写的  和答案差不多 */
let isPalindrome = function(head) {
  let arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  let len = arr.length;
  for (let i = 0; i < len / 2; i++) {
    if (arr[i] !== arr[len - 1 - i]) {
      return false;
    }
  }
  return true;
}


/* 还可以用递归，答案没看懂，先不搞了 */


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

let arr = [1,2,2,1];
let head = createList(arr);
printList(head);
console.log(isPalindrome(head));
