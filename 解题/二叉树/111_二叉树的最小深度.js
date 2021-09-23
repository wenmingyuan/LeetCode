// https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己的解法    层次遍历    通过 */
var minDepth = function(root) {
  let level = 0;
  if (!root) return level;
  let queue = [root];
  while (queue.length) {
    level++;
    let n = queue.length;
    while (n--) {  // 参考其他题的答案，这次试一下把 for 循环改写成 while
      let node = queue.shift();
      if (!node.left && !node.right) return level;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
};

/* 自己的解法    dfs    没通过    测试用例：[1, 2]
  原因：
    这道题和 104_二叉树的最大深度 不一样
    当根结点有一个子结点为空，另一个子结点不为空时，容易得到错误的最小深度。
  正确思路：
      当根结点有一个子结点为空，另一个子结点不为空时，最小深度不是 1，而是要看不为空子结点的最小深度。
      当根结点的左右子结点都为空时，最小深度是 1。（可以和上面的情况合并）
      当根结点的左右子结点都不为空时，最小深度是 1 + 左右子结点最小深度的较小值。
*/
// var minDepth = function(root) {
//   if (!root) return 0;
//   return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
// }

/* 自己的 dfs    修改后    通过   答案更简洁一些 */
var minDepth = function(root) {
  if (!root) return 0;
  let leftLevel = minDepth(root.left);
  let rightLevel = minDepth(root.right);
  if (leftLevel === 0) return rightLevel + 1;
  if (rightLevel === 0) return leftLevel + 1;
  return Math.min(leftLevel, rightLevel) + 1;
}

/* 答案  dfs
  参考：https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/solution/li-jie-zhe-dao-ti-de-jie-shu-tiao-jian-by-user7208/
*/
var minDepth = function(root) {
  if (!root) return 0;
  let m1 = minDepth(root.left);
  let m2 = minDepth(root.right);
  if (!root.left || !root.right) {
    return m1 + m2 + 1;
  }
  return Math.min(m1, m2) + 1;
}
