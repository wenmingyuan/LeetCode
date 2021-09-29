// https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己的思路   后序遍历    通过   和答案一样
  为了保证是平衡二叉树，选择中序序列的中间结点作为根结点，然后划分左右子树
  时间复杂度为 O(n)，n 为数组长度
  空间复杂度为 O(log n)，n 为数组长度，空间复杂度取决于递归栈的深度
  https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/solution/jiang-you-xu-shu-zu-zhuan-huan-wei-er-cha-sou-s-33/
*/
var sortedArrayToBST = function(nums) {
  let helper = function(start, end) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);

    let leftRoot = helper(start, mid - 1);
    let rightRoot = helper(mid + 1, end);
    let root = new TreeNode(nums[mid], leftRoot, rightRoot);

    return root;
  }

  return helper(0, nums.length - 1);
};
