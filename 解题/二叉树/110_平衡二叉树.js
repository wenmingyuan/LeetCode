// https://leetcode-cn.com/problems/balanced-binary-tree/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己的思路   没通过   测试用例：[1,2,2,3,null,null,3,4,null,null,4]
  问题在于我只确保了根结点的左右子树高度差 <= 1，但没保证根结点的子结点的左右子树高度差 <= 1
*/
var isBalanced = function(root) {
  if (!root) return true;
  
  let getHeight = function(root) {
    if (!root) return 0;
    return 1 + Math.max(getHeight(root.left), getHeight(root.right));
  }

  let minus = getHeight(root.left) - getHeight(root.right);
  if (minus <= 1 && minus >= -1) {
    return true;
  }
  else return false;
};

/* 自己修改后的代码   通过   自己思考后得出：平衡二叉树要求左右子树均为平衡二叉树，且左右子树的高度差 <= 1 */
var isBalanced = function(root) {
  if (!root) return true;

  let heightConditon;
  let minus = getHeight(root.left) - getHeight(root.right);
  if (minus <= 1 && minus >= -1) heightConditon =  true;
  else heightConditon = false;

  // 这里把 heightCondition 放在第一个更好，因为上面已经计算过了，当它为 false 时可以直接返回
  return isBalanced(root.left) && isBalanced(root.right) && heightConditon;
}
let getHeight = function(root) {
  if (!root) return 0;
  return 1 + Math.max(getHeight(root.left), getHeight(root.right));
}

/* 答案的自顶向下递归    相当于前序遍历    和我写的差不多，但细节更好 
  参考：https://leetcode-cn.com/problems/balanced-binary-tree/solution/ping-heng-er-cha-shu-by-leetcode-solution/
*/
var isBalanced = function(root) {
  if (!root) return true;
  // 使用 Math.abs() 函数算绝对值更方便
  return Math.abs(height(root.left) - height(root.right)) <= 1 && isBalanced(root.left) && isBalanced(root.right);
}
let height = function(root) {
  if (!root) return 0;
  return Math.max(height(root.left), height(root.right)) + 1;
}

/* 答案的自底向上递归    相当于后序遍历    解决了自顶向下递归会重复调用 height() 函数的问题，降低了时间复杂度  
  参考：
  https://leetcode-cn.com/problems/balanced-binary-tree/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-25/
  https://leetcode-cn.com/problems/balanced-binary-tree/solution/ping-heng-er-cha-shu-by-leetcode-solution/
*/
var isBalanced = function(root) {
  return height !== -1;
}
let height = function(root) {
  if (!root) return 0;

  let leftHeight = height(root.left);
  if (leftHeight === -1) return -1;

  let rightHeight = height(root.right);
  if (rightHeight === -1) return -1;

  if (Math.abs(leftHeight - rightHeight) > 1) return -1;
  
  return Math.max(leftHeight, rightHeight) + 1;
}

/* 理解答案后，自己写的自底向上递归 */
