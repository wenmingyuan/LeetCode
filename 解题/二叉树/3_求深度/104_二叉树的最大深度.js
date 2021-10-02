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

// ----------------------------------------------------------------------------------------------------------

/* 我的解法   带有层数的 dfs   相当于前序遍历（有回溯思想）   通过 */
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

// ----------------------------------------------------------------------------------------------------------

/* 答案的递归更简洁     实际上是后序遍历     注意区分什么时候用前序，什么时候用后序，可以参考下面文章
  https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/solution/dai-ma-sui-xiang-lu-qiu-shu-de-zui-da-sh-f988/
*/
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

// ----------------------------------------------------------------------------------------------------------

// 自己又写了一遍前序遍历
var maxDepth = function(root) {
  let dfs = function(root, curLevel) {
    if (!root) return;
    curLevel++;
    if (curLevel > maxlevel) maxlevel = curLevel;  // 在每一层都判断一次最大层数，也可以只在叶子结点判断
    // 下面注释的是只在叶子结点判断最大层数
    // if (!root.left && !root.right) {
    //   if (curLevel > maxlevel) maxlevel = curLevel;
    //   return;
    // }
    dfs(root.left, curLevel);
    dfs(root.right, curLevel);
  }

  let maxlevel = 0;
  dfs(root, 0);
  return maxlevel;
}