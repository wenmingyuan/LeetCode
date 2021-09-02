function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}


/* 自己的解法   递归     通过
  思路：
    当 2 个根结点都为空，返回
    当 1 个根结点为空，1 个不为空时，result = false，返回
    剩下的情况就是 2 个根结点都不为空
      当 2 个根结点的值不同时，result = false，返回（这句可和上面合并）
      当 2 个根结点的值相等时，递归比较它们的左子树和右子树是否相同
*/
var isSameTree = function(p, q) {
  let result = true;
  let helper = function(p, q) {
    if (!p && !q) return;
    else if (!(p && q) || p.val !== q.val) {
      result = false;
      return;
    }
    helper(p.left, q.left);
    helper(p.right, q.right);
  }
  helper(p, q);  // 忘执行了...
  return result;
}


/* 和答案的 dfs 差不多  答案更简洁   看了答案才知道可以不写 result，不定义辅助函数 
  注意最后的短路效应，可减少不必要的搜索
  参考：https://leetcode-cn.com/problems/same-tree/solution/hua-jie-suan-fa-100-xiang-tong-de-shu-by-guanpengc/
*/
var isSameTree = function(p, q) {
  if(p == null && q == null) 
      return true;
  if(p == null || q == null) 
      return false;
  if(p.val != q.val) 
      return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);  // 短路效应  左子树不同时，不会比较右子树
}


/* 测试 */
let p = new TreeNode(1);
p.left = new TreeNode(2);
p.left.left = new TreeNode(3);
p.right = new TreeNode(4);
p.right.right = new TreeNode(5);

// let q = new TreeNode(1);
// q.left = new TreeNode(2);
// q.left.left = new TreeNode(3);
// q.left.right = new TreeNode(4);
// q.right = new TreeNode(5);

let q = new TreeNode(1);
q.left = new TreeNode(2);
q.left.left = new TreeNode(3);
q.right = new TreeNode(4);
q.right.right = new TreeNode(5);

console.log(isSameTree(p, q));
