function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}


/* 自己的解法 */
var deleteDuplicates = function(head) {
  let p = head, c = p;
  while (p) {
    // while (p.val === c.val) c = c.next;  // 注意当 c 指向空时， c.val 这个写法会报错！
    while (c && p.val === c.val) c = c.next;
    p.next = c;
    p = c;
  }
  return head;
}


/* 答案   答案比我的思路更简洁，值得学习 
  参考：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/solution/shan-chu-pai-xu-lian-biao-zhong-de-zhong-49v5/
  我的思想和答案思想的区别：
    我想先通过 while 循环找到下一个和当前结点值不同的结点，然后再把当前结点的 next 指针指向那个结点
    答案是只要当前结点和下一个结点的值不同，那就把当前结点的 next 指针指向下下个结点，这种方法会频繁地改变指针指向
*/
var deleteDuplicates = function(head) {
  if (!head) {
      return head;
  }
  let cur = head;  // 只用一个指针
  while (cur.next) {
      if (cur.val === cur.next.val) {
          cur.next = cur.next.next;
      } else {
          cur = cur.next;
      }
  }
  return head;
}


/* 还可以用递归做，先不做了 
  可参考：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/solution/fu-xue-ming-zhu-di-gui-die-dai-4-chong-d-t3bp/
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
append(head, 1);
append(head, 2);
append(head, 3);
append(head, 3);

head = deleteDuplicates(head);
show(head);
