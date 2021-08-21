/*
  自己的解法
  ---------------------------------------------------------
  先从原数组获取 2 个数字
  将它们逆序后相加
  将求和结果逆序
  将逆序后的每一位数字放到数组中
*/

var addTwoNumbers = function(l1, l2) {
  let num1 = 0, num2 = 0;
  for (let i = 0; i < l1.length; i++) {
    num1 += l1[i] * Math.pow(10, i);  // 乘方
  }
  for (let i = 0; i < l2.length; i++) {
    num2 += l2[i] * Math.pow(10, i);
  }
  sum = num1 + num2;
  let arr = new Array();
  let sumLen = sum.toString().length;
  for (let i = sumLen - 1; i >= 0; i--) {
    arr[sumLen - 1 - i] = sum.toString()[i] - 0;  // toString 和 转成数字 忘记了
  }
  return arr;
};


/*
  看了解题思路后自己写的
  ---------------------------------------------------------
  循环：
    若 l1, l2 当前结点的值都不为空：
      将 l1, l2 当前结点的值相加，并加上 flag 的值，得到 sum
      令 flag = 0
      若 sum < 10，则将 sum 作为新链表 l3 当前结点的值
      若 sum >= 10，则
        令 flag = 1
        将 sum 的个位数作为 l3 当前结点的值
      将 l1, l2 当前结点后移一位
    若 l1 当前结点的值为空：

    若 l2 当前结点的值为空：

    若 l1, l2 当前结点的值都为空：
      若 flag === 1，则 l3...
    

    写不下去了，js 怎么在链表末尾添加结点？

*/


/*
  答案
  ---------------------------------------------------------
  还没搞懂
*/

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

var addTwoNumbers = function(l1, l2) {
  let dummy = new ListNode();
  let cur = dummy;
  let flag = 0;

  while (l1 !== null || l2 !== null) {
    let sum = 0;
    if (l1 != null) {
      sum += l1.val;
      l1 = l1.next;
    }
    if (l2 != null) {
      sum += l2.val;
      l2 = l2.next;
    }
    sum += flag;
    cur.next = new ListNode(sum % 10);
    flag = Math.floor(sum / 10);
    cur = cur.next;
  }

  if (flag > 0) cur.next = new ListNode(flag)
  
  return dummy.next;
};


/*
  测试用例
  ---------------------------------------------------------
  理解错了，输入并不是数组，所以执行不了
*/

let l1 = [2,4,3];
let l2 = [5,6,4];
// let l1 = [0];
// let l2 = [0];
// let l1 = [9,9,9,9,9,9,9];
// let l2 = [9,9,9,9];
console.log(addTwoNumbers(l1, l2));
