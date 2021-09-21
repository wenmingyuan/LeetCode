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

// BFS（不区分不同的层）  队列
var bfs = function(root) {
  let result = [];
  if (!root) return result;
  let queue = [root];
  while (queue.length) {
    let node = queue.shift();
    result.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
};

// 层序遍历（区分不同的层）  队列
var levelOrder = function(root) {
  let result = [];
  if (!root) return result;
  let queue = [root];
  while (queue.length) {
    let arr = [];
    let n = queue.length;
    for (let i = 0; i < n; i++) {  // 开始写成 i < queue.length 了，这样会导致一轮循环后 queue.length 发生变化。用 n 保存 queue.length，就不会变化了。
      let node = queue.shift();
      arr.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(arr);
  }
  return result;
};

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
// console.log(preResult);
// let inResult = inOrder(root);
// console.log(inResult);
// let postResult = postOrder(root);
// console.log(postResult);
// let bfsResult = bfs(root);
// console.log(bfsResult);
let levelResult = levelOrder(root);
console.log(levelResult);

// let n = countNodes(root);
// let level = countLevel(root);
// console.log(n);
// console.log(level);


