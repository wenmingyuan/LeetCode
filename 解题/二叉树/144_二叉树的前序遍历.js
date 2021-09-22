// https://leetcode-cn.com/problems/binary-tree-preorder-traversal/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 我的解法  递归  */
var preorderTraversal = function(root) {
  let result = [];
  let dfs = function(root) {
    if (!root) return;
    result.push(root.val);
    dfs(root.left);
    dfs(root.right);
  };
  dfs(root);
  return result;
};

/* 看了答案后写的非递归   通过   和答案一样
  思路：
    把根结点放入栈中
    只要栈不为空：
      将栈顶元素出栈，并记录为 node
      将 node.val 放入结果数组 result
      若 node.right 不为 null，则将 node.right 进栈
      若 node.left 不为 null，则将 node.left 进栈
    返回 result
*/
var preorderTraversal = function(root) {
  let result = [];
  if (!root) return result;
  let stack = [root];
  while (stack.length) {
    let node = stack.pop();
    result.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return result;
}
