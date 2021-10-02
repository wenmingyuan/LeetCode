// https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己的思路    后序数组的最后一个结点是根结点    通过
  直接写用指针表示区间的方法，并且用 Map 优化查找
  和 105 题相反，后序数组需要从右往左看

  右子树
    pStart: pEnd - rightNum    rightNum 为右子树结点个数
    pEnd: pEnd - 1
    iStart: mid + 1
    iEnd: iEnd
  左子树
    pStart: pStart
    pEnd: pEnd - rightNum - 1
    iStart: iStart
    iEnd: mid - 1
*/
var buildTree = function(inorder, postorder) {
  let helper = function(pStart, pEnd, iStart, iEnd) {  // 我更习惯把中序数组放在参数的后面
    if (pStart > pEnd) return null;

    // let mid = inorder.indexOf(postorder[pEnd]);
    let mid = map.get(postorder[pEnd]);
    let rightNum = iEnd - mid;

    let leftRoot = helper(pStart, pEnd - rightNum - 1, iStart, mid - 1);
    let rightRoot = helper(pEnd - rightNum, pEnd - 1, mid + 1, iEnd);
    let root = new TreeNode(postorder[pEnd], leftRoot, rightRoot);

    return root;
  }

  let n = postorder.length;
  let map = new Map();
  for (let i = 0; i < n; i++) {
    map.set(inorder[i], i);
  }
  return helper(0, n - 1, 0, n - 1);
};

/* 注：其实也可以不计算 rightNum，而是计算 leftNum，效果是一样的   参考下面题解，此题解的图片很好
  https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/solution/tu-jie-gou-zao-er-cha-shu-wei-wan-dai-xu-by-user72/
*/
