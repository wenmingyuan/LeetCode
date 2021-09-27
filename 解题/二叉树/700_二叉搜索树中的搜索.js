// https://leetcode-cn.com/problems/search-in-a-binary-search-tree/

/* 自己的思路    通过    和答案的迭代一样，空间复杂度为 O(1)
    只要 root 不为空，循环：
      若 val === root.val，则返回 root
      若 val < root.val，则访问左子树（root = root.left）
      若 val > root.val，则访问右子树（root = root.right）
    返回 null
*/
var searchBST = function(root, val) {
  while (root) {  // 一开始写成 while(!root) 了...
    if (val === root.val) return root;
    else if (val < root.val) root = root.left;
    else if (val > root.val) root = root.right;
  }
  return null;
};


/* 答案   递归，空间复杂度为 O(n)
  https://leetcode-cn.com/problems/search-in-a-binary-search-tree/solution/dai-ma-sui-xiang-lu-dai-ni-xue-tou-er-ch-3ww7/
*/
var searchBST = function(root, val) {
  if (!root || root.val === val) return root;
  if (root.val > val) return searchBST(root.left, val);
  if (root.val < val) return searchBST(root.right, val);
}
