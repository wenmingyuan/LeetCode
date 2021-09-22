function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}


/* 自己的思路   用 O(n) 的时间，遍历全部结点   通过  */
// var countNodes = function(root) {
//   let n = 0;
//   let helper = function(root) {
//     if (!root) return;
//     n++;
//     helper(root.left);
//     helper(root.right);
//   }
//   helper(root);  // 写成了 n = helper(root);  但 helper() 没有返回值
//   return n;
// }


/* 答案   比我的代码简介很多    适用于任何二叉树
  参考：https://leetcode-cn.com/problems/count-complete-tree-nodes/solution/chang-gui-jie-fa-he-ji-bai-100de-javajie-fa-by-xia/
*/
// var countNodes = function(root) {
//   if (!root) return 0;
//   return countNodes(root.left) + countNodes(root.right) + 1;
// }


/* 题目进阶要求减少搜索时间   我想先求出树的高度，再获得最后一层有几个结点   但不知道怎么实现   看答案了 */
/* 答案    时间复杂度  O(log n * log n)，不太清楚怎么算出来的...
  思路：
    1. 分别统计 root 结点的 左子树的层高 l1 和 右子树的层高 l2（根结点的层高记为 1）
    2. 若 l1 == l2，则左子树是满二叉树，左子树的结点个数可通过公式计算：2 ^ l1 - 1。右子树是完全二叉树，右子树的结点数可通过递归调用该函数得到。
    3. 若 l1 != l2，则右子树是满二叉树，右子树的结点个数可通过公式计算：2 ^ l2 - 1。左子树是完全二叉树，左子树的结点数可通过递归调用该函数得到。
    4. 总结点数 = 左子树结点数 + 右子树结点数 + 1（根结点）
  注：
    1. 计算完全二叉树的层数不用像普通的二叉树一样用递归（见 学习/二叉树.js）
       从根结点开始，while 循环遍历左子节点直至为空，即可获得层数
    2. 遍历左子树或右子树时，不是很傻地去遍历全部结点，因为左子树或右子树也是一颗完全二叉树！递归调用该函数即可获得其结点数！
    3. 计算 2 的几次幂时，可以用左移运算： 1 << n，相当于 2 ^ n。但要注意移位运算优先级较低，一般用括号括起来
  参考：https://leetcode-cn.com/problems/count-complete-tree-nodes/solution/chang-gui-jie-fa-he-ji-bai-100de-javajie-fa-by-xia/
*/
// var countNodes = function(root) {
//   if (!root) return 0;
//   let l1 = countLevel(root.left);
//   let l2 = countLevel(root.right);
//   if (l1 === l2) {
//     return countNodes(root.right) + (1 << l1);  // 移位运算的优先级低于加减运算，一般用括号括起来
//   }
//   else {
//     return countNodes(root.left) + (1 << l2);
//   }
// }
// var countLevel = function(root) {
//   let level = 0;
//   while (root) {
//     level++;
//     root = root.left;
//   }
//   return level;
// }


/* 理解答案后自己写的   和答案一样  */
var countNodes = function(root) {
  if (!root) return 0;
  let l1 = countLevel(root.left);
  let l2 = countLevel(root.right);
  if (l1 === l2) {
    return (1 << l1) + countNodes(root.right);
  }
  else {
    return (1 << l2) + countNodes(root.left);
  }
}
var countLevel = function(root) {
  let level = 0;
  while (root) {
    level++;
    root = root.left;
  }
  return level;
}