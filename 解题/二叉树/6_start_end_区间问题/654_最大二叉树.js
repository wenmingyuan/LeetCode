// https://leetcode-cn.com/problems/maximum-binary-tree/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己的解法    后序遍历    先不优化，先写出来再说    通过 */
var constructMaximumBinaryTree = function(nums) {
  // if (!root) return null;  // 不应该用 root
  if (nums.length === 0) return null;
  
  let max = -Infinity, index;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
      index = i;
    }
  }

  let leftRoot = constructMaximumBinaryTree(nums.slice(0, index));
  let rightRoot = constructMaximumBinaryTree(nums.slice(index + 1));
  let root = new TreeNode(nums[index], leftRoot, rightRoot);

  return root;
};

/* 自己想到可能的优化步骤
    优化 slice()：不使用 slice() 切割数组，而是使用 start、end 指针表示区间
    优化查找最大元素的时间：对数组排序，然后用 Map，不知道是否可行

  为了节省时间，直接看答案了
*/

/* 答案    使用双指针，优化了 slice()    没有对查找进行优化    时间复杂度为 O(n^2)
  参考：
  https://leetcode-cn.com/problems/maximum-binary-tree/solution/zui-da-er-cha-shu-by-leetcode/
  https://leetcode-cn.com/problems/maximum-binary-tree/solution/654-zui-da-er-cha-shu-gen-ju-shu-zu-gou-q0hp9/
*/
// 代码就不贴了，和下面自己写的差不多

/* 自己写的双指针    通过     和答案的区别在于：答案的递归函数的参数 start、end 是左闭右开，我是左右都闭 */
var constructMaximumBinaryTree = function(nums) {
  let helper = function(start, end) {
    if (start > end) return null;

    let index, max = -Infinity;
    for (let i = start; i <= end; i++) {
      if (nums[i] > max) {
        max = nums[i];
        index = i;
      }
    }

    let leftRoot = helper(start, index - 1);
    let rightRoot = helper(index + 1, end);
    let root = new TreeNode(max, leftRoot, rightRoot);

    return root;
  }

  return helper(0, nums.length - 1);
}
