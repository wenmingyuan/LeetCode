// https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/

/* 自己的思路   类似 剑指 54 题_二叉搜索树的第 k 大结点    通过 */
var kthSmallest = function(root, k) {
  let dfs = function(root) {
    if (!root) return;

    dfs(root.left);
    if (k === 0) return;
    k--;
    if (k === 0) result = root.val;
    dfs(root.right);
  }

  let result;
  dfs(root);
  return result;
};
