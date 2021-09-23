// https://leetcode-cn.com/problems/binary-tree-paths/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己的解法   递归   通过 */
var binaryTreePaths = function(root) {
  let dfs = function(root) {
    let result = [];
    if (!root) return result;

    let arr1 = dfs(root.left);
    let arr2 = dfs(root.right);

    if (!arr1.length && !arr2.length) {
      result.push(root.val + '');
    }
    for (let e of arr1) {
      result.push(root.val + '->' + e);
    }
    for (let e of arr2) {
      result.push(root.val + '->' + e);
    }

    return result;
  };
  return dfs(root);
};

/* 修改自己写的递归   没必要再定义一个函数   通过 */
var binaryTreePaths = function(root) {
  let result = [];
  if (!root) return result;

  let arr1 = binaryTreePaths(root.left);
  let arr2 = binaryTreePaths(root.right);

  if (!arr1.length && !arr2.length) {
    result.push(root.val + '');
  }
  for (let e of arr1) {
    result.push(root.val + '->' + e);
  }
  for (let e of arr2) {
    result.push(root.val + '->' + e);
  }

  return result;
};

/* 答案的递归     利用回溯思想     类似带有层次的 DFS，这道题 dfs 函数的第二个参数为 拼接的字符串
  可参考题解中的图片
  注意要单独讨论叶子结点（左右子结点都为空）的情况
  我和答案的区别在于我用的是后序遍历，答案是前序遍历
  前、中、后序遍历实际上都是 DFS，每个结点都会被 visit 3 次，但区别在于结点的值被 access 的时机（题解中有解释）
  参考：https://leetcode-cn.com/problems/binary-tree-paths/solution/tu-jie-er-cha-shu-de-suo-you-lu-jing-by-xiao_ben_z/
*/
const binaryTreePaths = (root) => {
  const res = [];

  const buildPath = (root, pathStr) => {
    if (root == null) {
      return;
    }
    if (root.left == null && root.right == null) { // 遍历到叶子节点
      pathStr += root.val; // 路径末尾了，不用加箭头
      res.push(pathStr);   // 加入解集
      return;
    }
    pathStr += root.val + '->'; // 处理非叶子节点，要加箭头
    buildPath(root.left, pathStr); // 基于当前的pathStr，递归左子树
    buildPath(root.right, pathStr); // 基于当前的pathStr，递归右子树
  };

  buildPath(root, '');
  return res;
};

/* 看了答案后自己写的递归，采用了和答案不同的方式   写的不对   递归终止条件有问题 */
var binaryTreePaths = function(root) {
  let result = [];
  
  let dfs = function(root, path) {
    if (!root) {
      result.push(path);
      return;
    }
    path += '->' + root.val;
    dfs(root.left, path);
    dfs(root.right, path);
  }

  let path = '';
  dfs(root, path);
  for (let i = 0; i < result.length; i++) {
    result[i] = result[i].substring(1);
  }
  return result;
}

/* 按答案的思路自己写的递归  和答案一样 */
var binaryTreePaths = function(root) {
  let result = [];

  let dfs = function(root, path) {
    if (!root) return;
    if (!root.left && !root.right) {
      path += root.val;
      result.push(path);
      return;
    }
    path += root.val + '->';
    dfs(root.left, path);
    dfs(root.right, path);
  }

  let path = '';
  dfs(root, path);
  return result;
}

