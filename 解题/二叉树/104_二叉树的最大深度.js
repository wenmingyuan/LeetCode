// https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 我的解法    层序遍历   通过   和答案一样 */
var maxDepth = function(root) {
  let level = 0;
  if (!root) return level;
  let queue = [root];
  while (queue.length) {
    level++;
    let n = queue.length;
    for (let i = 0; i < n; i++) {
      let node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return level;
};

/* 我的解法   带有层数的 dfs   通过 */
var maxDepth = function(root) {
  let dfs = function(root, level) {
    if (!root) return;
    level++;
    maxLevel = Math.max(maxLevel, level);  // 一开始写成 maxLevel++ 了
    dfs(root.left, level);
    dfs(root.right, level);
  }

  let level = 0, maxLevel = 0;
  dfs(root, level);
  return maxLevel;
}

/* 答案的递归更简洁 */
var maxDepth = function(root) {
  if (!root) return 0;
  let leftLevel = maxDepth(root.left);
  let rightLevel = maxDepth(root.right);
  return Math.max(leftLevel, rightLevel) + 1;
}

/* 理解答案后自己写的 */
var maxDepth = function(root) {
  if (!root) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}
