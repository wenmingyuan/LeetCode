// https://leetcode-cn.com/problems/invert-binary-tree/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己的解法   递归   没通过，原因是需要 return 语句
  将左右子树分别翻转，然后交换 root.left 和 root.right
*/
// var invertTree = function(root) {
//   if (!root) return;
//   invertTree(root.left);
//   invertTree(root.right);
//   [root.left, root.right] = [root.right, root.left];  // 尝试使用解构赋值交换变量
// };

/* 修改自己写的    和答案一样
  参考：https://leetcode-cn.com/problems/invert-binary-tree/solution/fan-zhuan-er-cha-shu-by-leetcode-solution/
*/
var invertTree = function(root) {
  if (!root) return root;
  let leftChild = invertTree(root.left);
  let rightChild = invertTree(root.right);
  root.left = rightChild;
  root.right = leftChild;
  return root;
}

/* 另一种修改自己代码的方式 */
var invertTree = function(root) {
  if (!root) return root;  // 把 return; 改为 return root;
  invertTree(root.left);
  invertTree(root.right);
  [root.left, root.right] = [root.right, root.left];
  return root;  // 增加 return root;
};

/* 答案   还可以用层序遍历做，暂时不研究了 
  参考：https://leetcode-cn.com/problems/invert-binary-tree/solution/dong-hua-yan-shi-liang-chong-shi-xian-226-fan-zhua/
*/
