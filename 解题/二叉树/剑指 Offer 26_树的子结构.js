// https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/* 自己想到了递归要求函数，但感觉很复杂 */

/* 答案     递归

  递归函数：
      1. 判断 B 树是否是以 A 树的根结点为根结点的树的子结构（这需要另外写一个函数 helper()）
      2. 递归判断 B 树是否是 A 树的左子树的子结构
      3. 递归判断 B 树是否是 A 树的右子树的子结构
      返回 1的结果 || 2的结果 || 3的结果

      终止条件：A 为空 || B 为空，返回 false（题目说了空树不是任何树的子结构，所以返回 false）

  helper(A, B)：     前序遍历
    1. 若 A 的根结点与 B 的根结点的值不同，则返回 false
    2. 递归 A、B 的左子树
    3. 递归 A、B 的右子树
    返回 2的结果 && 3的结果

    终止条件：
      1. (B 空 && A 空) || (B 空 && A 不空)，可以合并为 B 空，返回 true（感觉这个终止条件不太容易写对）
      2. B 不空 && A 空，返回 false

  https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/solution/di-gui-fang-shi-jie-jue-by-sdwwld/
*/
var isSubStructure = function(A, B) {
  let helper = function(A, B) {
    if (!B) return true;
    if (!A || A.val !== B.val) return false;
    return helper(A.left, B.left) && helper(A.right, B.right);
  }

  if (!A || !B) return false;  // 终止条件   题目说了空树不是任何树的子结构，所以返回 false
  return helper(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B);
};

/* 理解答案后自己写的    和答案一样 */
var isSubStructure = function(A, B) {
  let helper = function(A, B) {
    if (!A && B) return false;
    if (!B) return true;
    if (A.val !== B.val) return false;
    // return helper(A.left, B) && helper(A.right, B);  // 写错了
    return helper(A.left, B.left) && helper(A.right, B.right);
  }

  if (!A || !B) return false;
  return helper(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B);
}
