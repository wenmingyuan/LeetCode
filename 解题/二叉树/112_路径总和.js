// https://leetcode-cn.com/problems/path-sum/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己的解法    回溯    通过
  思路：
    将从根结点到当前结点的路径和 curSum 作为 dfs 的参数   
    若当前结点是叶子结点，则比较 curSum 和 targetSum 是否相同
  疑问：当结果为 true 时，如何提前终止递归？   我用了  if (result) return;
*/
var hasPathSum = function(root, targetSum) {
  let dfs = function(root, curSum) {
    if (result) return;
    if (!root) return;
    if (!root.left && !root.right) {
      if (curSum + root.val === targetSum) result = true;
      return;
    }
    dfs(root.left, curSum + root.val);
    dfs(root.right, curSum + root.val);
  }
  
  let result = false;
  dfs(root, 0);  // 一开始写成 dfs(root, curSum) 了...
  return result;
};

/* 答案  dfs  比我的简洁
  答案将要求的函数作为递归函数：
    判断一棵树是否有和为 targetSum 的路径，可以转化为判断根结点的 左子树 或 右子树 是否有和为 targetSum - root.val 的路径
  答案和我的区别：
    没有再定义一个递归函数
    递归函数有返回值
    提前终止递归的方式不同
  参考：https://leetcode-cn.com/problems/path-sum/solution/di-gui-ti-by-hyj8/
*/
const hasPathSum = (root, sum) => {
  if (root == null) { // 遍历到null节点
    return false;
  }                
  if (root.left == null && root.right == null) { // 遍历到叶子节点
    return sum - root.val == 0; // 如果满足这个就返回true。否则返回false
  }
  // 不是上面的情况，则拆成两个子树的问题，其中一个true了就行
  return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val); 
}

/* 理解答案后自己写的 dfs    和答案一样  */
var hasPathSum = function(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) {
    return root.val === targetSum;
  }
  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
}

/* 答案    还可以用层次遍历    不研究了
  需要 2 个队列，一个队列存放结点，另一个队列存放根结点到当前结点的路径和
  参考：https://leetcode-cn.com/problems/path-sum/solution/lu-jing-zong-he-by-leetcode-solution/
*/
