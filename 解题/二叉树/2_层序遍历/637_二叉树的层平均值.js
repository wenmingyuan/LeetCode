// https://leetcode-cn.com/problems/average-of-levels-in-binary-tree/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己的解法   通过  和答案的 BFS 一样 */
var averageOfLevels = function(root) {
  let result = [];
  let queue = [root];
  while (queue.length) {
    let n = queue.length;
    let sum = 0;
    for (let i = 0; i < n; i++) {
      let node = queue.shift();
      sum += node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    let avg = sum / n;
    result.push(avg);
  }
  return result;
};

/* 看了答案的 DFS 后，自己写的   通过  和答案差不多  还可以用 Map
  思路：
    使用带有层数的 DFS 遍历
    用 sum 数组存放每一层的结点值之和，用 count 数组存放每一层的结点数量
    sum 数组和 count 数组的索引对应层数
    sum 数组的元素除以 count 数组的对应元素，将结果放入 result 数组
    返回 result 数组
*/
var averageOfLevels = function(root) {
  let result = [];
  let sum = [], count = [];
  let level = 0;
  dfs(root, level, sum, count);
  for (let i = 0; i < sum.length; i++) {
    result[i] = sum[i] / count[i];
  }
  return result;
}
let dfs = function(root, level, sum, count) {
  if (!root) return;
  count[level] === undefined ? count[level] = 1 : count[level]++;
  sum[level] === undefined ? sum[level] = root.val : sum[level] += root.val;
  dfs(root.left, level + 1, sum, count);
  dfs(root.right, level + 1, sum, count);
}