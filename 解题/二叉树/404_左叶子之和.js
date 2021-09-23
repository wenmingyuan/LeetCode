// https://leetcode-cn.com/problems/sum-of-left-leaves/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}


/* 自己的解法   没通过   测试用例：[-9,-3,2,null,4,4,0,-6,null,-5]   预期输出：-11   实际输出：-5 */
var sumOfLeftLeaves = function(root) {
  let dfs = function(root) {
    if (!root || !root.left) return;
    if (!root.left.left && !root.left.right) {
      sum += root.left.val;
    }
    dfs(root.left);
    dfs(root.right);
  }

  let sum = 0;
  dfs(root);
  return sum;
};

/* 自己的解法   修改后   通过 */
var sumOfLeftLeaves = function(root) {
  let dfs = function(root) {
    if (!root) return;
    if (!root.left) {
      dfs(root.right);
      return;
    }
    else if (!root.left.left && !root.left.right) {
      sum += root.left.val;
    }
    dfs(root.left);
    dfs(root.right);
  }

  let sum = 0;
  dfs(root);
  return sum;
};

/* 答案要更简洁
  参考评论区：https://leetcode-cn.com/problems/sum-of-left-leaves/solution/zuo-xie-zi-zhi-he-by-leetcode-solution/
*/
var sumOfLeftLeaves = function(root) {
  if (!root) return 0;
  let isLeaf = root.left && !root.left.left && !root.left.right;
  return sumOfLeftLeaves(root.left) + sumOfLeftLeaves(root.right) + (isLeaf ? root.left.val : 0);  // 注意三元表达式的括号一定要加
}