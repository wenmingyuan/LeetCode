// https://leetcode-cn.com/problems/symmetric-tree/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}


/* 自己的思路   递归   通过   和答案一样
  定义辅助函数：判断 2 棵树是否是镜像对称的  
*/
// var isSymmetric = function(root) {
//   if (!root) return true;
//   return isTwoTreeSymmetric(root.left, root.right);
// }
// let isTwoTreeSymmetric = function(p, q) {
//   if (!p && !q) return true;
//   if (!p || !q) return false;
//   if (p.val !== q.val) return false;
//   return isTwoTreeSymmetric(p.left, q.right) && isTwoTreeSymmetric(p.right, q.left);
// }


/* 隔了很多天后自己写的递归 */
// var isSymmetric = function(root) {
//   if (!root) return true;
//   function isSubtreeSymmetric(p, q) {  // 可以把这个函数写到外面去
//     if (!p && !q) return true;
//     if ((p && !q) || (!p && q)) return false;  // 由于上面已经排除了一种条件，所以这行的条件可以简化成 if (!p || !q)
//     if (p.val !== q.val) return false;
//     if (!isSubtreeSymmetric(p.left, q.right) || !isSubtreeSymmetric(p.right, q.left)) {  // 可以和下面的 return true 合并
//       return false;
//     }
//     return true;
//   }
//   return isSubtreeSymmetric(root.left, root.right);
// }


/* 迭代不会做 */


/* 看了答案的迭代思路后自己写的  和答案一样
  思路：
    首先将 root.left 和 root.right 放入队列中
    只要队列不为空，循环：
      将队首的 2 个元素出队，并记录它们的值为 leftNode, rightNode
      若 leftNode 和 rightNode 都为空，则跳过此次循环
      若 leftNode 或 rightNode 一个为空一个不为空，则返回 false
      此时 leftNode 和 rightNode 都不为空，若 leftNode.val !== rightNode.val，则返回 false
      leftNode.left, rightNode.right, leftNode.right, rightNode.left 依次入队
    返回 true
  参考：https://leetcode-cn.com/problems/symmetric-tree/solution/dai-ma-sui-xiang-lu-dai-ni-xue-tou-er-ch-hnjo/
*/
var isSymmetric = function(root) {
  if (!root) return true;
  let queue = [root.left, root.right];
  while (queue.length) {
    leftNode = queue.shift();
    rightNode = queue.shift();
    if (leftNode === null && rightNode === null) {
      continue;
    }
    if (leftNode === null || rightNode === null) {
      return false;
    }
    if (leftNode.val !== rightNode.val) {
      return false;
    }
    queue.push(leftNode.left, rightNode.right, leftNode.right, rightNode.left);
  }
  return true;
}


/* 答案：用栈实现  和用队列实现类似，区别在于结点的访问顺序不同
  参考：https://leetcode-cn.com/problems/symmetric-tree/solution/dai-ma-sui-xiang-lu-dai-ni-xue-tou-er-ch-hnjo/
*/
var isSymmetric = function(root) {
  if (!root) return true;
  let stack = [root.left, root.right];
  while (stack.length) {
    leftNode = stack.pop();
    rightNode = stack.pop();
    if (leftNode === null && rightNode === null) {
      continue;
    }
    if (leftNode === null || rightNode === null) {
      return false;
    }
    if (leftNode.val !== rightNode.val) {
      return false;
    }
    stack.push(leftNode.left, rightNode.right, leftNode.right, rightNode.left);
  }
  return true;
}