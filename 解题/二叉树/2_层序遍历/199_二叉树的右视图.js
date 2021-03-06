// https://leetcode-cn.com/problems/binary-tree-right-side-view/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己的思路   BFS   通过   和答案一样 */
var rightSideView = function(root) {
  let result = [];
  if (!root) return result;
  let queue = [root];
  while (queue.length) {
    let n = queue.length;
    result.push(queue[n - 1].val);
    for (let i = 0; i < n; i++) {
      let node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
};

/* 答案 DFS   理解答案后自己写的   通过    和答案差不多
  思路：
    按照 root、right、left 的顺序遍历
    判断当前结点是否是这一层第一个被访问的结点，如果是，就加入到结果数组
    dfs() 函数的参数要有层数（带有层数的递归）
  参考：https://leetcode-cn.com/problems/binary-tree-right-side-view/solution/jian-dan-bfsdfs-bi-xu-miao-dong-by-sweetiee/
*/
var rightSideView = function(root) {
  let result = [];
  let level = 1;
  dfs(root, level, result);
  return result;
};
let dfs = function(root, level, result) {  // 参数中要有层数
  if (!root) return;
  if (level > result.length) {
    result.push(root.val);
  }
  level++;
  dfs(root.right, level, result);
  dfs(root.left, level, result);
};
