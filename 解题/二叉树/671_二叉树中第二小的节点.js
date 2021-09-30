// https://leetcode-cn.com/problems/second-minimum-node-in-a-binary-tree/

/* 自己的解法   没通过   测试用例：[1,1,3,1,2]   预期输出：2   实际输出：3
  第一小的值是根结点，要找第二小的值可以用层次遍历，返回一层中大于根结点的最小结点（这个思路有问题，见上面测试用例）
*/
// var findSecondMinimumValue = function(root) {
//   let queue = [root];
//   let min = 0;  // 题目中结点值最大是 2^31 - 1，看来题目不想让用无穷大。选择用 0，0 是特殊值，题目说了结点都是正数。
//   while (queue.length) {
//     let n = queue.length;
//     while (n--) {
//       let node = queue.shift();
//       if (node.val > root.val) {
//         if (min === 0 || node.val < min) min = node.val;
//       }
//       if (node.left) queue.push(node.left);
//       if (node.right) queue.push(node.right);
//     }
//     if (min !== 0) return min;
//   }
//   return -1;
// };

/* 自己改为用递归      通过     和下面的题解方法3一样
  https://leetcode-cn.com/problems/second-minimum-node-in-a-binary-tree/solution/yi-ti-san-jie-shen-du-jian-zhi-bfsdfsyu-yu41d/
*/
var findSecondMinimumValue = function(root) {
  if (!root.left) return -1;

  let leftMin = 0, rightMin = 0;
  if (root.left.val !== root.val) leftMin = root.left.val;
  else leftMin = findSecondMinimumValue(root.left);
  if (root.right.val !== root.val) rightMin = root.right.val;
  else rightMin = findSecondMinimumValue(root.right);

  if (leftMin === -1) return rightMin;
  if (rightMin === -1) return leftMin;
  return Math.min(leftMin, rightMin);
}

/* 答案    前序遍历 + 剪枝     我对答案的代码进行了改写，让代码更容易理解

  具体看代码的注释吧，感觉思路没写太清楚

  思路：
    将 ans 的初始值设为 -1（因为这是找不到第二小结点时的返回值）
    定义 dfs() 函数：
      若当前结点为空，则返回
      如果 ans === -1 或 当前结点的值 < ans（这意味着可能需要更新最小值了）：
        如果 当前结点的值 > 原树根结点的值（排除当前结点的值等于原树根结点的值的情况）：
          则更新 ans
          返回（因为当前结点的子结点肯定大于等于当前结点，没必要往下遍历了）
        递归左子树
        递归右子树
    返回 ans
  
  https://leetcode-cn.com/problems/second-minimum-node-in-a-binary-tree/solution/er-cha-shu-zhong-di-er-xiao-de-jie-dian-bhxiw/
*/
var findSecondMinimumValue = function(root) {
  let ans = -1;
  const rootVal = root.val;

  const dfs = (root) => {
    if (root === null) return;

    if (ans === -1 || root.val < ans) {  // 可能需要更新最小值了
      if (root.val > rootVal) {  // 排除当前结点的值等于原树根结点的值的情况，就可以更新最小值了
        ans = root.val;
        return;  // 这里可以直接返回，因为当前结点的子结点肯定大于等于当前结点，没必要往下遍历了，评论区也有提到这里可以剪枝
      }
      // 当 root.val === rootVal 时，要递归左右子树
      dfs(root.left);
      dfs(root.right);
    }
    // 这里其实隐藏了 当 ans !== -1 && root.val >= ans 时，直接返回   这是一个剪枝操作
  }

  dfs(root);
  return ans;
};

/* 理解答案后自己写的前序遍历    和答案一样 */
var findSecondMinimumValue = function(root) {
  let dfs = function(root) {
    if (!root) return;

    if (min === -1 || root.val < min) {
      if (root.val > rootVal) {
        min = root.val;
        return;
      }
      dfs(root.left);
      dfs(root.right);
    }
  }

  let min = -1;
  let rootVal = root.val;
  dfs(root);
  return min;
}
