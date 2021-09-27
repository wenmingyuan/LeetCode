// https://leetcode-cn.com/problems/merge-two-binary-trees/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己的思路   后序遍历   通过
  递归终止条件：
    1. 当一个根结点为空，另一个根结点不为空时，返回另一个根结点
    2. 当两个根结点都为空时，返回空
  其中 1 包括了 2 的情况，所以可以合并
*/
var mergeTrees = function(root1, root2) {
  if (!root1) return root2;
  if (!root2) return root1;

  let newLeft = mergeTrees(root1.left, root2.left);
  let newRight = mergeTrees(root1.right, root2.right);
  let newRoot = new TreeNode(root1.val + root2.val, newLeft, newRight);

  return newRoot;
};

/* 自己的思路   前序遍历   通过    和答案一样 
  https://leetcode-cn.com/problems/merge-two-binary-trees/solution/he-bing-er-cha-shu-by-leetcode-solution/
*/
var mergeTrees = function(root1, root2) {
  if (!root1) return root2;
  if (!root2) return root1;

  let newRoot = new TreeNode(root1.val + root2.val);
  newRoot.left = mergeTrees(root1.left, root2.left);
  newRoot.right = mergeTrees(root1.right, root2.right);

  return newRoot;
};

/* 答案   BFS   感觉有点复杂，而且答案改变了原树，暂时不研究了...
  https://leetcode-cn.com/problems/merge-two-binary-trees/solution/dong-hua-yan-shi-di-gui-die-dai-617he-bing-er-cha-/
*/
