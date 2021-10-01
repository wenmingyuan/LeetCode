// https://leetcode-cn.com/problems/increasing-order-search-tree/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己的解法    递归要求函数    原地修改   通过   */
var increasingBST = function(root) {
  if (!root) return null;

  let downRoot = increasingBST(root.right);
  let upRoot = increasingBST(root.left);

  root.right = downRoot;

  // let cur = root.left;   // 这句替换下面一句也可以，不从头开始找末尾结点
  let cur = upRoot;
  if (!cur) return root;

  while (cur.right) cur = cur.right;  // 一开始写成 cur.next 了...  真当成链表了...
  cur.right = root;
  root.left = null;  // 少了这句，所以一开始报错：Found cycle in the TreeNode
  
  return upRoot;
};

// ------------------------------------------------------------------------------------------------------------------------

/* 自己的解法    反向中序遍历    用变量保存前一结点     不是原地修改     通过 */
var increasingBST = function(root) {
  let dfs = function(root) {
    if (!root) return null;
    dfs(root.right);
    newRoot = new TreeNode(root.val, null, pre);
    pre = newRoot;
    dfs(root.left);
  }

  let newRoot = null, pre = null;
  dfs(root);
  return newRoot;
}

/* （最推荐）参考 114_二叉树展开为链表，可以把上面自己写的反向中序遍历改为原地修改 */
var increasingBST = function(root) {
  let dfs = function(root) {
    if (!root) return null;

    dfs(root.right);
    head = root;  // head 仅用于最后返回链表的第一个结点
    root.right = pre;
    pre = root;
    dfs(root.left);
    root.left = null;
  }

  let head = null, pre = null;
  dfs(root);
  return head;
}

// ------------------------------------------------------------------------------------------------------------------------

/* 答案    先中序遍历，将中序序列保存到数组里，然后再用数组创建链表（使用 dummy 结点）     不是原地修改
  https://leetcode-cn.com/problems/increasing-order-search-tree/solution/di-zeng-shun-xu-cha-zhao-shu-by-leetcode-dfrr/
*/
/* 比较简单，不贴代码了 */

/* 上面这种方法把存储的元素改为结点而不是结点值，就是原地修改了，可以参考 114_二叉树展开为链表，下方为答案
  https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/solution/er-cha-shu-zhan-kai-wei-lian-biao-by-leetcode-solu/
*/

// ------------------------------------------------------------------------------------------------------------------------

/* 答案（推荐）    在中序遍历的过程中改变结点指向    原地修改    我写的反向中序遍历是从下往上构造链表，答案从上往下构造链表，都可以  
  还是上面的题解
*/
var increasingBST = function(root) {
  const dfs = (root) => {
      if (!root) return;

      dfs(root.left);
      pre.right = root;
      root.left = null;  // 注意要把左子结点设为空
      pre = root;
      dfs(root.right);
  }

  const dummy = new TreeNode(-1);
  let pre = dummy;
  dfs(root);
  return dummy.right;
};
