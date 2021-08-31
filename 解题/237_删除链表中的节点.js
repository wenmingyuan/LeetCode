function ListNode(val) {
  this.val = val;
  this.next = null;
}


/* 这道题要看英文版，中文题目没说清楚为什么只有一个参数 */
/* 没想出来怎么做，因为删除某一结点一般要修改前一结点的 next 指针，这题给的是指向要删除结点的指针，看起来没法删除这个结点。  直接看答案了 */


/* 答案   删除替身结点
  思路：
    因为经过上面的分析发现无法直接删除 node 结点，所以需要变通一下
    把 node 结点的值修改为它的后一结点的值
    然后删除 node 结点的后一结点
    因为题目说明至少有 2 个结点，且不删除最后一个结点，所以不用考虑特殊情况
  参考：https://leetcode-cn.com/problems/delete-node-in-a-linked-list/solution/shan-chu-lian-biao-zhong-de-jie-dian-by-leetcode/
*/


/* 理解答案思路后自己写的  和答案一样  */
var deleteNode = function(node) {
  node.val = node.next.val;
  node.next = node.next.next;
}


/* 另外这道题可以拓展：给定 node，要求在 node 前插入一个结点    思路其实也是一样，关键是要想到修改结点的值！   */
