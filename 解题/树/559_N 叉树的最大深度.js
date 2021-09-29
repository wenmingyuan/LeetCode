// https://leetcode-cn.com/problems/maximum-depth-of-n-ary-tree/

function Node(val,children) {
  this.val = val;
  this.children = children;
};

/* 自己的思路   dfs带参数前序遍历（求深度） 或 后序遍历（求高度）都可以，这里用后序遍历    通过   和答案一样 */
var maxDepth = function(root) {
  if (!root) return 0;

  let maxHeight = 0;
  for (let child of root.children) {
    let height = maxDepth(child);
    if (height > maxHeight) maxHeight = height;
  }
  return maxHeight + 1;
};
