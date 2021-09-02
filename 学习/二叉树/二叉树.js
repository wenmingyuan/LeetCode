// 定义结点    参照 LeetCode
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

// 先序遍历  递归实现
function preOrder(root) {
  let result = [];
  let helper = function(root) {
    if (!root) return;
    result.push(root.val);
    helper(root.left);
    helper(root.right);
  }
  helper(root);
  return result;
}

// 中序遍历  递归实现
function inOrder(root) {
  let result = [];
  let helper = function(root) {
    if (!root) return;
    helper(root.left);
    result.push(root.val);
    helper(root.right);
  }
  helper(root);
  return result;
}

// 后序遍历  递归实现
function postOrder(root) {
  let result = [];
  let helper = function(root) {
    if (!root) return;
    helper(root.left);
    helper(root.right);
    result.push(root.val);
  }
  helper(root);
  return result;
}

// 创建二叉树
let root = new TreeNode('A');
root.left = new TreeNode('B');
root.left.left = new TreeNode('D');
root.left.right = new TreeNode('E');
root.right = new TreeNode('C');
root.right.right = new TreeNode('F');

let preResult = preOrder(root);
let inResult = inOrder(root);
let postResult = postOrder(root);
console.log(preResult);
console.log(inResult);
console.log(postResult);
