// https://leetcode-cn.com/problems/find-bottom-left-tree-value/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 我的解法    层序遍历    通过 */
var findBottomLeftValue = function(root) {
  let result;
  let queue = [root];
  while (queue.length) {
    let n = queue.length;
    for (let i = 0; i < n; i++) {
      let node = queue.shift();
      if (i === 0) result = node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
};

/* 答案的 BFS    改进了层序遍历，是从上到下，从右到左的顺序遍历，这样最后一个访问的结点就是要求的结点，不需要区分层
  参考：https://leetcode-cn.com/problems/find-bottom-left-tree-value/solution/513-zhao-shu-zuo-xia-jiao-de-zhi-bfs-dfs-aawe/
*/
var findBottomLeftValue = function(root) {
  let queue = [root];
  let node = null;
  while (queue.length) {
    node = queue.shift();
    // 先右后左
    if (node.right) queue.push(node.right);
    if (node.left) queue.push(node.left);
  }
  return node.val;
}

/* 答案的 DFS
  核心思路：
    用变量 maxLevel 记录已遍历的叶子结点的最大层数（注意 maxLevel 并不是已遍历的结点的最大层数）
    使用前序遍历，即带有层数的递归
    若当前结点是叶子结点，且它所在的层数大于目前记录的叶子结点的最大层数，则：
      更新叶子结点的最大层数
      将当前叶子结点的值作为结果 result（因为当前结点一定是这一层最左边的叶子结点）
    如果当前结点不是叶子结点，则：
      递归左子树
      递归右子树
  参考：https://leetcode-cn.com/problems/find-bottom-left-tree-value/solution/dai-ma-sui-xiang-lu-dai-ni-xue-tou-er-ch-w3og/
*/
var findBottomLeftValue = function(root) {
  let maxLevel = 0;
  let result = null;

  let dfs = function(root, curLevel) {
    if (!root) return;  // 可以不写这句，因为这道题说了根结点不为空
    if (!root.left && !root.right) {
      if (curLevel > maxLevel) {
        maxLevel = curLevel;
        result = root.val;
      }
      return;
    }
    if (root.left) dfs(root.left, curLevel + 1);
    if (root.right) dfs(root.right, curLevel + 1);
  }

  dfs(root, 1);
  return result;
}

/* 理解答案后自己写的 DFS
  改写了一下答案，我的写法中 if(!root) return; 这句会起作用，而答案的不会起作用
  因此我的写法在递归左右子树之前不用判断左右子树是否为空，代码更清晰
*/
var findBottomLeftValue = function(root) {
  let result = null;
  let maxLevel = 0;

  let dfs = function(root, curLevel) {
    if (!root) return;
    if (!root.left && !root.right) {
      if (curLevel > maxLevel) {  // 忘记写判断条件了...
        maxLevel = curLevel;
        result = root.val;
      }
    }
    else {
      dfs(root.left, curLevel + 1);
      dfs(root.right, curLevel + 1);
    }
  }

  dfs(root, 1);
  return result;
}
