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

// 统计二叉树的结点个数
function countNodes(root) {
  if (!root) return 0;
  return countNodes(root.left) + countNodes(root.right) + 1;
}

// 统计二叉树的层数（从上往下，根结点为第 1 层）
function countLevel(root) {
  if (!root) return 0;
  return Math.max(countLevel(root.left), countLevel(root.right)) + 1;
}

// 创建二叉树
let root = new TreeNode('A');
root.left = new TreeNode('B');
root.left.left = new TreeNode('D');
root.left.right = new TreeNode('E');
root.right = new TreeNode('C');
root.right.right = new TreeNode('F');

// let preResult = preOrder(root);
// let inResult = inOrder(root);
// let postResult = postOrder(root);
// console.log(preResult);
// console.log(inResult);
// console.log(postResult);

let n = countNodes(root);
let level = countLevel(root);
console.log(n);
console.log(level);


