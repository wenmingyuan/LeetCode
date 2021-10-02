// https://leetcode-cn.com/problems/find-largest-value-in-each-tree-row/

/* 自己的思路    层序遍历    通过    和答案一样 */
var largestValues = function(root) {
  let result = [];
  if (!root) return result;
  let queue = [root];
  while (queue.length) {
    let max = -Infinity;
    let n = queue.length;
    while (n--) {
      let node = queue.shift();
      if (node.val > max) max = node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(max);  // 忘记写这句了...
  }
  return result;
};

/* 自己的思路   DFS，前序遍历（回溯）   通过   和答案差不多 */
var largestValues = function(root) {
  let dfs = function(root, curLevel) {
    if (!root) return;
    curLevel++;
    if (result[curLevel] < root.val || result[curLevel] === undefined) {
      result[curLevel] = root.val;
    }
    dfs(root.left, curLevel);
    dfs(root.right, curLevel);
  }

  let result = [];
  dfs(root, -1);  // 为了让层数对应数组索引，让根结点的层数为 0
  return result;
}
