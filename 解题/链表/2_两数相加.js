function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

/*看了解题思路后自己写的
  ---------------------------------------------------------
  sum = head1.val + head2.val
  let head3 = new Node(sum 的个位)  // 创建链表 l3
  flag = sum 的十位
  令指针 cur1 = head1.next, cur2 = head2.next, cur3 = head3
  while cur1, cur2 都不为 null，那么
    sum = cur1.val + cur2.val + flag
    cur3.next = new Node(sum 的个位)
    flag = sum 的十位
    cur1 = cur1.next, cur2 = cur2.next, cur3 = cur3.next
  while cur1 为 null 且 cur2 不为 null，那么
    sum = cur2.val + flag
    cur3.next = new Node(sum 的个位)
    flag = sum 的十位
    cur2 = cur2.next, cur3 = cur3.next
  while cur1 不为 null 且 cur2 为 null，那么
    sum = cur1.val + flag
    cur3.next = new Node(sum 的个位)
    flag = sum 的十位
    cur1 = cur1.next, cur3 = cur3.next
  如果最后 flag = 1，则 cur3.next = new Node(1)
  现在 cur1, cur2 都为 null 了，return head3
*/
// var addTwoNumbers = function(l1, l2) {
//   let sum = l1.val + l2.val;
//   let l3 = new ListNode(sum % 10);
//   let flag = Math.floor(sum / 10);
//   let cur1 = l1.next;
//       cur2 = l2.next;
//       cur3 = l3;
//   while (cur1 !== null && cur2 !== null) {
//     sum = cur1.val + cur2.val + flag;
//     cur3.next = new ListNode(sum % 10);
//     flag = Math.floor(sum / 10);
//     cur1 = cur1.next;
//     cur2 = cur2.next;
//     cur3 = cur3.next;
//   }
//   while (cur1 === null && cur2 !== null) {
//     sum = cur2.val + flag;
//     cur3.next = new ListNode(sum % 10);
//     flag = Math.floor(sum / 10);
//     cur2 = cur2.next;
//     cur3 = cur3.next;
//   }
//   while (cur1 !== null && cur2 === null) {
//     sum = cur1.val + flag;
//     cur3.next = new ListNode(sum % 10);
//     flag = Math.floor(sum / 10);
//     cur1 = cur1.next;
//     cur3 = cur3.next;
//   }
//   if (flag) cur3.next = new ListNode(1);
//   return l3;
// }

/*看了答案，优化自己写的
  ---------------------------------------------------------
  加入头结点，可简化第一个结点的代码
  while 中写 if，简化代码
*/
var addTwoNumbers = function(l1, l2) {
  let dummy = new ListNode();  // 头结点，不存储数据
  let cur = dummy;
  let flag = 0;  // 进位标志
  // 只要 l1, l2 中有一条链还没遍历完
  while (l1 || l2) {
    let sum = 0;
    sum += flag;
    if (l1) {  // 如果 l1 还没遍历完
      sum += l1.val;
      l1 = l1.next;
    }
    if (l2) {  // 如果 l2 还没遍历完
      sum += l2.val;
      l2 = l2.next;
    }
    // 至此计算完 sum
    cur.next = new ListNode(sum % 10);
    flag = Math.floor(sum / 10);
    cur = cur.next;
  }
  // 至此 l1, l2 都遍历完了
  if (flag) cur.next = new ListNode(1);  // 如果最后 flag = 1，那么需要再添加一个结点
  return dummy.next;  // 返回第一个结点
}
// 注：
// 用多次 sum += xxx 计算 sum 要比一口气计算 sum = flag + l1.val + l2.val 要好，
// 因为某条链结束了就不能用 .val 取值了，可以这样改：
// if (!l1) {
//   let n1 = l1.val;
//   l1 = l1.next;
// } else {
//   let n1 = 0;
// }
// if (!l2) {
//   let n2 = l2.val;
//   l2 = l2.next;
// } else {
//   let n2 = 0;
// }
// let sum = flag + n1 + n2;
// 但相比 sum += xxx 显得比较麻烦

/*答案
  ---------------------------------------------------------
  参考：https://www.bilibili.com/video/BV1wA411b7qZ?p=2
*/
// var addTwoNumbers = function(l1, l2) {
//   let dummy = new ListNode();
//   let cur = dummy;
//   let flag = 0;

//   while (l1 !== null || l2 !== null) {
//     let sum = 0;
//     if (l1 != null) {
//       sum += l1.val;
//       l1 = l1.next;
//     }
//     if (l2 != null) {
//       sum += l2.val;
//       l2 = l2.next;
//     }
//     sum += flag;
//     cur.next = new ListNode(sum % 10);
//     flag = Math.floor(sum / 10);
//     cur = cur.next;
//   }

//   if (flag > 0) cur.next = new ListNode(flag)
  
//   return dummy.next;
// };


/*测试用例
  ---------------------------------------------------------
  一开始理解错了，以为题目给的输入输出是数组
  后来发现是输入指针，返回指针
*/
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

// let l1 = createFirstNode(2);
// append(l1, 4);
// append(l1, 3);
let l1 = createFirstNode(9)
append(l1,9)
append(l1,9)
append(l1,9)
append(l1,9)
append(l1,9)
append(l1,9)
show(l1);

// let l2 = createFirstNode(5);
// append(l2, 6);
// append(l2, 4);
let l2 = createFirstNode(9)
append(l2, 9)
append(l2, 9)
append(l2, 9)
append(l2, 9)
show(l2);

let l3 = addTwoNumbers(l1, l2);
show(l3);
