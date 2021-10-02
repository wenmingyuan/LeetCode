// https://leetcode-cn.com/problems/convert-bst-to-greater-tree/

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/* 自己的思路如下
    按照右、根、左的顺序递归构造二叉树
    新树的当前结点的值 = 新树的上一个不为 null 的结点的值 + 原树当前结点的值 
    如果原树当前结点为 null，则返回 null
*/
/* 感觉还是有点乱，直接看答案了 */

/* 答案      答案直接改变了原树，这样我应该能自己写出来...
  我的思路和答案差不多：
    反向中序遍历
    用变量 sum 记录前一结点的值
  https://leetcode-cn.com/problems/convert-bst-to-greater-tree/solution/shou-hua-tu-jie-zhong-xu-bian-li-fan-xiang-de-by-x/
*/
const convertBST = (root) => {
  let sum = 0;
  const inOrder = (root) => {
    if (root == null) {  // 遍历到null节点，开始返回
      return;
    }
    inOrder(root.right); // 先进入右子树

    sum += root.val;     // 节点值累加给sum
    root.val = sum;      // 累加的结果，赋给root.val

    inOrder(root.left);  // 然后才进入左子树
  };
  inOrder(root); // 递归的入口，从根节点开始
  return root;
}

/* 理解答案后自己写的    和答案一样 */
var convertBST = function(root) {
  let dfs = function(root) {
    if (!root) return;
    dfs(root.right);
    sum += root.val;
    root.val = sum;
    dfs(root.left);
  }

  let sum = 0;
  dfs(root);
  return root;
}
