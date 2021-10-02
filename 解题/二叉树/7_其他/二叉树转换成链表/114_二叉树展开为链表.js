// https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己的思路   类似 897_递增顺序搜索树，那道题是中序遍历   但感觉前序更麻烦一些，要备份指向右子树的指针   原地修改   通过  */
var flatten = function(root) {
  let dfs = function(root) {
    if (!root) return;

    let rightBak = root.right;  // 备份指向右子树的指针
    pre.right = root;
    pre = root;
    dfs(root.left);
    root.left = null;  // 忘写这句了...
    dfs(rightBak);
  }

  let dummy = new TreeNode();
  let pre = dummy;
  dfs(root);
  // return dummy.next;  // 这道题返回值为 void，没细看题
}

/* 答案   最简单的做法：前序遍历二叉树，将每个结点（指针）都放入数组中，然后再将结点串起来     原地修改
  https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/solution/er-cha-shu-zhan-kai-wei-lian-biao-by-leetcode-solu/
*/
/* 比较简单，就不贴代码了 */

/* 答案 （推荐）   采用反向前序遍历，即 右，左，根    这样就是从下往上构造链表，和我写的从上往下正好是反的，两种方法都可以
  https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/solution/dong-hua-yan-shi-si-chong-jie-fa-114-er-cha-shu-zh/
*/
var flatten = function(root) {
  let dfs = function(root) {
    if (!root) return;

    dfs(root.right);
    dfs(root.left);
    root.left = null;
    root.right = pre;
    pre = root;
  }

  let pre = null;
  dfs(root);
  // 这道题返回值为 void
}

/* 理解答案后自己写的反向前序遍历     和答案一样 */
var flatten = function(root) {
  let dfs = function(root) {
    if (!root) return;

    dfs(root.right);
    dfs(root.left);
    root.right = pre;
    pre = root;
    root.left = null;
  }

  let pre = null;
  dfs(root);
}
