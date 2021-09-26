// https://leetcode-cn.com/problems/validate-binary-search-tree/

/* 自己的解法   前序遍历   没通过，测试用例：[5,4,6,null,null,3,7]  预期输出：false，实际输出：true
  原因：没有理解二叉搜索树的定义：根结点的值必须小于右子树中所有结点的值
*/
var isValidBST = function(root) {
  if (!root) return true;
  // 忘记考虑等于的情况了
  if ((root.left && root.left.val >= root.val) || (root.right && root.right.val <= root.val)) {
    return false;
  }
  return isValidBST(root.left) && isValidBST(root.right);
};

/* 尝试改成后序遍历   判断条件改为：根结点的值大于左子树中结点的最大值，且小于右子树中结点的最小值   发现写不出来 */

/* 尝试用中序遍历   想不出来   */

// ----------------------------------------------------------------------------------------------------------------------------

/* 看了答案的中序遍历后自己写的    递归函数没有返回值，应该是没做到提前终止
  参考：https://leetcode-cn.com/problems/validate-binary-search-tree/solution/dai-ma-sui-xiang-lu-dai-ni-xue-tou-er-ch-9cc0/
*/
var isValidBST = function(root) {
  let dfs = function(root) {
    if (!root) return;
    dfs(root.left);
    if (root.val <= tmpMax) {
      result = false;
      return;
    } else{
      tmpMax = root.val;
      dfs(root.right);
    }
  }
  
  let result = true;
  let tmpMax = -Infinity;
  dfs(root);
  return result;
}

/* 答案   用了全局变量，无法通过   注意：不要用全局变量，LeetCode 测试会显示通过，但是提交就不能通过！ 
  思想：如果中序遍历的序列是升序的，那么就是二叉搜索树
*/
// let maxVal = -Infinity;
// var isValidBST = function(root) {
//   if (!root) return true;

//   let left = isValidBST(root.left);
//   if (maxVal < root.val) maxVal = root.val;
//   else return false;
//   let right = isValidBST(root.right);

//   return left && right;
// }

/* 把答案的全局变量变成局部变量 */
var isValidBST = function(root) {
  let helper = function(root) {
    if (!root) return true;
    let left = helper(root.left);
    if (maxVal < root.val) maxVal = root.val;
    else return false;
    let right = helper(root.right);
    return left && right;
  }

  let maxVal = -Infinity;
  return helper(root);
}

// ------------------------------------------------------------------------------------------------------------------------------

/* 答案   递归   前序遍历
  思路：
    直接通过 左子结点的值小于根结点的值、右子结点的值大于根结点的值 来判断是否是二叉搜索树会得出错误的结果
    例如 [5,4,6,null,null,3,7] 这个测试用例，3 不仅要小于 6（父结点），还应大于 5（父结点的下界）
    因此既要确定每个结点值的下界，也要确定上界：
      左子结点值的范围：(父结点的下界, 父结点的值)
      右子结点值的范围：(父结点的值, 父结点的上界)
    根结点的区间：(-∞, +∞)
  总结：应该通过画图来分析结点的上下界
  参考：https://leetcode-cn.com/problems/validate-binary-search-tree/solution/zhong-dian-jie-ci-ti-li-jie-zhong-xu-bian-li-dai-g/
*/
var isValidBST = function (root) {
  return dfs(root, -Infinity, Infinity)
};
function dfs(root, min, max) {
  if (!root) return true
  if (root.val >= max || root.val <= min) return false
  return dfs(root.left, min, root.val) && dfs(root.right, root.val, max)
}

/* 理解答案的递归后自己写的   和答案一样 */
var isValidBST = function(root) {
  let dfs = function(root, min, max) {
    if (!root) return true;
    if (root.val >= max || root.val <= min) return false;  // 一开始没想到要写这句...递归还是没玩明白
    return dfs(root.left, min, root.val) && dfs(root.right, root.val, max);
  }

  let min = -Infinity, max = Infinity;
  return dfs(root, min, max);
}
